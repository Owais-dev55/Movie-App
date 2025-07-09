// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaBookmark, FaBars } from "react-icons/fa";

const Navbar = () => {
  return (
    <header className="bg-[#2C1B1B] text-white px-6 py-3 flex items-center justify-between shadow-md">
      {/* Left: Logo and Links */}
      <div className="flex items-center gap-6">
        {/* Logo */}
        <div className="flex items-center gap-2 font-bold text-lg">
          <FaBars />
          <span>CineScope</span>
        </div>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-4 text-sm font-medium">
          <Link to="/">Home</Link>
          <Link to="/movies">Movies</Link>
          <Link to="/tv">TV Shows</Link>
          <Link to="/people">People</Link>
        </nav>
      </div>

      {/* Right: Search, Saved Icon, Profile */}
      <div className="flex items-center gap-4">
        {/* Search Box */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="bg-[#3E2B2B] text-white rounded-full px-4 py-1.5 pl-8 text-sm focus:outline-none"
          />
          <FaSearch className="absolute top-2.5 left-2.5 text-sm text-white" />
        </div>

        {/* Saved Icon */}
        <Link to="/favorites" title="Saved">
          <FaBookmark className="text-lg hover:text-yellow-400" />
        </Link>

        {/* Profile Avatar */}
        <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white">
          <img
            src="https://i.pravatar.cc/40" // Replace with real avatar if needed
            alt="User"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
