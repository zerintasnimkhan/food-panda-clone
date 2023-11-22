import React from 'react';

function RestaurantFoodCard({ item }) {

  console.log(item)

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
          <button className="btn btn-error btn-outline">Delete</button>
          <button className="btn btn-primary">Edit Item</button>
        </div>
      </div>
    </div>
  )
}

export default RestaurantFoodCard