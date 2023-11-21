import React, { useEffect, useState } from 'react';
import { OrdersForRestaurant } from '../../services/restaurant.service';
import ViewOrderModal from '../../components/ViewOrderModal';


const RestaurantOrders = ({ restaurantId }) => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersData = await OrdersForRestaurant(restaurantId);
        console.log(ordersData);
        setOrders(ordersData);
      } catch (error) {
        console.error('Error in RestaurantOrders:', error);
        setError(error.message);
      }
    };

    fetchOrders();
  }, [restaurantId]);

  return (
    <div>
      <div className='text-3xl font-bold p-10'>
      <h1>Orders for your Restaurant:</h1>
      <br />
      </div>

      {error && <p>Error: {error}</p>}

      {orders.length === 0 ? (
        <p>No orders found for this restaurant.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 p-10">
          {orders.map((order) => (
            <div key={order._id} className="p-4 border rounded-md shadow-md">
              <h2 className="text-xl font-bold">Order ID: {order._id}</h2>
              <p>User ID: {order.userId}</p>
              <p>Address ID: {order.addressId}</p>
              <p>Total Price: {order.totalPrice}</p>
              <p>Status: {order.status}</p> <br></br>
              <button className="btn btn-active btn-primary" onClick={() =>
             document.getElementById('viewOrder-modal').showModal()}>
               View Order
             </button>
      
              <button className="btn btn-outline btn-secondary">Reject</button>

            </div>
          ))}
          
        </div>
      )}
      <dialog id="viewOrder-modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Order Details</h3>
          <ViewOrderModal />
          <div className="modal-action">
            <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>

    
  );
};

export default RestaurantOrders;
