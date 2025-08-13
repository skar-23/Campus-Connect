import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { fetchUserProfile } from '@/services/profileService';

/**
 * Simplified Junior Profile Hook - fetches data directly from database
 * Similar to useSeniorProfile but for juniors table
 */
export const useSimpleJuniorProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch junior profile data from database
   */
  const fetchProfile = async () => {
    if (!user?.id) {
      console.log('❌ useSimpleJuniorProfile: No user ID available');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      console.log('🔍 useSimpleJuniorProfile: Starting fetch for user ID:', user.id);

      // Fetch directly from juniors table
      const data = await fetchUserProfile(user.id);

      if (data) {
        console.log('✅ useSimpleJuniorProfile: Profile loaded successfully:', data);
        setProfile(data);
      } else {
        console.log('❌ useSimpleJuniorProfile: Profile not found');
        setError('Profile not found in database');
      }

    } catch (err: any) {
      console.error('❌ useSimpleJuniorProfile: Error:', err);
      setError(err.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  // Fetch profile when user changes
  useEffect(() => {
    fetchProfile();
  }, [user?.id]);

  return {
    profile,
    loading,
    error,
    refetch: fetchProfile,
  };
};
