import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { 
  GraduationCap, 
  Users, 
  HelpCircle, 
  BookOpen,
  User,
  LogOut,
  Menu,
  X,
  Settings as SettingsIcon
} from "lucide-react";

const JuniorNavbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  // Scroll effects for navbar appearance and visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Update scrolled state for background opacity
      setIsScrolled(currentScrollY > 50);
      
      // Clear existing timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      
      // Show navbar at the very top
      if (currentScrollY < 10) {
        setIsNavbarVisible(true);
      } 
      // Hide navbar when scrolling down with delay
      else if (currentScrollY > lastScrollY && currentScrollY > 150) {
        // Scrolling down - add delay before hiding
        const timeout = setTimeout(() => {
          if (!isHovering && window.scrollY > lastScrollY) {
            setIsNavbarVisible(false);
          }
        }, 800); // 800ms delay before hiding
        setScrollTimeout(timeout);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show immediately
        setIsNavbarVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [lastScrollY, isHovering, scrollTimeout]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        isNavbarVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
      onMouseEnter={() => {
        setIsHovering(true);
        setIsNavbarVisible(true);
      }}
      onMouseLeave={() => {
        setIsHovering(false);
      }}
    >
      <nav className={`transition-all duration-300 ease-in-out ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-xl border-b border-gray-200/50' 
          : 'bg-white/80 backdrop-blur-md shadow-lg border-b border-white/30'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo Section */}
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => scrollToSection("junior-hero")}>
              <div className="flex items-center space-x-2 group">
                <div className="relative">
                  <GraduationCap className="h-8 w-8 text-pink-500 group-hover:text-pink-600 transition-colors duration-200 transform -rotate-12" />
                </div>
                <div>
                  <h1 className="text-xl lg:text-2xl font-bold text-gray-800 group-hover:text-gray-900 transition-all duration-200">
                    <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent group-hover:from-pink-600 group-hover:to-purple-700">
                      Campus Connect
                    </span>
                  </h1>
                  <p className="text-xs text-purple-600 -mt-1 font-medium">
                    Junior Dashboard
                  </p>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              <button
                onClick={() => scrollToSection("junior-hero")}
                className="relative text-gray-700 hover:text-pink-600 transition-colors duration-200 font-medium py-2 px-3 rounded-lg hover:bg-pink-50/80 group"
              >
                Home
                <span className="absolute bottom-0 left-3 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-600 group-hover:w-6 transition-all duration-300"></span>
              </button>
              
              <button
                onClick={() => scrollToSection("services")}
                className="relative text-gray-700 hover:text-pink-600 transition-colors duration-200 font-medium py-2 px-3 rounded-lg hover:bg-pink-50/80 group"
              >
                Services
                <span className="absolute bottom-0 left-3 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-600 group-hover:w-6 transition-all duration-300"></span>
              </button>
              
              <button
                onClick={() => scrollToSection("benefits")}
                className="relative text-gray-700 hover:text-pink-600 transition-colors duration-200 font-medium py-2 px-3 rounded-lg hover:bg-pink-50/80 group"
              >
                Benefits
                <span className="absolute bottom-0 left-3 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-600 group-hover:w-6 transition-all duration-300"></span>
              </button>
              
              <button
                onClick={() => scrollToSection("faq")}
                className="relative text-gray-700 hover:text-pink-600 transition-colors duration-200 font-medium py-2 px-3 rounded-lg hover:bg-pink-50/80 group"
              >
                FAQ
                <span className="absolute bottom-0 left-3 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-600 group-hover:w-6 transition-all duration-300"></span>
              </button>
            </div>

            {/* Quick Action Buttons - Desktop */}
            <div className="hidden lg:flex items-center space-x-3">
              <Link to="/connect">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-medium px-4 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  <Users className="mr-2 h-4 w-4" />
                  Connect
                </Button>
              </Link>

              {/* User Profile Menu */}
              <div className="relative group">
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-gray-700 hover:text-purple-600 font-medium px-3 py-2 rounded-full transition-all duration-300 hover:bg-purple-50/80 flex items-center"
                >
                  <User className="mr-2 h-4 w-4" />
                  {user?.name || "Profile"}
                </Button>
                
                {/* Profile Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-52 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-gray-200/30 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="py-2">
                    <Link
                      to="/junior-profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-purple-50/80 hover:text-purple-600 transition-colors duration-200"
                    >
                      <User className="mr-2 h-4 w-4" />
                      My Profile
                    </Link>
                    <Link
                      to="/junior/edit"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-purple-50/80 hover:text-purple-600 transition-colors duration-200"
                    >
                      <SettingsIcon className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                    <hr className="my-1 border-gray-200" />
                    <button
                      onClick={handleSignOut}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50/80 transition-colors duration-200"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
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
                className="p-2 rounded-lg text-gray-700 hover:text-pink-600 hover:bg-pink-50/80 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-all duration-200"
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
              isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="py-4 px-2 space-y-2 bg-white/95 backdrop-blur-md border-t border-gray-200/30 rounded-b-lg shadow-lg">
              
              {/* Mobile Navigation Links */}
              <button
                onClick={() => scrollToSection("junior-hero")}
                className="block w-full text-left px-4 py-3 text-gray-700 hover:text-pink-600 hover:bg-pink-50/80 rounded-lg font-medium transition-all duration-200"
              >
                Home
              </button>
              
              <button
                onClick={() => scrollToSection("services")}
                className="block w-full text-left px-4 py-3 text-gray-700 hover:text-pink-600 hover:bg-pink-50/80 rounded-lg font-medium transition-all duration-200"
              >
                Services
              </button>
              
              <button
                onClick={() => scrollToSection("benefits")}
                className="block w-full text-left px-4 py-3 text-gray-700 hover:text-pink-600 hover:bg-pink-50/80 rounded-lg font-medium transition-all duration-200"
              >
                Benefits
              </button>
              
              <button
                onClick={() => scrollToSection("faq")}
                className="block w-full text-left px-4 py-3 text-gray-700 hover:text-pink-600 hover:bg-pink-50/80 rounded-lg font-medium transition-all duration-200"
              >
                FAQ
              </button>

              <hr className="my-2 border-gray-200/50" />

              {/* Mobile Action Buttons */}
              <div className="space-y-2 px-2">
                <Link to="/connect">
                  <Button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-medium py-3 rounded-lg transition-all duration-300 shadow-md"
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Connect with Seniors
                  </Button>
                </Link>

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
                  className="w-full text-red-600 hover:bg-red-50/80 font-medium py-3 rounded-lg transition-all duration-300"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default JuniorNavbar;