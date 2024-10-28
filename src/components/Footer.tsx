import React from 'react';
import { FaHeart } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-spotify-darkgray text-white py-2 text-center">
      <p className="flex items-center justify-center text-sm">
        Made with <FaHeart className="text-spotify-green mx-2" /> by Amarnath Reddy 
        <span className="mx-2">|</span> 
        © {new Date().getFullYear()} All rights reserved
      </p>
    </footer>
  );
};

export default Footer;
