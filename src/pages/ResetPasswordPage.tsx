
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import Footer from "../components/layout/Footer";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ResetPasswordPage: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resetToken, setResetToken] = useState<string | null>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const email = searchParams.get("email") || "";

  // Check for reset token in URL hash
  useEffect(() => {
    // The hash part looks like: #access_token=...&refresh_token=...
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get("access_token");
    if (accessToken) {
      setResetToken(accessToken);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate passwords
    if (password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match",
        variant: "destructive",
      });
      return;
    }

    if (!email) {
      toast({
        title: "Email required",
        description: "Email is required to reset password",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('verify-reset-code', {
        body: { 
          email,
          code: "verified", // This page is reached after code verification
          newPassword: password
        }
      });

      if (error) throw error;

      if (data.success) {
        toast({
          title: "Password updated",
          description: "Your password has been reset successfully. Please login with your new password."
        });
        
        setTimeout(() => {
          navigate("/junior-login");
        }, 1500);
      } else {
        throw new Error(data.error || 'Failed to reset password');
      }
    } catch (error: any) {
      console.error("Password reset error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to reset password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white font-['Poppins']">
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-gray-700 hover:text-gray-900">
            Home
          </Link>
          <Link to="/" className="text-[#5c7bb5] text-2xl font-semibold">
            CampusConnect
          </Link>
          <div className="w-[50px]"></div>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-900">Reset Password</h1>
            <p className="mt-2 text-sm text-gray-600">
              Enter your new password
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-2">
              <label htmlFor="password" className="block font-medium">
                New Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded h-12"
                placeholder="Enter your new password"
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block font-medium">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-gray-300 rounded h-12"
                placeholder="Confirm your new password"
                required
                disabled={isLoading}
              />
            </div>

            <Button
              type="submit"
              className="w-full block text-center bg-[#7d9bd2] text-black py-2.5 px-4 rounded-full hover:bg-[#6b89c0] transition-colors"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Reset Password"}
            </Button>

            <div className="text-center mt-4">
              <Link
                to="/junior-login"
                className="text-sm text-[#5c7bb5] hover:underline"
              >
                Back to Login
              </Link>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ResetPasswordPage;
