const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderbyId,
  deleteOrderById,
  getOrdersByRestaurantId,
} = require("../models/order.model");
const { getRestaurantByOwnerId, getRestaurantById } = require("../models/restaurant.model");

module.exports.addOrder = async (req, res) => {
  try {
    console.log(req.body);
    const { restaurantId, items, totalPrice, addressId, status } = req.body;

    const userId = "666497527f30696b59564baf";

    if (
      !userId ||
      !restaurantId ||
      !items ||
      !totalPrice ||
      !addressId ||
      !status
    ) {
      return res.status(400).json();
    }
    const data = {
      userId,
      restaurantId,
      items,
      totalPrice,
      addressId,
      status,
    };

    const savedOrder = await createOrder(data);

    res.status(201).json({ message: "Order placed", food: savedOrder });
  } catch (error) {
    console.error(error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Server error" });
  }
};

module.exports.fetchAllOrders = async (_req, res) => {
  try {
    const categories = await getAllOrders();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports.fetchOrderById = async (req, res) => {
  try {
    const order = await getOrderById(req.params.id);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports.updateOrder = async (req, res) => {
  try {
    const updatedata = req.body;
    const updatedOrder = await updateOrderbyId(req.params.id, updatedata);

    if (!updatedOrder) {
      return res.status(404).json({ errror: "Order not found" });
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error(error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.removeOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await getOrderById(orderId);
    if (!order) {
      return res.status(404).json({ msg: "No order found." });
    }
    await deleteOrderById(orderId);
    return res.status(204).json({ msg: "success" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.fetchOrdersByRestaurant = async (req, res) => {
  try {
    const user = req.user;
    const restaurantId = req.params.restaurantId;
    const restaurant = await getRestaurantById(restaurantId);

    if (restaurant && restaurant.ownerId.equals(user._id)) {
      const orders = await getOrdersByRestaurantId(restaurantId);
      return res.status(200).json(orders);
    } else {
      res.status(403).json({message: 'You are not the owner of this restaurant'});
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
