import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  User,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const SeniorNavbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<"home" | "role" | "faq" | null>("home");
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isDropdownOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  const handleDropdownClose = () => setIsDropdownOpen(false);

  const handleSignOutClick = () => {
    handleDropdownClose();
    signOut();
    navigate("/senior-login");
  };

  const handleScrollToFAQ = () => {
    setActiveNav("faq");
    const faqSection = document.getElementById("senior-faq");
    if (faqSection) {
      faqSection.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/senior-home");
      setTimeout(() => {
        const faqSectionAfterNav = document.getElementById("senior-faq");
        if (faqSectionAfterNav) {
          faqSectionAfterNav.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);
    }
  };

  const handleScrollToRole = () => {
    setActiveNav("role");
    const roleSection = document.getElementById("senior-role");
    if (roleSection) {
      roleSection.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/senior-home");
      setTimeout(() => {
        const roleSectionAfterNav = document.getElementById("senior-role");
        if (roleSectionAfterNav) {
          roleSectionAfterNav.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);
    }
  };

  const handleScrollToHero = () => {
    setActiveNav("home");
    const heroSection = document.getElementById("senior-hero");
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/senior-home");
      setTimeout(() => {
        const heroSectionAfterNav = document.getElementById("senior-hero");
        if (heroSectionAfterNav) {
          heroSectionAfterNav.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out`}>
      <nav className={`transition-all duration-300 ease-in-out ${
        isScrolled
          ? "bg-white/95 backdrop-blur-lg shadow-xl border-b border-gray-200/50"
          : "bg-white/80 backdrop-blur-md shadow-lg border-b border-white/30"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo Section */}
            <Link
              to="/senior-home"
              className="flex items-center space-x-2 group cursor-pointer"
            >
              <div className="flex items-center space-x-2 group">
                <div className="relative">
                  <GraduationCap className="h-8 w-8 text-blue-500 group-hover:text-blue-600 transition-colors duration-200 transform -rotate-12" />
                </div>
                <div>
                  <h1 className="text-xl lg:text-2xl font-bold text-gray-800 group-hover:text-gray-900 transition-all duration-200">
                    <span className="bg-gradient-to-r from-blue-500 to-green-600 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-green-700">
                      Campus Connect
                    </span>
                  </h1>
                  <p className="text-xs text-green-600 -mt-1 font-medium">
                    Senior Dashboard
                  </p>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation - right aligned */}
            <div className="flex items-center space-x-6 ml-auto">
              <button
                type="button"
                onClick={handleScrollToHero}
                className={`relative bg-transparent outline-none border-none shadow-none font-medium py-2 px-3 group
                  ${activeNav === "home"
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600 transition-colors duration-200"}
                `}
                style={{ borderRadius: 0, boxShadow: "none" }}
              >
                Home
                <span className={`absolute bottom-0 left-3 h-0.5 bg-gradient-to-r from-blue-500 to-green-600 transition-all duration-300
                  ${activeNav === "home" ? "w-6" : "w-0 group-hover:w-6"}
                `}></span>
              </button>
              <button
                type="button"
                onClick={handleScrollToRole}
                className={`relative bg-transparent outline-none border-none shadow-none font-medium py-2 px-3 group
                  ${activeNav === "role"
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600 transition-colors duration-200"}
                `}
                style={{ borderRadius: 0, boxShadow: "none" }}
              >
                Your Role
                <span className={`absolute bottom-0 left-3 h-0.5 bg-gradient-to-r from-blue-500 to-green-600 transition-all duration-300
                  ${activeNav === "role" ? "w-6" : "w-0 group-hover:w-6"}
                `}></span>
              </button>
              <button
                type="button"
                onClick={handleScrollToFAQ}
                className={`relative bg-transparent outline-none border-none shadow-none font-medium py-2 px-3 group
                  ${activeNav === "faq"
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600 transition-colors duration-200"}
                `}
                style={{ borderRadius: 0, boxShadow: "none" }}
              >
                FAQ
                <span className={`absolute bottom-0 left-3 h-0.5 bg-gradient-to-r from-blue-500 to-green-600 transition-all duration-300
                  ${activeNav === "faq" ? "w-6" : "w-0 group-hover:w-6"}
                `}></span>
              </button>
              {/* Profile Dropdown */}
              <div className="relative group" ref={dropdownRef}>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-gray-700 hover:text-blue-600 font-semibold px-4 py-2 rounded-full transition-all duration-300 flex items-center border border-blue-200 bg-white"
                  onClick={() => setIsDropdownOpen((v) => !v)}
                  style={{
                    boxShadow: "0 2px 8px 0 rgba(34,197,94,0.08)",
                  }}
                >
                  <User className="mr-2 h-5 w-5 text-blue-500" />
                  <span className="pr-1">{user?.name || "Senior"}</span>
                </Button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-gray-200/30 z-50">
                    <div className="py-2">
                      <Link
                        to="/senior-profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50/80 hover:text-blue-600 transition-colors duration-200"
                        onClick={handleDropdownClose}
                      >
                        <User className="mr-2 h-4 w-4" />
                        My Profile
                      </Link>
                      <Link
                        to="/senior-edit-profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50/80 hover:text-blue-600 transition-colors duration-200"
                        onClick={handleDropdownClose}
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Link>
                      <hr className="my-1 border-gray-200" />
                      <button
                        onClick={handleSignOutClick}
                        className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50/80 transition-colors duration-200"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50/80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="py-4 px-2 space-y-2 bg-white/95 backdrop-blur-md border-t border-gray-200/30 rounded-b-lg shadow-lg">
              <Button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleScrollToHero();
                }}
                variant="ghost"
                className="nav-btn w-full text-left text-gray-700 hover:text-blue-600 font-medium py-3 transition-all duration-300"
              >
                Home
              </Button>
              <Button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleScrollToRole();
                }}
                variant="ghost"
                className="nav-btn w-full text-left text-gray-700 hover:text-blue-600 font-medium py-3 transition-all duration-300"
              >
                Your Role
              </Button>
              <Button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleScrollToFAQ();
                }}
                variant="ghost"
                className="nav-btn w-full text-left text-gray-700 hover:text-blue-600 font-medium py-3 transition-all duration-300"
              >
                FAQ
              </Button>
              <Link to="/senior-profile">
                <Button
                  onClick={() => setIsMobileMenuOpen(false)}
                  variant="ghost"
                  className="w-full text-left text-gray-700 hover:text-blue-600 font-medium py-3 transition-all duration-300"
                >
                  My Profile
                </Button>
              </Link>
              <Link to="/senior-edit-profile">
                <Button
                  onClick={() => setIsMobileMenuOpen(false)}
                  variant="ghost"
                  className="w-full text-left text-gray-700 hover:text-blue-600 font-medium py-3 transition-all duration-300"
                >
                  Settings
                </Button>
              </Link>
              <Button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleSignOutClick();
                }}
                variant="ghost"
                className="w-full text-red-600 hover:bg-red-50/80 font-medium py-3 transition-all duration-300"
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default SeniorNavbar;
