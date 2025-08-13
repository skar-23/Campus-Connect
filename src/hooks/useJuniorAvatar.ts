import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { updateUserProfile } from '@/services/profileService';
import { 
  getAvatarFromPath, 
  getDefaultAvatar, 
  detectGenderFromName,
  AvatarData 
} from '@/utils/avatarUtils';
import { toast } from '@/components/ui/use-toast';

export function useJuniorAvatar(profile: any) {
  const { user } = useAuth();
  const [currentAvatar, setCurrentAvatar] = useState<AvatarData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (profile) {
      console.log('🎭 useJuniorAvatar: Processing profile:', {
        name: profile.name,
        gender: profile.gender,
        avatar: profile.avatar
      });
      
      // Get avatar from profile data
      let avatarData: AvatarData | null = null;

      if (profile.avatar) {
        console.log('🎭 useJuniorAvatar: Found existing avatar path:', profile.avatar);
        // Try to get avatar from the stored avatar path
        avatarData = getAvatarFromPath(profile.avatar);
      }

      // If no avatar or failed to get avatar, use default
      if (!avatarData) {
        const gender = profile.gender || detectGenderFromName(profile.name || '');
        const defaultAvatarPath = getDefaultAvatar(gender);
        console.log('🎭 useJuniorAvatar: Using default avatar for gender:', gender, 'path:', defaultAvatarPath);
        avatarData = getAvatarFromPath(defaultAvatarPath);
        
        // If this profile doesn't have an avatar set, update it in the database
        if (!profile.avatar && user?.id) {
          console.log('🎭 useJuniorAvatar: Setting default avatar in database:', defaultAvatarPath);
          // Set default avatar in database without causing re-render loops
          updateUserProfile(user.id, { avatar: defaultAvatarPath })
            .catch(error => console.error('Failed to set default avatar:', error));
        }
      }

      console.log('🎭 useJuniorAvatar: Final avatar data:', avatarData);
      setCurrentAvatar(avatarData);
    }
  }, [profile, user?.id]);

  const updateAvatar = async (avatarPath: string): Promise<boolean> => {
    if (!user?.id) {
      toast({
        title: "Error",
        description: "User not authenticated",
        variant: "destructive",
      });
      return false;
    }

    try {
      setIsLoading(true);

      // Update avatar in database
      await updateUserProfile(user.id, {
        avatar: avatarPath
      });

      // Update local state
      const newAvatarData = getAvatarFromPath(avatarPath);
      setCurrentAvatar(newAvatarData);

      toast({
        title: "Avatar Updated",
        description: "Your avatar has been successfully updated.",
      });

      return true;
    } catch (error: any) {
      console.error('Error updating avatar:', error);
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update avatar",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const getAvatarUrl = (): string => {
    if (currentAvatar?.url) {
      return currentAvatar.url;
    }

    // Fallback to default avatar
    const gender = profile?.gender || detectGenderFromName(profile?.name || '');
    return getDefaultAvatar(gender);
  };

  return {
    currentAvatar,
    avatarUrl: getAvatarUrl(),
    isLoading,
    updateAvatar
  };
}
