import React, {useState} from 'react';

const ViewOrderModal = ({ order }) => {

return (
      <div className="bg-white p-8 rounded-md z-20 flex flex-col items-center">
            <p>{order._id}</p>
        <div className="mb-4 w-full">
          <label htmlFor="items" className="block text-sm font-medium text-gray-700">
            Items: {order.items.length}
          </label>
        </div>
        <div className="mb-4 w-full">
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
            quantity:
          </label>
        </div>
      </div>
  );
};

export default ViewOrderModal;