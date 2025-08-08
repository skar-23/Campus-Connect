import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  Menu,
  X,
  User,
  Settings,
  LogOut,
  Home,
  UserCheck,
  MessageSquare,
  HelpCircle,
} from "lucide-react";

const SeniorNavbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg shadow-xl border-b border-gray-200/50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/senior-home" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CC</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Campus Connect
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              to="/senior-home"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Dashboard
            </Link>
            <Link
              to="/senior-mentees"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              My Mentees
            </Link>
            <Link
              to="/senior-messages"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Messages
            </Link>
            <Link
              to="/senior-profile"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Profile
            </Link>
          </div>

          {/* Desktop Profile Dropdown */}
          <div className="hidden lg:flex items-center space-x-3">
            <div className="relative group">
              <Button
                size="sm"
                variant="ghost"
                className="text-gray-700 hover:text-blue-600 font-medium px-3 py-2 rounded-full transition-all duration-300 hover:bg-blue-50/80"
              >
                <User className="mr-2 h-4 w-4" />
                {user?.name || "Senior"}
              </Button>

              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-lg shadow-xl border border-gray-200/30 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="py-2">
                  <Link
                    to="/senior-profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50/80 hover:text-blue-600 transition-colors duration-200"
                  >
                    <User className="inline mr-2 h-4 w-4" />
                    My Profile
                  </Link>
                  <Link
                    to="/senior-settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50/80 hover:text-blue-600 transition-colors duration-200"
                  >
                    <Settings className="inline mr-2 h-4 w-4" />
                    Settings
                  </Link>
                  <hr className="my-1 border-gray-200" />
                  <button
                    onClick={signOut}
                    className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50/80 transition-colors duration-200"
                  >
                    <LogOut className="inline mr-2 h-4 w-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              variant="ghost"
              size="sm"
              className="text-gray-700 hover:text-blue-600"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 px-2 space-y-2 bg-white/95 backdrop-blur-md border-t border-gray-200/30 rounded-b-lg shadow-lg">
            <Link to="/senior-home">
              <Button
                onClick={() => setIsMobileMenuOpen(false)}
                variant="ghost"
                className="w-full text-left text-gray-700 hover:text-blue-600 font-medium py-3 rounded-lg transition-all duration-300 hover:bg-blue-50/80"
              >
                <Home className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>

            <Link to="/senior-profile">
              <Button
                onClick={() => setIsMobileMenuOpen(false)}
                variant="ghost"
                className="w-full text-left text-gray-700 hover:text-blue-600 font-medium py-3 rounded-lg transition-all duration-300 hover:bg-blue-50/80"
              >
                <User className="mr-2 h-4 w-4" />
                My Profile
              </Button>
            </Link>

            <Link to="/senior-mentees">
              <Button
                onClick={() => setIsMobileMenuOpen(false)}
                variant="ghost"
                className="w-full text-left text-gray-700 hover:text-blue-600 font-medium py-3 rounded-lg transition-all duration-300 hover:bg-blue-50/80"
              >
                <UserCheck className="mr-2 h-4 w-4" />
                My Mentees
              </Button>
            </Link>

            <Link to="/senior-messages">
              <Button
                onClick={() => setIsMobileMenuOpen(false)}
                variant="ghost"
                className="w-full text-left text-gray-700 hover:text-blue-600 font-medium py-3 rounded-lg transition-all duration-300 hover:bg-blue-50/80"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Messages
              </Button>
            </Link>

            <Link to="/senior-faq">
              <Button
                onClick={() => setIsMobileMenuOpen(false)}
                variant="ghost"
                className="w-full text-left text-gray-700 hover:text-blue-600 font-medium py-3 rounded-lg transition-all duration-300 hover:bg-blue-50/80"
              >
                <HelpCircle className="mr-2 h-4 w-4" />
                Help & FAQ
              </Button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default SeniorNavbar;
