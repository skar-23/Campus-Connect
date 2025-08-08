import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  User,
  Mail,
  Edit3,
  Phone,
  MapPin,
  AlertCircle,
  Settings,
  GraduationCap,
  LogOut,
  UserCheck,
  MessageCircle,
  Flag,
  HelpCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const SeniorProfilePage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);

  // Fetch user profile from database
  const fetchProfile = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
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
    
    // Give some time for auth to load, then stop loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [user]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  // Function to get branch from roll number (fallback only)
  const getBranchFromRollNo = (rollNo: string): string => {
    if (!rollNo || rollNo === "Not provided") return "Engineering";
    
    // Extract branch code (assuming format: YYXXXYYY where XXX is branch code)
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
    
    // Extract joining year from first 2 digits
    const joinYear = parseInt("20" + rollNo.substring(0, 2));
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // JavaScript months are 0-indexed
    
    // Academic year starts in July (month 7)
    // If we're before July, we're still in the previous academic year
    let academicYear = currentYear;
    if (currentMonth < 7) {
      academicYear = currentYear - 1;
    }
    
    // Calculate years completed
    const yearsCompleted = academicYear - joinYear;
    const currentStudyYear = yearsCompleted + 1;
    
    // Determine year label
    if (currentStudyYear <= 1) return "1st Year";
    if (currentStudyYear === 2) return "2nd Year";
    if (currentStudyYear === 3) return "3rd Year";
    if (currentStudyYear === 4) return "4th Year";
    return "Final Year";
  };

  // Show loading state
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

  // Extract user data and prioritize profile data
  const userData = user?.user_metadata || {};
  const rollNo = profile?.rollNo || profile?.college_id || userData.rollNo || userData.college_id || "Not provided";
  
  // Get branch with priority: profile.branch > user metadata branch > derived from roll number
  const getBranch = (): string => {
    // 1. First try profile.branch (highest priority - from database)
    if (profile?.branch) {
      return profile.branch;
    }
    
    // 2. Then try user metadata branch
    if (userData.branch) {
      return userData.branch;
    }
    
    // 3. Finally derive from roll number (fallback)
    const derivedBranch = getBranchFromRollNo(rollNo);
    return derivedBranch;
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

  // Show message if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        {/* Custom Navbar for Profile Page */}
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      
      {/* Custom Navbar for Profile Page */}
      <nav className="bg-white shadow-sm border-b border-gray-200 fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Left side - Website Name */}
            <div className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer" onClick={() => navigate('/senior-home')}>
              Campus Connect
            </div>

            {/* Right side - User Menu */}
            <div className="flex items-center space-x-4">
              
              {/* User Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="flex items-center gap-2 hover:bg-gray-100 transition-colors"
                  >
                    <UserCheck className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-700 font-medium">
                      Senior
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium text-gray-900">
                      {profileData.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {profileData.email}
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/senior-profile')}>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/senior-settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Profile Header */}
          <Card className="mb-8 overflow-hidden shadow-lg">
            
            {/* Cover Image */}
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
                    
                    {/* Enhanced Student Info with Better Visibility */}
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
                    
                    <div className="flex items-center gap-1 text-sm text-gray-600 justify-center md:justify-start">
                      <Mail className="h-4 w-4" />
                      {profileData.email}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button 
                    onClick={() => navigate('/senior-settings')}
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 transition-colors"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                  <Button 
                    onClick={() => navigate('/senior-edit-profile')}
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-green-50 hover:text-green-700 hover:border-green-300 transition-colors"
                  >
                    <Edit3 className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-600" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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
              </CardContent>
            </Card>

            {/* Academic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-purple-600" />
                  Academic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-green-600" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Phone Number</label>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <p className="text-gray-800 font-medium">{profileData.phone}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Location</label>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <p className="text-gray-800 font-medium">{profileData.city}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support & Help */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-orange-600" />
                  Support & Help
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-gray-700 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contact Us
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-gray-700 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
                >
                  <Flag className="h-4 w-4 mr-2" />
                  Report Issue
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SeniorProfilePage;