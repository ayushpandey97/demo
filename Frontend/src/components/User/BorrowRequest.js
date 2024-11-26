import React, { useState } from 'react';
import axios from 'axios';

const BorrowRequest = () => {
  const [bookId, setBookId] = useState('');
  const [userId, setUserId] = useState('');

  const issueBorrowRequest = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/user/requestBorrow/${bookId}/${userId}`);
      alert(response.data); // Show response message to user
    } catch (error) {
      console.error('Error submitting borrow request:', error);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold mb-2">Borrow a Book</h2>
      <input
        type="text"
        value={bookId}
        onChange={(e) => setBookId(e.target.value)}
        placeholder="Enter Book ID"
        className="border p-2 w-full mb-2"
      />
      <input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="Enter User ID"
        className="border p-2 w-full mb-2"
      />
      <button
        onClick={issueBorrowRequest}
        className="mt-2 p-2 bg-green-500 text-white rounded"
      >
        Borrow Book
      </button>
    </div>
  );
};

export default BorrowRequest;
