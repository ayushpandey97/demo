import React, { useState } from 'react';
import axios from 'axios';

const ReturnRequest = () => {
  const [borrowedBookId, setBorrowedBookId] = useState('');

  const issueReturnRequest = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/user/requestReturn/${borrowedBookId}`);
      alert(response.data); // Show response message to user
    } catch (error) {
      console.error('Error submitting return request:', error);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold mb-2">Return a Book</h2>
      <input
        type="text"
        value={borrowedBookId}
        onChange={(e) => setBorrowedBookId(e.target.value)}
        placeholder="Enter Borrowed Book ID"
        className="border p-2 w-full mb-2"
      />
      <button
        onClick={issueReturnRequest}
        className="mt-2 p-2 bg-green-500 text-white rounded"
      >
        Return Book
      </button>
    </div>
  );
};

export default ReturnRequest;
