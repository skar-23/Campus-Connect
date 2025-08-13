
import { supabase } from "@/integrations/supabase/client";
import { JuniorProfile } from "@/types/database";
import { assignDefaultAvatarForSenior, detectGenderFromName } from "@/utils/avatarUtils";

export const createProfileIfNotExists = async (userId: string, userMetadata: any) => {
  try {
    console.log("Creating profile for user:", userId);
    console.log("User metadata:", userMetadata);
    
    // Check if regular profile exists
    const { data: existingProfile, error: fetchError } = await supabase
      .from('juniors')
      .select()
      .eq('id', userId)
      .maybeSingle();
      
    if (fetchError && !fetchError.message.includes('No rows found')) throw fetchError;
    
    // Check if this is a senior (has college_id in metadata)
    const isSenior = userMetadata?.college_id || userMetadata?.roll_no;
    
    if (isSenior) {
      console.log("Creating senior profile...");
      // Check if senior profile exists
      const { data: existingSeniorProfile, error: seniorFetchError } = await supabase
        .from('seniors')
        .select()
        .eq('id', userId)
        .maybeSingle();
        
      if (seniorFetchError && !seniorFetchError.message.includes('No rows found')) throw seniorFetchError;
      
      // If no senior profile exists, create one
      if (!existingSeniorProfile) {
        const detectedGender = userMetadata?.gender || detectGenderFromName(userMetadata?.name || '');
        const defaultAvatar = assignDefaultAvatarForSenior(detectedGender);
        
        const seniorData = {
          id: userId,
          name: userMetadata?.name || null,
          gender: detectedGender,
          college_id: userMetadata?.college_id || null,
          roll_no: userMetadata?.roll_no || userMetadata?.college_id || null, // Use college_id as fallback for roll_no
          phone: userMetadata?.phone || null,
          email: userMetadata?.email || null,
          region: userMetadata?.region || null,
          avatar: defaultAvatar,
        };
        
        console.log("Inserting senior profile data:", seniorData);
        
        const { error: insertError } = await supabase.from('seniors').insert(seniorData);
        
        if (insertError) {
          console.error("Error inserting senior profile:", insertError);
          throw insertError;
        }
        
        console.log("Senior profile created successfully");
      } else {
        console.log("Senior profile already exists");
      }
    } else {
      console.log("Creating regular profile...");
      // If no regular profile exists, create one
      if (!existingProfile) {
        const detectedGender = userMetadata?.gender || detectGenderFromName(userMetadata?.name || '');
        const defaultAvatar = assignDefaultAvatarForSenior(detectedGender); // Same function works for juniors
        
        const profileData = {
          id: userId,
          name: userMetadata?.name || null,
          gender: detectedGender,
          email: userMetadata?.email || null,
          phone: userMetadata?.phone || null,
          avatar: defaultAvatar,
        };
        
        console.log("Inserting profile data:", profileData);
        
        const { error: insertError } = await supabase.from('juniors').insert(profileData);
        
        if (insertError) {
          console.error("Error inserting profile:", insertError);
          throw insertError;
        }
        
        console.log("Profile created successfully");
      } else {
        console.log("Profile already exists");
      }
    }
  } catch (error) {
    console.error("Error checking/creating profile:", error);
  }
};

export const fetchUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('juniors')
    .select('*')
    .eq('id', userId)
    .single();

  if (error && error.code !== 'PGRST116') {
    throw error;
  }

  return data;
};

export const updateUserProfile = async (userId: string, profileData: { 
  name?: string; 
  gender?: string; 
  email?: string; 
  phone?: string; 
  mobile?: string;
  college?: string;
  year?: string;
  avatar?: string;
}) => {
  // Map phone to mobile if provided (for backward compatibility)
  const updateData: any = { ...profileData };
  if (profileData.phone && !profileData.mobile) {
    updateData.mobile = profileData.phone;
    delete updateData.phone;
  }
  
  const { data, error } = await supabase
    .from('juniors')
    .update(updateData)
    .eq('id', userId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const fetchSeniorProfile = async (userId: string) => {
  console.log("Fetching senior profile for user:", userId);
  
  const { data, error } = await supabase
    .from('seniors')
    .select('*')
    .eq('id', userId)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error("Error fetching senior profile:", error);
    throw error;
  }

  if (!data) {
    console.log("No senior profile found for user:", userId);
    return null;
  }

  console.log("Senior profile fetched successfully:", data);
  return data;
};

export const updateSeniorProfile = async (userId: string, data: {
  name?: string; 
  gender?: string; 
  roll_no?: string; 
  phone?: string; 
  email?: string; 
  region?: string;
  rollno?: string;
  native_place?: string;
  branch?: string;
  is_public?: boolean;
  mobile?: string;
  avatar?: string;
}) => {
  console.log("Updating senior profile for user:", userId);
  console.log("Update data:", data);
  
  const updateData: any = {};
  if (data.name !== undefined) updateData.name = data.name;
  if (data.gender !== undefined) updateData.gender = data.gender;
  if (data.roll_no !== undefined) updateData.rollno = data.roll_no; // Map to correct column
  if (data.rollno !== undefined) updateData.rollno = data.rollno;
  if (data.phone !== undefined) updateData.mobile = data.phone; // Map to correct column
  if (data.mobile !== undefined) updateData.mobile = data.mobile;
  if (data.email !== undefined) updateData.email = data.email;
  if (data.region !== undefined) updateData.native_place = data.region; // Map to correct column
  if (data.native_place !== undefined) updateData.native_place = data.native_place;
  if (data.branch !== undefined) updateData.branch = data.branch;
  if (data.is_public !== undefined) updateData.is_public = data.is_public;
  if (data.avatar !== undefined) updateData.avatar = data.avatar;

  const { error } = await supabase
    .from('seniors')
    .update(updateData)
    .eq('id', userId);

  if (error) {
    console.error("Error updating senior profile:", error);
    throw error;
  }
  
  console.log("Senior profile updated successfully");
};
