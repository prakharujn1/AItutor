import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg bg-purple-300">
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">

          {/* Logo and Title */}
          <div className="flex items-center gap-2">
            <img src="/AGILITYAI.png" alt="AgilityAI" className="w-12 h-12 object-contain rounded-3xl" />
            <h1 className="text-2xl font-bold text-gray-700">Edgility</h1>
          </div>

          {/* Navigation Links */}
          <ul className="hidden lg:flex ml-14 space-x-10 text-[#F5FCE1] font-medium text-lg">
            <li>
              <Link to="/" className="hover:text-gray-800">Home</Link>
            </li>
            <li>
              <Link to="/overview" className="hover:text-gray-800">Overview</Link>
            </li>
            <li>
              <Link to="/features" className="hover:text-gray-800">Features</Link>
            </li>
          </ul>

          {/* Explore Button */}
          <div className="hidden lg:flex justify-center space-x-12 items-center">
            <Link
              to="/chatbot"
              className="py-2 px-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg text-white font-bold text-base hover:cursor-pointer"
            >
              Explore
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileDrawerOpen && (
          <div className="fixed right-0 z-20 bg-purple-400 w-full p-12 flex flex-col justify-center items-center lg:hidden">
            <ul className="flex flex-col space-y-4 text-[#F5FCE1]">
              <li>
                <Link to="/" className="hover:text-gray-800">Home</Link>
              </li>
              <li>
                <Link to="/overview" className="hover:text-gray-800">Overview</Link>
              </li>
              <li>
                <Link to="/features" className="hover:text-gray-800">Features</Link>
              </li>
            </ul>
            <div className="flex space-x-6 mt-4">
              <Link
                to="/chatbot"
                className="py-2 px-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg text-white font-semibold hover:cursor-pointer"
              >
                Explore
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>

  );
}

export default Navbar
