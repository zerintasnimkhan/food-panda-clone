import axios from 'axios';
const baseUrl = import.meta.VITE_SERVER_URL ?? 'http://localhost:3000';

export async function login (email, password) {
  try {
    const url = `${baseUrl}/login`;
    const res = await axios.post(url, { email, password });
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error('Error logging in.');
  }
}