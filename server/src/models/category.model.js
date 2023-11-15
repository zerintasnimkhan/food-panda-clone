const { model, Schema, mongoose } = require("mongoose");

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  imageUrl: {
    type: String,
  },
});
const CategoryModel = model("category", CategorySchema);

module.exports.getAllCategory = () => CategoryModel.find();

module.exports.getCategoryById = (id) => CategoryModel.findById(id);

module.exports.updateCategoryById = (id, updatedata) =>
  CategoryModel.findByIdAndUpdate(id, updatedata, {
    new: true,
    runValidators: true,
  });

module.exports.deleteCategoryById = (id) => CategoryModel.findByIdAndDelete(id);

module.exports.addCategory = ({ name, imageUrl }) =>
  CategoryModel.create({ name, imageUrl });
