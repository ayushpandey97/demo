import React, { useState } from 'react';
import axios from 'axios';

const DeleteUser = () => {
  const [userId, setUserId] = useState('');

  const handleDeleteUser = async () => {
    try {
      const response = await axios.delete(`http://localhost:8080/librarian/deleteUser/${userId}`);
      alert(response.data);  // "User deleted successfully."
      // Clear form field
      setUserId('');
    } catch (error) {
      console.error('Error deleting user:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold mb-2">Delete a User</h2>
      <input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="Enter User ID"
        className="border p-2 w-full mb-2"
      />
      <button
        onClick={handleDeleteUser}
        className="mt-2 p-2 bg-red-500 text-white rounded"
      >
        Delete User
      </button>
    </div>
  );
};

export default DeleteUser;
