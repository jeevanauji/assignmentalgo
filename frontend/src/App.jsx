import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
  });

  const [users, setUsers] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/user', formData);
      fetchUsers();
      setFormData({ firstName: '', lastName: '', dob: '' });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/user');
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ width: '100vw', display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'center', alignItems: 'center', marginTop: '50px' }}>
      <h1>User Form</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        /><br/><br/>
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        /><br/><br/>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          required
        /><br/><br/>
        <button type="submit">Submit</button>
      </form>

      <h2>Users List</h2>
      {users.map((user) => (
        <div key={user._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
          <p><strong>DOB:</strong> {new Date(user.dob).toLocaleDateString()}</p>
          <p><strong>Age:</strong> {user.age}</p>
          <img src={user.profilePicture} alt="Profile" width="100" />
        </div>
      ))}
    </div>
  );
}

export default App;
