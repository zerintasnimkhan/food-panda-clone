const router = require("express").Router();
const orderController = require("../controllers/order.controller");
const authMiddleware = require("../middlewares/auth");
const restaurantMiddleware = require("../middlewares/restaurant.middleware");

router.post("/add", orderController.addOrder);
router.get("/all", orderController.fetchAllOrders);
router.get("/fetch/:id", orderController.fetchOrderById);
router.patch("/update/:id", orderController.updateOrder);
router.delete("/remove/:id", orderController.removeOrder);
router.get("/restaurant/:restaurantId", authMiddleware, restaurantMiddleware, orderController.fetchOrdersByRestaurant);

module.exports = router;
