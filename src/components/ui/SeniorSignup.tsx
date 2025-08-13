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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { GraduationCap, Mail, Lock, Eye, EyeOff, Phone, MapPin, IdCard, User, Check, X, ChevronDown } from "lucide-react";

// Senior registration schema
const seniorSchema = z.object({
  email: z.string().email("Please enter a valid email").refine(
    (email) => email.includes("@nitj.ac.in"),
    "Seniors must use college email (@nitj.ac.in)"
  ),
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .trim(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[0-9]/, "Must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
  confirmPassword: z.string(),
  mobile: z.string().min(10, "Mobile number must be at least 10 digits").regex(/^\d+$/, "Mobile number must contain only digits"),
  gender: z.string().min(1, "Please select your gender"),
  rollno: z.string().min(1, "Roll number is required"),
  native_place: z.string().min(2, "Native place must be at least 2 characters"),
  branch: z.string().optional(),
  is_public: z.boolean().default(true),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SeniorValues = z.infer<typeof seniorSchema>;

// Branch options (same as SearchAndFilter)
const branches = [
  { value: "Computer Science Engineering", label: "Computer Science Engineering" },
  { value: "Information Technology", label: "Information Technology" },
  { value: "Civil Engineering", label: "Civil Engineering" },
  { value: "Mechanical Engineering", label: "Mechanical Engineering" },
  { value: "Electronics & Communication Engineering", label: "Electronics & Communication Engineering" },
  { value: "Electrical Engineering", label: "Electrical Engineering" },
  { value: "Chemical Engineering", label: "Chemical Engineering" },
  { value: "Biotechnology", label: "Biotechnology" },
  { value: "Industrial & Production Engineering", label: "Industrial & Production Engineering" },
  { value: "Instrumentation & Control Engineering", label: "Instrumentation & Control Engineering" },
];

// SearchableCombobox component (simplified version for branch only)
const BranchCombobox = ({ value, onChange, error }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [inputText, setInputText] = React.useState("");
  const [highlightedIndex, setHighlightedIndex] = React.useState(-1);
  const inputRef = React.useRef(null);
  const containerRef = React.useRef(null);

  // Get selected option
  const selectedOption = branches.find(option => option.value === value);

  // Initialize input text with selected option
  React.useEffect(() => {
    if (selectedOption && !isOpen) {
      setInputText(selectedOption.label);
    } else if (!selectedOption && !isOpen) {
      setInputText("");
    }
  }, [value, selectedOption, isOpen]);

  // Filter options based on what user is typing
  const filteredOptions = inputText.trim() === "" 
    ? branches 
    : branches.filter(option =>
        option.label.toLowerCase().includes(inputText.toLowerCase())
      );

  // Handle click outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
        if (selectedOption) {
          setInputText(selectedOption.label);
        } else {
          setInputText("");
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [selectedOption]);

  const selectOption = (option) => {
    onChange(option.value);
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  const handleInputChange = (e) => {
    const newText = e.target.value;
    setInputText(newText);
    
    if (!isOpen) {
      setIsOpen(true);
    }
    
    // Clear selection if user clears the input
    if (newText === "") {
      onChange("");
    }
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange("");
    setInputText("");
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div className="relative" ref={containerRef}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={inputText}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          placeholder="Type or select branch..."
          className={`w-full pl-3 pr-16 py-2.5 h-10 rounded-lg bg-gray-50 border-gray-200 focus:bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500 ${
            error ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : ''
          }`}
          autoComplete="off"
        />

        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
          {selectedOption && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 hover:bg-gray-200 rounded-full transition-colors"
            >
              <X className="h-3 w-3 text-gray-400" />
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 hover:bg-gray-200 rounded-full transition-colors"
          >
            <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {isOpen && filteredOptions.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-hidden animate-in slide-in-from-top-2 duration-200">
          <div className="max-h-60 overflow-y-auto">
            {filteredOptions.map((option, index) => (
              <div
                key={option.value}
                onClick={() => selectOption(option)}
                className={`px-3 py-2 text-sm cursor-pointer transition-all duration-150 hover:bg-gray-50 ${
                  value === option.value ? 'bg-purple-50 text-purple-700 font-semibold' : 'text-gray-700'
                }`}
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {isOpen && filteredOptions.length === 0 && inputText && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
          <div className="px-3 py-2 text-sm text-gray-500">
            No results found for "{inputText}"
          </div>
        </div>
      )}
    </div>
  );
};

const SeniorSignup: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const form = useForm<SeniorValues>({
    resolver: zodResolver(seniorSchema),
    defaultValues: { 
      email: "", 
      name: "", 
      password: "", 
      confirmPassword: "", 
      mobile: "", 
      gender: "",
      rollno: "",
      native_place: "",
      branch: "",
      is_public: true
    },
  });

  const onSubmit = async (data: SeniorValues) => {
    setIsSubmitting(true);
    try {
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name,
            gender: data.gender,
            role: "senior",
            rollno: data.rollno,
            mobile: data.mobile,
            native_place: data.native_place,
            branch: data.branch,
            is_public: data.is_public,
          }
        }
      });

      if (authError) throw authError;

      // Insert into seniors table with correct column names
      if (authData.user) {
        const { error: seniorError } = await supabase
          .from('seniors')
          .insert({
            id: authData.user.id,
            name: data.name,
            email: data.email,
            mobile: data.mobile,
            gender: data.gender,
            rollno: data.rollno,
            native_place: data.native_place,
            branch: data.branch || null,
            is_public: data.is_public
          });

        if (seniorError) {
          console.error('Error inserting senior data:', seniorError);
          toast({
            title: "Registration Warning",
            description: "Account created but profile data may be incomplete. Please update your profile.",
            variant: "destructive",
          });
        }
      }

      // Remove toast notification and redirect to home with success state
      navigate("/?signup=success&type=senior");

    } catch (error: any) {
      console.error("Registration error:", error);
      toast({
        title: "Registration Failed",
        description: error.message || "An error occurred during registration",
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header Section */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent mb-2">
            Senior Signup
          </h1>
          <p className="text-gray-600">Join Campus Connect as a Senior</p>
        </div>

        {/* Form Container */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      College Email Address
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
                          placeholder="john@nitj.ac.in"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-4 w-4 text-gray-400" />
                        </div>
                        <Input
                          {...field}
                          type="text"
                          className="pl-10 h-10 rounded-lg bg-gray-50 border-gray-200 focus:bg-white transition-all duration-200"
                          placeholder="Enter your full name"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Roll Number Field */}
              <FormField
                control={form.control}
                name="rollno"
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
                          className="pl-10 h-10 rounded-lg bg-gray-50 border-gray-200 focus:bg-white transition-all duration-200"
                          placeholder="Enter your roll number"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Mobile Field */}
              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Mobile Number
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-4 w-4 text-gray-400" />
                        </div>
                        <Input
                          {...field}
                          type="tel"
                          className="pl-10 h-10 rounded-lg bg-gray-50 border-gray-200 focus:bg-white transition-all duration-200"
                          placeholder="Enter your mobile number"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Native Place Field */}
              <FormField
                control={form.control}
                name="native_place"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Native Place
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MapPin className="h-4 w-4 text-gray-400" />
                        </div>
                        <Input
                          {...field}
                          type="text"
                          className="pl-10 h-10 rounded-lg bg-gray-50 border-gray-200 focus:bg-white transition-all duration-200"
                          placeholder="Enter your native place"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Branch Field */}
              <FormField
                control={form.control}
                name="branch"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Branch (Optional)
                    </FormLabel>
                    <FormControl>
                      <BranchCombobox
                        value={field.value || ""}
                        onChange={field.onChange}
                        error={fieldState.error}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Gender Field */}
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

              {/* Profile Visibility Toggle */}
              <FormField
                control={form.control}
                name="is_public"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border border-gray-200 p-4 bg-gray-50">
                    <div className="space-y-0.5">
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Profile Visibility
                      </FormLabel>
                      <div className="text-xs text-gray-500">
                        {field.value ? "Your profile will be visible to other users" : "Your profile will be private"}
                      </div>
                    </div>
                    <FormControl>
                      <Switch 
                        checked={field.value} 
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
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
                          placeholder="Create a password"
                          onChange={(e) => {
                            field.onChange(e);
                            setPassword(e.target.value);
                          }}
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

              {/* Confirm Password Field */}
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
                          className="pl-10 pr-10 h-10 rounded-lg bg-gray-50 border-gray-200 focus:bg-white transition-all duration-200"
                          placeholder="Confirm your password"
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

              {/* Password Requirements */}
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
                className="w-full h-10 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold shadow-lg transform hover:scale-[1.02] transition-all duration-300 mt-6"
              >
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSubmitting ? "Creating Account..." : "Create Account"}
              </Button>

              {/* Back to Login */}
              <div className="text-center pt-4 border-t border-gray-100">
                <Button
                  type="button"
                  variant="link"
                  onClick={() => {
                    // Navigate to homepage and trigger login modal in senior mode
                    navigate("/?loginMode=senior");
                  }}
                  className="text-gray-600 hover:text-gray-800 text-sm"
                >
                  Already have an account? Sign In
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SeniorSignup;
