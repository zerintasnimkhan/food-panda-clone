const {
  addRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurantInfoById,
  deleteRestaurantById,
  getRestaurantByOwnerId,
  getRestaurantFood,
} = require("../models/restaurant.model");

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
      imgUrl: "",
    };

    const savedRestaurant = await addRestaurant(data);

    res
      .status(201)
      .json({ message: "Restaurant added", restaurant: savedRestaurant });
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
    console.log(restaurants);
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ error: error });
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

module.exports.removeRestaurant = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    const restaurant = await getRestaurantById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ msg: "No restaurant found." });
    }
    await deleteRestaurantById(restaurantId);
    return res.status(204).json({ msg: "success" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.fetchRestaurantByOwnerId = async (req, res) => {
  try {
    const user = req.user;
    const ownerId = user._id;
    const restaurant = await getRestaurantByOwnerId(ownerId);
    return res.status(200).json(restaurant);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.fetchRestaurantFoods = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    const food = await getRestaurantFood(restaurantId);
    return res.status(200).json(food);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports.updateRestaurantById = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    const data = req.body;
    const ownerId = req.user._id;

    const restaurant = await getRestaurantById(restaurantId);
    if (!restaurant || !restaurant.ownerId.equals(ownerId)) {
      return res.status(403).json({ message: 'You are not the owner of this restaurant.'});
    }

    await updateRestaurantInfoById(restaurantId, data);
    const updatedRestaurant = await getRestaurantById(restaurant._id);
    return res.status(200).json(updatedRestaurant);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};