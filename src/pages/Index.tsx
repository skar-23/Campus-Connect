import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import AboutUs from "@/components/sections/AboutUs";
import AdmissionsUpdate from "@/components/sections/AdmissionsUpdate";
import ChaiThanks from "@/components/sections/ChaiThanks";
import CTA from "@/components/sections/CTA";
// import Contact from "@/components/sections/Contact";
import Modal from "@/components/ui/Modal";
import LoginForm from "@/components/ui/LoginForm";
import ContactForm from "@/components/ui/ContactForm";
import { Button } from "@/components/ui/button";
import { User, MessageSquare, CheckCircle, X } from "lucide-react";

const Index: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);
  const [loginUserType, setLoginUserType] = useState<'junior' | 'senior'>('junior');
  // Removed success message state as per requirements

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

  // Slower scroll direction detection for navbar auto-hide
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Clear existing timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      
      // Show navbar at the very top
      if (currentScrollY < 10) {
        setIsNavbarVisible(true);
      } 
      // Hide navbar when scrolling down with delay
      else if (currentScrollY > lastScrollY && currentScrollY > 150) {
        // Scrolling down - add delay before hiding
        const timeout = setTimeout(() => {
          if (!isHovering && window.scrollY > lastScrollY) {
            setIsNavbarVisible(false);
          }
        }, 800); // 800ms delay before hiding
        setScrollTimeout(timeout);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show immediately
        setIsNavbarVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [lastScrollY, isHovering, scrollTimeout]);

  // Check for loginMode in URL params
  useEffect(() => {
    const loginMode = searchParams.get('loginMode');
    if (loginMode === 'senior' || loginMode === 'junior') {
      setLoginUserType(loginMode);
      setIsLoginModalOpen(true);
      // Clear URL params after opening modal
      setSearchParams({});
    }
  }, [searchParams, setSearchParams]);

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleContactClick = () => {
    setIsContactModalOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Floating decorative elements - Lower z-index */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-r from-purple-300 to-blue-300 rounded-full opacity-15 animate-pulse"></div>
      </div>

      {/* Header with slower auto-hide and improved opacity */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isNavbarVisible ? 'translate-y-0 opacity-95' : '-translate-y-full opacity-0'
        } hover:opacity-100`}
        onMouseEnter={() => {
          setIsHovering(true);
          setIsNavbarVisible(true);
        }}
        onMouseLeave={() => {
          setIsHovering(false);
        }}
      >
        <Navbar onLoginClick={handleLoginClick} />
      </header>

      {/* Main content with proper top padding and lower z-index */}
      <main className="flex-grow relative z-10 pt-20">
        {/* Hero Section */}
        <section
          id="hero"
          data-animate
          className={`transition-all duration-1000 ${
            isVisible.hero
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <Hero onLoginClick={handleLoginClick} />
        </section>

        {/* Admissions Update Section (replaces How it Works) */}
        <section
          id="admissions-update"
          data-animate
          className={`transition-all duration-1000 delay-400 ${
            isVisible["admissions-update"]
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <AdmissionsUpdate />
        </section>

        {/* About Us Section */}
        <section
          id="about"
          data-animate
          className={`transition-all duration-1000 delay-200 ${
            isVisible.about
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <AboutUs />
        </section>
        {/* CTA Section */}
        <section
          id="cta"
          data-animate
          className={`transition-all duration-1000 delay-800 ${
            isVisible.cta
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <CTA />
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
      </main>

      <Footer />

      {/* Removed success message display as per requirements */}

      {/* Modals - Highest z-index for overlays */}
      <Modal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        title="Login / Sign Up"
      >
        <LoginForm 
          onClose={() => setIsLoginModalOpen(false)} 
          defaultUserType={loginUserType}
        />
      </Modal>
      <Modal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        title="Contact Us"
      >
        <ContactForm />
      </Modal>

      {/* Quick Action Buttons - High z-index but below modals */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-40">
        <Button
          onClick={handleLoginClick}
          size="icon"
          className="h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 transform hover:scale-110 transition-all duration-300"
          aria-label="Login or Sign Up"
        >
          <User className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default Index;