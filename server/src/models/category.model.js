const {model,Schema} = require('mongoose');

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

module.exports.getCategoryById = (id) => CategoryModel.findById(id);

module.exports.updateCategoryById = (id) => CategoryModel.findByIdAndUpdate(id);

module.exports.deleteCategoryById = (id) => CategoryModel.findByIdAndDelete(id);

module.exports.addCategory = ({name,imageUrl}) => 
CategoryModel.create({name,imageUrl});






