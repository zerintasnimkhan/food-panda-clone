const router = require("express").Router();

const restaurantController = require("../controllers/restaurant.controller");
const authMiddleware = require("../middlewares/auth");
const restaurantMiddleware = require("../middlewares/restaurant.middleware");

router.post("/add", restaurantController.createRestaurant);
router.get("/all", restaurantController.fetchAllRestaurants);
router.get("/fetch/:id", restaurantController.fetchRestaurantById);
router.get("/owner", authMiddleware, restaurantMiddleware, restaurantController.fetchRestaurantByOwnerId);
router.get("/:id/foods", restaurantController.fetchRestaurantFoods);
router.put("/edit/:id", authMiddleware, restaurantMiddleware, restaurantController.updateRestaurantById);
router.put("/:id/food/add", authMiddleware, restaurantMiddleware, restaurantController.addFoodToRestaurant);
router.delete("/:restaurantId/food/delete/:id", authMiddleware, restaurantMiddleware, restaurantController.removeFoodFromRestaurant);


module.exports = router;
