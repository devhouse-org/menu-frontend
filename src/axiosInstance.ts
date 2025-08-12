import axios, { AxiosInstance } from 'axios';

// Define a function to create an Axios instance with custom configuration
const createAxiosInstance = (): AxiosInstance => {
  // Customize Axios instance with your configuration options
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // Your API base URL
    timeout: 10000, // Request timeout in milliseconds
    headers: {
      'Content-Type': 'application/json', // Example header
      // You can add more headers as needed
    },
  });

  // You can also add interceptors or any other configuration here

  return instance;
};

// Create an instance of Axios
const axiosInstance = createAxiosInstance();

export default axiosInstance;
