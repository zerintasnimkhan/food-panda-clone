const { Schema, model } = require('mongoose');

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
    required: true 
  },
  
  city: 
  { type: String, 
    required: true 
  },
  
  district: 
  { type: String, 
    required: true 
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
});

 const AddressModel = model("address", AddressSchema);

module.exports.getAllAddress = () => AddressModel.find();
module.exports.getAddressById=(userId)=>AddressModel.findById(userId);
module.exports. updateAddressById = (userId) => AddressModel.findByIdAndUpdate(userId);
module.exports. deleteAddressById = (userId) => AddressModel.findByIdAndDelete(userId);
 addAddress = (userId,name,street,city,district,location) =>
AddressModel.create(userId,name,street,city,district,location);