import React, { useState } from "react";
import { ArrowLeft, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileInfo from "@/components/profile/ProfileInfo";
import ProfileEdit from "@/components/profile/ProfileEdit";
import SettingsModal from "@/components/profile/SettingsModal";
import ReportModal from "@/components/profile/ReportModal";

export interface JuniorProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  branch: string;
  year: string;
  rollNumber: string;
  nativePlace: string;
  state: string;
  bio: string;
}

const JuniorProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showReport, setShowReport] = useState(false);
  
  const [profile, setProfile] = useState<JuniorProfile>({
    id: "1",
    name: "Rahul Sharma",
    email: "rahul.sharma@nitj.ac.in",
    phone: "+91 9876543210",
    branch: "Computer Science Engineering",
    year: "2nd Year",
    rollNumber: "22BCS123",
    nativePlace: "Chandigarh",
    state: "Punjab",
    bio: "Passionate about technology and eager to learn from seniors."
  });

  const handleSaveProfile = (updatedProfile: JuniorProfile) => {
    setProfile(updatedProfile);
    setIsEditing(false);
  };

  const handleDeleteAccount = () => {
    if (confirm("Are you absolutely sure you want to delete your account? This action cannot be undone.")) {
      alert("Account deletion initiated. You will receive a confirmation email.");
      setShowSettings(false);
    }
  };

  const handleSubmitReport = (reportData: any) => {
    console.log("Report submitted:", reportData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Simple Navigation Header - Only Profile Related */}
      <header className="bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Back Button */}
            <Link to="/junior-home">
              <Button 
                variant="ghost" 
                className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 transition-all duration-200 font-medium"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>

            {/* Center Title */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Profile Center
                </h1>
                <p className="text-sm text-gray-500">
                  Manage your account & settings
                </p>
              </div>
            </div>

            {/* Status Indicator */}
            <div className="flex items-center space-x-2 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-200">
              <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-emerald-700">Active</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Profile Header Card */}
          <ProfileHeader 
            profile={profile} 
            isEditing={isEditing}
            onEditToggle={() => setIsEditing(!isEditing)}
            onSettingsClick={() => setShowSettings(true)}
            onReportClick={() => setShowReport(true)}
          />

          {/* Profile Content */}
          {isEditing ? (
            <ProfileEdit 
              profile={profile}
              onSave={handleSaveProfile}
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <ProfileInfo 
              profile={profile} 
              onEditClick={() => setIsEditing(true)}
              onSettingsClick={() => setShowSettings(true)}
              onReportClick={() => setShowReport(true)}
            />
          )}
        </div>
      </div>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        onEditProfile={() => {
          setShowSettings(false);
          setIsEditing(true);
        }}
        onDeleteAccount={handleDeleteAccount}
      />

      {/* Report Modal */}
      <ReportModal
        isOpen={showReport}
        onClose={() => setShowReport(false)}
        onSubmitReport={handleSubmitReport}
      />
    </div>
  );
};

export default JuniorProfilePage;