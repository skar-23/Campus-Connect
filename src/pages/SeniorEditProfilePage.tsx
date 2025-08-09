import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Loader2,
  Save,
  User,
  CheckCircle,
  AlertTriangle,
  Check,
  ChevronDown,
  LogOut,
  Settings,
  ArrowLeft,
  Shield,
  Key,
  Mail,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";

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

const SeniorEditProfilePage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [branches] = useState<string[]>(predefinedBranches);
  const [branchSuggestions, setBranchSuggestions] = useState<string[]>([]);
  const [showBranchSuggestions, setShowBranchSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [profileLoading, setProfileLoading] = useState(true);
  const branchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [notification, setNotification] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [profileVisibility, setProfileVisibility] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    gender: "",
    rollNo: "",
    branch: "",
  });

  // Get branch from roll number
  const getBranchFromRollNo = (rollNo: string): string => {
    if (!rollNo || rollNo === "Not provided") return "";
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

  // Find best matching branch
  const findBestMatch = (input: string): string => {
    if (!input.trim()) return "";
    const inputLower = input.toLowerCase().trim();
    const exactMatch = branches.find(
      (branch) => branch.toLowerCase() === inputLower
    );
    if (exactMatch) return exactMatch;
    const startsWithMatch = branches.find((branch) =>
      branch.toLowerCase().startsWith(inputLower)
    );
    if (startsWithMatch) return startsWithMatch;
    const containsMatch = branches.find((branch) =>
      branch.toLowerCase().includes(inputLower)
    );
    if (containsMatch) return containsMatch;
    const words = inputLower.split(" ");
    const partialMatch = branches.find((branch) => {
      const branchLower = branch.toLowerCase();
      return words.every((word) => branchLower.includes(word));
    });
    return partialMatch || "";
  };

  // Fetch user profile from database
  const fetchProfile = async () => {
    if (!user) return;
    setProfileLoading(true);
    try {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      setProfile(data);
    } catch {
      // ignore
    } finally {
      setProfileLoading(false);
    }
  };

  // Initialize form data from user and profile
  useEffect(() => {
    if (user && !profileLoading) {
      const userData = user.user_metadata || {};
      let userBranch = "";

      if (profile?.branch && branches.includes(profile.branch)) {
        userBranch = profile.branch;
      } else if (userData.branch && branches.includes(userData.branch)) {
        userBranch = userData.branch;
      } else if (
        profile?.rollNo ||
        profile?.college_id ||
        userData.rollNo ||
        userData.college_id
      ) {
        const rollNo =
          profile?.rollNo ||
          profile?.college_id ||
          userData.rollNo ||
          userData.college_id;
        const derivedBranch = getBranchFromRollNo(rollNo);
        if (derivedBranch && branches.includes(derivedBranch)) {
          userBranch = derivedBranch;
        }
      }

      setFormData({
        name: profile?.name || userData.name || "",
        email: user.email || "",
        phone:
          profile?.phoneNo ||
          profile?.phone ||
          userData.phoneNo ||
          userData.phone ||
          "",
        city: profile?.city || userData.city || "",
        gender: profile?.gender || userData.gender || "",
        rollNo:
          profile?.rollNo ||
          profile?.college_id ||
          userData.rollNo ||
          userData.college_id ||
          "",
        branch: userBranch,
      });
    }
  }, [user, branches, profile, profileLoading]);

  // Auto-derive branch when roll number changes
  useEffect(() => {
    if (formData.rollNo && branches.length > 0 && !formData.branch) {
      const derivedBranch = getBranchFromRollNo(formData.rollNo);
      if (derivedBranch && branches.includes(derivedBranch)) {
        setFormData((prev) => ({
          ...prev,
          branch: derivedBranch,
        }));
      }
    }
  }, [formData.rollNo, branches]);

  // Fetch data on component mount
  useEffect(() => {
    fetchProfile();
  }, [user]);

  // Clear notification after 5 seconds
  useEffect(() => {
    if (notification.type) {
      const timer = setTimeout(() => {
        setNotification({ type: null, message: "" });
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
    navigate("/");
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (confirmed) {
      setNotification({
        type: "error",
        message: "Please contact support to delete your account.",
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleBranchChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      branch: value,
    }));

    if (value.length > 0) {
      const filtered = branches.filter((branch) =>
        branch.toLowerCase().includes(value.toLowerCase())
      );
      setBranchSuggestions(filtered);
      setShowBranchSuggestions(true);
      setHighlightedIndex(-1);
    } else {
      setBranchSuggestions(branches);
      setShowBranchSuggestions(true);
      setHighlightedIndex(-1);
    }
  };

  const handleBranchSelect = (selectedBranch: string) => {
    setFormData((prev) => ({
      ...prev,
      branch: selectedBranch,
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
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < branchSuggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : branchSuggestions.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (
          highlightedIndex >= 0 &&
          highlightedIndex < branchSuggestions.length
        ) {
          handleBranchSelect(branchSuggestions[highlightedIndex]);
        }
        break;
      case "Escape":
        e.preventDefault();
        setShowBranchSuggestions(false);
        setBranchSuggestions([]);
        setHighlightedIndex(-1);
        break;
    }
  };

  const handleBranchFocus = () => {
    if (formData.branch.length > 0) {
      const filtered = branches.filter((branch) =>
        branch.toLowerCase().includes(formData.branch.toLowerCase())
      );
      setBranchSuggestions(filtered);
      setShowBranchSuggestions(true);
      setHighlightedIndex(-1);
    } else {
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

      if (formData.branch && !branches.includes(formData.branch)) {
        const bestMatch = findBestMatch(formData.branch);
        setFormData((prev) => ({
          ...prev,
          branch: bestMatch,
        }));
      }
    }, 150);
  };

  const handleSave = async () => {
    setSaving(true);
    setNotification({ type: null, message: "" });

    try {
      if (!formData.name.trim()) {
        setNotification({
          type: "error",
          message: "Name is required",
        });
        setSaving(false);
        return;
      }

      if (formData.branch && !branches.includes(formData.branch)) {
        setNotification({
          type: "error",
          message: "Please select a valid branch from the dropdown list",
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

      const { data: authData, error: authError } =
        await supabase.auth.updateUser({
          data: updatedData,
        });

      if (authError) {
        console.error("Auth update error:", authError);
        throw new Error(`Auth update failed: ${authError.message}`);
      }

      try {
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .upsert(
            {
              id: user.id,
              email: user.email,
              ...updatedData,
              updated_at: new Date().toISOString(),
            },
            {
              onConflict: "id",
            }
          );

        if (profileError) {
          console.error("Profile table update failed:", profileError);
          console.warn(
            "Profile table update failed, but auth update succeeded"
          );
        } else {
          setProfile((prev) => ({
            ...prev,
            ...updatedData,
            updated_at: new Date().toISOString(),
          }));
        }
      } catch (profileTableError) {
        console.error("Profile table error:", profileTableError);
      }

      try {
        await supabase.auth.refreshSession();
        console.log("Session refreshed successfully");
      } catch (refreshError) {
        console.warn("Session refresh failed:", refreshError);
      }

      setNotification({
        type: "success",
        message: "Profile updated successfully! Redirecting...",
      });

      setTimeout(() => {
        navigate("/senior-profile");
      }, 2000);
    } catch (error: any) {
      console.error("Error saving profile:", error);

      let errorMessage = "Failed to update profile. Please try again.";

      if (error.message) {
        if (error.message.includes("Auth update failed")) {
          errorMessage =
            "Failed to update user authentication data. Please try again.";
        } else if (error.message.includes("No user found")) {
          errorMessage = "User session expired. Please sign in again.";
        } else if (error.message.includes("branch")) {
          errorMessage =
            "Invalid branch selected. Please choose from the dropdown.";
        } else {
          errorMessage = `Update failed: ${error.message}`;
        }
      }

      setNotification({
        type: "error",
        message: errorMessage,
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
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Please Sign In
          </h1>
          <Button
            onClick={() => navigate("/login")}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Go to Login
          </Button>
        </Card>
      </div>
    );
  }

  if (profileLoading) {
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/senior-profile">
              <Button
                variant="ghost"
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-all duration-200 font-medium"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Profile
              </Button>
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  Edit Profile & Settings
                </h1>
                <p className="text-sm text-gray-500">
                  Update your profile and manage account
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-200">
              <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-emerald-700">
                Active
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Edit Profile */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600" />
                Edit Senior Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
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
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      placeholder="Enter your email"
                      disabled
                      className="bg-gray-50"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Email cannot be changed
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value) =>
                        handleInputChange("gender", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer-not-to-say">
                          Prefer not to say
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="rollNo">Roll Number</Label>
                    <Input
                      id="rollNo"
                      value={formData.rollNo}
                      onChange={(e) =>
                        handleInputChange("rollNo", e.target.value)
                      }
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
                            ? "border-green-300 bg-green-50"
                            : formData.branch && !isValidBranch
                            ? "border-red-300 bg-red-50"
                            : ""
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
                      <p
                        className={`text-xs mt-1 ${
                          isValidBranch ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {isValidBranch
                          ? `✓ Selected: ${formData.branch}`
                          : `❌ Invalid branch. Please select from the dropdown.`}
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
                                ? "bg-blue-100 text-blue-700"
                                : formData.branch === suggestion
                                ? "bg-blue-50 text-blue-700"
                                : "hover:bg-blue-50 hover:text-blue-700"
                            }`}
                            onMouseDown={(e) => {
                              e.preventDefault();
                              handleBranchSelect(suggestion);
                            }}
                            onMouseEnter={() => setHighlightedIndex(index)}
                          >
                            <span>{suggestion}</span>
                            {(formData.branch === suggestion ||
                              index === highlightedIndex) && (
                              <Check className="h-4 w-4 text-blue-600" />
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {showBranchSuggestions &&
                      branchSuggestions.length === 0 &&
                      formData.branch.length > 0 && (
                        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg p-4 text-sm text-gray-500 text-center">
                          No branches found matching "{formData.branch}"
                        </div>
                      )}
                  </div>
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    placeholder="Enter your city"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <Button
                  variant="outline"
                  onClick={() => navigate("/senior-profile")}
                  disabled={saving}
                  className="px-6 py-2 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={saving || (formData.branch && !isValidBranch)}
                  className="px-8 py-2 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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
              {notification.type && (
                <div
                  className={`mt-4 p-4 rounded-lg border ${
                    notification.type === "success"
                      ? "bg-green-50 border-green-200 text-green-800"
                      : "bg-red-50 border-red-200 text-red-800"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {notification.type === "success" ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <AlertTriangle className="h-5 w-5" />
                    )}
                    <span className="font-medium">{notification.message}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-blue-600" />
                Profile & App Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium">
                    Profile Visibility
                  </label>
                  <p className="text-xs text-gray-500">
                    Make your profile visible to juniors
                  </p>
                </div>
                <Switch
                  checked={profileVisibility}
                  onCheckedChange={setProfileVisibility}
                />
              </div>
            </CardContent>
          </Card>

          {/* Account Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-600" />
                Account Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button variant="outline" className="w-full justify-start">
                  <Key className="h-4 w-4 mr-2" />
                  Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="h-4 w-4 mr-2" />
                  Update Email
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  className="w-full border-orange-200 text-orange-700 hover:bg-orange-100 hover:text-orange-900 transition-colors"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
                <Button
                  onClick={handleDeleteAccount}
                  variant="outline"
                  className="w-full border-red-200 text-red-700 hover:bg-red-100 hover:text-red-900 transition-colors"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SeniorEditProfilePage;