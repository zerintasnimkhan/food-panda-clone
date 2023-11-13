import { model, Schema } from 'mongoose';

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
            }
            
      },
      location: {
            lat: {
                  type: Number,
                  required: true,
            },
            lng: {
                  type: Number,
                  required: true,
            }
      },
      categories: {
            type: [{ type: Schema.ObjectId, ref: "category"}],
            required: true, 
      },
      ownerId: {
            type: Schema.ObjectId,
            ref: 'user',
            required: false,
      },
      food: {
            type: [{ type: Schema.ObjectId, ref: "food"}],
            required: true,
      },
      peakTime: {
            start: {type: Date},
            end: {type: Date},
      }

})

export const RestaurantModel = model("restaurant", RestaurantSchema);