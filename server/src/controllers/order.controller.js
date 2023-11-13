const OrderModel = require("../models/order.model");

module.exports.addOrder = async (_req, res) => {
  const { userId, restaurantId, items, totalPrice, addressId, status } =
    req.body;
  try {
    console.log(req.body);
    const newOrder = new Order({
      userId,
      restaurantId,
      items,
      totalPrice,
      addressId,
      status,
    });
    const savedOrder = await newOrder.save();
    res.status(201).json({ message: "Order Placed", order: savedOrder });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};
