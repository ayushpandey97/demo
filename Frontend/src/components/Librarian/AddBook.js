import React, { useState } from 'react';
import axios from 'axios';
//const API_URL = "http://3.27.162.178:8080";

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [availableCopies, setAvailableCopies] = useState('');

  const handleAddBook = async () => {
    const bookData = {
      title,
      author,
      availableCopies: parseInt(availableCopies, 10), // Convert copies to integer
    };

    try {
      const response = await axios.post('http://3.27.162.178:8080/librarian/addBook', bookData);
      alert('Book added successfully');
      // Clear form fields
      setTitle('');
      setAuthor('');
      setAvailableCopies('');
    } catch (error) {
      console.error('Error adding book:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold mb-2">Add a New Book</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter Book Title"
        className="border p-2 w-full mb-2"
      />
      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Enter Author Name"
        className="border p-2 w-full mb-2"
      />
      <input
        type="text"
        value={availableCopies}
        onChange={(e) => setAvailableCopies(e.target.value)}
        placeholder="Enter Available Copies"
        className="border p-2 w-full mb-2"
      />
      <button
        onClick={handleAddBook}
        className="mt-2 p-2 bg-green-500 text-white rounded"
      >
        Add Book
      </button>
    </div>
  );
};

export default AddBook;
