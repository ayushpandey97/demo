import React, { useState, useEffect } from 'react';
import axios from 'axios';

const IssueRequestsPanel = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://3.27.162.178:8080/librarian/issueRequests');
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching issue requests:', error);
      }
    };
    fetchRequests();
  }, []);

  const approveRequest = async (bookId, userId) => {
    try {
      const response = await axios.post(`http://3.27.162.178:8080/librarian/approveBorrow/${bookId}/${userId}`);
      alert(response.data);

      // Immediately remove the approved request from the UI
      setRequests((prevRequests) =>
        prevRequests.filter((req) => !(req.book.id === bookId && req.userId === userId))
      );
    } catch (error) {
      console.error('Error approving borrow request:', error);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold mb-2">Pending Borrow Requests</h2>
      <ul>
        {requests.map((req) => (
          <li key={`${req.book.id}-${req.userId}`} className="border-b p-2">
            <span>
              {req.username} (UserID: {req.userId}) requested {req.book.title} (BookID: {req.book.id})
            </span>
            <button
              onClick={() => approveRequest(req.book.id, req.userId)}
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

export default IssueRequestsPanel;
