import {model,Schema} from 'mongoose';

const CategorySchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String
    }  
})
export const CategoryModel = model("category", CategorySchema);




export const getAllCategory = () => CategoryModel.find();

export const getCategoryById = (_id) => CategoryModel.findById(_id);

export const updateCategoryById = (_id) => CategoryModel.findByIdAndUpdate(_id);

export const deleteCategoryById = (_id) => CategoryModel.findByIdAndDelete(_id);

export const addCategory = (name,imageUrl) => 
CategoryModel.create(name,imageUrl);






