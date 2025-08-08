import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export const useUserNavigation = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // This is the new, more reliable way to check if a user is a senior.
  // It checks for a 'role' property in the user's metadata.
  const isSenior = user?.user_metadata?.role === 'senior';

  const navigateToHome = () => {
    if (!user) {
      navigate("/");
      return;
    }
    
    if (isSenior) {
      navigate("/senior-home");
    } else {
      navigate("/junior-home");
    }
  };

  const getCurrentHomeRoute = () => {
    if (!user) return "/";
    
    return isSenior ? "/senior-home" : "/junior-home";
  };

  return {
    navigateToHome,
    getCurrentHomeRoute,
    isLoggedIn: !!user,
    isSenior: isSenior, // We now use our new, more reliable variable.
  };
};