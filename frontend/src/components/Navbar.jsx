import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Profile from './Profile';
import {ACCESS_TOKEN, REFRESH_TOKEN} from "../constants"
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate()
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {

  }, [localStorage.ACCESS_TOKEN])

  return (
    <div className="bg-gradient-to-br from-emerald-900 to-emerald-400">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-2xl font-semibold cursor-pointer" onClick={() => navigate("/")}>LITERATURE HOUSE</div>

        <div className='flex flex-col  items-center group hover:cursor-pointer' onClick={() => navigate("/mybooks")}>
        <div className="text-white text-xl">Books</div>
        <div className='hidden group-hover:block bg-white w-2 h-2 rounded-full'></div>
        </div>

        <div className='flex flex-col  items-center group hover:cursor-pointer' onClick={() => navigate("/notes")}>
        <div className="text-white text-xl">Notes</div>
        <div className='hidden group-hover:block bg-white w-2 h-2 rounded-full'></div>
        </div>


        {/* Account */}
        <div className="relative">
          {/* Profile Button */}
          <button onClick={toggleDropdown} className="text-white focus:outline-none">
            <Profile/>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
              {/* Example menu items */}
              <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-purple-200">My Profile</Link>
              <Link to="/settings" className="block px-4 py-2 text-gray-800 hover:bg-purple-200">Settings</Link>
              <button onClick={() => {
                localStorage.removeItem(ACCESS_TOKEN);
                localStorage.removeItem(REFRESH_TOKEN);
                navigate("/login")}} className="block px-4 py-2 text-gray-800 hover:bg-purple-200">Logout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;