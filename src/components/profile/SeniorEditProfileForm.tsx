import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
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
import { toast } from "@/components/ui/use-toast";

// Define the shape of the form data for validation
const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  gender: z.string().nonempty({ message: "Please select a gender." }),
  rollNo: z.string().nonempty({ message: "Roll number is required." }),
  phone: z.string().nonempty({ message: "Phone number is required." }),
  email: z.string().email(),
  region: z.string().nonempty({ message: "Region is required." }),
  password: z.string().optional(), // Password is not required
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface SeniorEditProfileFormProps {
  initialName: string;
  initialGender: string;
  initialRollNo: string;
  initialPhone: string;
  initialEmail: string;
  initialRegion: string;
  isLoading: boolean;
  onSave: (name: string, gender: string, rollNo: string, phone: string, email: string, region: string, password: string) => Promise<void>;
}

const SeniorEditProfileForm: React.FC<SeniorEditProfileFormProps> = ({
  initialName,
  initialGender,
  initialRollNo,
  initialPhone,
  initialEmail,
  initialRegion,
  isLoading,
  onSave,
}) => {
  const [isSaving, setIsSaving] = React.useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: initialName || "",
      gender: initialGender || "",
      rollNo: initialRollNo || "",
      phone: initialPhone || "",
      email: initialEmail || "",
      region: initialRegion || "",
      password: "",
    },
  });

  const handleSubmit = async (values: ProfileFormValues) => {
    setIsSaving(true);
    try {
      await onSave(
        values.name,
        values.gender,
        values.rollNo,
        values.phone,
        values.email,
        values.region, // <-- THIS WAS THE MISSING PIECE! IT IS NOW FIXED.
        values.password || ''
      );
    } catch (error: any) {
      toast({
        title: "Error updating profile",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormDescription>
                Leave this blank to keep your current password.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
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
                  <FormLabel>Roll Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Your roll number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="region"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Region (State)</FormLabel>
                  <FormControl>
                    <Input placeholder="Your home state" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSaving || isLoading} className="w-full">
          {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Changes
        </Button>
      </form>
    </Form>
  );
};

export default SeniorEditProfileForm;