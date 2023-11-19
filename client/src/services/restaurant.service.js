import axios from 'axios';
const baseUrl = import.meta.VITE_SERVER_URL ?? 'http://localhost:3000';

export async function restaurantInfo () {
  try {
      const url = `${baseUrl}/restaurant/owner`;
      const token = localStorage.getItem('access-token');
      const headers = { Authorization: `Bearer ${token}`};
      const res = await axios.get(url, { headers });
      return res.data;
  } catch (error) {
    console.log(error);
    throw new Error('Error fetching retaurant information');
  }
}



