import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";

interface NavbarProps {
  onLoginClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLoginClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Account for navbar height when scrolling
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        isScrolled
          ? "bg-white backdrop-blur-md shadow-lg border-b border-gray-100"
          : "bg-white backdrop-blur-sm shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Section */}
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => scrollToSection("hero")}>
            <div className="relative">
              <GraduationCap className="h-9 w-9 text-pink-500 group-hover:text-pink-600 transition-all duration-300 transform -rotate-12 group-hover:-rotate-6 group-hover:scale-110" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-black tracking-tight">
                <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 bg-clip-text text-transparent group-hover:from-pink-600 group-hover:via-purple-600 group-hover:to-indigo-700 transition-all duration-300">
                  C
                </span>
                <span className="text-gray-800 group-hover:text-gray-900 transition-colors duration-300 font-bold">
                  ampus
                </span>{" "}
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300">
                  Connect
                </span>
              </h1>
              <p className="text-xs text-gray-500 -mt-1 group-hover:text-gray-600 transition-colors duration-300 font-medium tracking-wide">
                where stories begin ✨
              </p>
            </div>
          </div>

          {/* Right side container for navigation and login button */}
          <div className="flex items-center space-x-8">
            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1">
              <button
                onClick={() => scrollToSection("hero")}
                className="relative px-4 py-2 text-gray-700 hover:text-pink-600 transition-all duration-300 font-medium rounded-lg hover:bg-pink-50/80 group focus:outline-none"
              >
                Home
                <span className="absolute bottom-1 left-1/2 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-600 group-hover:w-6 group-hover:left-1/2 group-hover:-translate-x-1/2 transition-all duration-300 rounded-full"></span>
              </button>
              <button
                onClick={() => scrollToSection("admissions-update")}
                className="relative px-4 py-2 text-gray-700 hover:text-pink-600 transition-all duration-300 font-medium rounded-lg hover:bg-pink-50/80 group focus:outline-none"
              >
                Addmission Updates
                <span className="absolute bottom-1 left-1/2 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-600 group-hover:w-6 group-hover:left-1/2 group-hover:-translate-x-1/2 transition-all duration-300 rounded-full"></span>
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="relative px-4 py-2 text-gray-700 hover:text-pink-600 transition-all duration-300 font-medium rounded-lg hover:bg-pink-50/80 group focus:outline-none"
              >
                About Us
                <span className="absolute bottom-1 left-1/2 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-600 group-hover:w-6 group-hover:left-1/2 group-hover:-translate-x-1/2 transition-all duration-300 rounded-full"></span>
              </button>
              
              <button
                onClick={() => scrollToSection("cta")}
                className="relative px-4 py-2 text-gray-700 hover:text-pink-600 transition-all duration-300 font-medium rounded-lg hover:bg-pink-50/80 group focus:outline-none"
              >
                Join Us
                <span className="absolute bottom-1 left-1/2 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-600 group-hover:w-6 group-hover:left-1/2 group-hover:-translate-x-1/2 transition-all duration-300 rounded-full"></span>
              </button>
            </div>

            {/* Desktop Login Button */}
            <div className="hidden lg:flex">
              <button
                onClick={onLoginClick}
                className="relative overflow-hidden bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold px-6 py-2.5 rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2 group"
              >
                <span className="relative z-10">Login / Sign Up</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-gray-700 hover:text-pink-600 hover:bg-pink-50/80 focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all duration-300"
              aria-label="Toggle mobile menu"
            >
              <div className="relative w-6 h-6">
                <span
                  className={`absolute top-0 left-0 w-6 h-0.5 bg-current transform transition-all duration-300 rounded-full ${
                    isMobileMenuOpen ? "rotate-45 translate-y-2.5" : ""
                  }`}
                ></span>
                <span
                  className={`absolute top-2.5 left-0 w-6 h-0.5 bg-current transition-all duration-300 rounded-full ${
                    isMobileMenuOpen ? "opacity-0" : ""
                  }`}
                ></span>
                <span
                  className={`absolute top-5 left-0 w-6 h-0.5 bg-current transform transition-all duration-300 rounded-full ${
                    isMobileMenuOpen ? "-rotate-45 -translate-y-2.5" : ""
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-400 ease-out ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 px-2 space-y-2 bg-white/95 backdrop-blur-md border-t border-gray-100 rounded-b-2xl shadow-lg">
            <button
              onClick={() => scrollToSection("hero")}
              className="block w-full text-left px-4 py-3 text-gray-700 hover:text-pink-600 hover:bg-pink-50/80 rounded-xl font-medium transition-all duration-300 focus:outline-none"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="block w-full text-left px-4 py-3 text-gray-700 hover:text-pink-600 hover:bg-pink-50/80 rounded-xl font-medium transition-all duration-300 focus:outline-none"
            >
              About Us
            </button>
            <button
              onClick={() => scrollToSection("verification")}
              className="block w-full text-left px-4 py-3 text-gray-700 hover:text-pink-600 hover:bg-pink-50/80 rounded-xl font-medium transition-all duration-300 focus:outline-none"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="block w-full text-left px-4 py-3 text-gray-700 hover:text-pink-600 hover:bg-pink-50/80 rounded-xl font-medium transition-all duration-300 focus:outline-none"
            >
              Contact
            </button>
            <div className="pt-2 px-2">
              <button
                onClick={() => {
                  onLoginClick?.();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-pink-300"
              >
                Login / Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;