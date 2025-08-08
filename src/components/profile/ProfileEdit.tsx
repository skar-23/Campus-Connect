import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, X, User, GraduationCap } from "lucide-react";
import { JuniorProfile } from "@/pages/JuniorProfilePage";

interface ProfileEditProps {
  profile: JuniorProfile;
  onSave: (profile: JuniorProfile) => void;
  onCancel: () => void;
}

const ProfileEdit: React.FC<ProfileEditProps> = ({ profile, onSave, onCancel }) => {
  const [editedProfile, setEditedProfile] = useState<JuniorProfile>(profile);

  const handleInputChange = (field: keyof JuniorProfile, value: string) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    onSave(editedProfile);
  };

  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="flex justify-end gap-2">
        <Button
          onClick={handleSave}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
        <Button
          onClick={onCancel}
          variant="outline"
          className="border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          <X className="mr-2 h-4 w-4" />
          Cancel
        </Button>
      </div>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-blue-600" />
            Basic Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={editedProfile.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={editedProfile.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={editedProfile.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="rollNumber">Roll Number</Label>
              <Input
                id="rollNumber"
                value={editedProfile.rollNumber}
                onChange={(e) => handleInputChange('rollNumber', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="nativePlace">Native Place</Label>
              <Input
                id="nativePlace"
                value={editedProfile.nativePlace}
                onChange={(e) => handleInputChange('nativePlace', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                value={editedProfile.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={editedProfile.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              className="mt-1 resize-none"
              rows={4}
              placeholder="Tell us about yourself..."
            />
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
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="branch">Branch</Label>
              <Input
                id="branch"
                value={editedProfile.branch}
                onChange={(e) => handleInputChange('branch', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="year">Current Year</Label>
              <Input
                id="year"
                value={editedProfile.year}
                onChange={(e) => handleInputChange('year', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileEdit;