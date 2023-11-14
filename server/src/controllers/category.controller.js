const CategoryModel = require("../models/category.model");

module.exports.addCategory = async (req, res) => {
  try {
    const { name, imageUrl } = req.body;

    if (!name) {
      return res.status(400).json();
    }
    const newCategory = new CategoryModel({ name, imageUrl });
    await newCategory.save();
    return res.status(201).json({ message: 'Category added successfully', category: newCategory });
 
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports.getAllCategory = async (req, res) => {
  try {
    const categories = await CategoryModel.find({});
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports.getCategoryById = async (req, res) => {
  try {
    const category = await CategoryModel.findById(req.params.id);
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports.updateCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.id;


    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      categoryId,
    );

    if (!updatedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    return res.json(updatedCategory);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.deleteCategoryById = async (req, res) => {

    try{
        const categoryId = req.params.id;
        const deletedCategory = await CategoryModel.findByIdAndDelete(categoryId);
        if(!deletedCategory){
            return res.status(404).json({error:"Category not found"});
        }
        return res.json(deletedCategory);
    }
    catch(error){
        console.error(error);
        return res.status(500).json({error:"Internal Server Error"});
    }
}
