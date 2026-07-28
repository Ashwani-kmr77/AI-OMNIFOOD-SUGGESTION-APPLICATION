import { useEffect, useState } from "react";
import api from "../api/api";

function MyPlans() {
    const [plans, setPlans] = useState([]);

    const fetchPlans = async () => {
        try {
            const res = await api.get("/plans/my-plans");
            setPlans(res.data.plans);
        } catch (error) {
            alert(error.response?.data?.message || "Error fetching plans");
        }
    };

    const deletePlan = async (id) => {
        try {
            await api.delete(`/plans/${id}`);
            fetchPlans();
        } catch (error) {
            alert(error.response?.data?.message || "Delete failed");
        }
    };

    useEffect(() => {
        fetchPlans();
    }, []);

    return (
        <section className="page">
            <span className="badge">Saved Plans</span>
            <h1>My Meal Plans</h1>

            {plans.length === 0 && (
                <div className="empty">
                    <h2>No saved plans yet</h2>
                    <p>Generate and save your first plan.</p>
                </div>
            )}

            {plans.map((plan) => (
                <div className="saved" key={plan._id}>
                    <div className="result-head">
                        <div>
                            <h2>{plan.diet} Plan</h2>
                            <p>{plan.city} • {plan.mealsPerDay} meals/day</p>
                        </div>

                        <button className="btn danger" onClick={() => deletePlan(plan._id)}>
                            Delete
                        </button>
                    </div>

                    <div className="meal-grid">
                        {plan.meals.map((meal, index) => (
                            <div className="meal-card" key={index}>
                                <span>{meal.mealTime}</span>
                                <h3>{meal.name}</h3>
                                <p>{meal.dietType}</p>
                                <div>
                                    <b>{meal.calories} kcal</b>
                                    <b>{meal.protein}g protein</b>
                                    <b>Score {meal.health_score}</b>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </section>
    );
}

export default MyPlans;