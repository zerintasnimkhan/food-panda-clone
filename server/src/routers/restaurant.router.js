const router = require("express").Router();

const restaurantController = require("../controllers/restaurant.controller");

router.post("/restaurant/add", restaurantController.createRestaurants);

module.exports = router;