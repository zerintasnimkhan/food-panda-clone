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
  items: {
    foodId: {
      type: Schema.ObjectId,
      ref: "food",
      required: true,
    },
    Quantity: {
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

export const OrderModel = model("order", OrderSchema);

export const createOrder = (
  userId,
  restaurantId,
  items,
  totalPrice,
  addressId,
  status
) =>
  OrderModel.create(userId, restaurantId, items, totalPrice, addressId, status);

export const updateOrderbyUserId = (userId, values) =>
  OrderModel.findByIdAndUpdate(userId, values);

export const deleteOrderbyUserId = (userId) =>
  OrderModel.findByIdANdDelete(userId);

export const getAllOrders = () => OrderModel.find();
