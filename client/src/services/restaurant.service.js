import axios from "axios";
const baseUrl = import.meta.env.VITE_SERVER_URL ?? "http://localhost:3000";

export async function restaurantInfo() {
  try {
    const url = `${baseUrl}/restaurant/owner`;
    const token = localStorage.getItem("access-token");
    const headers = { Authorization: `Bearer ${token}` };
    const res = await axios.get(url, { headers });
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching retaurant information");
  }
}

export async function OrdersForRestaurant() {
  try {
    const userRestaurant = await restaurantInfo();
    const restaurantId = userRestaurant[0]._id;

    const token = localStorage.getItem("access-token");
    const headers = { Authorization: `Bearer ${token}` };

    const url = `${baseUrl}/order/restaurant/${restaurantId}`;
    const res = await axios.get(url, { headers });
    return res.data;
  } catch (error) {
    console.error("Error fetching orders by restaurant ID:", error);
    throw new Error("Error fetching orders.");
  }
}

export async function getRestaurantFood(restaurantId) {
    try {
      const response = await axios.get(`${baseUrl}/${id}/foods/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching restaurant food:', error);
      throw new Error('Error fetching restaurant food.');
    }
};

