const { addOrder, getAllOrders } = require("../models/order.model");

module.exports.createOrder = async (req, res) => {
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

    const savedOrder = await addOrder(data);

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
    const category = await getOrderById(req.params.id);
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

