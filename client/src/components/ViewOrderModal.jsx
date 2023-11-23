import React from "react";

const ViewOrderModal = ({ order }) => {
  return (
    <div className="bg-white p-8 rounded-md z-20 flex flex-col items-center">
      <div className="mb-4 w-full">
        <label
          htmlFor="items"
          className="block text-sm font-medium text-gray-700"
        >
          Items:
        </label>
        <div>
          {order.items.map((item) => (
            <>
              <p>Name: {item.foodInfo.name}</p>
              <p>Package Size: {item.foodInfo.packageSize}</p>
              <p>Quantity: {item.quantity}</p>
            </>
          ))}
        </div>
      </div>
      <div className="mb-4 w-full">
        <label
          htmlFor="payment"
          className="block text-sm font-medium text-gray-700"
        >
          Paid amount: {order.totalPrice} Tk
        </label>
      </div>
      <div className="mb-4 w-full">
        <label
          htmlFor="address"
          className="block text-sm font-medium text-gray-700"
        >
          Delivery Address: {order.addressId}
        </label>
      </div>
      <div className="mb-4 w-full">
        
      </div>
    </div>
  );
};

export default ViewOrderModal;
