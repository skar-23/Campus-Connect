import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, GraduationCap, Mail, Lock, Eye, EyeOff, Check, X, Phone, MapPin, IdCard } from "lucide-react";

type UserRole = "junior" | "senior";

// Login schema
const createLoginSchema = (role: UserRole) => z.object({
  email: role === "junior" 
    ? z.string().email("Please enter a valid email").refine(
        (email) => email.includes("@gmail.com") || email.includes("@yahoo.com") || email.includes("@outlook.com"),
        "Juniors must use personal email (gmail.com, yahoo.com, outlook.com)"
      )
    : z.string().email("Please enter a valid email").refine(
        (email) => email.includes("@nitj.ac.in"),
        "Seniors must use college email (@nitj.ac.in)"
      ),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[0-9]/, "Must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
});

// Registration schema for Junior
const createJuniorRegisterSchema = () => z.object({
  email: z.string().email("Please enter a valid email").refine(
    (email) => email.includes("@gmail.com") || email.includes("@yahoo.com") || email.includes("@outlook.com"),
    "Juniors must use personal email (gmail.com, yahoo.com, outlook.com)"
  ),
  name: z.string().min(2, "Name must be at least 2 characters"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[0-9]/, "Must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
  confirmPassword: z.string(),
  cellNo: z.string().min(10, "Cell number must be at least 10 digits").regex(/^\d+$/, "Cell number must contain only digits"),
  gender: z.string().min(1, "Please select your gender"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Registration schema for Senior
const createSeniorRegisterSchema = () => z.object({
  email: z.string().email("Please enter a valid email").refine(
    (email) => email.includes("@nitj.ac.in"),
    "Seniors must use college email (@nitj.ac.in)"
  ),
  name: z.string().min(2, "Name must be at least 2 characters"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[0-9]/, "Must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
  confirmPassword: z.string(),
  gender: z.string().min(1, "Please select your gender"),
  rollNo: z.string().min(1, "Roll number is required"),
  phoneNo: z.string().min(10, "Phone number must be at least 10 digits").regex(/^\d+$/, "Phone number must contain only digits"),
  city: z.string().min(2, "City name must be at least 2 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginValues = z.infer<ReturnType<typeof createLoginSchema>>;
type JuniorRegisterValues = z.infer<ReturnType<typeof createJuniorRegisterSchema>>;
type SeniorRegisterValues = z.infer<ReturnType<typeof createSeniorRegisterSchema>>;

interface LoginFormProps {
  onClose?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [activeRole, setActiveRole] = useState<UserRole>("junior");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Get mode from query param
  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const mode = params.get("mode");
    if (mode === "junior" || mode === "senior") {
      setActiveRole(mode);
    }
  }, [location.search]);

  // Get the appropriate schema based on mode and role
  const getSchema = () => {
    if (isRegisterMode) {
      return activeRole === "junior" ? createJuniorRegisterSchema() : createSeniorRegisterSchema();
    }
    return createLoginSchema(activeRole);
  };

  const form = useForm({
    resolver: zodResolver(getSchema()),
    defaultValues: isRegisterMode 
      ? (activeRole === "junior" 
          ? { email: "", name: "", password: "", confirmPassword: "", cellNo: "", gender: "" }
          : { email: "", name: "", password: "", confirmPassword: "", gender: "", rollNo: "", phoneNo: "", city: "" })
      : { email: "", password: "" },
  });

  // Reset form when role or mode changes
  React.useEffect(() => {
    const defaultValues = isRegisterMode 
      ? (activeRole === "junior" 
          ? { email: "", name: "", password: "", confirmPassword: "", cellNo: "", gender: "" }
          : { email: "", name: "", password: "", confirmPassword: "", gender: "", rollNo: "", phoneNo: "", city: "" })
      : { email: "", password: "" };
    
    form.reset(defaultValues);
    setPassword("");
  }, [activeRole, isRegisterMode, form]);

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      if (isRegisterMode) {
        // Registration
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
          options: {
            data: {
              name: data.name,
              gender: data.gender,
              role: activeRole,
              ...(activeRole === "junior" && { cellNo: data.cellNo }),
              ...(activeRole === "senior" && { 
                rollNo: data.rollNo, 
                phoneNo: data.phoneNo, 
                city: data.city,
                college_id: data.rollNo // Use rollNo as college_id for seniors
              }),
            }
          }
        });

        if (authError) throw authError;

        toast({
          title: "Registration Successful!",
          description: "Please check your email to verify your account.",
        });

        // Auto login after registration
        if (authData.user) {
          if (onClose) onClose();
          navigate(activeRole === "junior" ? "/junior-home" : "/senior-home");
        }

      } else {
        // Login
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });

        if (authError) throw authError;

        toast({
          title: "Login Successful!",
          description: `Welcome back!`,
        });

        if (onClose) onClose();
        
        // Navigate based on email domain to determine role
        const isSenior = data.email.includes("@nitj.ac.in");
        navigate(isSenior ? "/senior-home" : "/junior-home");
      }

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

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Password validation checks
  const passwordChecks = {
    length: password.length >= 6,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  // Dynamic color schemes - bright colors
  const colorScheme = {
    junior: {
      gradient: "from-pink-500 to-rose-500",
      gradientHover: "from-pink-600 to-rose-600",
      border: "border-pink-400",
      bg: "bg-pink-100",
      text: "text-pink-700",
      buttonBg: "bg-gradient-to-r from-pink-400 to-rose-400",
      buttonActive: "bg-gradient-to-r from-pink-500 to-rose-500",
      ringColor: "#ec4899",
    },
    senior: {
      gradient: "from-purple-500 to-indigo-500",
      gradientHover: "from-purple-600 to-indigo-600",
      border: "border-purple-400",
      bg: "bg-purple-100",
      text: "text-purple-700",
      buttonBg: "bg-gradient-to-r from-purple-400 to-indigo-400",
      buttonActive: "bg-gradient-to-r from-purple-500 to-indigo-500",
      ringColor: "#8b5cf6",
    },
  };

  const currentColors = colorScheme[activeRole];

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header Section */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-4">
          {isRegisterMode ? "Join Campus Connect" : "Campus Connect"}
        </h2>
      </div>

      {/* Role Selection - Smaller width */}
      <div className="mb-6 flex justify-center">
        <div className="flex gap-2 p-1 bg-gray-100 rounded-lg w-fit">
          <button
            type="button"
            onClick={() => setActiveRole("junior")}
            className={`px-3 py-2 rounded-md border transition-all duration-300 ${
              activeRole === "junior"
                ? `${currentColors.buttonActive} text-white shadow-md border-transparent`
                : "border-transparent bg-transparent text-gray-600 hover:bg-white"
            }`}
          >
            <div className="flex items-center space-x-1">
              <User className="h-4 w-4" />
              <span className="font-medium text-xs">Junior</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setActiveRole("senior")}
            className={`px-3 py-2 rounded-md border transition-all duration-300 ${
              activeRole === "senior"
                ? `${currentColors.buttonActive} text-white shadow-md border-transparent`
                : "border-transparent bg-transparent text-gray-600 hover:bg-white"
            }`}
          >
            <div className="flex items-center space-x-1">
              <GraduationCap className="h-4 w-4" />
              <span className="font-medium text-xs">Senior</span>
            </div>
          </button>
        </div>
      </div>

      {/* Login Form Container */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 max-h-[70vh] overflow-y-auto">
        {/* Sign In as moved to top */}
        <h3 className={`text-lg font-bold mb-4 text-center ${currentColors.text}`}>
          {isRegisterMode ? "Create Account" : "Sign In"} as {activeRole === "junior" ? "Junior" : "Senior"}
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
                        id="email"
                        name="email"
                        className="pl-10 h-10 rounded-lg bg-gray-50 border-gray-200 focus:bg-white transition-all duration-200"
                        placeholder={
                          activeRole === "junior" 
                            ? "eg: john@gmail.com" 
                            : "eg: john@nitj.ac.in"
                        }
                        style={{
                          "--tw-ring-color": currentColors.ringColor,
                        } as React.CSSProperties}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Name Field - Only for registration */}
            {isRegisterMode && (
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Your Name
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-4 w-4 text-gray-400" />
                        </div>
                        <Input
                          {...field}
                          type="text"
                          id="name"
                          name="name"
                          className="pl-10 h-10 rounded-lg bg-gray-50 border-gray-200 focus:bg-white transition-all duration-200"
                          placeholder="Enter your full name"
                          style={{
                            "--tw-ring-color": currentColors.ringColor,
                          } as React.CSSProperties}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

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
                        id="password"
                        name="password"
                        className="pl-10 pr-10 h-10 rounded-lg bg-gray-50 border-gray-200 focus:bg-white transition-all duration-200"
                        placeholder="Enter your password"
                        onChange={(e) => {
                          field.onChange(e);
                          setPassword(e.target.value);
                        }}
                        style={{
                          "--tw-ring-color": currentColors.ringColor,
                        } as React.CSSProperties}
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
                </FormItem>
              )}
            />

            {/* Confirm Password Field - Only for registration */}
            {isRegisterMode && (
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-4 w-4 text-gray-400" />
                        </div>
                        <Input
                          {...field}
                          type={showConfirmPassword ? "text" : "password"}
                          id="confirmPassword"
                          name="confirmPassword"
                          className="pl-10 pr-10 h-10 rounded-lg bg-gray-50 border-gray-200 focus:bg-white transition-all duration-200"
                          placeholder="Confirm your password"
                          style={{
                            "--tw-ring-color": currentColors.ringColor,
                          } as React.CSSProperties}
                        />
                        <button
                          type="button"
                          onClick={toggleConfirmPasswordVisibility}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Additional fields for Junior registration */}
            {isRegisterMode && activeRole === "junior" && (
              <>
                <FormField
                  control={form.control}
                  name="cellNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Cell Number
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Phone className="h-4 w-4 text-gray-400" />
                          </div>
                          <Input
                            {...field}
                            type="tel"
                            id="cellNo"
                            name="cellNo"
                            className="pl-10 h-10 rounded-lg bg-gray-50 border-gray-200 focus:bg-white transition-all duration-200"
                            placeholder="Enter your cell number"
                            style={{
                              "--tw-ring-color": currentColors.ringColor,
                            } as React.CSSProperties}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Gender
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-10 rounded-lg bg-gray-50 border-gray-200 focus:bg-white">
                            <SelectValue placeholder="Select your gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {/* Additional fields for Senior registration */}
            {isRegisterMode && activeRole === "senior" && (
              <>
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Gender
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-10 rounded-lg bg-gray-50 border-gray-200 focus:bg-white">
                            <SelectValue placeholder="Select your gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rollNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Roll Number
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <IdCard className="h-4 w-4 text-gray-400" />
                          </div>
                          <Input
                            {...field}
                            type="text"
                            id="rollNo"
                            name="rollNo"
                            className="pl-10 h-10 rounded-lg bg-gray-50 border-gray-200 focus:bg-white transition-all duration-200"
                            placeholder="Enter your roll number"
                            style={{
                              "--tw-ring-color": currentColors.ringColor,
                            } as React.CSSProperties}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phoneNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Phone Number
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Phone className="h-4 w-4 text-gray-400" />
                          </div>
                          <Input
                            {...field}
                            type="tel"
                            id="phoneNo"
                            name="phoneNo"
                            className="pl-10 h-10 rounded-lg bg-gray-50 border-gray-200 focus:bg-white transition-all duration-200"
                            placeholder="Enter your phone number"
                            style={{
                              "--tw-ring-color": currentColors.ringColor,
                            } as React.CSSProperties}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        City (Native Place)
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MapPin className="h-4 w-4 text-gray-400" />
                          </div>
                          <Input
                            {...field}
                            type="text"
                            id="city"
                            name="city"
                            className="pl-10 h-10 rounded-lg bg-gray-50 border-gray-200 focus:bg-white transition-all duration-200"
                            placeholder="Enter your native city"
                            style={{
                              "--tw-ring-color": currentColors.ringColor,
                            } as React.CSSProperties}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {/* Password Requirements - Only show during registration or when typing password */}
            {password && (
              <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs font-medium text-gray-700 mb-2">Password Requirements:</p>
                <div className="grid grid-cols-2 gap-1 text-xs">
                  <div className={`flex items-center ${passwordChecks.length ? 'text-green-600' : 'text-red-500'}`}>
                    {passwordChecks.length ? <Check className="h-3 w-3 mr-1" /> : <X className="h-3 w-3 mr-1" />}
                    6+ characters
                  </div>
                  <div className={`flex items-center ${passwordChecks.uppercase ? 'text-green-600' : 'text-red-500'}`}>
                    {passwordChecks.uppercase ? <Check className="h-3 w-3 mr-1" /> : <X className="h-3 w-3 mr-1" />}
                    Uppercase
                  </div>
                  <div className={`flex items-center ${passwordChecks.lowercase ? 'text-green-600' : 'text-red-500'}`}>
                    {passwordChecks.lowercase ? <Check className="h-3 w-3 mr-1" /> : <X className="h-3 w-3 mr-1" />}
                    Lowercase
                  </div>
                  <div className={`flex items-center ${passwordChecks.number ? 'text-green-600' : 'text-red-500'}`}>
                    {passwordChecks.number ? <Check className="h-3 w-3 mr-1" /> : <X className="h-3 w-3 mr-1" />}
                    Number
                  </div>
                  <div className={`flex items-center ${passwordChecks.special ? 'text-green-600' : 'text-red-500'} col-span-2`}>
                    {passwordChecks.special ? <Check className="h-3 w-3 mr-1" /> : <X className="h-3 w-3 mr-1" />}
                    Special character
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className={`w-full h-10 rounded-lg bg-gradient-to-r ${currentColors.gradient} hover:${currentColors.gradientHover} text-white font-semibold shadow-lg transform hover:scale-[1.02] transition-all duration-300 mt-6`}
            >
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSubmitting
                ? "Processing..."
                : isRegisterMode
                ? `Create Account`
                : `Sign In`}
            </Button>

            {/* Toggle Mode Link */}
            <div className="text-center pt-3 border-t border-gray-100">
              <Button
                type="button"
                variant="link"
                onClick={() => setIsRegisterMode(!isRegisterMode)}
                className="text-gray-600 hover:text-gray-800 text-sm"
              >
                {isRegisterMode
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;