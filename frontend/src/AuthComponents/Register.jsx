import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Step 1: import useNavigate

function Register() {
  const navigate = useNavigate(); // ✅ Step 2: initialize navigate

  const [formData, setFormData] = useState({
    username: '',
    fullname: '',
    dept: '',
    session: '',
    address: '',
    phone: '',
    email: '',
    password: ''
  });

  const [message, setMessage] = useState(''); // ✅ Fix: useState() instead of const {...}

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:2512/user/register', formData, {
        withCredentials: true,
      });
      setMessage(res.data.message);
      setTimeout(() => {
        navigate("/login"); // ✅ Step 3: redirect to login page after success
      }, 1000);
    } catch (error) {
      setMessage(error.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input type="text" name="username" placeholder="Username" onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" required />
          <input type="text" name="fullname" placeholder="Full Name" onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" required />
          <input type="text" name="dept" placeholder="Department" onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" required />
          <input type="text" name="session" placeholder="Session" onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" required />
          <input type="text" name="address" placeholder="Address" onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" required />
          <input type="number" name="phone" placeholder="Phone Number" onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" required />
          <input type="email" name="email" placeholder="Email" onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400" required />
          <button type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300">
            Register
          </button>
        </form>
        {message && <p className="text-center text-green-600 mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default Register;
