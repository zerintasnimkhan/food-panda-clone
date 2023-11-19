import React, { useEffect, useState } from 'react';
import {restaurantInfo}  from '../../services/restaurant.service';
import { useNavigate } from 'react-router-dom';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const restaurantData = await restaurantInfo();
        console.log(restaurantData);
        setRestaurants(restaurantData);
      } catch (error) {
        console.error('Error in RestaurantList:', error);
        setError(error.message);
      }
    };

    fetchRestaurants();
  }, []);

return (

  <div className="hero p-0 bg-base-200">
  <div className="hero-content flex-col lg:flex-row">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh5ziSE6CezGt9BhvkeNhJ1CldLuoAMXfASg&usqp=CAU" 
    className="w-1/2 rounded-lg shadow-2xl" />
    <div>
      <h1 className="text-5xl">Takeout</h1>
      <div className="py-6">
      <h1>Restaurant Information:</h1> <br></br>
      {error && <p>Error: {error}</p>}
      {restaurants.length === 0 ? (
        <p>no info found</p>
      ) : (
        <ul>
          {restaurants.map((restaurant) => (
            <li key={restaurant._id}>
              <p className="font-sans md:font-serif font-semibold">Address: {`${restaurant.address.street}, ${restaurant.address.city}, ${restaurant.address.district}`}</p>
              <p className="font-sans md:font-serif font-semibold">Location: {`(${restaurant.location.lat}, ${restaurant.location.lng})`}</p>
              <p className="font-sans md:font-serif">Categories: {`(${restaurant.categories}, ${restaurant.categories})`}</p>
              <p className="font-sans md:font-serif">food: {`(${restaurant.food}, ${restaurant.food})`}</p>
              
           </li>
          ))}
        </ul>
      )}
    </div>
      <button className="btn btn-primary">know more</button>
    </div>
  </div>
</div>

    
  );
};


export default RestaurantList;


