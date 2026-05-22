import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter } from "lucide-react";

function Footer() {
  return (
    <footer className="relative w-full bg-linear-to-br from-[#010b13] to-[#2c3539] shadow-xl py-2 px-6">
      <div className="absolute top-0 left-0 w-full h-0.5 bg-linear-to-r from-[#536878] via-[#4b3621] to-[#696969] opacity-70 animate-pulse" />
      
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-4 items-center text-center text-[13px] text-[#f5f7fa]">
        
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="TravizorHub" className="w-7 h-7" />
            <span className="text-lg font-semibold text-[#a8c2d6]">TravizorHub</span>
          </div>
          <p className="text-xs text-[#a8c2d6]">Smart travel planning made simple</p>
        </div>

        <div className="flex flex-col items-center gap-1">
          <h3 className="text-[#a8c2d6] font-medium text-[13px]">Quick Links</h3>
          <div className="flex gap-4 flex-wrap justify-center text-[13px]">
            <Link to="/get-started" className="hover:text-[#ffffff] transition-colors duration-300">Get Started</Link>
            <Link to="/services" className="hover:text-[#ffffff] transition-colors duration-300">Services</Link>
            <Link to="/about" className="hover:text-[#ffffff] transition-colors duration-300">About Us</Link>
          </div>
        </div>

        <div className="flex flex-col items-center gap-1">
          <h3 className="text-[#a8c2d6] font-medium text-[13px]">Follow Us</h3>
          <div className="flex gap-3 text-lg">
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              <Instagram className="hover:text-[#ffffff] cursor-pointer transition-colors duration-300" />
            </a>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
              <Facebook className="hover:text-[#ffffff] cursor-pointer transition-colors duration-300" />
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
              <Twitter className="hover:text-[#ffffff] cursor-pointer transition-colors duration-300" />
            </a>
          </div>
        </div>

      </div>

      <div className="text-center text-[10px] mt-0.5 text-[#ffffff]">
        © {new Date().getFullYear()} TravizorHub. All Rights Reserved.
      </div>
    </footer>
  );
}
export default Footer;