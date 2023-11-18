import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function CustomerHome() {
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/restaurant/all")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setRestaurants(data);
      });
  }, []);

  return (
    <>
      <div className="w-screen">
        <div className="flex justify-around mt-12">
          {restaurants.map((restaurant) => (
            <>
              <div
                key={restaurant._id}
                className="card w-72 bg-base-100 shadow-xl "
              >
                <figure>
                  <img
                    src={restaurant.imgUrl}
                    alt="Restaurant"
                    style={{
                      width: "100%",
                      height: "250px",
                      objectFit: "cover",
                    }}
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{restaurant.name}</h2>
                  <p>{restaurant.address.street}</p>
                  <p>{restaurant.address.city}</p>
                  <p>{restaurant.address.district}</p>

                  <div className="card-actions justify-end">
                    <Link to={`/customer/restaurant/${restaurant._id}`}>
                      <button className="btn btn-primary">See food</button>
                    </Link>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}

export default CustomerHome;
