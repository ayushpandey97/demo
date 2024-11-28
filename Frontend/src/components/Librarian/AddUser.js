import React, { useState } from 'react';
import axios from 'axios';

const AddUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleAddUser = async () => {
    const userData = {
      username,
      password,
    };

    try {
      const response = await axios.post('http://3.27.162.178:8080/librarian/addUser', userData);
      alert(response.data); // "User added successfully."
      // Clear form fields
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error('Error adding user:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold mb-2">Add a New User</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter Username"
        className="border p-2 w-full mb-2"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter Password"
        className="border p-2 w-full mb-2"
      />
      <button
        onClick={handleAddUser}
        className="mt-2 p-2 bg-green-500 text-white rounded"
      >
        Add User
      </button>
    </div>
  );
};

export default AddUser;
