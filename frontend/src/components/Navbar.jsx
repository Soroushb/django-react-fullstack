import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Profile from './Profile';
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // To reference the dropdown
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const checkUser = async () => {
    const user = await localStorage.getItem(ACCESS_TOKEN);
    setIsLoggedin(!!user); 
  };

  useEffect(() => {
    checkUser(); 
  }, []);

  // Listen for clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false); // Close dropdown when clicking outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    setIsLoggedin(false); 
    navigate("/login");
  };

  return (
    <div className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="font-primary text-white p-2 text-2xl cursor-pointer" onClick={() => {navigate("/dashboard"); setIsDropdownOpen(false)}}>Goal-Tracker</div>

        {isLoggedin ? (
          <div className="relative" ref={dropdownRef}>
            <div className='flex'>
              <button onClick={toggleDropdown} className="text-white scale-75 lg:scale-100 focus:outline-none">
                <Profile />
              </button>
            </div>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                <Link onClick={() => setIsDropdownOpen(false)} to="/dashboard" className="block px-4 py-2 text-gray-800 text-xl font-secondary hover:bg-purple-200">Dashboard</Link>
                <Link onClick={() => setIsDropdownOpen(false)} to="/goals" className="block px-4 py-2 text-gray-800 text-xl font-secondary hover:bg-purple-200">Progress Monitor</Link>
                <Link onClick={() => setIsDropdownOpen(false)} to="/deadlines" className="block px-4 py-2 text-gray-800 text-xl font-secondary hover:bg-purple-200">Goals & Deadlines</Link>
                <Link onClick={() => setIsDropdownOpen(false)} to="/books" className="block px-4 py-2 text-gray-800 text-xl font-secondary hover:bg-purple-200">Book Search</Link>
                <Link onClick={() => setIsDropdownOpen(false)} to="/mybooks" className="block px-4 py-2 text-gray-800 text-xl font-secondary hover:bg-purple-200">Your Library</Link>
                <Link onClick={() => setIsDropdownOpen(false)} to="/notes" className="block px-4 py-2 text-gray-800 text-xl font-secondary hover:bg-purple-200">Notes</Link>
                <button onClick={handleLogout} className="block px-4 py-2 text-gray-800 text-xl font-secondary hover:bg-purple-200">Logout</button>
              </div>
            )}
          </div>
        ) : (
          <button onClick={() => navigate("/register")} className='text-slate-900 font-secondary text-lg p-2 bg-gray-200 rounded-md'>Sign Up</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
