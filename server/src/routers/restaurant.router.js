const router = require("express").Router();

const restaurantController = require("../controllers/restaurant.controller");

router.post("/add", restaurantController.createRestaurant);
router.get("/all", restaurantController.fetchAllRestaurants);
router.get("/fetch/:id", restaurantController.fetchRestaurantById);


module.exports = router;
