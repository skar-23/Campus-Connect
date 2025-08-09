import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, User, Mail, Phone, MapPin, AlertCircle, Settings, GraduationCap, HelpCircle, ArrowLeft, MessageCircle, Flag } from "lucide-react";

const SeniorProfilePage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [profileVisibility, setProfileVisibility] = useState(true);

  // Fetch user profile from database
  const fetchProfile = async () => {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
        return;
      }
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [user]);

  // Function to get branch from roll number (fallback only)
  const getBranchFromRollNo = (rollNo: string): string => {
    if (!rollNo || rollNo === "Not provided") return "Engineering";
    const branchCode = rollNo.substring(2, 5);
    const branchMap: { [key: string]: string } = {
      "103": "Computer Science Engineering",
      "104": "Information Technology",
      "101": "Civil Engineering",
      "102": "Mechanical Engineering",
      "105": "Electronics & Communication Engineering",
      "106": "Electrical Engineering",
      "107": "Chemical Engineering",
      "108": "Biotechnology",
      "109": "Industrial & Production Engineering",
      "110": "Instrumentation & Control Engineering",
    };
    return branchMap[branchCode] || "Engineering";
  };

  // Function to calculate current year of study
  const getCurrentYear = (rollNo: string): string => {
    if (!rollNo || rollNo === "Not provided") return "Final Year";
    const joinYear = parseInt("20" + rollNo.substring(0, 2));
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    let academicYear = currentYear;
    if (currentMonth < 7) {
      academicYear = currentYear - 1;
    }
    const yearsCompleted = academicYear - joinYear;
    const currentStudyYear = yearsCompleted + 1;
    if (currentStudyYear <= 1) return "1st Year";
    if (currentStudyYear === 2) return "2nd Year";
    if (currentStudyYear === 3) return "3rd Year";
    if (currentStudyYear === 4) return "4th Year";
    return "Final Year";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto" />
          <p className="mt-4 text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <nav className="bg-white shadow-sm border-b border-gray-200 fixed w-full top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="text-2xl font-bold text-blue-600">
                Campus Connect
              </div>
              <Button 
                onClick={() => navigate('/login')} 
                className="bg-blue-600 hover:bg-blue-700"
              >
                Sign In
              </Button>
            </div>
          </div>
        </nav>
        <div className="pt-20 pb-12">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <Card className="p-8">
              <AlertCircle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-800 mb-4">Please Sign In</h1>
              <p className="text-gray-600 mb-6">You need to sign in to view your profile.</p>
              <Button 
                onClick={() => window.location.href = '/login'} 
                className="bg-blue-600 hover:bg-blue-700"
              >
                Go to Login
              </Button>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  const userData = user?.user_metadata || {};
  const rollNo = profile?.rollNo || profile?.college_id || userData.rollNo || userData.college_id || "Not provided";
  const getBranch = (): string => {
    if (profile?.branch) return profile.branch;
    if (userData.branch) return userData.branch;
    return getBranchFromRollNo(rollNo);
  };
  const currentYear = getCurrentYear(rollNo);

  const profileData = {
    name: profile?.name || userData.name || user?.email?.split('@')[0] || "Senior Student",
    email: user?.email || "Not available",
    gender: profile?.gender || userData.gender || "Not specified",
    college_id: rollNo,
    phone: profile?.phoneNo || profile?.phone || userData.phoneNo || userData.phone || "Not provided",
    city: profile?.city || userData.city || "Not provided",
    branch: getBranch(),
    year: currentYear
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/senior-home">
              <Button
                variant="ghost"
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-all duration-200 font-medium"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
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
      <main className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Profile Header */}
          <Card className="mb-8 overflow-hidden shadow-lg">
            <div className="h-32 bg-gradient-to-r from-blue-600 to-green-600"></div>
            <CardContent className="px-6 pb-6">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16">
                {/* Avatar and Basic Info */}
                <div className="flex flex-col md:flex-row md:items-end gap-4 mb-6 md:mb-0">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-white text-2xl font-bold border-4 border-white shadow-lg">
                    {profileData.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-center md:text-left">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                      {profileData.name}
                    </h1>
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center gap-2 justify-center md:justify-start">
                        <div className="flex items-center gap-2 bg-blue-100 px-3 py-1 rounded-full">
                          <GraduationCap className="h-4 w-4 text-blue-700" />
                          <span className="text-lg font-bold text-blue-800">
                            {profileData.year} Student
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-800 font-semibold text-base">
                        {profileData.branch}
                      </p>
                      <p className="text-gray-700 text-sm font-medium">
                        NIT Jalandhar
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600 justify-center md:justify-start mt-2">
                      <Mail className="h-4 w-4" />
                      {profileData.email}
                    </div>
                  </div>
                </div>
                {/* Settings Button */}
                <div className="flex gap-2">
                  <Link to="/senior-edit-profile">
                    <Button
                      variant="outline"
                      className="border-gray-300 text-gray-700 hover:bg-green-50 hover:text-green-700 hover:border-green-300 transition-colors"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Information */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Full Name</label>
                  <p className="text-gray-800 font-medium">{profileData.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p className="text-gray-800 font-medium">{profileData.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Gender</label>
                  <p className="text-gray-800 font-medium">{profileData.gender}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Phone Number</label>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <p className="text-gray-800 font-medium">{profileData.phone}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Current Year</label>
                  <p className="text-gray-800 font-medium">{profileData.year}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Branch</label>
                  <p className="text-gray-800 font-medium">{profileData.branch}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">College</label>
                  <p className="text-gray-800 font-medium">NIT Jalandhar</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Roll Number</label>
                  <p className="text-gray-800 font-medium">{profileData.college_id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Location</label>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <p className="text-gray-800 font-medium">{profileData.city}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Profile Visibility</label>
                  <p className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${
                    profileVisibility
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-600"
                  }`}>
                    {profileVisibility ? "Public Profile" : "Private Profile"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Support & Help Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-orange-600" />
                Support & Help
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-gray-700 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contact Us
                </Button>
                <Link to="/report-us" className="w-full">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-gray-700 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
                  >
                    <Flag className="h-4 w-4 mr-2" />
                    Report Issue
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SeniorProfilePage;