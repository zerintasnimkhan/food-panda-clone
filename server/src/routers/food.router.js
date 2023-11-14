const router = require("express").Router();

const foodController = require("../controllers/food.controller");

router.post("/food/add", foodController.addFood);

module.exports = router;