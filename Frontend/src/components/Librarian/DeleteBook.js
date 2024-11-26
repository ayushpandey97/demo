import React, { useState } from 'react';
import axios from 'axios';

const DeleteBook = () => {
  const [bookId, setBookId] = useState('');

  const handleDeleteBook = async () => {
    try {
      const response = await axios.delete(`http://localhost:8080/librarian/deleteBook/${bookId}`);
      alert(response.data);  // Display the response message
      // Clear form field
      setBookId('');
    } catch (error) {
      console.error('Error deleting book:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold mb-2">Delete a Book</h2>
      <input
        type="text"
        value={bookId}
        onChange={(e) => setBookId(e.target.value)}
        placeholder="Enter Book ID"
        className="border p-2 w-full mb-2"
      />
      <button
        onClick={handleDeleteBook}
        className="mt-2 p-2 bg-red-500 text-white rounded"
      >
        Delete Book
      </button>
    </div>
  );
};

export default DeleteBook;
