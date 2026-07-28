from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import pandas as pd
import joblib
import os
import random

app = FastAPI(title="Omnifood AI Personalized ML Server")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATA_PATH = "data/meal_dataset_user_profile.csv"
MODEL_PATH = "models/personalized_meal_model.joblib"

if not os.path.exists(DATA_PATH):
    raise FileNotFoundError("Dataset not found: data/meal_dataset_user_profile.csv")

if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError("Model not found. First run: python train_model.py")

model = joblib.load(MODEL_PATH)
meals_df = pd.read_csv(DATA_PATH)


class MealPlanRequest(BaseModel):
    diet: str
    likes: List[str] = []
    dislikes: List[str] = []
    city: str = ""
    mealsPerDay: int = 3
    age: int
    height_cm: float
    weight_kg: float
    diagnosis: str = "none"


def calculate_bmi(height_cm, weight_kg):
    height_m = height_cm / 100

    if height_m <= 0:
        return 0

    return round(weight_kg / (height_m ** 2), 2)


def bmi_category(bmi):
    if bmi < 18.5:
        return "underweight"
    elif bmi < 25:
        return "normal"
    elif bmi < 30:
        return "overweight"
    return "obese"


def predict_personalized_score(meal, request, bmi):
    input_data = pd.DataFrame(
        [
            {
                "calories": meal["calories"],
                "protein": meal["protein"],
                "carbs": meal["carbs"],
                "fat": meal["fat"],
                "fiber": meal["fiber"],
                "sugar": meal["sugar"],
                "sodium": meal["sodium"],
                "dietType": meal["dietType"],
                "mealTime": meal["mealTime"],
                "age": request.age,
                "height_cm": request.height_cm,
                "weight_kg": request.weight_kg,
                "bmi": bmi,
                "diagnosis": request.diagnosis,
            }
        ]
    )

    score = model.predict(input_data)[0]
    return round(float(score), 2)


def preference_boost(meal, likes, dislikes, diet):
    score = 0

    name = str(meal["name"]).lower()
    diet_type = str(meal["dietType"]).lower()
    meal_time = str(meal["mealTime"]).lower()

    likes = [x.lower() for x in likes]
    dislikes = [x.lower() for x in dislikes]
    diet = diet.lower()

    if diet in diet_type:
        score += 20

    for item in likes:
        if item in name or item in diet_type or item in meal_time:
            score += 10

    for item in dislikes:
        if item in name or item in diet_type or item in meal_time:
            score -= 50

    return score


def explain_meal(meal, diagnosis, bmi):
    reasons = []

    sugar = float(meal["sugar"])
    sodium = float(meal["sodium"])
    protein = float(meal["protein"])
    fiber = float(meal["fiber"])
    calories = float(meal["calories"])
    fat = float(meal["fat"])

    diagnosis = diagnosis.lower()

    if diagnosis == "diabetes":
        if sugar <= 8:
            reasons.append("low sugar")
        else:
            reasons.append("selected by ML despite moderate sugar")

    if diagnosis in ["bp", "high bp", "hypertension"]:
        if sodium <= 250:
            reasons.append("low sodium")
        else:
            reasons.append("sodium considered in ML ranking")

    if diagnosis == "heart":
        if fat <= 12:
            reasons.append("heart-friendly fat level")
        if sodium <= 250:
            reasons.append("controlled sodium")

    if diagnosis == "obesity" or bmi >= 30:
        if calories <= 450:
            reasons.append("calorie controlled")
        if protein >= 15:
            reasons.append("supports satiety")

    if protein >= 15:
        reasons.append("good protein")

    if fiber >= 5:
        reasons.append("high fiber")

    if calories <= 500:
        reasons.append("balanced calories")

    if not reasons:
        reasons.append("balanced nutrition")

    return reasons


