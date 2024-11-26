import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReturnRequestsPanel = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get('http://localhost:8080/librarian/returnRequests');
      console.log('API Response:', response.data); // Log the response
      setRequests(response.data);
    } catch (error) {
      console.error('Error fetching return requests:', error);
    }
  };

  const approveReturn = async (borrowedBookId) => {
    try {
      const response = await axios.post(`http://localhost:8080/librarian/approveReturn/${borrowedBookId}`);
      alert(response.data); // Display success message
      fetchRequests(); // Refresh the list of requests after approval
    } catch (error) {
      console.error('Error approving return request:', error);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold mb-2">Pending Return Requests</h2>
      <ul>
        {requests.map((req) => (
          <li key={req.id} className="border-b p-2">
            <span>
              {req.username} (UserID: {req.userId}) wants to return {req.book.title} (Borrowed Book ID: {req.id})
            </span>
            <button
              onClick={() => approveReturn(req.id)}
              className="ml-4 p-2 bg-green-500 text-white rounded"
            >
              Approve
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReturnRequestsPanel;
