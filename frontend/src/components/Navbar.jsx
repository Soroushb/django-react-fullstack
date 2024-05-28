import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Profile from './Profile';
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"
import { useNavigate } from 'react-router-dom';
import { IoIosMenu } from "react-icons/io";

const Navbar = () => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const checkUser = () => {
    const user = localStorage.getItem(ACCESS_TOKEN);
    setIsLoggedin(!!user); 
  };

  useEffect(() => {
    checkUser(); 
  }, []);

  useEffect(() => {
    checkUser(); 
  }, [localStorage.getItem(ACCESS_TOKEN)]);

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    setIsLoggedin(false); 
    navigate("/login");
  };

  console.log(localStorage.getItem(ACCESS_TOKEN))

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="text-gray-900 border-2 border-gray-800 p-2 text-2xl font-semibold cursor-pointer" onClick={() => navigate("/")}>UVSU</div>

        {isLoggedin && (
          <>
            <div className="lg:hidden scale-150">
              <IoIosMenu onClick={() => setShowMobileMenu(!showMobileMenu)}/>
              {showMobileMenu && (
                <div>
                <div className="absolute right-0 mt-2 w-18 bg-white rounded-lg shadow-lg py-2">
                <Link to="/profile" className="block px-4 text-xs py-2 text-gray-800 hover:bg-purple-200">Profile</Link>
                <Link to="/goals" className="block px-4 text-xs py-2 text-gray-800 hover:bg-purple-200">Goal Log</Link>
                <Link to="/deadlines" className="block px-4 text-xs py-2 text-gray-800 hover:bg-purple-200">Deadlines</Link>
                <Link to="/mybooks" className="block px-4 text-xs py-2 text-gray-800 hover:bg-purple-200">Books</Link>
                <button onClick={handleLogout} className="block text-xs px-4 py-2 text-gray-800 hover:bg-purple-200">Logout</button>
              </div>
                </div>
              )}
              
            </div>
            <div className='lg:flex w-full items-center justify-between px-40 hidden'>

            <div className='flex flex-col items-center group hover:cursor-pointer' onClick={() => navigate("/books")}>
              <div className="text-gray-700 text-xl">Book Search</div>
              <div className='hidden group-hover:block bg-gray-700 w-2 h-2 rounded-full'></div>
            </div>

            <div className='flex flex-col items-center group hover:cursor-pointer' onClick={() => navigate("/mybooks")}>
              <div className="text-gray-700 text-xl">My Books</div>
              <div className='hidden group-hover:block bg-gray-700 w-2 h-2 rounded-full'></div>
            </div>

            <div className='flex flex-col items-center group hover:cursor-pointer' onClick={() => navigate("/notes")}>
              <div className="text-gray-700 text-xl">Notes</div>
              <div className='hidden group-hover:block bg-gray-700 w-2 h-2 rounded-full'></div>
            </div>

            <div className='flex flex-col items-center group hover:cursor-pointer' onClick={() => navigate("/goals")}>
              <div className="text-gray-700 text-xl">Goal Logs</div>
              <div className='hidden group-hover:block bg-gray-700 w-2 h-2 rounded-full'></div>
            </div>

            <div className='flex flex-col items-center group hover:cursor-pointer' onClick={() => navigate("/deadlines")}>
              <div className="text-gray-700 text-xl">Deadlines</div>
              <div className='hidden group-hover:block bg-gray-700 w-2 h-2 rounded-full'></div>
            </div>
          


            <div className="relative">
          <button onClick={toggleDropdown} className="text-white focus:outline-none">
            <Profile />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
              <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-purple-200">My Profile</Link>
              <Link to="/settings" className="block px-4 py-2 text-gray-800 hover:bg-purple-200">Settings</Link>
              <button onClick={handleLogout} className="block px-4 py-2 text-gray-800 hover:bg-purple-200">Logout</button>
            </div>
          )}
        </div>
        </div>
          </>
        )}

        
      </div>
    </div>
  );
};

export default Navbar;