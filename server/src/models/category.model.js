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

