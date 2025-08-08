import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, User, LogOut, Menu, X, Users } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface ConnectNavbarProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

const ConnectNavbar: React.FC<ConnectNavbarProps> = ({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg shadow-xl border-b border-gray-200/50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left Section - Back to Home */}
          <div className="flex items-center space-x-4">
            <Link
              to="/junior-home"
              className="flex items-center space-x-2 group"
            >
              <ArrowLeft className="h-5 w-5 text-purple-600 group-hover:text-purple-700 transition-colors" />
              <span className="text-purple-600 group-hover:text-purple-700 font-medium">
                Back to Home
              </span>
            </Link>
          </div>

          {/* Center Section - Logo */}
          <div className="flex items-center space-x-2">
            <Users className="h-8 w-8 text-purple-600" />
            <div className="text-center">
              <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Connect with Seniors
              </h1>
              <p className="text-xs text-gray-600 -mt-1">
                Find your perfect mentor
              </p>
            </div>
          </div>

          {/* Right Section - User Menu */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link to="/junior-home">
              <Button
                size="sm"
                variant="ghost"
                className="text-gray-700 hover:text-purple-600 rounded-full"
              >
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
            </Link>

            {/* User Profile Menu */}
            <div className="relative group">
              <Button
                size="sm"
                variant="ghost"
                className="text-gray-700 hover:text-purple-600 font-medium px-3 py-2 rounded-full transition-all duration-300 hover:bg-purple-50/80"
              >
                <User className="mr-2 h-4 w-4" />
                {user?.name || "Profile"}
              </Button>

              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-lg shadow-xl border border-gray-200/30 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="py-2">
                  {/* FIXED: Changed from /profile to /junior-profile */}
                  <Link
                    to="/junior-profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50/80 hover:text-purple-600 transition-colors duration-200"
                  >
                    <User className="inline mr-2 h-4 w-4" />
                    My Profile
                  </Link>
                  <hr className="my-1 border-gray-200" />
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50/80 transition-colors duration-200"
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
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-700 hover:text-purple-600 hover:bg-purple-50/80 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 px-2 space-y-2 bg-white/95 backdrop-blur-md border-t border-gray-200/30 rounded-b-lg shadow-lg">
            <Link to="/junior-home">
              <Button
                onClick={() => setIsMobileMenuOpen(false)}
                variant="ghost"
                className="w-full text-left text-gray-700 hover:text-purple-600 font-medium py-3 rounded-lg transition-all duration-300 hover:bg-purple-50/80"
              >
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>

            {/* FIXED: Changed from /profile to /junior-profile */}
            <Link to="/junior-profile">
              <Button
                onClick={() => setIsMobileMenuOpen(false)}
                variant="ghost"
                className="w-full text-left text-gray-700 hover:text-purple-600 font-medium py-3 rounded-lg transition-all duration-300 hover:bg-purple-50/80"
              >
                <User className="mr-2 h-4 w-4" />
                My Profile
              </Button>
            </Link>

            <Button
              onClick={() => {
                handleSignOut();
                setIsMobileMenuOpen(false);
              }}
              variant="ghost"
              className="w-full text-left text-red-600 hover:bg-red-50/80 font-medium py-3 rounded-lg transition-all duration-300"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default ConnectNavbar;
