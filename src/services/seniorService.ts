import { supabase } from '@/integrations/supabase/client';
import { SeniorProfile, SeniorProfileInput, SeniorProfileResponse, Senior } from '@/types/senior';

/**
 * Senior Service - Handles all database operations for senior profiles
 */
export class SeniorService {
  
  /**
   * Fetch senior profile by email
   * @param email - Email address to search for
   * @returns Promise<SeniorProfileResponse>
   */
  static async getProfileByEmail(email: string): Promise<SeniorProfileResponse> {
    try {
      console.log('🔍 SeniorService: Fetching profile for email:', email);

      // Use .limit(1) instead of .single() to avoid 406 errors
      const { data, error } = await supabase
        .from('seniors')
        .select('*')
        .eq('email', email)
        .limit(1);

      if (error) {
        console.error('❌ SeniorService: Database error:', {
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint
        });
        return {
          success: false,
          error: `Database error: ${error.message}`
        };
      }

      if (!data || data.length === 0) {
        console.log('⚠️ SeniorService: No profile found for email:', email);
        return {
          success: false,
          error: 'Profile not found'
        };
      }

      console.log('✅ SeniorService: Profile found successfully:', {
        email: data[0].email,
        name: data[0].name,
        id: data[0].id
      });
      return {
        success: true,
        data: data[0] as SeniorProfile
      };

    } catch (error: any) {
      console.error('❌ SeniorService: Unexpected error:', error);
      return {
        success: false,
        error: error.message || 'Failed to fetch profile'
      };
    }
  }

  /**
   * Fetch senior profile by ID
   * @param id - User ID to search for
   * @returns Promise<SeniorProfileResponse>
   */
  static async getProfileById(id: string): Promise<SeniorProfileResponse> {
    try {
      console.log('🔍 SeniorService: Fetching profile for ID:', id);

      // Use .limit(1) instead of .single() to avoid 406 errors
      const { data, error } = await supabase
        .from('seniors')
        .select('*')
        .eq('id', id)
        .limit(1);

      if (error) {
        console.error('❌ SeniorService: Database error:', {
          code: error.code,
          message: error.message
        });
        return {
          success: false,
          error: `Database error: ${error.message}`
        };
      }

      if (!data || data.length === 0) {
        console.log('⚠️ SeniorService: No profile found for ID:', id);
        return {
          success: false,
          error: 'Profile not found'
        };
      }

      console.log('✅ SeniorService: Profile found successfully');
      return {
        success: true,
        data: data[0] as SeniorProfile
      };

    } catch (error: any) {
      console.error('❌ SeniorService: Error fetching profile:', error);
      return {
        success: false,
        error: error.message || 'Failed to fetch profile'
      };
    }
  }

  /**
   * Update senior profile
   * @param id - User ID
   * @param profileData - Profile data to update
   * @returns Promise<SeniorProfileResponse>
   */
  static async updateProfile(id: string, profileData: Partial<SeniorProfileInput>): Promise<SeniorProfileResponse> {
    try {
      console.log('🔄 SeniorService: Updating profile for ID:', id);

      const { data, error } = await supabase
        .from('seniors')
        .update(profileData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      console.log('✅ SeniorService: Profile updated successfully');
      return {
        success: true,
        data: data as SeniorProfile
      };

    } catch (error: any) {
      console.error('❌ SeniorService: Error updating profile:', error);
      return {
        success: false,
        error: error.message || 'Failed to update profile'
      };
    }
  }

  /**
   * Sync user ID with email (when ID mismatch occurs)
   * @param email - Email to search for
   * @param newId - New ID to set
   * @returns Promise<boolean>
   */
  static async syncIdWithEmail(email: string, newId: string): Promise<boolean> {
    try {
      console.log('🔄 SeniorService: Syncing ID for email:', email, 'to ID:', newId);

      const { error } = await supabase
        .from('seniors')
        .update({ id: newId })
        .eq('email', email);

      if (error) {
        throw error;
      }

      console.log('✅ SeniorService: ID synced successfully');
      return true;

    } catch (error: any) {
      console.error('❌ SeniorService: Error syncing ID:', error);
      return false;
    }
  }

  /**
   * Calculate current year of study from roll number
   * @param rollNo - Roll number like "21103045"
   * @returns Current year string like "3rd Year Student"
   */
  static getCurrentYearOfStudy(rollNo: string): string {
    if (!rollNo || rollNo === "Not provided") return "Final Year Student";
    const joinYear = parseInt("20" + rollNo.substring(0, 2));
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    let academicYear = currentYear;
    if (currentMonth < 7) {
      academicYear = currentYear - 1;
    }
    const yearsCompleted = academicYear - joinYear;
    const currentStudyYear = yearsCompleted + 1;
    if (currentStudyYear <= 1) return "1st Year Student";
    if (currentStudyYear === 2) return "2nd Year Student";
    if (currentStudyYear === 3) return "3rd Year Student";
    if (currentStudyYear === 4) return "4th Year Student";
    return "Final Year Student";
  }

  /**
   * Transform database SeniorProfile to UI Senior interface
   * @param profile - Database senior profile
   * @returns UI-compatible Senior object
   */
  static transformToUISenior(profile: SeniorProfile): Senior {
    return {
      id: profile.id,
      name: profile.name || 'No name',
      branch: profile.branch || 'Engineering',
      graduationYear: this.getCurrentYearOfStudy(profile.rollno || ''), // Now shows "3rd Year Student"
      nativePlace: profile.native_place || 'Not specified',
      state: profile.native_place || 'Not specified', // Using native_place for state as requested
      gender: profile.gender || 'male',
      avatarId: profile.avatar || '/default-avatar.jpg', // Using avatar URL from database
      isPublic: profile.is_public ?? true,
      contactNumber: profile.is_public ? profile.mobile : undefined,
      verified: true // Default to true as requested
    };
  }

  /**
   * Fetch all senior profiles for Connect with Seniors page
   * @returns Promise<Senior[]>
   */
  static async getAllSeniors(): Promise<Senior[]> {
    try {
      console.log('🔍 SeniorService: Fetching all senior profiles');

      const { data, error } = await supabase
        .from('seniors')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ SeniorService: Database error:', {
          code: error.code,
          message: error.message
        });
        return [];
      }

      if (!data || data.length === 0) {
        console.log('⚠️ SeniorService: No senior profiles found');
        return [];
      }

      console.log(`✅ SeniorService: Found ${data.length} senior profiles`);
      
      // Transform database profiles to UI-compatible Senior objects
      const transformedSeniors = data.map(profile => this.transformToUISenior(profile as SeniorProfile));
      
      return transformedSeniors;

    } catch (error: any) {
      console.error('❌ SeniorService: Unexpected error:', error);
      return [];
    }
  }
}
