import React, { useEffect, useState } from 'react';
import { restaurantInfo } from '../../services/restaurant.service';
import { useNavigate } from 'react-router-dom';
import RestaurantMap from '../../components/RestaurantMap';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const restaurantData = await restaurantInfo();
        setRestaurants(restaurantData);
      } catch (error) {
        console.error('Error in RestaurantList:', error);
        setError(error.message);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <>
      {!!restaurants.length &&
        <div className="flex-1">
          <div className="hero h-52" style={{ backgroundImage: `url(${restaurants[0].imgUrl})` }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
              <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold">{restaurants[0].name}</h1>
              </div>
            </div>
          </div>
          <div className='flex w-full justify-around mt-5 text-lg'>
            <div>
              <div className='my-5'><b>Restaurant name:</b> {restaurants[0].name}</div>

              <div className='flex my-5'>
                <div><b>Address:</b></div>
                <div className='ml-5'>
                  <div>{restaurants[0].address.street}</div>
                  <div>{restaurants[0].address.city}</div>
                  <div>{restaurants[0].address.district}</div>
                </div>
              </div>

              <div className='my-5'>
                <b>Categories:</b> {restaurants[0].categories.map(category =>
                  <div key={category} className="badge badge-primary">{category.name}</div>
                )}
              </div>

              <button className='btn btn-primary' onClick={() => {navigate('/restaurant/edit/info', { state: { restaurant: restaurants[0] } })}}>Edit Information</button>
            </div>
            <RestaurantMap restaurant={restaurants[0]} />
          </div>
        </div>
      }
    </>
  );
};


export default RestaurantList;


