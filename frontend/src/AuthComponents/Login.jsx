import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Login() {

  const [formData, setFormData]=useState({
    email:'',
    password:''
  })
  const [message , setMessage]=useState('');
  const navigate=useNavigate();

  const handleChange=async(e)=>{
    const {name,value}=e.target;
    setFormData((prev)=>({
        ...prev,
        [name]:value,
    }));
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
         const res = await axios.post('http://localhost:2512/user/login', formData, {
            withCredentials: true, // cookie support
         });
         setMessage(res.data.message);

        setTimeout(() => {
          navigate("/"); // redirect home page 
        }, 1000);

    } catch (error) {
            setMessage(error.response?.data?.message || 'Login failed');
    }
  }

   return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
        
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full px-4 py-2 mb-4 border rounded"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full px-4 py-2 mb-4 border rounded"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </button>

        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </form>
    </div>
  );
};


export default Login