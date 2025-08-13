import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { fetchSeniorProfile } from '@/services/profileService';

/**
 * React Hook for Senior Profile Management
 * Handles fetching, loading states, and errors
 */
export const useSeniorProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch senior profile data using the correct service
   */
  const fetchProfile = async () => {
    if (!user?.id) {
      console.log('❌ useSeniorProfile: No user ID available');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      console.log('🔍 useSeniorProfile: Starting fetch for user ID:', user.id);

      // Use the reliable profileService function that queries by ID
      const data = await fetchSeniorProfile(user.id);

      if (data) {
        console.log('✅ useSeniorProfile: Profile loaded successfully:', data);
        setProfile(data);
      } else {
        console.log('❌ useSeniorProfile: Profile not found');
        setError('Profile not found in database');
      }

    } catch (err: any) {
      console.error('❌ useSeniorProfile: Error:', err);
      setError(err.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };


  // Fetch profile when user changes
  useEffect(() => {
    fetchProfile();
  }, [user?.email, user?.id]);

  return {
    profile,
    loading,
    error,
    refetch: fetchProfile,
  };
};
