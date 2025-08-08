import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase, getSeniorProfiles } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { SeniorProfile } from "@/types/database";

// Import themed components
import SeniorProfileHeader from "@/components/profile/SeniorProfileHeader";
import Footer from "@/components/layout/Footer"; // Replaced SeniorProfileFooter
import SeniorEditProfileForm from "@/components/profile/SeniorEditProfileForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const SeniorEditPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<SeniorProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // --- All your data fetching and saving logic is perfect, no changes needed ---
  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      if (!user) return;
      const { data, error } = await getSeniorProfiles()
        .select('*')
        .eq('id', user.id)
        .maybeSingle();
      if (error && !error.message.includes('No rows found')) throw error;
      setProfile(data as SeniorProfile);
    } catch (error: any) {
      toast({ title: "Error fetching profile", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (name: string, gender: string, rollNo: string, phone: string, email: string, region: string, password: string) => {
    try {
      if (!user) throw new Error("User not authenticated");
      const updateData: Partial<SeniorProfile> = { name, gender, roll_no: rollNo, phone, email, region };
      
      const { error: profileError } = await getSeniorProfiles().update(updateData).eq('id', user.id);
      if (profileError) throw profileError;

      if (password) {
        const { error: passwordError } = await supabase.auth.updateUser({ password });
        if (passwordError) throw passwordError;
      }

      toast({ title: "Profile updated successfully!" });
      navigate("/senior-profile");
    } catch (error: any) {
      toast({ title: "Failed to update profile", description: error.message, variant: "destructive" });
    }
  };

  // Themed loading state
  if (loading) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SeniorProfileHeader />

      <main className="flex-grow container py-12">
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Edit Your Profile</CardTitle>
            </CardHeader>
            <CardContent>
                <SeniorEditProfileForm
                  initialName={profile?.name || user?.user_metadata.name || ''}
                  initialGender={profile?.gender || user?.user_metadata.gender || ''}
                  initialRollNo={profile?.roll_no || user?.user_metadata.roll_no || ''}
                  initialPhone={profile?.phone || user?.user_metadata.phone || ''}
                  initialEmail={profile?.email || user?.email || ''}
                  initialRegion={profile?.region || user?.user_metadata.region || ''}
                  isLoading={loading}
                  onSave={handleSave}
                />
            </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default SeniorEditPage;