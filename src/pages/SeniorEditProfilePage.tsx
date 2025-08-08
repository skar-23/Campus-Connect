import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Save, User, MapPin, GraduationCap, CheckCircle, AlertTriangle, Check, ChevronDown, UserCheck, LogOut, Settings } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const SeniorEditProfilePage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [branches, setBranches] = useState<string[]>([]);
  const [branchSuggestions, setBranchSuggestions] = useState<string[]>([]);
  const [showBranchSuggestions, setShowBranchSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [branchLoading, setBranchLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(true);
  const branchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  // Profile data from database
  const [profile, setProfile] = useState<any>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    gender: "",
    rollNo: "",
    branch: "",
  });

  // Predefined branches list
  const predefinedBranches = [
    "Computer Science Engineering",
    "Information Technology",
    "Civil Engineering",
    "Mechanical Engineering",
    "Electronics & Communication Engineering",
    "Electrical Engineering",
    "Chemical Engineering",
    "Biotechnology",
    "Industrial & Production Engineering",
    "Instrumentation & Control Engineering",
  ];

  // Function to get branch from roll number
  const getBranchFromRollNo = (rollNo: string): string => {
    if (!rollNo || rollNo === "Not provided") return "";
    
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
    
    return branchMap[branchCode] || "";
  };

  // Function to find best matching branch
  const findBestMatch = (input: string): string => {
    if (!input.trim()) return "";
    
    const inputLower = input.toLowerCase().trim();
    
    // Exact match
    const exactMatch = branches.find(branch => 
      branch.toLowerCase() === inputLower
    );
    if (exactMatch) return exactMatch;
    
    // Starts with match
    const startsWithMatch = branches.find(branch => 
      branch.toLowerCase().startsWith(inputLower)
    );
    if (startsWithMatch) return startsWithMatch;
    
    // Contains match
    const containsMatch = branches.find(branch => 
      branch.toLowerCase().includes(inputLower)
    );
    if (containsMatch) return containsMatch;
    
    // Partial word match
    const words = inputLower.split(' ');
    const partialMatch = branches.find(branch => {
      const branchLower = branch.toLowerCase();
      return words.every(word => branchLower.includes(word));
    });
    
    return partialMatch || "";
  };

  // Fetch user profile from database
  const fetchProfile = async () => {
    if (!user) return;
    
    setProfileLoading(true);
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

      console.log('Fetched profile data:', data);
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setProfileLoading(false);
    }
  };

  // Fetch branches from database or use predefined list
  const fetchBranches = async () => {
    setBranchLoading(true);
    try {
      const { data, error } = await supabase
        .from('branches')
        .select('name')
        .order('name');

      if (data && data.length > 0) {
        const branchNames = data.map(branch => branch.name);
        setBranches(branchNames);
        console.log('Fetched branches from database:', branchNames);
      } else {
        setBranches(predefinedBranches);
        console.log('Using predefined branches:', predefinedBranches);
      }
    } catch (error) {
      console.warn('Could not fetch branches from database, using predefined list:', error);
      setBranches(predefinedBranches);
    } finally {
      setBranchLoading(false);
    }
  };

  // Initialize form data from user and profile
  useEffect(() => {
    if (user && branches.length > 0 && !profileLoading) {
      const userData = user.user_metadata || {};
      console.log('User metadata:', userData);
      console.log('Profile data:', profile);
      
      // Try to get branch from multiple sources in priority order
      let userBranch = "";
      
      // 1. First try profile.branch (highest priority)
      if (profile?.branch && branches.includes(profile.branch)) {
        userBranch = profile.branch;
        console.log('Using branch from profile:', userBranch);
      }
      // 2. Then try user metadata branch
      else if (userData.branch && branches.includes(userData.branch)) {
        userBranch = userData.branch;
        console.log('Using branch from user metadata:', userBranch);
      }
      // 3. Then try to derive from roll number
      else if (profile?.rollNo || profile?.college_id || userData.rollNo || userData.college_id) {
        const rollNo = profile?.rollNo || profile?.college_id || userData.rollNo || userData.college_id;
        const derivedBranch = getBranchFromRollNo(rollNo);
        if (derivedBranch && branches.includes(derivedBranch)) {
          userBranch = derivedBranch;
          console.log('Derived branch from roll number:', userBranch);
        }
      }
      
      const newFormData = {
        name: profile?.name || userData.name || "",
        email: user.email || "",
        phone: profile?.phoneNo || profile?.phone || userData.phoneNo || userData.phone || "",
        city: profile?.city || userData.city || "",
        gender: profile?.gender || userData.gender || "",
        rollNo: profile?.rollNo || profile?.college_id || userData.rollNo || userData.college_id || "",
        branch: userBranch,
      };
      
      console.log('Setting form data:', newFormData);
      setFormData(newFormData);
    }
  }, [user, branches, profile, profileLoading]);

  // Auto-derive branch when roll number changes
  useEffect(() => {
    if (formData.rollNo && branches.length > 0 && !formData.branch) {
      const derivedBranch = getBranchFromRollNo(formData.rollNo);
      if (derivedBranch && branches.includes(derivedBranch)) {
        console.log('Auto-deriving branch from roll number:', derivedBranch);
        setFormData(prev => ({
          ...prev,
          branch: derivedBranch
        }));
      }
    }
  }, [formData.rollNo, branches]);

  // Fetch data on component mount
  useEffect(() => {
    fetchBranches();
    fetchProfile();
  }, [user]);

  // Clear notification after 5 seconds
  useEffect(() => {
    if (notification.type) {
      const timer = setTimeout(() => {
        setNotification({ type: null, message: '' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Reset highlighted index when suggestions change
  useEffect(() => {
    setHighlightedIndex(-1);
  }, [branchSuggestions]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBranchChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      branch: value
    }));
    
    // Filter suggestions based on input
    if (value.length > 0) {
      const filtered = branches.filter(branch =>
        branch.toLowerCase().includes(value.toLowerCase())
      );
      setBranchSuggestions(filtered);
      setShowBranchSuggestions(true);
      setHighlightedIndex(-1);
    } else {
      // Show all branches when empty
      setBranchSuggestions(branches);
      setShowBranchSuggestions(true);
      setHighlightedIndex(-1);
    }
  };

  const handleBranchSelect = (selectedBranch: string) => {
    setFormData(prev => ({
      ...prev,
      branch: selectedBranch
    }));
    setShowBranchSuggestions(false);
    setBranchSuggestions([]);
    setHighlightedIndex(-1);
    
    if (branchInputRef.current) {
      branchInputRef.current.focus();
    }
  };

  const handleBranchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showBranchSuggestions || branchSuggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < branchSuggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev > 0 ? prev - 1 : branchSuggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < branchSuggestions.length) {
          handleBranchSelect(branchSuggestions[highlightedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setShowBranchSuggestions(false);
        setBranchSuggestions([]);
        setHighlightedIndex(-1);
        break;
    }
  };

  const handleBranchFocus = () => {
    if (formData.branch.length > 0) {
      const filtered = branches.filter(branch =>
        branch.toLowerCase().includes(formData.branch.toLowerCase())
      );
      setBranchSuggestions(filtered);
      setShowBranchSuggestions(true);
      setHighlightedIndex(-1);
    } else {
      // Show all branches when empty
      setBranchSuggestions(branches);
      setShowBranchSuggestions(true);
      setHighlightedIndex(-1);
    }
  };

  const handleBranchBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const relatedTarget = e.relatedTarget as HTMLElement;
    if (relatedTarget && dropdownRef.current?.contains(relatedTarget)) {
      return;
    }
    
    setTimeout(() => {
      setShowBranchSuggestions(false);
      setBranchSuggestions([]);
      setHighlightedIndex(-1);
      
      // Auto-select best match or clear if no valid match
      if (formData.branch && !branches.includes(formData.branch)) {
        const bestMatch = findBestMatch(formData.branch);
        setFormData(prev => ({
          ...prev,
          branch: bestMatch
        }));
      }
    }, 150);
  };

  const handleSave = async () => {
    setSaving(true);
    setNotification({ type: null, message: '' });

    try {
      if (!formData.name.trim()) {
        setNotification({
          type: 'error',
          message: 'Name is required'
        });
        setSaving(false);
        return;
      }

      // Strict validation - only allow predefined branches
      if (formData.branch && !branches.includes(formData.branch)) {
        setNotification({
          type: 'error',
          message: 'Please select a valid branch from the dropdown list'
        });
        setSaving(false);
        return;
      }

      if (!user) {
        throw new Error("No user found");
      }

      const updatedData = {
        name: formData.name.trim(),
        phoneNo: formData.phone.trim(),
        phone: formData.phone.trim(),
        city: formData.city.trim(),
        gender: formData.gender,
        rollNo: formData.rollNo.trim(),
        college_id: formData.rollNo.trim(),
        branch: formData.branch.trim(),
      };

      console.log('Saving profile data:', updatedData);

      // Update user metadata in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.updateUser({
        data: updatedData
      });

      if (authError) {
        console.error('Auth update error:', authError);
        throw new Error(`Auth update failed: ${authError.message}`);
      }

      console.log('Auth update successful:', authData);

      // Update the user profile in the profiles table
      try {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .upsert({
            id: user.id,
            email: user.email,
            ...updatedData,
            updated_at: new Date().toISOString()
          }, {
            onConflict: 'id'
          });

        if (profileError) {
          console.error('Profile table update failed:', profileError);
          // Don't throw error here - auth update succeeded, profile table might not exist
          console.warn('Profile table update failed, but auth update succeeded');
        } else {
          console.log('Profile table updated successfully:', profileData);
          
          // Update local profile state only if update succeeded
          setProfile(prev => ({
            ...prev,
            ...updatedData,
            updated_at: new Date().toISOString()
          }));
        }
      } catch (profileTableError) {
        console.error('Profile table error:', profileTableError);
        // Continue - auth update succeeded
      }

      // Refresh user session to get updated data
      try {
        await supabase.auth.refreshSession();
        console.log('Session refreshed successfully');
      } catch (refreshError) {
        console.warn('Session refresh failed:', refreshError);
        // Don't fail the whole operation for this
      }

      setNotification({
        type: 'success',
        message: 'Profile updated successfully! Redirecting...'
      });

      setTimeout(() => {
        navigate('/senior-profile');
      }, 2000);

    } catch (error: any) {
      console.error('Error saving profile:', error);
      
      // More specific error messages
      let errorMessage = 'Failed to update profile. Please try again.';
      
      if (error.message) {
        if (error.message.includes('Auth update failed')) {
          errorMessage = 'Failed to update user authentication data. Please try again.';
        } else if (error.message.includes('No user found')) {
          errorMessage = 'User session expired. Please sign in again.';
        } else if (error.message.includes('branch')) {
          errorMessage = 'Invalid branch selected. Please choose from the dropdown.';
        } else {
          errorMessage = `Update failed: ${error.message}`;
        }
      }
      
      setNotification({
        type: 'error',
        message: errorMessage
      });
    } finally {
      setSaving(false);
    }
  };

  const isValidBranch = branches.includes(formData.branch);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <Card className="p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Please Sign In</h1>
          <Button onClick={() => navigate('/login')} className="bg-blue-600 hover:bg-blue-700">
            Go to Login
          </Button>
        </Card>
      </div>
    );
  }

  // Show loading state while fetching profile data
  if (profileLoading || branchLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <Card className="p-8">
          <div className="flex items-center gap-3">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
            <span className="text-lg text-gray-700">Loading profile...</span>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      
      {/* Custom Navbar */}
      <nav className="bg-white shadow-sm border-b border-gray-200 fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer" onClick={() => navigate('/senior-home')}>
              Campus Connect
            </div>
            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="flex items-center gap-2 hover:bg-gray-100 transition-colors"
                  >
                    <UserCheck className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-700 font-medium">Senior</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium text-gray-900">{formData.name}</p>
                    <p className="text-xs text-gray-500">{formData.email}</p>
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
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Edit Profile</h1>
            
            {notification.type && (
              <div className={`mt-4 p-4 rounded-lg border ${
                notification.type === 'success' 
                  ? 'bg-green-50 border-green-200 text-green-800' 
                  : 'bg-red-50 border-red-200 text-red-800'
              }`}>
                <div className="flex items-center gap-2">
                  {notification.type === 'success' ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <AlertTriangle className="h-5 w-5" />
                  )}
                  <span className="font-medium">{notification.message}</span>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-600" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter your email"
                      disabled
                      className="bg-gray-50"
                    />
                    <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-purple-600" />
                  Academic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="rollNo">Roll Number</Label>
                    <Input
                      id="rollNo"
                      value={formData.rollNo}
                      onChange={(e) => handleInputChange('rollNo', e.target.value)}
                      placeholder="Enter your roll number"
                    />
                  </div>
                  <div className="relative">
                    <Label htmlFor="branch">Branch *</Label>
                    <div className="relative">
                      <Input
                        ref={branchInputRef}
                        id="branch"
                        value={formData.branch}
                        onChange={(e) => handleBranchChange(e.target.value)}
                        onKeyDown={handleBranchKeyDown}
                        onFocus={handleBranchFocus}
                        onBlur={handleBranchBlur}
                        placeholder="Search and select your branch..."
                        className={`pr-10 ${
                          isValidBranch && formData.branch 
                            ? 'border-green-300 bg-green-50' 
                            : formData.branch && !isValidBranch
                            ? 'border-red-300 bg-red-50'
                            : ''
                        }`}
                        autoComplete="off"
                      />
                      
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                        {isValidBranch && formData.branch && (
                          <Check className="h-4 w-4 text-green-600" />
                        )}
                        <ChevronDown className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                    
                    {formData.branch && (
                      <p className={`text-xs mt-1 ${
                        isValidBranch 
                          ? 'text-green-600' 
                          : 'text-red-600'
                      }`}>
                        {isValidBranch 
                          ? `✓ Selected: ${formData.branch}` 
                          : `❌ Invalid branch. Please select from the dropdown.`
                        }
                      </p>
                    )}
                    
                    {showBranchSuggestions && branchSuggestions.length > 0 && (
                      <div 
                        ref={dropdownRef}
                        className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
                      >
                        {branchSuggestions.map((suggestion, index) => (
                          <div
                            key={index}
                            className={`px-4 py-2 text-sm cursor-pointer border-b border-gray-100 last:border-b-0 flex items-center justify-between ${
                              index === highlightedIndex 
                                ? 'bg-blue-100 text-blue-700' 
                                : formData.branch === suggestion 
                                ? 'bg-blue-50 text-blue-700' 
                                : 'hover:bg-blue-50 hover:text-blue-700'
                            }`}
                            onMouseDown={(e) => {
                              e.preventDefault();
                              handleBranchSelect(suggestion);
                            }}
                            onMouseEnter={() => setHighlightedIndex(index)}
                          >
                            <span>{suggestion}</span>
                            {(formData.branch === suggestion || index === highlightedIndex) && (
                              <Check className="h-4 w-4 text-blue-600" />
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {showBranchSuggestions && branchSuggestions.length === 0 && formData.branch.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg p-4 text-sm text-gray-500 text-center">
                        No branches found matching "{formData.branch}"
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-green-600" />
                  Location Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    placeholder="Enter your city"
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
              <Button
                variant="outline"
                onClick={() => navigate('/senior-profile')}
                disabled={saving}
                className="px-6 py-2 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={saving || (formData.branch && !isValidBranch)}
                className="px-8 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving Changes...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SeniorEditProfilePage;