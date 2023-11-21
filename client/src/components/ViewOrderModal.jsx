import React from 'react';

const ViewOrderModal = ({ order }) => {

return (
      <div className="bg-white p-8 rounded-md z-20 flex flex-col items-center">

        <div className="mb-4 w-full">
          <label htmlFor="items" className="block text-sm font-medium text-gray-700">
            Items: {order.length} Beef Cheese Burger
          </label>
        </div>
        <div className="mb-4 w-full">
          <label htmlFor="payment" className="block text-sm font-medium text-gray-700">
            Payment: {order.totalPrice} Tk
          </label>
        </div>
        <div className="mb-4 w-full">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Delivery Address: {order.addressId} Ja-17, Mohkhali, Dhaka
          </label>
        </div>
        <div className="mb-4 w-full">
          <label htmlFor="note" className="block text-sm font-medium text-gray-700">
            Note: add less sause
          </label>
        </div>
      </div>
  );
};

export default ViewOrderModal;