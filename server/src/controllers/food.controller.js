const { addFood, getAllFood } = require("../models/food.model");

module.exports.fetchAllFood = async (_req, res) => {
  try {
    const food = await getAllFood();
    res.status(200).json(food);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports.getFoodById = async (req, res) => {
  try {
    const food = await FoodModel.findById(req.params.id);
    res.status(200).json(food);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports.updateFoodById = async (req, res) => {
  try {
    const foodId = req.params.id;

    const updatedFood = await FoodModel.findByIdAndUpdate(foodId);

    if (!updatedFood) {
      return res.status(404).json({ error: "Food not found" });
    }

    return res.json(updatedFood);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports.deleteFoodById = async (req, res) => {
  try {
    const foodId = req.params.id;
    const deletedFood = await FoodModel.findByIdAndDelete(foodId);
    if (!deletedFood) {
      return res.status(404).json({ error: "Food not found" });
    }
    return res.json(deletedFood);
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
