import React, { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("http://localhost:2512/user/profile", { withCredentials: true })
      .then(res => {
        setUser(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load profile");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (error) return <p className="text-center mt-20 text-red-500">{error}</p>;

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md mt-10 overflow-hidden">
      {/* Cover Photo */}
      <div className="h-48 bg-blue-600"></div>

      {/* Profile Info */}
      <div className="px-6 -mt-16 flex items-center space-x-6">
        {/* Profile Picture */}
        <img
          src="https://i.pravatar.cc/150?u=" alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-white shadow-md"
        />

        {/* User Basic Info */}
        <div>
          <h1 className="text-3xl font-bold">{user.fullname}</h1>
        </div>
      </div>

      {/* Additional Info */}
      <div className="px-6 py-6 border-t border-gray-200 grid grid-cols-2 gap-4 text-gray-700">
        <div>
          <p className="text-gray-600">@{user.username}</p>
          <p className="text-gray-700 mt-2">{user.email}</p>
        </div>
        <div>
          <h3 className="font-semibold">Department</h3>
          <p>{user.dept}</p>
        </div>
        <div>
          <h3 className="font-semibold">Session</h3>
          <p>{user.session}</p>
        </div>
        <div>
          <h3 className="font-semibold">Phone</h3>
          <p>{user.phone}</p>
        </div>
        <div>
          <h3 className="font-semibold">Address</h3>
          <p>{user.address}</p>
        </div>
      </div>

  
  
    </div>
  );
}

export default Profile; 