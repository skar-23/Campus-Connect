import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, GraduationCap, User, Edit3, Settings, Flag } from "lucide-react";
import { JuniorProfile } from "@/pages/JuniorProfilePage";

interface ProfileInfoProps {
  profile: JuniorProfile;
  onEditClick: () => void;
  onSettingsClick: () => void;
  onReportClick: () => void;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ 
  profile, 
  onEditClick, 
  onSettingsClick, 
  onReportClick 
}) => {
  return (
    <div className="space-y-6">
      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-blue-600" />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Mail className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Email</p>
                <p className="font-medium text-gray-800">{profile.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Phone className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Phone</p>
                <p className="font-medium text-gray-800">{profile.phone}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Academic Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-purple-600" />
            Academic Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Branch</p>
              <p className="font-semibold text-purple-700">{profile.branch}</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Current Year</p>
              <p className="font-semibold text-blue-700">{profile.year}</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Roll Number</p>
              <p className="font-semibold text-green-700">{profile.rollNumber}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <Button 
              onClick={onEditClick}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
            >
              <Edit3 className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
            <Button 
              onClick={onSettingsClick}
              variant="outline" 
              className="w-full border-purple-300 text-purple-600 hover:bg-purple-50"
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Button 
              onClick={onReportClick}
              variant="outline" 
              className="w-full border-red-300 text-red-600 hover:bg-red-50"
            >
              <Flag className="mr-2 h-4 w-4" />
              Report Issue
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileInfo;