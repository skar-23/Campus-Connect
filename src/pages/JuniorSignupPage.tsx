import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/contexts/AuthContext";

// Schema for form validation
const signupSchema = z.object({
    email: z.string().email(),
    name: z.string().min(2, "Name is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    gender: z.string().nonempty("Please select a gender"),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type SignupFormValues = z.infer<typeof signupSchema>;

const JuniorSignupPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const handleSignup = async (values: SignupFormValues) => {
    setIsLoading(true);
    try {
      // --- THIS IS THE FIX ---
      // We now pass 'junior' as the role.
      await signUp(
        values.email,
        values.password,
        values.name,
        values.gender,
        undefined, // collegeId
        undefined, // phone
        undefined, // region
        'junior'   // role
      );
      // --- END OF FIX ---
    } catch (error: any) {
      // Error handling is in the signUp function
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-poppins font-semibold text-foreground">
            CampusConnect
          </Link>
          <Button asChild variant="ghost">
            <Link to="/">Home</Link>
          </Button>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center container py-12">
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle className="text-2xl text-center">Junior Sign Up</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSignup)} className="space-y-6">
                        <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem>
                                <FormLabel>G-Mail</FormLabel>
                                <FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                        <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Your Name</FormLabel>
                                <FormControl><Input placeholder="Your full name" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                        <FormField control={form.control} name="password" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                        <FormField control={form.control} name="confirmPassword" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                        <FormField control={form.control} name="gender" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Gender</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl><SelectTrigger><SelectValue placeholder="Select Gender" /></SelectTrigger></FormControl>
                                    <SelectContent>
                                        <SelectItem value="Male">Male</SelectItem>
                                        <SelectItem value="Female">Female</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}/>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isLoading ? "Signing up..." : "Signup"}
                        </Button>
                        <div className="text-center text-sm text-muted-foreground">
                            Already have an Account?{" "}
                            <Link to="/junior-login" className="text-primary hover:underline">
                                Login
                            </Link>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default JuniorSignupPage;