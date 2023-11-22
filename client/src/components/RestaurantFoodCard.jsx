import React from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteFoodFromRestaurant } from '../services/food.service';

function RestaurantFoodCard({ item, restaurantId, handleDeletedFood }) {

  const navigate = useNavigate();

  async function handleDelete (e) {
    e.preventDefault();
    try {
      const res = await deleteFoodFromRestaurant(restaurantId, item.foodId);
      handleDeletedFood(res.food._id);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="card w-72 m-5 bg-base-100 shadow-xl">
      <figure><img className='max-h-48' src={item.imageUrl ? item.imageUrl : "https://clipart-library.com/img1/1634723.png"} alt={item.name} /></figure>
      <div className="card-body">
        <h2 className="card-title">{item.name}</h2>
        <p className="text-sm text-slate-600"><b>Price: </b>৳{item.price}</p>
        <p className="text-sm text-slate-600"><b>Serving size: </b>{item.servingSize}</p>
        <p className="text-sm text-slate-600"><b>Prepare time (normal): </b>{item.prepareTime.normalTime}</p>
        <p className="text-sm text-slate-600"><b>Prepare time (peak): </b>{item.prepareTime.peakTime}</p>
        <div className='flex my-3 overflow-y'>
          {item.category.map(cat => <div key={cat._id} className="badge badge-primary badge-outline badge-md">{cat.name}</div>)}
        </div>
        <div className="card-actions justify-center">
          <button className="btn btn-error btn-outline" onClick={handleDelete}>Delete</button>
          <button className="btn btn-primary" onClick={() => navigate('/restaurant/food/edit', {state: { food: item }})}>Edit Item</button>
        </div>
      </div>
    </div>
  )
}

export default RestaurantFoodCard