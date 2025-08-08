import React from "react";
import { JuniorProfile } from "@/types/database";
import { User } from "@supabase/supabase-js";
import ProfileAvatar from "./ProfileAvatar";
import ProfileInfo from "./ProfileInfo";
import ProfileActions from "./ProfileActions";

// Import Card and Separator components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface ProfileContentProps {
  profile: JuniorProfile | null;
  user: User | null;
}

const ProfileContent: React.FC<ProfileContentProps> = ({ profile, user }) => {
  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">My Profile</CardTitle>
      </CardHeader>
      <CardContent>
        {/* The components inside will need styling next */}
        <ProfileAvatar />
        <ProfileInfo profile={profile} user={user} />
        
        <Separator className="my-6" />
        
        <ProfileActions />
      </CardContent>
    </Card>
  );
};

export default ProfileContent;