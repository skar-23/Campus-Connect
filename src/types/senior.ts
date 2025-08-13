/**
 * Senior Profile Interface
 * Maps directly to the database 'seniors' table structure
 */
export interface SeniorProfile {
  id: string;
  email: string;
  name: string;
  mobile: string;
  gender: string;
  rollno: string;
  native_place: string;
  branch: string;
  is_public: boolean;
  avatar?: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * Input interface for creating/updating senior profiles
 */
export interface SeniorProfileInput {
  name: string;
  mobile: string;
  gender: string;
  rollno: string;
  native_place: string;
  branch: string;
  is_public?: boolean;
}

/**
 * Response interface for API operations
 */
export interface SeniorProfileResponse {
  success: boolean;
  data?: SeniorProfile;
  error?: string;
}

/**
 * UI Senior interface for Connect with Seniors page
 * Maps database fields to UI-compatible structure
 */
export interface Senior {
  id: string;
  name: string;
  branch: string;
  graduationYear: string;
  nativePlace: string;
  state: string; // Will use native_place for both
  gender: string;
  avatarId: string; // Will use avatar URL from database
  isPublic: boolean;
  contactNumber?: string;
  verified: boolean; // Default to true
}

/**
 * Alternative suggestion interface
 */
export interface AlternativeSuggestion {
  type: string;
  text: string;
  seniors: Senior[];
  action: () => void;
}
