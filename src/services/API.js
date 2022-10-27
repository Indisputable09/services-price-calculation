import axios from 'axios';

axios.defaults.baseURL = 'https://634d92dbf5d2cc648ea98ce0.mockapi.io/';

export async function fetchServices() {
  try {
    const response = await axios.get('services');
    console.log('response.data', response.data);
    return response.data;
  } catch (error) {}
}
