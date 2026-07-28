import os
import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, r2_score

DATA_PATH = "data/meal_dataset_user_profile.csv"
MODEL_PATH = "models/personalized_meal_model.joblib"

os.makedirs("models", exist_ok=True)

df = pd.read_csv(DATA_PATH)

required_columns = [
    "name",
    "calories",
    "protein",
    "carbs",
    "fat",
    "fiber",
    "sugar",
    "sodium",
    "dietType",
    "mealTime",
    "age",
    "height_cm",
    "weight_kg",
    "bmi",
    "diagnosis",
    "personalized_score",
]

missing = [col for col in required_columns if col not in df.columns]

if missing:
    raise ValueError(f"Missing columns: {missing}")

df = df.dropna()

features = [
    "calories",
    "protein",
    "carbs",
    "fat",
    "fiber",
    "sugar",
    "sodium",
    "dietType",
    "mealTime",
    "age",
    "height_cm",
    "weight_kg",
    "bmi",
    "diagnosis",
]

target = "personalized_score"

X = df[features]
y = df[target]

numeric_features = [
    "calories",
    "protein",
    "carbs",
    "fat",
    "fiber",
    "sugar",
    "sodium",
    "age",
    "height_cm",
    "weight_kg",
    "bmi",
]

categorical_features = [
    "dietType",
    "mealTime",
    "diagnosis",
]

preprocessor = ColumnTransformer(
    transformers=[
        ("num", StandardScaler(), numeric_features),
        ("cat", OneHotEncoder(handle_unknown="ignore"), categorical_features),
    ]
)

model = RandomForestRegressor(
    n_estimators=250,
    max_depth=10,
    random_state=42
)

pipeline = Pipeline(
    steps=[
        ("preprocessor", preprocessor),
        ("model", model),
    ]
)

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

pipeline.fit(X_train, y_train)

predictions = pipeline.predict(X_test)

print("MAE:", mean_absolute_error(y_test, predictions))
print("R2 Score:", r2_score(y_test, predictions))

joblib.dump(pipeline, MODEL_PATH)

print(f"Model saved at {MODEL_PATH}")