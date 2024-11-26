import React, { useState } from 'react';
import axios from 'axios';

const BookSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);

  const searchBooks = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/user/searchBooks?query=${searchTerm}`);
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold mb-2">Search Books</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter book name"
        className="border p-2 w-full"
      />
      <button
        onClick={searchBooks}
        className="mt-2 p-2 bg-blue-500 text-white rounded"
      >
        Search
      </button>

      <ul className="mt-4">
        {books.map((book) => (
          <li key={book.bookId} className="border-b p-2">
            <strong>{book.title}</strong> by {book.author} - Available Copies: {book.availableCopies}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookSearch;
