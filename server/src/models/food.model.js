const { model, Schema } = require("mongoose");

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

module.exports.getFoodById = (id) => FoodModel.findById(id);

module.exports.updateFoodById = (id, updatedata) =>
  FoodModel.findByIdAndUpdate(id, updatedata, {
    new: true,
    runValidators: true,
  });

module.exports.deleteFoodById = (id) => FoodModel.findByIdAndDelete(id);

module.exports.addFood = ({
  name,
  imageUrl,
  price,
  category,
  prepareTime,
  servingSize,
  packageSize,
}) =>
  FoodModel.create({
    name,
    imageUrl,
    price,
    category,
    prepareTime,
    servingSize,
    packageSize,
  });
