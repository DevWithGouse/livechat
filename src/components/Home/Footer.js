import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6">
      <div className="container mx-auto text-center">
        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6 mb-4">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebookF className="text-2xl hover:text-gray-400" />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="text-2xl hover:text-gray-400" />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-2xl hover:text-gray-400" />
          </a>
          <a href="https://www.linkedin.com/in/shaik-gouse-rahiman-460078144" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-2xl hover:text-gray-400" />
          </a>
        </div>

        {/* Copyright Text */}
        <p className="text-sm">
          &copy; {new Date().getFullYear()} by Live Room Chat. Powered and secured by{' '}
          <a href="https://www.linkedin.com/in/shaik-gouse-rahiman-460078144" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-400">
            Shaik Gouse Rahiman
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
