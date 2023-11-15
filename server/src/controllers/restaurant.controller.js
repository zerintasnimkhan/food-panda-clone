const { addRestaurant, getAllRestaurants, getRestaurantById } = require("../models/restaurant.model");

module.exports.createRestaurant = async (req, res) => {
  try {
    console.log(req.body);
    const { name, address, location, categories, ownerId, food, peakTime } =
      req.body;

    //const ownerId = "666497527f30696b59564baf";

    if (!name || !address || !location || !categories || !ownerId || !food) {
      return res.status(400).json();
    }
    const data = {
      name,
      address,
      location,
      categories,
      ownerId,
      food,
      peakTime,
    };

    const savedRestaurant = await addRestaurant(data);

    res.status(201).json({ message: "Restaurant added", restaurant: savedRestaurant });
  } catch (error) {
    console.error(error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Server error" });
  }
};

module.exports.fetchAllRestaurants = async (_req, res) => {
  try {
    const restaurants = await getAllRestaurants();
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports.fetchRestaurantById = async (req, res) => {
  try {
    const restaurant = await getRestaurantById(req.params.id);
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports.updateOrder = async (req, res) => {
  try {
    const updatedata = req.body;
    const updatedOrder = await updateOrderbyId(req.params.id, updatedata);

    if (!updatedOrder) {
      return rs.status(404).json({ errror: "Order not found" });
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
