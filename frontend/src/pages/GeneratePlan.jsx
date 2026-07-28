import { useState } from "react";
import api from "../api/api";

function GeneratePlan() {
    const [form, setForm] = useState({
        diet: "vegetarian",
        likes: "",
        dislikes: "",
        city: "Delhi",
        mealsPerDay: 3,
        age: "",
        height_cm: "",
        weight_kg: "",
        diagnosis: "none",
    });

    const [plan, setPlan] = useState(null);
    const [loading, setLoading] = useState(false);

    const today = new Date();

    const getDateForDay = (index) => {
        const date = new Date(today);
        date.setDate(today.getDate() + index);

        return date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const generatePlan = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const payload = {
                diet: form.diet,
                likes: form.likes.split(",").map((x) => x.trim()).filter(Boolean),
                dislikes: form.dislikes.split(",").map((x) => x.trim()).filter(Boolean),
                city: form.city,
                mealsPerDay: Number(form.mealsPerDay),
                age: Number(form.age),
                height_cm: Number(form.height_cm),
                weight_kg: Number(form.weight_kg),
                diagnosis: form.diagnosis,
            };

            const res = await api.post("/plans/generate", payload);
            setPlan(res.data.plan);
        } catch (error) {
            alert(error.response?.data?.message || "Error generating meal plan");
        } finally {
            setLoading(false);
        }
    };

    const savePlan = async () => {
        try {
            await api.post("/plans/save", {
                diet: plan.diet,
                likes: plan.likes,
                dislikes: plan.dislikes,
                city: plan.city,
                mealsPerDay: plan.mealsPerDay,
                meals: plan.meals,
                weeklyPlan: plan.weeklyPlan,
                userProfile: plan.userProfile,
            });

            alert("Plan saved successfully");
        } catch (error) {
            alert(error.response?.data?.message || "Save failed");
        }
    };

    return (
        <section className="page">
            <span className="badge">AI Weekly Generator</span>
            <h1>Generate Personalized Weekly Meal Plan</h1>

            <form className="planner" onSubmit={generatePlan}>
                <div>
                    <label>Diet</label>
                    <select name="diet" value={form.diet} onChange={handleChange}>
                        <option value="vegetarian">Vegetarian</option>
                        <option value="vegan">Vegan</option>
                        <option value="high-protein">High Protein</option>
                        <option value="keto">Keto</option>
                        <option value="paleo">Paleo</option>
                    </select>
                </div>

                <div>
                    <label>Likes</label>
                    <input
                        name="likes"
                        placeholder="oats, paneer, salad"
                        value={form.likes}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Dislikes</label>
                    <input
                        name="dislikes"
                        placeholder="burger, fries"
                        value={form.dislikes}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>City</label>
                    <input
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Meals Per Day</label>
                    <select
                        name="mealsPerDay"
                        value={form.mealsPerDay}
                        onChange={handleChange}
                    >
                        <option value="1">Breakfast only</option>
                        <option value="2">Breakfast + Lunch</option>
                        <option value="3">Breakfast + Lunch + Dinner</option>
                    </select>
                </div>

                <div>
                    <label>Age</label>
                    <input
                        name="age"
                        type="number"
                        placeholder="Example: 22"
                        value={form.age}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Height cm</label>
                    <input
                        name="height_cm"
                        type="number"
                        placeholder="Example: 170"
                        value={form.height_cm}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Weight kg</label>
                    <input
                        name="weight_kg"
                        type="number"
                        placeholder="Example: 70"
                        value={form.weight_kg}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Diagnosis</label>
                    <select
                        name="diagnosis"
                        value={form.diagnosis}
                        onChange={handleChange}
                    >
                        <option value="none">None</option>
                        <option value="diabetes">Diabetes</option>
                        <option value="bp">High BP</option>
                        <option value="heart">Heart Disease</option>
                        <option value="obesity">Obesity</option>
                    </select>
                </div>

                <button className="btn primary full" disabled={loading}>
                    {loading ? "Generating..." : "Generate Weekly Plan"}
                </button>
            </form>

            {plan && (
                <div className="result">
                    <div className="result-head">
                        <div>
                            <h2>Your 7-Day Personalized Meal Plan</h2>
                            <p>
                                {plan.city} • {plan.diet} • Total meals: {plan.totalMeals}
                            </p>
                        </div>

                        <button className="btn primary" onClick={savePlan}>
                            Save Plan
                        </button>
                    </div>

                    {plan.userProfile && (
                        <div className="profile-summary">
                            <h3>User Health Profile</h3>
                            <p>Age: {plan.userProfile.age}</p>
                            <p>Height: {plan.userProfile.height_cm} cm</p>
                            <p>Weight: {plan.userProfile.weight_kg} kg</p>
                            <p>BMI: {plan.userProfile.bmi}</p>
                            <p>Category: {plan.userProfile.bmi_category}</p>
                            <p>Diagnosis: {plan.userProfile.diagnosis}</p>
                        </div>
                    )}

                    <div className="weekly-plan-grid">
                        {plan.weeklyPlan?.map((dayPlan, index) => (
                            <div className="day-card" key={dayPlan.day}>
                                <div className="day-header">
                                    <div>
                                        <h3>{dayPlan.day}</h3>
                                        <p>{getDateForDay(index)}</p>
                                    </div>

                                    <span>Day {dayPlan.dayNumber}</span>
                                </div>

                                <div className="day-meals">
                                    {dayPlan.meals.map((meal, mealIndex) => (
                                        <div className="day-meal-card" key={mealIndex}>
                                            <span className="meal-time">{meal.mealTime}</span>

                                            <h4>{meal.name}</h4>
                                            <p>{meal.dietType}</p>

                                            <div className="meal-info">
                                                <b>{meal.calories} kcal</b>
                                                <b>{meal.protein}g protein</b>
                                                <b>ML Score {meal.ml_score}</b>
                                                <b>Final Score {meal.final_score}</b>
                                            </div>

                                            {meal.reasons && meal.reasons.length > 0 && (
                                                <div className="reason-list">
                                                    {meal.reasons.map((reason, i) => (
                                                        <small key={i}>✓ {reason}</small>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
}

export default GeneratePlan;