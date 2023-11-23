import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { getRestaurantFood } from "../../services/restaurant.service";

function FoodPage() {
  let { id } = useParams();
  const [foodData, setFoodData] = useState([]);
  useEffect(() => {
    getRestaurantFood(id).then((data) => {
      console.log(data);
      setFoodData(data);
    });
  }, [id]);

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
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}
export default FoodPage;
