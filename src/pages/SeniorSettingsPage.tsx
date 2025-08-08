import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import SeniorNavbar from "@/components/layout/SeniorNavbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Settings,
  User,
  Shield,
  Bell,
  Moon,
  LogOut,
  Trash2,
  ArrowLeft,
  Key,
  Mail,
  Database,
  Info,
} from "lucide-react";

const SeniorSettingsPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Settings states
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [profileVisibility, setProfileVisibility] = useState(true);

  const handleSignOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out.",
      });
      
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    
    if (confirmed) {
      toast({
        title: "Account Deletion",
        description: "Please contact support to delete your account.",
        variant: "destructive",
      });
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <SeniorNavbar />
        <div className="pt-20 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="p-8">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">Please Sign In</h1>
              <p className="text-gray-600 mb-6">You need to sign in to access settings.</p>
              <Button onClick={() => navigate('/login')} className="bg-blue-600 hover:bg-blue-700">
                Go to Login
              </Button>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  const userData = user?.user_metadata || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <SeniorNavbar />

      <main className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/senior-profile')}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Profile
            </Button>
            
            <div className="flex items-center gap-3">
              <Settings className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
                <p className="text-gray-600">Manage your account settings and preferences</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Main Settings */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Account Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-blue-600" />
                    Account Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">Profile Visibility</label>
                      <p className="text-xs text-gray-500">Make your profile visible to junior students</p>
                    </div>
                    <Switch 
                      checked={profileVisibility} 
                      onCheckedChange={setProfileVisibility}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Key className="h-4 w-4 mr-2" />
                      Change Password
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Mail className="h-4 w-4 mr-2" />
                      Update Email
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Notification Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-green-600" />
                    Notification Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">Email Notifications</label>
                      <p className="text-xs text-gray-500">Receive notifications via email</p>
                    </div>
                    <Switch 
                      checked={emailNotifications} 
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">Push Notifications</label>
                      <p className="text-xs text-gray-500">Receive push notifications in browser</p>
                    </div>
                    <Switch 
                      checked={pushNotifications} 
                      onCheckedChange={setPushNotifications}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Appearance Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Moon className="h-5 w-5 text-purple-600" />
                    Appearance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">Dark Mode</label>
                      <p className="text-xs text-gray-500">Toggle dark mode theme</p>
                    </div>
                    <Switch 
                      checked={darkMode} 
                      onCheckedChange={setDarkMode}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Privacy & Security */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-orange-600" />
                    Privacy & Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Database className="h-4 w-4 mr-2" />
                    Download Your Data
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="h-4 w-4 mr-2" />
                    Privacy Policy
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              
              {/* User Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5 text-blue-600" />
                    Account Info
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div>
                    <label className="font-medium text-gray-500">Name</label>
                    <p className="text-gray-800">{userData.name || "Not provided"}</p>
                  </div>
                  <div>
                    <label className="font-medium text-gray-500">Email</label>
                    <p className="text-gray-800">{user.email}</p>
                  </div>
                  <div>
                    <label className="font-medium text-gray-500">User ID</label>
                    <p className="text-gray-800 text-xs break-all">{user.id}</p>
                  </div>
                  <div>
                    <label className="font-medium text-gray-500">Member Since</label>
                    <p className="text-gray-800">
                      {new Date(user.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Debug Info */}
              <Card className="bg-gray-50">
                <CardHeader>
                  <CardTitle className="text-sm text-gray-600">Debug Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-gray-600 space-y-2">
                    <p><strong>User Metadata:</strong></p>
                    <pre className="bg-white p-2 rounded text-xs overflow-auto max-h-40">
                      {JSON.stringify(userData, null, 2)}
                    </pre>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button 
                  onClick={handleSignOut}
                  disabled={loading}
                  variant="outline" 
                  className="w-full border-orange-200 text-orange-700 hover:bg-orange-50"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
                
                <Button 
                  onClick={handleDeleteAccount}
                  variant="outline" 
                  className="w-full border-red-200 text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SeniorSettingsPage;