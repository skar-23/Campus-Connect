import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAuth } from "@/contexts/AuthContext";

const SeniorProfileAvatar: React.FC = () => {
  const { user } = useAuth();
  
  const getInitial = () => {
    if (!user?.email) return "?";
    return user.email.charAt(0).toUpperCase();
  };

  return (
    <div className="flex flex-col sm:flex-row gap-6 items-center mb-6">
      <Avatar className="h-24 w-24">
        {/* You can get the avatar URL from the user's profile data in the future */}
        <AvatarImage src={user?.user_metadata?.avatar_url || ""} alt="Profile" />
        <AvatarFallback className="bg-primary text-primary-foreground text-4xl">
          {getInitial()}
        </AvatarFallback>
      </Avatar>
      <div className="text-center sm:text-left">
        <h2 className="text-2xl font-bold text-foreground">
          {user?.user_metadata?.name || 'Your Name'}
        </h2>
        <p className="text-md text-muted-foreground">
          {user?.email}
        </p>
      </div>
    </div>
  );
};

export default SeniorProfileAvatar;