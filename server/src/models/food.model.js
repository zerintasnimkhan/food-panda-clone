import { model, Schema } from 'mongoose';
import { CategoryModel } from './category.model';

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