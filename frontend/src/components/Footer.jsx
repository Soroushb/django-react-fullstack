import React from 'react';
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-12 ">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl font-primary font-bold">UVSU</h1>
          <p className="text-gray-400 font-secondary">Compare yourself to yourself.</p>
        </div>
        <div className="flex space-x-4 mb-4 md:mb-0">
          <a href="https://www.linkedin.com/in/soroush-bahrami-ba691b19b" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition">
            <FaLinkedin size={24} />
          </a>
          <a href="https://github.com/soroushb" target="_blank" rel="noopener noreferrer" className="hover:text-gray-500 transition">
            <FaGithub size={24} />
          </a>
        </div>
        <div className="text-gray-400 text-center md:text-right">
          <p>&copy; {new Date().getFullYear()} UVSU. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
    