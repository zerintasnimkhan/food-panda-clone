const router = require("express").Router();

const foodController = require("../controllers/food.controller");

router.post("/add", foodController.createFood);
router.get("/all", foodController.fetchAllFood);
router.get("/fetch/:id", foodController.fetchFoodById);
router.delete("/remove/:id", foodController.removeFoodById);
router.patch("/update/:id", foodController.updateById);

module.exports = router;
