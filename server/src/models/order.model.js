const { Schema, model, mongoose } = require("mongoose");

const OrderSchema = new Schema({
  userId: {
    type: Schema.ObjectId,
    ref: "user",
    required: true,
  },
  restaurantId: {
    type: Schema.ObjectId,
    ref: "restaurant",
    required: true,
  },
  items: [
    {
      foodId: {
        type: Schema.ObjectId,
        ref: "food",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      note: {
        type: String,
        required: false,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  addressId: {
    type: Schema.ObjectId,
    ref: "address",
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["pending", "preparing", "completed"],
  },
});

const OrderModel = model("order", OrderSchema);

module.exports.updateOrderbyId = (id, values) =>
  OrderModel.findByIdAndUpdate(id, { $set: values });

module.exports.deleteOrderbyId = (id) => OrderModel.findByIdAndDelete(id);

module.exports.createOrder = ({
  userId,
  restaurantId,
  items,
  totalPrice,
  addressId,
  status,
}) =>
  OrderModel.create({
    userId,
    restaurantId,
    items,
    totalPrice,
    addressId,
    status,
  });

module.exports.updateOrderbyUserId = (userId, values) =>
  OrderModel.findByIdAndUpdate(userId, values);

module.exports.getAllOrders = () => OrderModel.find();

module.exports.getOrdersByRestaurantId = (restaurantId) => {
  const pipeline = [
    {
      $match: {
        restaurantId: new mongoose.Types.ObjectId(restaurantId)
      },
    },
    {
      $lookup: {
        from: "users",
        foreignField: "_id",
        localField: "userId",
        as: "user"
      }
    },
    {
      $unwind: "$user",
    },
    {
      $unwind: "$items",
    },
    {
      $lookup: {
        from: "foods",
        foreignField: "_id",
        localField: "items.foodId",
        as: "items.foodInfo"
      }
    },
    {
      $unwind: '$items.foodInfo'
    },
    {
      $group: {
        _id:
        {
          _id: '$_id',
          userId: '$userId',
          restaurantId: '$restaurantId',
          totalPrice: '$totalPrice',
          address: '$address',
          status: '$status',
          user: '$user'
        },
        items: { $push: '$items' },
      }
    },
    {
      $project: {
        _id: '$_id._id',
        userId: '$_id.userId',
        restaurantId: '$_id.restaurantId',
        totalPrice: '$_id.totalPrice',
        address: '$_id.address',
        status: '$_id.status',
        user: '$_id.user',
        items: 1
      }
    }
  ]
  return OrderModel.aggregate(pipeline);
}
  

module.exports.getAllOrdersForUser = (userId) => OrderModel.find({ userId });

module.exports.deleteOrderById = (id) => OrderModel.findByIdAndDelete(id);


