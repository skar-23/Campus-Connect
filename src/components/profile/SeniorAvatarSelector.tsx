import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X, User } from "lucide-react";
import { AvatarData, getAvatarsByGender, getAvatarFromPath } from "@/utils/avatarUtils";

interface SeniorAvatarSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  userGender: 'male' | 'female';
  currentAvatarUrl?: string;
  onAvatarChange?: (avatarUrl: string) => Promise<boolean>;
}

const SeniorAvatarSelector: React.FC<SeniorAvatarSelectorProps> = ({
  isOpen,
  onClose,
  userGender,
  currentAvatarUrl,
  onAvatarChange
}) => {
  const [selectedAvatarUrl, setSelectedAvatarUrl] = useState(currentAvatarUrl || '');
  const [isUpdating, setIsUpdating] = useState(false);

  if (!isOpen) return null;

  const availableAvatars = getAvatarsByGender(userGender);
  const currentAvatar = currentAvatarUrl ? getAvatarFromPath(currentAvatarUrl) : null;

  const handleSaveAvatar = async () => {
    if (!selectedAvatarUrl || !onAvatarChange) return;

    setIsUpdating(true);
    
    try {
      const success = await onAvatarChange(selectedAvatarUrl);
      if (success) {
        onClose();
      }
    } catch (error) {
      console.error('Error updating avatar:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Choose Your Avatar</h2>
            <p className="text-gray-600 mt-1">
              Select an avatar that represents you best from our {userGender} collection
            </p>
          </div>
          <Button 
            onClick={onClose}
            variant="ghost" 
            size="sm"
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6">
          {/* Current Avatar */}
          {currentAvatar && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-600" />
                  Current Avatar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img 
                      src={currentAvatar.url} 
                      alt={currentAvatar.name}
                      className="w-16 h-16 rounded-full border-4 border-blue-500 shadow-lg"
                      onError={(e) => {
                        console.error('Error loading current avatar:', currentAvatar.url);
                        e.currentTarget.src = '/lovable-uploads/boys/default.jpeg'; // Fallback
                      }}
                    />
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{currentAvatar.name}</p>
                    <Badge variant="outline" className="text-xs">
                      {currentAvatar.gender === 'male' ? '👨' : '👩'} {currentAvatar.gender}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Avatar Grid */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-purple-600" />
                Available Avatars
                <Badge className="ml-2">
                  {availableAvatars.length} options
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {availableAvatars.map((avatar) => (
                  <div
                    key={avatar.id}
                    className={`relative cursor-pointer rounded-lg p-3 border-2 transition-all duration-200 hover:shadow-lg ${
                      selectedAvatarUrl === avatar.url
                        ? 'border-purple-500 bg-purple-50 shadow-lg scale-105'
                        : currentAvatarUrl === avatar.url
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedAvatarUrl(avatar.url)}
                  >
                    <div className="text-center">
                      <div className="relative inline-block">
                        <img 
                          src={avatar.url} 
                          alt={avatar.name}
                          className="w-12 h-12 mx-auto rounded-full shadow-md"
                          onError={(e) => {
                            console.error('Error loading avatar:', avatar.url);
                            e.currentTarget.src = '/lovable-uploads/boys/default.jpeg'; // Fallback
                          }}
                        />
                        {selectedAvatarUrl === avatar.url && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                            <Check className="h-2.5 w-2.5 text-white" />
                          </div>
                        )}
                        {currentAvatarUrl === avatar.url && selectedAvatarUrl !== avatar.url && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                            <Check className="h-2.5 w-2.5 text-white" />
                          </div>
                        )}
                      </div>
                      <p className="text-xs font-medium text-gray-700 mt-2">{avatar.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50 flex gap-3 justify-end">
          <Button 
            onClick={onClose}
            variant="outline"
            disabled={isUpdating}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSaveAvatar}
            disabled={!selectedAvatarUrl || selectedAvatarUrl === currentAvatarUrl || isUpdating}
            className="bg-purple-600 hover:bg-purple-700"
          >
            {isUpdating ? (
              <>
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                Updating...
              </>
            ) : (
              'Save Avatar'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SeniorAvatarSelector;
