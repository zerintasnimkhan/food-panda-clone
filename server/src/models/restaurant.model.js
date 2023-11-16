const { Schema, model } = require('mongoose');

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

 const RestaurantModel = model("restaurant", RestaurantSchema);



module.exports.getAllRestaurant = () => RestaurantModel.find();

module.exports. getRestaurantByCategory = (category) => RestaurantModel.find({ category });

module.exports.addRestaurants = (name, address, location, categories, ownerId, food, peakTime) => 
RestaurantModel.create(name, address, location, categories, ownerId, food, peakTime);
