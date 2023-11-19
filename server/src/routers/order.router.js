const router = require("express").Router();
const orderController = require("../controllers/order.controller");

router.post("/add", orderController.addOrder);
router.get("/all", orderController.fetchAllOrders);
router.get("/fetch/:id", orderController.fetchOrderById);
router.patch("/update/:id", orderController.updateOrder);
router.delete("/remove/:id", orderController.removeOrder);
router.get(
  "/restaurant/:restaurantId",
  orderController.fetchOrdersByRestaurant
);

module.exports = router;
