import axios from 'axios';

const USER_BASE_URL = 'http://your-api-url'; // Replace with your API base URL

const userService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${USER_BASE_URL}/login`, { email, password });
      return response.data; // Assuming your API returns user data upon successful login
    } catch (error) {
      throw error.response.data; // Assuming your API returns error messages in the response data
    }
  },

  signup: async (userData) => {
    try {
      const response = await axios.post(`${USER_BASE_URL}/signup`, userData);
      return response.data; // Assuming your API returns user data upon successful signup
    } catch (error) {
      throw error.response.data; // Assuming your API returns error messages in the response data
    }
  }
};

export default userService;
