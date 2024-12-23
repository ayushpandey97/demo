// Layout/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <ul className="flex justify-around text-white">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/user">User Page</Link>
        </li>
        <li>
          <Link to="/librarian">Librarian Page</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
