const { addRestaurants } = require('../models/restaurant.model');

module.exports.createRestaurants = async (req, res) => {
      try {
      const { name, address, location, categories, ownerId, food, peakTime } = req.body;
      if(!name || !address || !location || !categories || !ownerId || !food || !peakTime) {
            return res.status(400).json();
      }
      const data = {
            name, 
            address, 
            location, 
            categories, 
            ownerId, 
            food, 
            peakTime
      };
      const newRestaurant = await addRestaurants(data);
      return res.status(201).json({success: true, restaurant: newRestaurant});
      } catch (error) {
            return res.status(500).json({ success: false, message: 'Error adding restaurant', error: error.message});

      }
};