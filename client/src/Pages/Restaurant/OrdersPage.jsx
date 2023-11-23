import React, { useEffect, useState } from 'react';
import OrderColumn from '../../components/OrderColumn';
import { DragDropContext } from 'react-beautiful-dnd';
import { OrdersForRestaurant } from '../../services/restaurant.service';


const OrdersPage = () => {
  const [orders, setOrders] = useState([]);


  useEffect(() => {
    async function getOrders () {
      try {
        const data = await OrdersForRestaurant();
        setOrders(data);
      } catch (error) {
        console.log(error);
      }
    }

    getOrders();
  }, []);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const id = result.draggableId;
    const newStatus = result.destination.droppableId.toLowerCase();

    // Make the request to the backend to change the status before changing the state.
    setOrders(prevState => prevState.map(order => order._id === id ? {...order, status: newStatus} : order));
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
    <div style={{ display: 'flex' }}>
      <OrderColumn status="Pending" orders={orders.filter((order) => order.status === 'pending')} />
      <OrderColumn status="Preparing" orders={orders.filter((order) => order.status === 'preparing')} />
      <OrderColumn status="Completed" orders={orders.filter((order) => order.status === 'completed')} />
    </div>
    </DragDropContext>
  );
};

export default OrdersPage;
