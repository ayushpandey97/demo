import React, { useState } from 'react';
import axios from 'axios';

const SearchUsers = () => {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);

  const handleSearchUser = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/librarian/searchUsers/${username}`);
      setUser(response.data); // Store the user details
    } catch (error) {
      console.error('Error searching for users:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold mb-2">Search Users</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter Username"
        className="border p-2 w-full mb-2"
      />
      <button
        onClick={handleSearchUser}
        className="mt-2 p-2 bg-blue-500 text-white rounded"
      >
        Search User
      </button>

      {user && (
        <div className="mt-4 p-2 border">
          <p><strong>UserID:</strong> {user.id}</p>
          <p><strong>Username:</strong> {user.username}</p>
        </div>
      )}
    </div>
  );
};

export default SearchUsers;
