const { model, Schema } = require("mongoose");

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

module.exports.addOrder = ({
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

module.exports.updateOrderbyId = (id, values) =>
  OrderModel.findByIdAndUpdate(id, { $set: values });

module.exports.deleteOrderbyUserId = (d) => OrderModel.findByIdAndDelete(d);

module.exports.getAllOrders = () => OrderModel.find();

module.exports.getAllOrdersForRestaurant = (restaurantId) =>
  OrderModel.find({ restaurantId });
module.exports.getAllOrdersForUser = (userId) => OrderModel.find({ userId });
