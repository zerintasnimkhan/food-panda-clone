const { Schema, model } = require('mongoose');


const FoodSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "category",
      },
    ],
    required: true,
  },

  prepareTime: {
    peakTime: {
      type: Number,
      required: true,
    },
    normalTime: {
      type: Number,
      required: true,
    },
  },

  servingSize: {
    type: String,
    required: true,
  },

  packageSize: {
    type: String,
    required: true,
  },
});
 const FoodModel = model("food", FoodSchema);

module.exports.getAllFood = () => FoodModel.find();

module.exports.getAllFood = () => FoodModel.find();

module.exports. getFoodById = (_id) => FoodModel.findById(_id);

module.exports. updateFoodById = (_id) => FoodModel.findByIdAndUpdate(_id);

module.exports.deleteFoodById = (_id) => FoodModel.findByIdAndDelete(_id);



module.exports.addFood = (name,imageUrl,price,category,prepareTime,servingSize,packageSize) =>

FoodModel.create(name,imageUrl,price,category,prepareTime,servingSize,packageSize);
