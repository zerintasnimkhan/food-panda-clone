import axios from 'axios';

const baseUrl = import.meta.VITE_SERVER_URL ?? 'http://localhost:3000';

export async function restaurantOrders () {
    try {
      const response = await axios.get(`${baseUrl}/orders/restaurant/${restaurantId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching orders by restaurant ID:', error);
      throw new Error('Error fetching orders.');
    }
};

export default apiService;
