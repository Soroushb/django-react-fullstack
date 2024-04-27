import React, { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import api from '../api';

const Profile = () => {
  const [username, setUsername] = useState('');

  const getProfile = (id) => {
    console.log(id)
    api.get(`/api/users/${id}`)
    .then((res) => res.data)
    .then((data) => {setUsername(data.username); console.log(data)})
   
  }

  useEffect(() => {
    // Retrieve token from localStorage (or any other storage)
    const token = localStorage.getItem('access');
    console.log('Token:', token);

    if (token) {
      // Decode the token to extract user information (including username)
      const decodedToken = jwtDecode(token);
      console.log('Decoded Token:', decodedToken);

      if (decodedToken && decodedToken.user_id) {
        getProfile(decodedToken.user_id);
      }
    }
  }, []);

  useEffect(() => {
    console.log('Updated Username:', username);
  }, [username]); // Run this effect whenever `username` changes

  return (
    <div className="relative">
    {username && (
      <div className="relative w-16 h-16">
        <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-full w-full h-full flex items-center justify-center shadow-lg relative">
          <h1 className="text-white text-4xl font-bold z-10 relative">{username.substring(0, 1).toUpperCase()}</h1>
          <div className="absolute top-0 left-0 w-full h-full rounded-full border-2 border-white pointer-events-none"></div>
        </div>
      </div>
    )}
    {username && (
      <div className="absolute top-0 left-0 mt-20 bg-white rounded-lg shadow-lg p-4 hidden group-hover:block">
        <p className="text-gray-800 text-sm">Welcome, {username}!</p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded mt-2">
          View Profile
        </button>
      </div>
    )}
  </div>
  );
};

export default Profile;