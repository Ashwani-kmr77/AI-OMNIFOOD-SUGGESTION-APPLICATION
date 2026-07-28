const express = require("express");

const {
    generateMealPlan,
    saveMealPlan,
    getMyPlans,
    deletePlan,
} = require("../controllers/planController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/generate", generateMealPlan);
router.post("/save", protect, saveMealPlan);
router.get("/my-plans", protect, getMyPlans);
router.delete("/:id", protect, deletePlan);

module.exports = router;