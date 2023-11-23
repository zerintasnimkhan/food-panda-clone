import React, { useState } from 'react';
import OrderColumn from '../../components/OrderColumn';
import { DragDropContext } from 'react-beautiful-dnd';


const OrdersPage = () => {
  const [orders, setOrders] = useState([
    { _id: "1", name: 'Order 1', status: 'pending' },
    { _id: "2", name: 'Order 2', status: 'preparing' },
    { _id: "3", name: 'Order 3', status: 'completed' },
  ]);

  // const handleOrderDrop = (orderId, newStatus) => {
  //   const updatedOrders = orders.map((order) => {
  //     if (order.id === orderId) {
  //       return { ...order, status: newStatus };
  //     }
  //     return order;
  //   });
  //   setOrders(updatedOrders);
  // };

  return (
    <DragDropContext>
    <div style={{ display: 'flex' }}>
      <OrderColumn status="Pending" orders={orders.filter((order) => order.status === 'pending')} />
      <OrderColumn status="Preparing" orders={orders.filter((order) => order.status === 'preparing')} />
      <OrderColumn status="Completed" orders={orders.filter((order) => order.status === 'completed')} />
    </div>
    </DragDropContext>
  );
};

export default OrdersPage;
