import { model, Schema } from "mongoose";

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

export const AddressModel = model("address", AddressSchema);
