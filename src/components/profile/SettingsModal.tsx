import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  X, 
  User, 
  Lock, 
  Bell, 
  Shield, 
  Trash2, 
  Eye, 
  EyeOff,
  AlertTriangle,
  Save
} from "lucide-react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEditProfile: () => void;
  onDeleteAccount: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ 
  isOpen, 
  onClose, 
  onEditProfile,
  onDeleteAccount 
}) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [profileVisibility, setProfileVisibility] = useState(true);

  if (!isOpen) return null;

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    // Handle password change logic here
    alert("Password updated successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleDeleteAccount = () => {
    if (showDeleteConfirm) {
      onDeleteAccount();
    } else {
      setShowDeleteConfirm(true);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
          <Button 
            onClick={onClose}
            variant="ghost" 
            size="sm"
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Profile Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600" />
                Profile Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={onEditProfile}
                className="w-full justify-start bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200"
              >
                <User className="mr-2 h-4 w-4" />
                Edit Profile Information
              </Button>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Profile Visibility</Label>
                  <p className="text-xs text-gray-500">Make your profile visible to other students</p>
                </div>
                <Switch 
                  checked={profileVisibility}
                  onCheckedChange={setProfileVisibility}
                />
              </div>
            </CardContent>
          </Card>

          {/* Password Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-green-600" />
                Password & Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="currentPassword">Current Password</Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <Button 
                onClick={handlePasswordChange}
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={!currentPassword || !newPassword || !confirmPassword}
              >
                <Save className="mr-2 h-4 w-4" />
                Update Password
              </Button>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-orange-600" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Email Notifications</Label>
                  <p className="text-xs text-gray-500">Receive updates via email</p>
                </div>
                <Switch 
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Push Notifications</Label>
                  <p className="text-xs text-gray-500">Receive browser notifications</p>
                </div>
                <Switch 
                  checked={pushNotifications}
                  onCheckedChange={setPushNotifications}
                />
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Safety */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-purple-600" />
                Privacy & Safety
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-800">Data Protection</h4>
                    <p className="text-xs text-blue-600 mt-1">
                      Your personal information is encrypted and secure. We never share your data with third parties without your consent.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <AlertTriangle className="h-5 w-5" />
                Danger Zone
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <h4 className="text-sm font-medium text-red-800 mb-2">Delete Account</h4>
                <p className="text-xs text-red-600 mb-3">
                  This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                </p>
                
                {!showDeleteConfirm ? (
                  <Button 
                    onClick={handleDeleteAccount}
                    variant="outline"
                    className="border-red-300 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Account
                  </Button>
                ) : (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-red-800">Are you sure?</p>
                    <div className="flex gap-2">
                      <Button 
                        onClick={handleDeleteAccount}
                        className="bg-red-600 hover:bg-red-700 text-white"
                      >
                        Yes, Delete Account
                      </Button>
                      <Button 
                        onClick={() => setShowDeleteConfirm(false)}
                        variant="outline"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50">
          <Button 
            onClick={onClose}
            className="w-full bg-gray-600 hover:bg-gray-700"
          >
            Close Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;