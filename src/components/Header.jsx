import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-3xl bg-linear-to-br from-[#010b13] to-[#2c3539] shadow-lg">

      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-linear-to-r from-[#536878] via-[#4b3621] to-[#696969] opacity-70 animate-pulse" />

      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4 border-b border-[#536878]/30">

        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="TravizorHub"
            className="w-10 h-10 object-contain drop-shadow-2xl"
          />
          <span className="text-2xl font-bold text-[#a8c2d6] tracking-wide">
            TravizorHub
          </span>
        </div>

        <nav className="hidden md:flex gap-8 text-lg font-medium">

          <Link
            to="/"
            className="text-[#f5f5fa] hover:text-[#bbe7fa] transition-colors duration-300"
          >
            Home
          </Link>

          <Link
            to="/get-started"
            className="text-[#f5f5fa] hover:text-[#bbe7fa] transition-colors duration-300"
          >
            Get Started
          </Link>

          <Link
            to="/services"
            className="text-[#f5f7fa] hover:text-[#bbe7fa] transition-colors duration-300"
          >
            Services
          </Link>

          <Link
            to="/about"
            className="text-[#f5f7fa] hover:text-[#bbe7fa] transition-colors duration-300"
          >
            About Us
          </Link>

          <Link
            to="/contact"
            className="text-[#f5f7fa] hover:text-[#bbe7fa] transition-colors duration-300"
          >
            Contact Us
          </Link>

        </nav>

      </div>
    </header>
  );
}

export default Header;