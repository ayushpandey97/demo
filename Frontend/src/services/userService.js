// services/userService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

const userService = {
  searchUsers: async (username) => {
    const response = await axios.get(`${BASE_URL}/librarian/searchUsers/${username}`);
    return response.data;
  },
  addUser: async (userData) => {
    const response = await axios.post(`${BASE_URL}/librarian/addUser`, userData);
    return response.data;
  },
  deleteUser: async (userId) => {
    const response = await axios.delete(`${BASE_URL}/librarian/deleteUser/${userId}`);
    return response.data;
  },
  // Add more user-related methods as needed
};

export default userService;
