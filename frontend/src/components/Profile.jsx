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
    <div>
      {username && (
      <div className='bg-blue-400 rounded-full'>
      <h1 className='text-white p-4'>{username.substring(0,1).toUpperCase()}</h1>
      </div>)
      }
      
    </div>
  );
};

export default Profile;