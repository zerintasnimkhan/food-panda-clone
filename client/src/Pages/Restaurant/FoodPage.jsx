import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import RestaurantFoodCard from '../../components/RestaurantFoodCard'
import { getRestaurantFood, restaurantInfo } from '../../services/restaurant.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import AddFoodModal from '../../components/AddFoodModal';

function FoodPage() {
  const [restaurantId, setRestaurantId] = useState(null);
  const [food, setFood] = useState([]);

  useEffect(() => {
    async function getFood() {
      try {
        const restaurantData = await restaurantInfo();

        if (restaurantData.length) {
          setRestaurantId(restaurantData[0]._id)
          const data = await getRestaurantFood(restaurantData[0]._id);
          setFood(data);
        }
      } catch (error) {
        console.log(error);
      }
    }

    getFood();
  }, []);


  function handleNewFood (food) {
    const newFood = {...food, foodId: food._id};
    setFood(prevState => [...prevState, newFood]);
    document.getElementById('add_food_modal').close();
  }


  return (
    <div className='flex-1 flex flex-col items-center'>
      <h1 className='text-2xl font-bold my-3'>Food</h1>
      <div className='w-full flex justify-end'>
        <button className='btn btn-primary mr-5' onClick={() => document.getElementById('add_food_modal').showModal()}>
          <FontAwesomeIcon className='mr-2' icon={faPlus} />Add Food
        </button>
      </div>
      <div className='flex flex-wrap items-start'>
        {food.map(foodItem => <RestaurantFoodCard key={foodItem.foodId} item={foodItem} />)}
      </div>

      <dialog id="add_food_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>

          { restaurantId && <AddFoodModal restaurantId={restaurantId} handleNewFood={handleNewFood} /> }
        </div>
      </dialog>
    </div>
  )
}

export default FoodPage