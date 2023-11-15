const {
  addCategory,
  getAllCategory,
  getCategoryById,
  deleteCategoryById,
  updateCategoryById,
} = require("../models/category.model");
const mongoose = require("mongoose");

module.exports.createCategory = async (req, res) => {
  try {
    const { name, imageUrl } = req.body;

    if (!name) {
      return res.status(400).json();
    }
    const data = { name, imageUrl };
    const newCategory = await addCategory(data);
    return res
      .status(201)
      .json({ message: "Category added successfully", category: newCategory });
  } catch (error) {
    if (
      error.code === 11000 &&
      error.keyPattern &&
      error.keyPattern.name === 1
    ) {
      // Handle duplicate key error for the 'name' field
      return res
        .status(400)
        .json({ error: "Duplicate key error for name field" });
      // Handle accordingly (e.g., return an error response)
    } else {
      // Handle other errors
      return res.status(500).json({ error: "Unexpected error" });
      // Handle accordingly (e.g., return an error response)
    }
  }
};

module.exports.fetchAllCategory = async (_req, res) => {
  try {
    const categories = await getAllCategory();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports.fetchCategoryById = async (req, res) => {
  try {
    const category = await getCategoryById(req.params.id);
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports.updateCategory = async (req, res) => {
  try {
    const updatedata = { name: 'New Name', imageUrl: 'new-image.jpg'};
    const updatedCategory = await updateCategoryById(req.params.id, updatedata);

    if (!updatedCategory) {
      return rs.status(404).json({ errror: "Category not found" });
    }
    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error(error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.removeCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    console.log(categoryId);
    const category = await getCategoryById(categoryId);
    console.log(category);
    if (!category) {
      return res.status(404).json({ msg: "No category found." });
    }
    await deleteCategoryById(categoryId);
    return res.status(204).json({ msg: "success" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
