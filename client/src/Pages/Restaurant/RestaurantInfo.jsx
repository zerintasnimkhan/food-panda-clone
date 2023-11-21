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
    <img src="https://img.freepik.com/free-photo/burger-hamburger-cheeseburger_505751-3690.jpg" 
    className="w-4/6 rounded-lg shadow-2xl" />
    <div>
      <h1 className="text-7xl pb-10">Takeout</h1>
      <div className="py-6">
      <div className='text-3xl font-serif'><h1>Restaurant Information:</h1></div> <br></br>
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
      <button className="btn btn-primary">Edit Info</button>
    </div>
  </div>
</div>

    
  );
};


export default RestaurantList;


