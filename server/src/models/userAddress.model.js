const { model, Schema } = require("mongoose");

const AddressSchema = new Schema({
  userId: {
    type: Schema.ObjectId,
    ref: "user",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },

  street: {
    type: String,
    required: true,
  },

  city: { type: String, required: true },

  district: { type: String, required: true },

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
});

const AddressModel = model("address", AddressSchema);

module.exports.getAllAddress = () => AddressModel.find();
module.exports.getAddressByUserId = (userId) => AddressModel.find({ userId });
module.exports.updateAddressById = (id, data) =>
  AddressModel.findByIdAndUpdate(id, { $set: data });
module.exports.deleteAddressById = (id) => AddressModel.findByIdAndDelete(id);
module.exports.addAddress = ({
  userId,
  name,
  street,
  city,
  district,
  location,
}) => AddressModel.create({ userId, name, street, city, district, location });
