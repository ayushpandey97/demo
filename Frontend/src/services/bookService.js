// services/bookService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

const bookService = {
  searchBooks: async (searchTerm) => {
    const response = await axios.get(`${BASE_URL}/user/searchBooks/${searchTerm}`);
    return response.data;
  },
  addBook: async (bookData) => {
    const response = await axios.post(`${BASE_URL}/librarian/addBook`, bookData);
    return response.data;
  },
  deleteBook: async (bookId) => {
    const response = await axios.delete(`${BASE_URL}/librarian/deleteBook/${bookId}`);
    return response.data;
  },
  // Add more book-related methods as needed
};

export default bookService;
