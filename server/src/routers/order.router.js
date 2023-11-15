const router = require("express").Router();

const orderController = require("../controllers/order.controller");

router.post("/add", orderController.createOrder);
router.get("/all", orderController.fetchAllOrders);

module.exports = router;
