const { Schema, model, mongoose } = require("mongoose");

const RestaurantSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
  },
  location: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
  },
  categories: {
    type: [{ type: Schema.ObjectId, ref: "category" }],
    required: true,
  },
  ownerId: {
    type: Schema.ObjectId,
    ref: "user",
    required: false,
  },
  food: {
    type: [{ type: Schema.ObjectId, ref: "food" }],
    required: true,
  },
  peakTime: {
    start: { type: Date },
    end: { type: Date },
  },
  imgUrl: {
    type: String,
  },
});

const RestaurantModel = model("restaurant", RestaurantSchema);

module.exports.getAllRestaurants = () => RestaurantModel.find();

module.exports.getRestaurantById = (id) => RestaurantModel.findById(id);

module.exports.getRestaurantByCategory = (category) =>
  RestaurantModel.find({ category });

module.exports.addRestaurant = ({
  name,
  address,
  location,
  categories,
  ownerId,
  food,
  peakTime,
  imgUrl,
}) =>
  RestaurantModel.create({
    name,
    address,
    location,
    categories,
    ownerId,
    food,
    peakTime,
    imgUrl,
  });

module.exports.getRestaurantByOwnerId = (ownerId) => {

  const pipeline = [
    {
      $match: { ownerId: new mongoose.Types.ObjectId(ownerId) }
    },
    {
      $unwind: "$categories"
    },
    {
      $lookup: {
        from: "categories",
        foreignField: "_id",
        localField: "categories",
        as: "categories"
      }
    },
    {
      $unwind: "$categories"
    },
    {
      $group: {
        _id: {
          _id: "$_id",
          name: "$name",
          address: "$address",
          location: "$location",
          ownerId: "$ownerId",
          food: "$food ",
          imgUrl: "$imgUrl",
        },
        categories: { $push: '$categories' }
      }
    },
    {
      $project: {
        _id: "$_id._id",
        name: "$_id.name",
        address: "$_id.address",
        location: "$_id.location",
        ownerId: "$_id.ownerId",
        food: "$_id.food ",
        imgUrl: "$_id.imgUrl",
        categories: 1
      }
    }
  ]

  return RestaurantModel.aggregate(pipeline);
};

module.exports.getRestaurantFood = (restaurantId) => {
  const pipeline = [
    {
      $match: { _id: new mongoose.Types.ObjectId(restaurantId) },
    },
    {
      $unwind: "$food",
    },
    {
      $lookup: {
        from: "foods",
        foreignField: "_id",
        localField: "food",
        as: "foodInfo",
      },
    },
    {
      $unwind: "$foodInfo",
    },
    {
      $project: {
        foodId: "$foodInfo._id",
        name: "$foodInfo.name",
        imgUrl: "$foodInfo.imgUrl",
        price: "$foodInfo.price",
        category: "$foodInfo.category",
        prepareTime: "$foodInfo.prepareTime",
        servingSize: "$foodInfo.servingSize",
        imageUrl: "$foodInfo.imageUrl",
      },
    },
    {
      $lookup: {
        from: "categories",
        foreignField: "_id",
        localField: "category",
        as: "category",
      },
    },
  ];

  return RestaurantModel.aggregate(pipeline);
};


module.exports.updateRestaurantInfoById = (id, data) => RestaurantModel.findByIdAndUpdate(id, { $set: data });
module.exports.removeFoodIdFromRestaurant = (id, foodId) => RestaurantModel.findOneAndUpdate(id,  { $pull: { food: foodId }}, { new: true });