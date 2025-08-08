import React, { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { AuthContextType } from "@/types/auth";
import { useAuthNavigation } from "@/hooks/useAuthNavigation";
import { updateUserProfile, updateSeniorProfile } from "@/services/profileService";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { navigateAfterSignIn, navigateAfterSignOut } = useAuthNavigation();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );
    return () => subscription.unsubscribe();
  }, []);

  // --- THIS IS THE FIX ---
  // We are adding the logic back to create a public profile after signup.
  const signUp = async (email: string, password: string, name: string, gender: string, collegeId: string | undefined, phone: string | undefined, region: string | undefined, role: 'junior' | 'senior') => {
    try {
      const userData = { name, gender, email, phone, region, college_id: collegeId, role };
      
      const { data, error } = await supabase.auth.signUp({
        email, password, options: { data: userData },
      });

      if (error) throw error;
      if (!data.user) throw new Error("Signup succeeded but no user was returned.");

      // CRITICAL STEP ADDED BACK: Create the public profile using an Edge Function
      const profileData = {
        userId: data.user.id,
        userData: userData,
        isSenior: role === 'senior'
      };

      const { error: functionError } = await supabase.functions.invoke('create-profile', {
        body: profileData
      });
      
      if (functionError) throw functionError;

      toast({
        title: "Account Created!",
        description: "You have been signed up successfully.",
      });
      navigateAfterSignIn(role);

    } catch (error: any) {
      toast({ title: "Error signing up", description: error.message, variant: "destructive" });
      throw error;
    }
  };
  // --- END OF FIX ---

  const signIn = async (email: string, password: string, userType: 'junior' | 'senior') => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      if (!data.user) throw new Error("Login failed, please try again.");

      const userRole = data.user.user_metadata?.role;

      if (userRole === userType) {
        navigateAfterSignIn(userType);
      } else {
        await supabase.auth.signOut();
        toast({
          title: "Login Error",
          description: `This is a ${userRole || 'unassigned'} account. Please use the correct login page.`,
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({ title: "Error signing in", description: error.message, variant: "destructive" });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      navigateAfterSignOut();
    } catch (error: any) {
      toast({ title: "Error signing out", description: error.message, variant: "destructive" });
    }
  };

  const updateProfile = async (data: {
    name?: string; gender?: string; password?: string; roll_no?: string;
    phone?: string; email?: string; region?: string;
  }) => {
    try {
      if (!user) throw new Error("User not authenticated");

      if (data.password) {
        await supabase.auth.updateUser({ password: data.password });
      }
      
      const isSenior = user.user_metadata?.role === 'senior';

      if (isSenior) {
        const seniorUpdateData: any = {};
        if (data.name !== undefined) seniorUpdateData.name = data.name;
        if (data.gender !== undefined) seniorUpdateData.gender = data.gender;
        if (data.roll_no !== undefined) seniorUpdateData.roll_no = data.roll_no;
        if (data.phone !== undefined) seniorUpdateData.phone = data.phone;
        if (data.email !== undefined) seniorUpdateData.email = data.email;
        if (data.region !== undefined) seniorUpdateData.region = data.region;
        await updateSeniorProfile(user.id, seniorUpdateData);
      } else {
        if (data.name || data.gender) {
          await updateUserProfile(user.id, { name: data.name, gender: data.gender });
        }
      }

      toast({ title: "Profile updated successfully!" });
    } catch (error: any) {
      toast({ title: "Error updating profile", description: error.message, variant: "destructive" });
    }
  };

  const value = { user, session, loading, signUp, signIn, signOut, updateProfile };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}