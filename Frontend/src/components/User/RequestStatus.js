import React, { useState } from 'react';
import axios from 'axios';

const RequestStatus = () => {
  const [userId, setUserId] = useState('');
  const [status, setStatus] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchStatus = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`http://localhost:8080/user/status/${userId}`);
      console.log('API Response:', response.data);
      setStatus(response.data);
    } catch (error) {
      console.error('Error fetching request status:', error);
      setError('Failed to fetch request status. Please try again later.');
    }
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userId) {
      fetchStatus();
    } else {
      setError('Please enter a valid user ID.');
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold mb-2">Request Status</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="border p-2 rounded"
        />
        <button type="submit" className="ml-2 bg-blue-500 text-white p-2 rounded">
          Check Status
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {status.length > 0 ? (
        <ul>
          {status.map((request) => (
            <li key={request.id} className="border-b p-2">
              <p>Book: {request.book.title}</p>
              <p>Author: {request.book.author}</p>
              <p>Available Copies: {request.book.availableCopies}</p>
              {request.status === 'Approved' ? (
                <span className="text-green-500">Status: Approved</span>
              ) : (
                <span className="text-yellow-500">Status: Pending</span>
              )}
              <p>Request Type: {request.requestType}</p>
              {request.status === 'Approved' && (
                <p>Borrowed Book ID: {request.id}</p> 
                // {/* Displaying the borrowed book ID here */}
              )}
            </li>
          ))}
        </ul>
      ) : (
        !loading && !error && <p>No requests found.</p>
      )}
    </div>
  );
};

export default RequestStatus;
