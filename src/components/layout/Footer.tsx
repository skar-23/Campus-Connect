import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  GraduationCap,
  Star,
  AtSign,
  Heart,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react";
import { useUserNavigation } from "@/hooks/useUserNavigation";

const Footer: React.FC = () => {
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const { navigateToHome, isLoggedIn, isSenior } = useUserNavigation();
  const navigate = useNavigate();

  const handleCampusConnectClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigateToHome();
  };

  const getHomeLink = () => {
    if (!isLoggedIn) return "/";
    return isSenior ? "/senior-home" : "/junior-home";
  };

  const getFAQLink = () => {
    return isSenior ? "/senior-faq" : "/junior-faq";
  };

  const getTermsLink = () => {
    return isSenior ? "/senior-terms" : "/junior-terms";
  };

  const handleContactChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setContactForm({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 3000);
    setShowContactForm(false);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 gap-y-12 items-start">
          {/* Left Column - Logo and Description */}
          <div className="space-y-4 h-full">
            <div
              className="flex items-center space-x-3 cursor-pointer group"
              onClick={handleCampusConnectClick}
            >
              <div className="relative">
                <GraduationCap className="h-9 w-9 text-pink-500 group-hover:text-pink-600 transition-all duration-300 transform -rotate-12 group-hover:-rotate-6 group-hover:scale-110" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-black tracking-tight">
                  <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 bg-clip-text text-transparent group-hover:from-pink-600 group-hover:via-purple-600 group-hover:to-indigo-700 transition-all duration-300">
                    C
                  </span>
                  <span className="text-gray-800 group-hover:text-gray-900 transition-colors duration-300 font-bold">
                    ampus
                  </span>{" "}
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300">
                    Connect
                  </span>
                </h1>
                <p className="text-xs text-gray-500 -mt-1 group-hover:text-gray-600 transition-colors duration-300 font-medium tracking-wide">
                  where stories begin ✨
                </p>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Bridging the gap between juniors and seniors, creating meaningful connections
              that last beyond college years. Your journey of friendship starts here.
            </p>
            <div className="flex space-x-3">
              <a
                href="https://www.instagram.com/campusconnects.app?utm_source=qr&igsh=a3YwOGVlbHBtMGls "
                className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow duration-200 text-pink-500 hover:text-pink-600"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/campus-connect-stdntpartner/"
                className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow duration-200 text-blue-600 hover:text-blue-700"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://x.com/Campus_Connec_t?t=yBGsSWSy_hU7YKZ-Brl11A&s=08 "
                className="p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow duration-200 text-blue-500 hover:text-blue-600"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Middle Left Column - Quick Links */}
          <div className="space-y-4 h-full">
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <h4 className="text-lg font-semibold text-gray-800">Quick Links</h4>
            </div>
            <ul className="space-y-3">
              {/* <li>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-gray-600 hover:text-pink-600 transition-colors duration-200 text-sm"
                >
                  About Us
                </button>
              </li> */}
              <li>
                <Link
                  to="/about-idea"
                  className="text-gray-600 hover:text-pink-600 transition-colors duration-200 text-sm"
                >
                  Idea Behind Website
                </Link>
              </li>
              {/* <li>
                <button
                  onClick={() => scrollToSection("admissions-update")}
                  className="text-gray-600 hover:text-pink-600 transition-colors duration-200 text-sm"
                >
                  Admission Updates
                </button>
              </li> */}
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-gray-600 hover:text-pink-600 transition-colors duration-200 text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("cta")}
                  className="text-gray-600 hover:text-pink-600 transition-colors duration-200 text-sm"
                >
                  Join Us
                </button>
              </li>
            </ul>
          </div>

          {/* Merged Contact Us/Message Us */}
          <div className="space-y-4 h-full">
            <div className="flex items-center space-x-2">
              <AtSign className="h-5 w-5 text-purple-500" />
              <Heart className="h-5 w-5 text-red-500" />
              <h4 className="text-lg font-semibold text-gray-800">Contact Us</h4>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gray-500" />
                <a
                  href="mailto:stdntpartner@gmail.com"
                  className="text-gray-600 hover:text-pink-600 transition-colors duration-200 text-sm"
                >
                  stdntpartner@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-gray-500" />
                <a
                  href="tel:+918500913952"
                  className="text-gray-600 hover:text-pink-600 transition-colors duration-200 text-sm"
                >
                  8500913952
                </a>
                <span className="text-gray-400">|</span>
                <a
                  href="tel:+916305838414"
                  className="text-gray-600 hover:text-pink-600 transition-colors duration-200 text-sm"
                >
                  6305838414
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600 text-sm">
                  Dr B R Ambedkar National Institute of Technology Jalandhar, Punjab, India
                </span>
              </div>
            </div>
          </div>

          {/* NITJ Admissions Updates */}
          <div className="space-y-4 h-full">
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-purple-500" />
              <h4 className="text-lg font-semibold text-gray-800">NITJ Admissions Updates</h4>
            </div>
            <p className="text-gray-600 text-sm">
              Stay up to date with the latest NITJ B.Tech admissions news, important dates, and official documents.
            </p>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.nitj.ac.in/admissions/index.html#btech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 underline hover:text-purple-700 text-sm"
                >
                  NITJ Official Admissions Page
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-6 border-t border-pink-200">
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

