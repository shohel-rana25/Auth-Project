import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("http://localhost:2512/user/all", { withCredentials: true })
      .then(res => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load users");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (error) return <p className="text-center mt-20 text-red-500">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {users.map(user => (
        <div key={user._id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-24 bg-blue-600"></div>
          <div className="px-6 -mt-12 flex items-center space-x-4">
            <img
              src={`https://i.pravatar.cc/150?u=${user._id}`}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-white shadow"
            />
            <div>
              <h2 className="text-xl font-bold">{user.fullname}</h2>
              <p className="text-sm text-gray-600">@{user.username}</p>
            </div>
          </div>
          <div className="px-6 py-4 text-sm text-gray-700">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Dept:</strong> {user.dept}</p>
            <p><strong>Session:</strong> {user.session}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Address:</strong> {user.address}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
