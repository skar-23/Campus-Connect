import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import JuniorNavbar from "@/components/layout/JuniorNavbar";
import Footer from "@/components/layout/Footer";
import JuniorHero from "@/components/sections/junior/JuniorHero";
import JuniorServices from "@/components/sections/junior/JuniorServices";
import JuniorBenefits from "@/components/sections/junior/JuniorBenefits";
import JuniorFAQ from "@/components/sections/junior/JuniorFAQ";
import ChaiThanks from "@/components/sections/ChaiThanks";
import { BookOpen, Users, HelpCircle } from "lucide-react";

const JuniorHomePage: React.FC = () => {
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    const sections = document.querySelectorAll("[data-animate]");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Floating decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-r from-purple-300 to-blue-300 rounded-full opacity-15 animate-pulse"></div>
      </div>

      {/* Header with Junior-specific Navbar */}
      <JuniorNavbar />

      {/* Main Content with proper top spacing */}
      <main className="flex-grow relative z-10 pt-24">
        {/* Hero Section */}
        <section
          id="junior-hero"
          data-animate
          className={`transition-all duration-1000 ${
            isVisible["junior-hero"]
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <JuniorHero />
        </section>

        {/* Services Section */}
        <section
          id="services"
          data-animate
          className={`transition-all duration-1000 delay-200 ${
            isVisible.services
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <JuniorServices />
        </section>

        {/* Benefits Section */}
        <section
          id="benefits"
          data-animate
          className={`transition-all duration-1000 delay-400 ${
            isVisible.benefits
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95"
          }`}
        >
          <JuniorBenefits />
        </section>

        {/* Chai Thanks Section */}
        <section
          id="chai"
          data-animate
          className={`transition-all duration-1000 delay-600 ${
            isVisible.chai
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95"
          }`}
        >
          <ChaiThanks />
        </section>

        {/* FAQ Section */}
        <section
          id="faq"
          data-animate
          className={`transition-all duration-1000 delay-800 ${
            isVisible.faq
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <JuniorFAQ />
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-40">
        <Link to="/connect">
          <Button
            size="icon"
            className="h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 transform hover:scale-110 transition-all duration-300"
            title="Connect with Seniors"
          >
            <Users className="h-6 w-6 text-white" />
          </Button>
        </Link>
        <Link to="/resources">
          <Button
            size="icon"
            className="h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transform hover:scale-110 transition-all duration-300"
            title="Study Resources"
          >
            <BookOpen className="h-6 w-6 text-white" />
          </Button>
        </Link>
        <Link to="/help">
          <Button
            size="icon"
            className="h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 transform hover:scale-110 transition-all duration-300"
            title="Help & Support"
          >
            <HelpCircle className="h-6 w-6 text-white" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default JuniorHomePage;