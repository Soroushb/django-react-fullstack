import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import api from '../api';


const Account = () => {

  const [profile, setProfile] = useState(null);
  const [username, setUsername] = useState('');

  const getUsername = (id) => {
    console.log(id)
    api.get(`/api/users/${id}`)
    .then((res) => res.data)
    .then((data) => {setUsername(data.username); console.log(data)})
   
  }

  const baseURL = "http://127.0.0.1:8000/api/profile"

  useEffect(() => {
    getProfile()
    const token = localStorage.getItem('access');
    console.log('Token:', token);

    if (token) {
      // Decode the token to extract user information (including username)
      const decodedToken = jwtDecode(token);
      console.log(username);

      if (decodedToken && decodedToken.user_id) {
        getUsername(decodedToken.user_id);
      }
    }
  }, [])

  console.log(profile)

  const getProfile = () => {

    api.get("/api/profile/")
    .then((res) => {
      setProfile(res.data)
    })
    .catch((err) => {
      console.error('Error fetching account:', err);
      // Handle error (e.g., show error message)
    });
  }

  const navigate = useNavigate()

  return (
    <div className="container mx-auto mt-10">

<div className="flex items-center">
      {/* Avatar */}
      <div className="w-16 h-16 rounded-full overflow-hidden">
        <img className="object-cover w-full h-full" src={baseURL + profile?.picture} width="20px" height={20} alt="Avatar" />
      </div>

      {/* Bio Text */}
      <div className="ml-4">
        <h1 className="text-xl font-bold">{username}</h1>
        <p className="text-gray-600">{profile?.bio}</p>
      </div>
    </div>
      <div className="grid grid-cols-2 gap-8">
        {/* Box 1: Books */}
        <div className="rounded-lg shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-blue-400 to-blue-600 p-6 rounded-t-lg">
            <h2 className="text-2xl font-bold text-white mb-4">Books</h2>
          </div>
          {/* Additional content for Books can be added here */}
          <div className="bg-gradient-to-r from-blue-400 to-blue-600 p-6 rounded-b-lg">
            {/* Additional content for Books can be added here */}
          </div>
        </div>

        {/* Box 2: Health */}
        <div className="rounded-lg shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-green-400 to-green-600 p-6 rounded-t-lg">
            <h2 className="text-2xl font-bold text-white mb-4">Health</h2>
          </div>
          {/* Additional content for Health can be added here */}
          <div className="bg-gradient-to-r from-green-400 to-green-600 p-6 rounded-b-lg">
            {/* Additional content for Health can be added here */}
          </div>
        </div>

        {/* Box 3: Goals */}
        <div className="rounded-lg shadow-md overflow-hidden" onClick={() => navigate("/goals")}>
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-6 rounded-t-lg">
            <h2 className="text-2xl font-bold text-white mb-4">Goals</h2>
          </div>
          {/* Additional content for Goals can be added here */}
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-6 rounded-b-lg">
            {/* Additional content for Goals can be added here */}
          </div>
        </div>

        {/* Box 4: Reflections */}
        <div className="rounded-lg shadow-md overflow-hidden" onClick={() => navigate("/notes")}>
          <div className="bg-gradient-to-r from-purple-400 to-purple-600 p-6 rounded-t-lg">
            <h2 className="text-2xl font-bold text-white mb-4">Reflections</h2>
          </div>
          {/* Additional content for Reflections can be added here */}
          <div className="bg-gradient-to-r from-purple-400 to-purple-600 p-6 rounded-b-lg">
            {/* Additional content for Reflections can be added here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;