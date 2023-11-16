const {
  addFood,
  getAllFood,
  deleteFoodById,
  getFoodById,
  updateFoodById,
} = require("../models/food.model");

module.exports.fetchAllFood = async (_req, res) => {
  try {
    const food = await getAllFood();
    res.status(200).json(food);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports.fetchFoodById = async (req, res) => {
  try {
    const food = await getFoodById(req.params.id);
    res.status(200).json(food);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports.updateById = async (req, res) => {
  try {
    const foodId = req.params.id;
    const food = await getFoodById(foodId);
    if (!food) {
      return res.status(404).json({ errror: "Food not found" });
    }

    const updatedata = req.body;
    const updatedFood = await updateFoodById(req.params.id, updatedata);

    res.status(200).json(updatedFood);
  } catch (error) {
    console.error(error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.removeFoodById = async (req, res) => {
  try {
    const foodId = req.params.id;
    const food = await getFoodById(foodId);
    if (!food) {
      return res.status(404).json({ msg: "No food found." });
    }
    await deleteFoodById(foodId);
    return res.status(204).json({ msg: "success" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.createFood = async (req, res) => {
  try {
    console.log(req.body);
    const {
      name,
      imageUrl,
      price,
      category,
      prepareTime,
      servingSize,
      packageSize,
    } = req.body;

    if (
      !name ||
      !price ||
      !category ||
      !prepareTime ||
      !servingSize ||
      !packageSize
    ) {
      return res.status(400).json();
    }
    const data = {
      name,
      imageUrl,
      price,
      category,
      prepareTime,
      servingSize,
      packageSize,
    };

    const savedFood = await addFood(data);

    res.status(201).json({ message: "Food added", food: savedFood });
  } catch (error) {
    console.error(error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Server error" });
  }
};
