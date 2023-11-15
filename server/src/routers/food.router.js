const router = require("express").Router();

const foodController = require("../controllers/food.controller");

router.post("/add", foodController.createFood);
router.get("/all", foodController.fetchAllFood);

module.exports = router;
