import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Edit3, 
  Settings, 
  Share2, 
  Mail, 
  Phone, 
  MapPin,
  Award,
  Users,
  Star,
  Calendar,
  MoreHorizontal
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import SettingsModal from "./SettingsModal";
import { getUserAvatar, detectGenderFromName } from "@/utils/avatarUtils";

interface SeniorProfileHeaderProps {
  onEdit: () => void;
}

const SeniorProfileHeader: React.FC<SeniorProfileHeaderProps> = ({ onEdit }) => {
  const { user } = useAuth();
  const [showSettings, setShowSettings] = useState(false);

  // Mock data - replace with real data from your backend
  const profileData = {
    name: user?.name || "Arjun Sharma",
    branch: "Computer Science Engineering",
    year: "Final Year (4th Year)",
    graduationYear: "2024",
    email: user?.email || "arjun.sharma@nitj.ac.in",
    phone: "+91 9876543210",
    location: "Punjab, India",
    bio: "Passionate about technology and helping junior students navigate their academic journey. Experienced in web development, competitive programming, and mentoring.",
    coverImage: "https://placehold.co/1200x300/3B82F6/FFFFFF?text=Senior+Profile+Cover",
    joinedDate: "August 2020",
    stats: {
      menteesHelped: 42,
      totalSessions: 156,
      avgRating: 4.8,
      hoursContributed: 240
    },
    expertise: ["Web Development", "Data Structures", "Career Guidance", "Placement Prep"],
    achievements: ["Top Mentor 2023", "100+ Hours Contributed", "5★ Rating"],
    isAvailable: true
  };

  // Get user avatar and gender
  const userGender = detectGenderFromName(profileData.name);
  const userAvatar = getUserAvatar(user?.id || 'demo-user', userGender);


  return (
    <>
      <Card className="overflow-hidden border-0 shadow-2xl bg-white/95 backdrop-blur-lg">
        
        {/* Cover Image */}
        <div className="relative h-48 md:h-64">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600"></div>
          <div className="absolute inset-0 bg-black/20"></div>
          
          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex gap-2">
            <Button
              onClick={() => setShowSettings(true)}
              size="sm"
              variant="secondary"
              className="bg-white/90 hover:bg-white text-gray-700 backdrop-blur-sm"
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="bg-white/90 hover:bg-white text-gray-700 backdrop-blur-sm"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="bg-white/90 hover:bg-white text-gray-700 backdrop-blur-sm"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>

          {/* Availability Status */}
          <div className="absolute top-4 left-4">
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
              profileData.isAvailable 
                ? 'bg-green-100 text-green-700 border border-green-200' 
                : 'bg-red-100 text-red-700 border border-red-200'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                profileData.isAvailable ? 'bg-green-500' : 'bg-red-500'
              }`}></div>
              {profileData.isAvailable ? 'Available for Mentoring' : 'Currently Unavailable'}
            </div>
          </div>
        </div>

        <CardContent className="px-6 pb-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16 md:-mt-20">
            
            {/* Profile Avatar & Basic Info */}
            <div className="flex flex-col md:flex-row md:items-end gap-4 mb-6 md:mb-0">
              <div className="relative">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-xl">
                  <img 
                    src={userAvatar.url} 
                    alt={profileData.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to colored circle with initials if image fails
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = document.createElement('div');
                      fallback.className = 'w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl md:text-4xl font-bold';
                      fallback.textContent = profileData.name.charAt(0).toUpperCase();
                      target.parentElement?.appendChild(fallback);
                    }}
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                  <Award className="h-4 w-4 text-white" />
                </div>
              </div>
              
              <div className="text-center md:text-left">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
                  {profileData.name}
                </h1>
                <p className="text-lg text-blue-600 font-medium mb-2">
                  {profileData.branch}
                </p>
                <p className="text-gray-600 mb-2">
                  {profileData.year} • Graduating {profileData.graduationYear}
                </p>
                
                {/* Contact Info */}
                <div className="flex flex-col md:flex-row gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    {profileData.email}
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    {profileData.phone}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {profileData.location}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-3">
              <Button
                onClick={onEdit}
                className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white"
              >
                <Edit3 className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </div>

          {/* Stats Row */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
              <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-700">{profileData.stats.menteesHelped}</div>
              <div className="text-sm text-blue-600">Mentees Helped</div>
            </div>
            
            <div className="text-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
              <Calendar className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-700">{profileData.stats.totalSessions}</div>
              <div className="text-sm text-green-600">Total Sessions</div>
            </div>
            
            <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
              <Star className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-700">{profileData.stats.avgRating}</div>
              <div className="text-sm text-purple-600">Avg Rating</div>
            </div>
            
            <div className="text-center p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border border-orange-200">
              <Award className="h-6 w-6 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-700">{profileData.stats.hoursContributed}h</div>
              <div className="text-sm text-orange-600">Hours Contributed</div>
            </div>
          </div>

          {/* Bio */}
          <div className="mt-6">
            <p className="text-gray-700 leading-relaxed">{profileData.bio}</p>
          </div>

          {/* Tags */}
          <div className="mt-6">
            <div className="flex flex-wrap gap-2">
              {profileData.expertise.map((skill, index) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Achievements</h3>
            <div className="flex flex-wrap gap-2">
              {profileData.achievements.map((achievement, index) => (
                <span key={index} className="px-3 py-1 bg-gradient-to-r from-orange-100 to-yellow-100 text-orange-700 rounded-full text-sm font-medium border border-orange-200">
                  🏆 {achievement}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settings Modal */}
      {showSettings && (
        <SettingsModal 
          onClose={() => setShowSettings(false)} 
          onEditProfile={onEdit}
          userId={user?.id || 'demo-user'}
          userGender={userGender}
          currentAvatarId={userAvatar.id}
        />
      )}
    </>
  );
};

export default SeniorProfileHeader;