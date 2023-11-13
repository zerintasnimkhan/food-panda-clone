import { model, Schema } from 'mongoose';

const restaurantSchema = new Schema({
      name: {
            type: String,
            required: true,
      },
      address: {
            type: String,
            required: true,
      },
      location: {
            lat: {
                  type: String,
                  required: true,
            },
            lng: {
                  type: String,
                  required: true,
            }
      },
      category: {
            type: String,
            required: true, 
      },
      ownerId: {
            type: String,
            required: false,
      },
      foods: {
            type: [{ type: Schema.ObjectId, ref: "food"}],
            required: true,
      }

})

export const RestauranntModel = model("Restaurant", restaurantSchema);