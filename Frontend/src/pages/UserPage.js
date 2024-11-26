import React, { useState } from 'react';
import SearchBooks from '../components/Librarian/SearchBooks';
import BorrowRequest from '../components/User/BorrowRequest';
import ReturnRequest from '../components/User/ReturnRequest';
import RequestStatus from '../components/User/RequestStatus';

const UserPage = () => {
  const [borrowedBookId, setBorrowedBookId] = useState('');

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
      <SearchBooks />
      <BorrowRequest />
      <ReturnRequest />
      <RequestStatus borrowedBookId={borrowedBookId} setBorrowedBookId={setBorrowedBookId} />
    </div>
  );
};

export default UserPage;
