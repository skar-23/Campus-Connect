import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { getUserAvatar, detectGenderFromName, assignRandomAvatarOnSignup } from '@/utils/avatarUtils';
import { toast } from '@/components/ui/use-toast';

export interface JuniorProfile {
  id: string;
  name: string;
  email: string;
  gender: 'male' | 'female';
  phone?: string;
  year?: string;
  branch?: string;
  college?: string;
  city?: string;
  avatarId?: string;
  createdAt: string;
  updatedAt: string;
}

export function useJuniorProfile() {
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<JuniorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    if (!user || authLoading) return;

    try {
      setLoading(true);
      setError(null);

      // First, try to fetch from juniors table
      const { data: juniorData, error: juniorError } = await supabase
        .from('juniors')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (juniorError && !juniorError.message.includes('No rows found')) {
        throw juniorError;
      }

      let profileData: JuniorProfile;

      if (juniorData) {
        // Profile exists in database
        profileData = {
          id: juniorData.id,
          name: juniorData.name || user.user_metadata?.name || 'User',
          email: juniorData.email || user.email || '',
          gender: juniorData.gender || detectGenderFromName(juniorData.name || user.user_metadata?.name || 'User'),
          phone: juniorData.phone || user.user_metadata?.phone,
          year: juniorData.year || user.user_metadata?.year || '1st Year',
          branch: juniorData.branch || user.user_metadata?.branch,
          college: juniorData.college || 'NIT Jalandhar',
          city: juniorData.city || user.user_metadata?.city,
          avatarId: juniorData.avatar_id,
          createdAt: juniorData.created_at,
          updatedAt: juniorData.updated_at
        };
      } else {
        // Create profile from auth metadata
        const name = user.user_metadata?.name || 'User';
        const gender = detectGenderFromName(name);
        const avatarId = assignRandomAvatarOnSignup(gender, user.id);

        profileData = {
          id: user.id,
          name: name,
          email: user.email || '',
          gender: gender,
          phone: user.user_metadata?.phone,
          year: user.user_metadata?.year || '1st Year',
          branch: user.user_metadata?.branch,
          college: 'NIT Jalandhar',
          city: user.user_metadata?.city,
          avatarId: avatarId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        // Insert into database
        const { error: insertError } = await supabase
          .from('juniors')
          .insert({
            id: user.id,
            name: profileData.name,
            email: profileData.email,
            gender: profileData.gender,
            phone: profileData.phone,
            year: profileData.year,
            branch: profileData.branch,
            college: profileData.college,
            city: profileData.city,
            avatar_id: profileData.avatarId
          });

        if (insertError) {
          console.warn('Could not insert profile into database:', insertError);
          // Continue with in-memory profile
        }
      }

      setProfile(profileData);
    } catch (err: any) {
      console.error('Error fetching junior profile:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<JuniorProfile>) => {
    if (!user || !profile) return false;

    try {
      const updatedProfile = { ...profile, ...updates, updatedAt: new Date().toISOString() };
      
      // Update in database
      const { error: updateError } = await supabase
        .from('juniors')
        .upsert({
          id: user.id,
          name: updatedProfile.name,
          email: updatedProfile.email,
          gender: updatedProfile.gender,
          phone: updatedProfile.phone,
          year: updatedProfile.year,
          branch: updatedProfile.branch,
          college: updatedProfile.college,
          city: updatedProfile.city,
          avatar_id: updatedProfile.avatarId,
          updated_at: updatedProfile.updatedAt
        });

      if (updateError) {
        console.warn('Could not update profile in database:', updateError);
        // Continue with local update
      }

      setProfile(updatedProfile);
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });

      return true;
    } catch (err: any) {
      console.error('Error updating profile:', err);
      toast({
        title: "Update Failed",
        description: err.message,
        variant: "destructive",
      });
      return false;
    }
  };

  const updateAvatar = async (avatarId: string) => {
    return await updateProfile({ avatarId });
  };

  const getCurrentAvatar = () => {
    if (!profile) return null;
    return getUserAvatar(profile.id, profile.gender);
  };

  useEffect(() => {
    fetchProfile();
  }, [user, authLoading]);

  return {
    profile,
    loading,
    error,
    updateProfile,
    updateAvatar,
    getCurrentAvatar,
    refreshProfile: fetchProfile
  };
}
