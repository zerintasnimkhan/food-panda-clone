import axios from "axios";
const baseUrl = import.meta.env.VITE_SERVER_URL ?? "http://localhost:3000";

export async function addFood (restaurantId, foodData) {
  try {
    const url = `${baseUrl}/restaurant/${restaurantId}/food/add`;
    const token = localStorage.getItem("access-token");
    const headers = { Authorization: `Bearer ${token}` };
    const res = await axios.put(url, foodData, { headers });
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error adding food to restaurant.");
  }
}


export async function updateFood (foodId, foodData) {
  try {
    const url = `${baseUrl}/food/update/${foodId}`;
    const token = localStorage.getItem("access-token");
    const headers = { Authorization: `Bearer ${token}` };
    const res = await axios.patch(url, foodData, { headers });
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error updating food.");
  }
}


export async function deleteFoodFromRestaurant (restaurantId, foodId) {
  try {
    const url = `${baseUrl}/restaurant/${restaurantId}/food/delete/${foodId}`;
    const token = localStorage.getItem("access-token");
    const headers = { Authorization: `Bearer ${token}` };
    const res = await axios.delete(url, { headers });
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error deleting food from restaurant.");
  }
}