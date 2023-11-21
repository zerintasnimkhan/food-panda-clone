import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { getRestaurantFood } from "../../services/restaurant.service";

function ShowFood() {
  let { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  const [foodData, setFoodData] = useState([]);

  useEffect(() => {
    getRestaurantFood(id).then((data) => {
      console.log(data);
      setFoodData(data);
    });
  }, [id]);

  const [selectedFood, setSelectedFood] = useState(null);

  const addToCart = (food) => {
    food.quantity = 1;
    setSelectedFood(food);
    document.getElementById("my_modal_3").showModal();
  };

  return (
    <>
      <div className="w-screen">
        <div className="flex justify-start mt-12 ml-10">
          {foodData.map((food) => (
            <>
              <div
                key={food.foodId}
                className="card w-72 bg-base-100 shadow-xl "
              >
                <figure>
                  <img
                    // src={food.imageUrl ? food.imageUrl : "https://png.pngtree.com/element_our/png/20180930/food-icon-design-vector-png_120564.jpg" }
                    src={food.imageUrl}
                    alt="Food Image"
                    style={{
                      width: "100%",
                      height: "250px",
                      objectFit: "cover",
                    }}
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{food.name}</h2>
                  <p>
                    <b>Price: </b>
                    {food.price}$
                  </p>
                  <p>
                    <b>Peak Time: </b> {food.prepareTime.peakTime} mins
                  </p>
                  <p>
                    <b>Normal Time: </b> {food.prepareTime.normalTime} mins
                  </p>
                  <p>
                    <b>Serving Size: </b>
                    {food.servingSize}
                  </p>

                  <div className="card-actions justify-end">
                    <button
                      className="btn btn-primary"
                      onClick={() => addToCart(food)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => {
              setSelectedFood(null);
              document.getElementById("my_modal_3").close();
            }}
          >
            ✕
          </button>
          {selectedFood && (
            <>
              <h3 className="font-bold text-lg">Selected Food</h3>
              <div>
                <img
                  src={selectedFood.imageUrl}
                  alt="Selected Food Image"
                  style={{
                    width: "100%",
                    height: "250px",
                    objectFit: "cover",
                  }}
                />
                <h2>{selectedFood.name}</h2>
                <p>
                  <b>Price: </b>
                  {selectedFood.price}$
                </p>
                <div>
                  <label htmlFor="quantity">
                    <b>Select Quantity:</b>
                  </label>
                  <div>
                    <button
                      className="btn btn-xs"
                      onClick={() => setQuantity(Math.max(quantity - 1, 1))}
                    >
                      -
                    </button>

                    <span className="mx-2">{quantity}</span>
                    <button
                      className="btn btn-xs"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <p>
                  <b>Total Price: </b>
                  {selectedFood.price * quantity}$
                </p>
              </div>
            </>
          )}
        </div>
      </dialog>
    </>
  );
}

export default ShowFood;
