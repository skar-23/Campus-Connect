import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sparkles,
  Star,
  AtSign,
  Heart,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Twitter,
  Facebook,
  MessageCircle,
} from "lucide-react";
import { useUserNavigation } from "@/hooks/useUserNavigation";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  // This logic is the key to fixing the problem
  const { navigateToHome, isLoggedIn, isSenior } = useUserNavigation();

  const handleCampusConnectClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigateToHome();
  };

  const getHomeLink = () => {
    if (!isLoggedIn) return "/";
    return isSenior ? "/senior-home" : "/junior-home";
  };

  // --- THIS IS THE FIX ---
  // These functions now correctly check if the user is a senior
  const getFAQLink = () => {
    return isSenior ? "/senior-faq" : "/junior-faq";
  };

  const getTermsLink = () => {
    return isSenior ? "/senior-terms" : "/junior-terms";
  };
  // --- END OF FIX ---

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribing email:", email);
    setEmail("");
    // Add your subscription logic here
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Left Column - Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-1">
              <Sparkles className="h-6 w-6 text-pink-500" />
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                  Campus Connect
                </h3>
                <p className="text-xs text-gray-600 -mt-1">where stories begin</p>
              </div>
              <Sparkles className="h-4 w-4 text-purple-500" />
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Bridging the gap between juniors and seniors, creating meaningful connections 
              that last beyond college years. Your journey of friendship starts here.
            </p>
            <div className="flex space-x-3">
              <a
                href="#"
                className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow duration-200 text-pink-500 hover:text-pink-600"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow duration-200 text-blue-500 hover:text-blue-600"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow duration-200 text-blue-600 hover:text-blue-700"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow duration-200 text-green-500 hover:text-green-600"
                aria-label="Chat"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Middle Left Column - Quick Links */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <h4 className="text-lg font-semibold text-gray-800">Quick Links</h4>
            </div>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-gray-600 hover:text-pink-600 transition-colors duration-200 text-sm"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("verification")}
                  className="text-gray-600 hover:text-pink-600 transition-colors duration-200 text-sm"
                >
                  How It Works
                </button>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-pink-600 transition-colors duration-200 text-sm"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-pink-600 transition-colors duration-200 text-sm"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-pink-600 transition-colors duration-200 text-sm"
                >
                  Help Center
                </a>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-gray-600 hover:text-pink-600 transition-colors duration-200 text-sm"
                >
                  Contact Support
                </button>
              </li>
            </ul>
          </div>

          {/* Middle Right Column - Contact Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <AtSign className="h-5 w-5 text-purple-500" />
              <h4 className="text-lg font-semibold text-gray-800">Contact Us</h4>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gray-500" />
                <a
                  href="mailto:hello@campusconnect.com"
                  className="text-gray-600 hover:text-pink-600 transition-colors duration-200 text-sm"
                >
                  hello@campusconnect.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-gray-500" />
                <a
                  href="tel:+12345678900"
                  className="text-gray-600 hover:text-pink-600 transition-colors duration-200 text-sm"
                >
                  +1 (234) 567-890
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600 text-sm">Campus Connect HQ</span>
              </div>
            </div>
          </div>

          {/* Right Column - Newsletter */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-red-500" />
              <h4 className="text-lg font-semibold text-gray-800">Stay Connected</h4>
            </div>
            <p className="text-gray-600 text-sm">
              Subscribe to get the latest updates and exclusive content delivered to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white border-gray-200 focus:border-pink-500 focus:ring-pink-500"
                required
              />
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-2 rounded-lg transition-all duration-300"
              >
                Subscribe
              </Button>
            </form>
            <p className="text-xs text-gray-500">
              No spam, just pure magic and updates! ✨
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-pink-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-600 text-sm">
              Made with ❤️ by the Campus Connect Team
            </p>
            <p className="text-gray-600 text-sm">
              © 2025 Campus Connect. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;