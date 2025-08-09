import React from "react";
import { ArrowLeft, User, Edit, Flag, Phone, MessageCircle, GraduationCap, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Dummy profile data
const dummyProfile = {
  name: "Aarav Sharma",
  gender: "Male",
  email: "aarav.sharma@email.com",
  phone: "+91 98765 43210",
  year: "1st Year",
};

const JuniorProfilePage: React.FC = () => {
  const profile = dummyProfile;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/junior-home">
              <Button
                variant="ghost"
                className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 transition-all duration-200 font-medium"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  My Profile
                </h1>
                <p className="text-sm text-gray-500">
                  View your personal details and contact options
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-200">
              <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-emerald-700">Active</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16 pb-12 flex-1">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Profile Header Card */}
          <Card className="mb-8 overflow-hidden shadow-lg">
            {/* Cover Image */}
            <div className="h-28 bg-gradient-to-r from-purple-400 to-pink-400"></div>
            <CardContent className="px-6 pb-6">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-14">
                {/* Avatar and Basic Info */}
                <div className="flex flex-col md:flex-row md:items-end gap-4 mb-6 md:mb-0">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-3xl font-bold border-4 border-white shadow-lg">
                    {profile.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-center md:text-left">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">
                      {profile.name}
                    </h1>
                    {/* Styled year and member info like senior page */}
                    <div className="flex flex-col items-center md:items-start gap-1 mb-2">
                      <div className="flex items-center gap-2 bg-purple-100 px-3 py-1 rounded-full">
                        <GraduationCap className="h-4 w-4 text-purple-700" />
                        <span className="text-base font-bold text-purple-800">
                          {profile.year} Student
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 font-medium mt-1">
                        Junior Member
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600 justify-center md:justify-start mt-2">
                      <User className="h-4 w-4" />
                      {profile.email}
                    </div>
                  </div>
                </div>
                {/* Only one button: Settings (was Edit Profile) */}
                <div className="flex gap-2">
                  <Link to="/junior/edit">
                    <Button
                      variant="outline"
                      className="border-gray-300 text-gray-700 hover:bg-pink-50 hover:text-pink-700 hover:border-pink-300 transition-colors"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Details - stacked vertically */}
          <div className="flex flex-col gap-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-purple-600" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Full Name</label>
                    <p className="text-gray-800 font-medium">{profile.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <p className="text-gray-800 font-medium">{profile.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Gender</label>
                    <p className="text-gray-800 font-medium">{profile.gender}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Phone Number</label>
                    <p className="text-gray-800 font-medium">{profile.phone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact & Support */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-pink-600" />
                  Contact & Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Link to="/contact">
                    <Button
                      variant="outline"
                      className="w-full justify-center text-gray-700 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-300"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Contact Us
                    </Button>
                  </Link>
                  <Link to="/report">
                    <Button
                      variant="outline"
                      className="w-full justify-center text-gray-700 hover:bg-pink-50 hover:text-pink-700 hover:border-pink-300"
                    >
                      <Flag className="h-4 w-4 mr-2" />
                      Report Issue
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default JuniorProfilePage;