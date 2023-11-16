const { Schema, model } = require('mongoose');

const CategorySchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String
    }  
})
const CategoryModel = model("category", CategorySchema);




module.exports.getAllCategory = () => CategoryModel.find();

module.exports. getCategoryById = (_id) => CategoryModel.findById(_id);

module.exports. updateCategoryById = (_id) => CategoryModel.findByIdAndUpdate(_id);

module.exports.deleteCategoryById = (_id) => CategoryModel.findByIdAndDelete(_id);
module.exports. addCategory = (name,imageUrl) => 

CategoryModel.create(name,imageUrl);


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
