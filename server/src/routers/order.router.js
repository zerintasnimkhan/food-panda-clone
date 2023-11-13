const router = require("express").Router();

const orderController = require("../controllers/order.controller");

router.post("/order/add", orderController.addOrder);
