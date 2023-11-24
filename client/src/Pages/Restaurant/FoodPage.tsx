import React, { useEffect, useState } from "react";
import { getRestaurantFood } from "../../services/restaurant.service";

const FoodsPage = ({ restaurantId }) => {
  const [foods, setFoods] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const foodsData = await getRestaurantFood();
        setFoods(foodsData);
      } catch (error) {
        console.error("Error in FoodsPage:", error);                           
        setError(error.message);
      }
    };

    fetchFoods();
  }, [restaurantId]);

  return (
    <div>
      <h1>Foods for your Restaurant:</h1>
      <br />

      {error && <p>Error: {error}</p>}

      {foods.length === 0 ? (
        <p>No foods found for this restaurant.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {foods.map((food) => (
            <div
              key={restaurantId.food._id}
              className="p-4 border rounded-md shadow-md"
            >
              <h2 className="text-xl font-bold">{restaurantId.food.name}</h2>
              <p>Price: {food}</p>
              <p>Category: {food}</p>
              <p>Prepare Time: {food}</p>
              <p>Serving Size: {food}</p>
            </div>
          ))}                               
        </div>
      )}
    </div>
  );
};

export default FoodsPage;
