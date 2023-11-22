const { Schema, model, mongoose } = require('mongoose');


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

module.exports.updateFoodById = (_id, data) => FoodModel.findByIdAndUpdate(_id, { $set: data });

module.exports.deleteFoodById = (_id) => FoodModel.findByIdAndDelete(_id);



module.exports.addFood = ({name,imageUrl,price,category,prepareTime,servingSize,packageSize}) =>

FoodModel.create({name,imageUrl,price,category,prepareTime,servingSize,packageSize});


module.exports.getFoodInfo = (id) => {
  const pipeline = [
    {
      $match: {
        _id: new mongoose.Types.ObjectId(id),
      }
    },
    {
      $unwind: "$category"
    },
    {
      $lookup: {
        from: "categories",
        foreignField: "_id",
        localField: "category",
        as: "category",
      },
    },
    {
      $group: {
        _id: {
          _id: "$_id",
          name: "$name",
          price: "$price",
          servingSize: "$servingSize",
          prepareTime: "$prepareTime",
          packageSize: "$packageSize",
          imageUrl: "$imageUrl",
        },
        category: { $push: "$category"}
      }
    },
    {
      $project: {
        _id: "$_id._id",
        name: "$_id.name",
        price: "$_id.price",
        servingSize: "$_id.servingSize",
        prepareTime: "$_id.prepareTime",
        packageSize: "$_id.packageSize",
        imageUrl: "$_id.imageUrl",
        category: 1
      }
    }
  ]

  return FoodModel.aggregate(pipeline);
}