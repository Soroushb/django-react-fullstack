import React from 'react';
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-12">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl font-bold">My Application</h1>
          <p className="text-gray-400">Your tagline goes here</p>
        </div>
        <div className="flex space-x-4 mb-4 md:mb-0">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition">
            <FaTwitter size={24} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition">
            <FaLinkedin size={24} />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-500 transition">
            <FaGithub size={24} />
          </a>
        </div>
        <div className="text-gray-400 text-center md:text-right">
          <p>&copy; {new Date().getFullYear()} My Application. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
