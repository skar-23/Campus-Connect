import React from "react";
import { SeniorProfile } from "@/types/database";
import { User } from "@supabase/supabase-js";
import SeniorProfileAvatar from "./SeniorProfileAvatar";
import SeniorProfileInfo from "./SeniorProfileInfo";
import SeniorProfileActions from "./SeniorProfileActions";

// Import Card and Separator components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface SeniorProfileContentProps {
  profile: SeniorProfile | null;
  user: User | null;
}

const SeniorProfileContent: React.FC<SeniorProfileContentProps> = ({ profile, user }) => {
  return (
    // Use the themed Card component for a consistent look
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">My Senior Profile</CardTitle>
      </CardHeader>
      <CardContent>
        {/* These components inside will need to be styled next */}
        <SeniorProfileAvatar />
        <SeniorProfileInfo profile={profile} user={user} />
        
        {/* Themed separator for a clean break */}
        <Separator className="my-6" />
        
        <SeniorProfileActions />
      </CardContent>
    </Card>
  );
};

export default SeniorProfileContent;