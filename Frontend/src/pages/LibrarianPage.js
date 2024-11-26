import React from 'react';
import AddBook from '../components/Librarian/AddBook';
import DeleteBook from '../components/Librarian/DeleteBook';
import SearchBooks from '../components/Librarian/SearchBooks';
import IssueRequestsPanel from '../components/Librarian/IssueRequestsPanel';
import ReturnRequestsPanel from '../components/Librarian/ReturnRequestsPanel';
import SearchUsers from '../components/Librarian/SearchUsers';
import AddUser from '../components/Librarian/AddUser';
import DeleteUser from '../components/Librarian/DeleteUser';

const LibrarianPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Librarian Dashboard</h1>
      <IssueRequestsPanel />
      <ReturnRequestsPanel />
      <SearchBooks />
      <AddBook />
      <DeleteBook />
      <SearchUsers />
      <AddUser />
      <DeleteUser />
    </div>
  );
};

export default LibrarianPage;
