import { useEffect, useState } from 'react'
import RestaurantFoodCard from '../../components/RestaurantFoodCard'
import { getRestaurantFood, restaurantInfo } from '../../services/restaurant.service';

function FoodPage() {
  const [food, setFood] = useState([]);

  useEffect(() => {
    async function getFood() {
      try {
        const restaurantData = await restaurantInfo();

        if (restaurantData.length) {
          const data = await getRestaurantFood(restaurantData[0]._id);
          setFood(data);
        }
      } catch (error) {
        console.log(error);
      }
    }

    getFood();
  }, []);


  return (
    <div className='flex-1 flex flex-col items-center'>
      <h1 className='text-2xl font-bold my-3'>Food</h1>
      <div className='flex flex-wrap items-start'>
        {food.map(foodItem => <RestaurantFoodCard key={foodItem.foodId} item={foodItem} />)}
      </div>
    </div>
  )
}

export default FoodPage