def build_meal_object(selected, meal_time, request, bmi):
    return {
        "name": selected["name"],
        "mealTime": meal_time,
        "dietType": selected["dietType"],
        "calories": int(selected["calories"]),
        "protein": float(selected["protein"]),
        "carbs": float(selected["carbs"]),
        "fat": float(selected["fat"]),
        "fiber": float(selected["fiber"]),
        "sugar": float(selected["sugar"]),
        "sodium": float(selected["sodium"]),
        "ml_score": round(float(selected["ml_score"]), 2),
        "preference_score": round(float(selected["preference_score"]), 2),
        "final_score": round(float(selected["final_score"]), 2),
        "reasons": explain_meal(selected, request.diagnosis, bmi),
    }


@app.get("/")
def home():
    return {
        "message": "Omnifood AI Personalized ML Server running",
        "model": "RandomForestRegressor",
        "output": "personalized meal recommendation score",
    }


@app.post("/generate-plan")
def generate_plan(request: MealPlanRequest):
    df = meals_df.copy().dropna()

    bmi = calculate_bmi(request.height_cm, request.weight_kg)
    category = bmi_category(bmi)

    df["ml_score"] = df.apply(
        lambda meal: predict_personalized_score(meal, request, bmi),
        axis=1,
    )

    df["preference_score"] = df.apply(
        lambda meal: preference_boost(
            meal,
            request.likes,
            request.dislikes,
            request.diet,
        ),
        axis=1,
    )

    df["final_score"] = df["ml_score"] + df["preference_score"]

    df = df.sort_values(by="final_score", ascending=False)

    days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ]

    meal_times = ["Breakfast", "Lunch", "Dinner"]
    selected_meal_times = meal_times[: max(1, min(request.mealsPerDay, 3))]

    weekly_plan = []
    used_meals = set()

    for day_index, day in enumerate(days):
        day_meals = []

        for meal_time in selected_meal_times:
            filtered = df[
                df["mealTime"].astype(str).str.lower() == meal_time.lower()
            ]

            if filtered.empty:
                filtered = df

            top_meals = filtered.sort_values(
                by="final_score",
                ascending=False,
            ).head(30)

            selected = None

            # 10% exploration: like Netflix/Zomato/Spotify discovery
            if random.random() < 0.10 and len(filtered) > 0:
                exploration_pool = filtered.sample(
                    n=min(10, len(filtered)),
                    random_state=None,
                )

                for _, row in exploration_pool.iterrows():
                    if row["name"] not in used_meals:
                        selected = row
                        break

            # ML-ranked + diversity + weighted selection
            if selected is None:
                diverse_candidates = []

                for _, row in top_meals.iterrows():
                    if row["name"] not in used_meals:
                        diverse_candidates.append(row)

                if diverse_candidates:
                    weights = [
                        max(float(row["final_score"]), 1)
                        for row in diverse_candidates
                    ]

                    selected = random.choices(
                        diverse_candidates,
                        weights=weights,
                        k=1,
                    )[0]
                else:
                    selected = top_meals.iloc[0]

            used_meals.add(selected["name"])

            day_meals.append(
                build_meal_object(
                    selected,
                    meal_time,
                    request,
                    bmi,
                )
            )

        weekly_plan.append(
            {
                "day": day,
                "dayNumber": day_index + 1,
                "meals": day_meals,
            }
        )

    all_meals = []

    for day in weekly_plan:
        for meal in day["meals"]:
            all_meals.append(
                {
                    **meal,
                    "day": day["day"],
                    "dayNumber": day["dayNumber"],
                }
            )

    return {
        "diet": request.diet,
        "city": request.city,
        "mealsPerDay": request.mealsPerDay,
        "userProfile": {
            "age": request.age,
            "height_cm": request.height_cm,
            "weight_kg": request.weight_kg,
            "diagnosis": request.diagnosis,
            "bmi": bmi,
            "bmi_category": category,
        },
        "totalMeals": len(all_meals),
        "recommendationStrategy": {
            "ranking": "ML personalized score",
            "diversity": "avoids repeated meals across week",
            "exploration": "10% discovery selection",
            "selection": "weighted by final_score",
        },
        "weeklyPlan": weekly_plan,
        "meals": all_meals,
    }