import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import RestaurantFoodCard from '../../components/RestaurantFoodCard'
import { getAllCategories, getRestaurantFood, restaurantInfo } from '../../services/restaurant.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import AddFoodModal from '../../components/AddFoodModal';

function FoodPage() {
  const [restaurantId, setRestaurantId] = useState(null);
  const [food, setFood] = useState([]);
  const [filteredFood, setFilteredFood] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

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

    async function getCatergories() {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    }

    getFood();
    getCatergories();
  }, []);

  useEffect(() => {
    if (selectedCategories.length) {
      const filtered = food.filter(item => {
        return item.category.reduce((flag, category) => selectedCategories.includes(category._id) ? true : flag, false);
      })
      setFilteredFood(filtered);
    } else {
      setFilteredFood([...food]);
    }

  }, [selectedCategories, food]);

  function handleCategorySelect (categoryId) {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(prevState => prevState.filter(category => category !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  }


  function handleNewFood(food) {
    const newFood = { ...food, foodId: food._id };
    setFood(prevState => [...prevState, newFood]);
    document.getElementById('add_food_modal').close();
  }


  function handleDeletedFood(foodId) {
    setFood(prevState => prevState.filter(item => item.foodId !== foodId));
  }


  return (
    <div className='flex-1 flex flex-col items-center'>
      <h1 className='text-2xl font-bold my-3'>Food</h1>
      <div className='w-full px-5 flex flex-wrap'>
        <p>Filter by category:</p>
        <button 
          className={"mx-2 btn btn-sm" + (selectedCategories.length ? "" : " btn-primary")}
          onClick={() => setSelectedCategories([])}
        >
          All
        </button>
        {categories.map(category =>
          <button key={category._id}
            className={"mx-2 btn btn-sm" + (selectedCategories.includes(category._id) ? " btn-primary" : '')}
            onClick={() => handleCategorySelect(category._id)}
          >
            {category.name}
          </button>
        )}
      </div>
      <div className='w-full flex justify-end'>
        <button className='btn btn-primary mr-5' onClick={() => document.getElementById('add_food_modal').showModal()}>
          <FontAwesomeIcon className='mr-2' icon={faPlus} />Add Food
        </button>
      </div>
      <div className='flex flex-wrap items-start'>
        {filteredFood.map(foodItem => <RestaurantFoodCard key={foodItem.foodId} item={foodItem} handleDeletedFood={handleDeletedFood} restaurantId={restaurantId} />)}
      </div>

      <dialog id="add_food_modal" className="modal">
        <div className="modal-box">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => { document.getElementById('add_food_modal').close() }}>✕</button>
          {restaurantId && <AddFoodModal restaurantId={restaurantId} handleNewFood={handleNewFood} />}
        </div>
      </dialog>
    </div>
  )
}

export default FoodPage