import { useState } from "react";

function Checkout() {
  const [address, setAddress] = useState("");

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  return (
    <div className="form-control ml-10">
      <label className="label">
        <span className="label-text">Address</span>
      </label>
      <input
        type="text"
        placeholder="Address"
        className="input input-bordered w-64"
        value={address}
        onChange={handleAddressChange}
      />
      <div className="flex justify-end mr-10 ">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Cart</h2>
            <p>
              <b>Total Quantity: </b>
            </p>
            <p>
              <b>Total Price: </b>
            </p>

            <div className="card-actions justify-center">
              <button className="btn btn-primary">Payment</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
