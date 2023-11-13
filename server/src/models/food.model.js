import { model, Schema } from 'mongoose';


const FoodSchema = new Schema({
   
    name:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    category:{type: [
        {
            type: Schema.Types.ObjectId, 
            ref: 'category'
        }
    ], 
    required: true
},
    
    
    prepareTime:{
        peakTime:{
            type:Number,
            required:true,
        },
        offPeakTime:{
            type:Number,
            required:true,
        }
    },

    servingSize:{type:String, required:true},
    
    packageSize:{type:String, required:true},

    

});
export const FoodModel = model("food", FoodSchema);


export const getAllFood = () => FoodModel.find();

export const getFoodById = (_id) => FoodModel.findById(_id);

export const updateFoodById = (_id) => FoodModel.findByIdAndUpdate(_id);

export const deleteFoodById = (_id) => FoodModel.findByIdAndDelete(_id);



export const addFood = (name,imageUrl,price,category,prepareTime,servingSize,packageSize) =>

FoodModel.create(name,imageUrl,price,category,prepareTime,servingSize,packageSize);