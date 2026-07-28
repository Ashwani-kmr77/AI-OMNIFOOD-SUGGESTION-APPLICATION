const mongoose = require("mongoose");

const mealPlanSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        diet: {
            type: String,
            required: true,
        },

        city: {
            type: String,
            default: "",
        },

        mealsPerDay: {
            type: Number,
            default: 3,
        },

        likes: [String],
        dislikes: [String],

        meals: [
            {
                name: String,
                calories: Number,
                protein: Number,
                carbs: Number,
                fat: Number,
                fiber: Number,
                sugar: Number,
                sodium: Number,
                dietType: String,
                mealTime: String,
                health_score: Number,
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("MealPlan", mealPlanSchema);