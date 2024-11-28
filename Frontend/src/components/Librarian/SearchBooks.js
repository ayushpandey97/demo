import React, { useState } from 'react';
import axios from 'axios';

const SearchBooks = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);

  const handleSearchBooks = async () => {
    try {
      const response = await axios.get(`http://3.27.162.178:8080/librarian/searchBooks/${query}`);
      setBooks(response.data); // Store the list of books found
    } catch (error) {
      console.error('Error searching for books:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold mb-2">Search Books</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter part of Book Name"
        className="border p-2 w-full mb-2"
      />
      <button
        onClick={handleSearchBooks}
        className="mt-2 p-2 bg-blue-500 text-white rounded"
      >
        Search Books
      </button>

      {books.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Search Results:</h3>
          <ul className="list-disc pl-5">
            {books.map((book) => (
              <li key={book.bookId} className="my-2">
                <strong>Book ID:</strong> {book.id} <br />
                <strong>Book Name:</strong> {book.title} <br />
                <strong>Author:</strong> {book.author} <br />
                <strong>Available Copies:</strong> {book.availableCopies}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBooks;
