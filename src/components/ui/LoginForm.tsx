import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { User, GraduationCap, Mail, Lock, Eye, EyeOff } from "lucide-react";

// Login schema
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

type LoginValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onClose?: () => void;
  defaultUserType?: 'junior' | 'senior';
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose, defaultUserType = 'junior' }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<'junior' | 'senior'>(defaultUserType);
  const navigate = useNavigate();

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginValues) => {
    setIsSubmitting(true);
    try {
      // Validate email domain based on selected user type
      const isCollegeEmail = data.email.includes("@nitj.ac.in");
      
      if (userType === 'senior' && !isCollegeEmail) {
        throw new Error("Senior login requires a college email (@nitj.ac.in)");
      }
      
      if (userType === 'junior' && isCollegeEmail) {
        throw new Error("Junior login requires a personal email, not a college email");
      }
      
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (authError) throw authError;

      toast({
        title: "Login Successful!",
        description: "Welcome back!",
      });

      if (onClose) onClose();
      
      // Navigate based on selected user type
      navigate(userType === 'senior' ? "/senior-home" : "/junior-home");

    } catch (error: any) {
      console.error("Authentication error:", error);
      toast({
        title: "Authentication Failed",
        description: error.message || "An error occurred during authentication",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Toggle for User Type - Outside the form container with pill design */}
      <div className="relative mb-6 p-1 bg-gray-100 rounded-full shadow-inner">
        <div 
          className={`absolute top-1 h-[calc(100%-8px)] w-1/2 rounded-full shadow-lg transition-all duration-300 ease-in-out ${
            userType === 'junior' 
              ? 'left-1 bg-gradient-to-r from-pink-500 to-rose-500' 
              : 'left-1/2 bg-gradient-to-r from-purple-500 to-indigo-500'
          }`}
        />
        <div className="relative flex">
          <button
            type="button"
            onClick={() => setUserType('junior')}
            className={`flex-1 py-3 px-6 text-sm font-semibold rounded-full transition-all duration-300 z-10 ${
              userType === 'junior' ? 'text-white' : 'text-gray-600 hover:text-pink-600'
            }`}
          >
            Junior
          </button>
          <button
            type="button"
            onClick={() => setUserType('senior')}
            className={`flex-1 py-3 px-6 text-sm font-semibold rounded-full transition-all duration-300 z-10 ${
              userType === 'senior' ? 'text-white' : 'text-gray-600 hover:text-purple-600'
            }`}
          >
            Senior
          </button>
        </div>
      </div>

      {/* Login Form Container */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <h3 className={`text-lg font-bold mb-6 text-center ${userType === 'junior' ? 'text-pink-600' : 'text-purple-600'}`}>
          {userType === 'junior' ? 'Junior Login' : 'Senior Login'}
        </h3>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-4 w-4 text-gray-400" />
                      </div>
                      <Input
                        {...field}
                        type="email"
                        className="pl-10 h-10 rounded-lg bg-gray-50 border-gray-200 focus:bg-white transition-all duration-200"
                        placeholder="Enter your email"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-4 w-4 text-gray-400" />
                      </div>
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        className="pl-10 pr-10 h-10 rounded-lg bg-gray-50 border-gray-200 focus:bg-white transition-all duration-200"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                  {/* Forgot Password Link - Below password field */}
                  <div className="text-right mt-1">
                    <a 
                      href="/forgot-password" 
                      className="text-xs text-blue-600 hover:underline"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate('/forgot-password');
                      }}
                    >
                      Forgot Password?
                    </a>
                  </div>
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className={`w-full h-10 rounded-lg text-white font-semibold shadow-lg transform hover:scale-[1.02] transition-all duration-300 mt-6 ${userType === 'junior' 
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600' 
                : 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600'}`}
            >
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSubmitting ? "Signing In..." : "Sign In"}
            </Button>

            {/* Signup Navigation */}
            <div className="text-center pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-600 mb-3">Don't have an account?</p>
              <a 
                href={userType === 'junior' ? "/junior-signup" : "/senior-signup"}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(userType === 'junior' ? "/junior-signup" : "/senior-signup");
                }}
                className={`text-sm font-medium hover:underline ${userType === 'junior' 
                  ? 'text-pink-600 hover:text-pink-700' 
                  : 'text-purple-600 hover:text-purple-700'}`}
              >
                Sign up
              </a>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;