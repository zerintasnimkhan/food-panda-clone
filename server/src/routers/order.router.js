
const orderController = require("../controllers/order.controller");

router.post("/add", orderController.createOrder);
router.get("/all", orderController.fetchAllOrders);
router.get("/fetch/:id", orderController.fetchOrderById);
router.patch("/update/:id", orderController.updateOrder);
router.delete("/remove/:id", orderController.removeOrder);

module.exports = router;
