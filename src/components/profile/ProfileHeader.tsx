import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Menu, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Camera,
  Edit3,
  CheckCircle,
  MapPin,
  Settings,
  Flag,
} from "lucide-react";
import { JuniorProfile } from "@/pages/JuniorProfilePage";

interface ProfileHeaderProps {
  profile: JuniorProfile;
  isEditing: boolean;
  onEditToggle: () => void;
  onSettingsClick: () => void;
  onReportClick: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profile,
  isEditing,
  onEditToggle,
  onSettingsClick,
  onReportClick,
}) => {
  const { signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeLinkStyle = { color: "var(--foreground)", fontWeight: "600" };
  const navLinks = [
    { href: "/junior-home", text: "Home" },
    { href: "/connect-with-senior", text: "Connect" },
    { href: "/junior-profile", text: "Profile" },
  ];

  // Generate first letter from name
  const getFirstLetter = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  // Generate background color based on name
  const getAvatarColor = (name: string) => {
    const colors = [
      "bg-gradient-to-br from-purple-500 to-purple-600",
      "bg-gradient-to-br from-pink-500 to-pink-600",
      "bg-gradient-to-br from-blue-500 to-blue-600",
      "bg-gradient-to-br from-green-500 to-green-600",
      "bg-gradient-to-br from-yellow-500 to-yellow-600",
      "bg-gradient-to-br from-red-500 to-red-600",
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <>
      <header className="bg-card border-b shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              to="/junior-home"
              className="text-2xl font-poppins font-semibold text-foreground"
            >
              CampusConnect
            </Link>

            {/* --- THIS IS THE FIX --- */}
            <div className="hidden md:flex items-center gap-6">
              <nav className="flex items-center gap-6">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.href}
                    to={link.href}
                    className="font-medium text-muted-foreground hover:text-foreground transition-colors"
                    style={({ isActive }) =>
                      isActive ? activeLinkStyle : undefined
                    }
                  >
                    {link.text}
                  </NavLink>
                ))}
              </nav>
              <Button onClick={signOut} variant="secondary" size="sm">
                Sign Out
              </Button>
            </div>
            {/* --- END OF FIX --- */}

            <div className="md:hidden">
              <Button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                variant="ghost"
                size="icon"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
                <span className="sr-only">Open main menu</span>
              </Button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted"
                  style={({ isActive }) =>
                    isActive
                      ? { ...activeLinkStyle, backgroundColor: "var(--muted)" }
                      : undefined
                  }
                >
                  {link.text}
                </NavLink>
              ))}
              <div className="border-t pt-4 mt-4">
                <Button
                  onClick={signOut}
                  variant="secondary"
                  className="w-full"
                >
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>
      <Card className="shadow-lg border-0 overflow-hidden">
        {/* Cover Photo */}
        <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 h-32 relative">
          <div className="absolute top-4 right-4 flex gap-2">
            {!isEditing && (
              <>
                <Button
                  onClick={onEditToggle}
                  variant="secondary"
                  size="sm"
                  className="bg-white/90 hover:bg-white text-gray-700"
                >
                  <Edit3 className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
                <Button
                  onClick={onSettingsClick}
                  variant="secondary"
                  size="sm"
                  className="bg-white/90 hover:bg-white text-gray-700"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
                <Button
                  onClick={onReportClick}
                  variant="secondary"
                  size="sm"
                  className="bg-white/90 hover:bg-white text-red-600 hover:text-red-700"
                >
                  <Flag className="mr-2 h-4 w-4" />
                  Report
                </Button>
              </>
            )}
          </div>
        </div>

        <CardContent className="relative pt-0 pb-6">
          {/* Profile Picture */}
          <div className="flex justify-center -mt-16 mb-6">
            <div className="relative">
              <div
                className={`w-24 h-24 rounded-full ${getAvatarColor(
                  profile.name
                )} flex items-center justify-center text-white font-bold text-2xl shadow-lg border-4 border-white`}
              >
                {getFirstLetter(profile.name)}
              </div>
              <Button
                size="sm"
                className="absolute bottom-0 right-0 w-8 h-8 rounded-full p-0 bg-blue-600 hover:bg-blue-700"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Basic Info */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {profile.name}
            </h1>
            <div className="flex items-center justify-center gap-2 mb-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-green-600 font-medium">
                Verified Student
              </span>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mb-4">
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                {profile.branch}
              </span>
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                {profile.year}
              </span>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                Roll: {profile.rollNumber}
              </span>
            </div>

            <div className="flex items-center justify-center gap-1 text-gray-600 mb-4">
              <MapPin className="h-4 w-4" />
              <span>
                {profile.nativePlace}, {profile.state}
              </span>
            </div>

            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {profile.bio}
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ProfileHeader;
