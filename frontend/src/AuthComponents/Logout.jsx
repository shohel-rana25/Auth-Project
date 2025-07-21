import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Logout() {
  const navigate=useNavigate();

  const [message,setMessage]=useState('');

  useEffect(()=>{
    const userLogout=async()=>{
      try {
         const res=await axios.post('http://localhost:2512/user/logout', {},{
            withCredentials:true,
         });
          setMessage(res.data.message);

          setTimeout(() => {
             navigate("/"); // redirect home page 
          }, 1000);

      } catch (error) {
        console.error('Logout failed:', error);
      }
    }
    userLogout();
  }, [navigate]);
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-xl text-gray-700">{message || "Logout successful"}</p>
    </div>
  )
}

export default Logout