import {useEffect, useState} from 'react';
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


  return (
  
    <div className="container mx-auto mt-10 ">
<div className="flex items-center bg-gray-200 p-10 rounded-md h-screen">
      {/* Avatar */}
      <div className="w-16 h-16 rounded-full overflow-hidden">
        <img className="object-cover w-full h-full" src={baseURL + profile?.picture} width="20px" height={20} alt="Avatar" />
      </div>

      {/* Bio Text */}
      <div className="flex flex-col">

        <div className='self-start'>
        <div>
        <h1 className="text-3xl font-secondary">Username: </h1>
        <h1 className="text-3xl font-secondary font-bold">{username}</h1>
        </div>
        <div className='mt-4'>
        <h1 className="text-3xl font-secondary">Bio: </h1>
        <p className="text-gray-800 font-secondary font-xl">{profile?.bio}</p>
        </div>
        </div>
      
      </div>
    </div>
      
    </div>
  );
};

export default Account;