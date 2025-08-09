import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, User, MessageCircle } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

const ContactForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSuccess(true);
      reset();
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-6 w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 space-y-6 border border-purple-100"
    >
      <div className="flex items-center justify-center mb-4">
        <MessageCircle className="h-8 w-8 text-pink-500 mr-2" />
        <h2 className="text-2xl font-bold text-purple-700">Contact Us</h2>
      </div>

      <div>
        <label
          htmlFor="name"
          className="block text-sm font-semibold text-gray-700 mb-1"
        >
          Name
        </label>
        <div className="relative">
          <User className="absolute left-3 top-2.5 h-5 w-5 text-purple-300" />
          <input
            id="name"
            type="text"
            {...register("name")}
            className={`pl-10 pr-3 py-2 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-400 transition ${
              errors.name ? "border-red-400" : "border-gray-300"
            }`}
            placeholder="Your Name"
          />
        </div>
        {errors.name && (
          <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-gray-700 mb-1"
        >
          Email
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-2.5 h-5 w-5 text-purple-300" />
          <input
            id="email"
            type="email"
            {...register("email")}
            className={`pl-10 pr-3 py-2 w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-400 transition ${
              errors.email ? "border-red-400" : "border-gray-300"
            }`}
            placeholder="your@email.com"
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-semibold text-gray-700 mb-1"
        >
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          {...register("message")}
          className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-400 transition ${
            errors.message ? "border-red-400" : "border-gray-300"
          }`}
          placeholder="How can we help you?"
        />
        {errors.message && (
          <p className="mt-1 text-xs text-red-600">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center items-center py-2 px-4 rounded-lg text-base font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-lg transition-all duration-300 disabled:opacity-50"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>

      {isSuccess && (
        <div className="p-2 bg-green-100 text-green-700 rounded-md text-center text-sm">
          Message sent successfully!
        </div>
      )}
    </form>
  );
};

export default ContactForm;
