const axios = require("axios");
const MealPlan = require("../models/MealPlan");

const generateMealPlan = async (req, res) => {
    try {
        const {
            diet,
            likes,
            dislikes,
            city,
            mealsPerDay,
            age,
            height_cm,
            weight_kg,
            diagnosis,
        } = req.body;

        if (!diet || !mealsPerDay || !age || !height_cm || !weight_kg) {
            return res.status(400).json({
                message: "Diet, mealsPerDay, age, height and weight are required",
            });
        }

        const mlUrl = `${process.env.ML_SERVICE_URL}/generate-plan`;

        const mlResponse = await axios.post(mlUrl, {
            diet,
            likes: likes || [],
            dislikes: dislikes || [],
            city: city || "",
            mealsPerDay: Number(mealsPerDay),
            age: Number(age),
            height_cm: Number(height_cm),
            weight_kg: Number(weight_kg),
            diagnosis: diagnosis || "none",
        });

        res.status(200).json({
            message: "Personalized meal plan generated successfully",
            plan: mlResponse.data,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error generating meal plan. Check backend and ML server.",
            error: error.response?.data || error.message,
        });
    }
};

const saveMealPlan = async (req, res) => {
    try {
        const {
            diet,
            likes,
            dislikes,
            city,
            mealsPerDay,
            meals,
            weeklyPlan,
            userProfile,
        } = req.body;

        const plan = await MealPlan.create({
            user: req.user._id,
            diet,
            likes,
            dislikes,
            city,
            mealsPerDay,
            meals,
            weeklyPlan,
            userProfile,
        });

        res.status(201).json({
            message: "Meal plan saved successfully",
            plan,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error saving meal plan",
            error: error.message,
        });
    }
};

const getMyPlans = async (req, res) => {
    try {
        const plans = await MealPlan.find({ user: req.user._id }).sort({
            createdAt: -1,
        });

        res.status(200).json({
            count: plans.length,
            plans,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching meal plans",
            error: error.message,
        });
    }
};

const deletePlan = async (req, res) => {
    try {
        const plan = await MealPlan.findOne({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!plan) {
            return res.status(404).json({
                message: "Plan not found",
            });
        }

        await plan.deleteOne();

        res.status(200).json({
            message: "Plan deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting plan",
            error: error.message,
        });
    }
};

module.exports = {
    generateMealPlan,
    saveMealPlan,
    getMyPlans,
    deletePlan,
};