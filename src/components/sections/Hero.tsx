import React from "react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  onLoginClick?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onLoginClick }) => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 relative overflow-hidden">
      {/* Floating decorative elements - matching Index.tsx */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-5 w-20 h-20 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-32 right-10 w-16 h-16 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-gradient-to-r from-purple-300 to-blue-300 rounded-full opacity-15 animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Use a grid for a two-column layout on medium screens and up */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Column 1: Text Content */}
          <div className="text-center md:text-left space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Get your admission documents verified{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">through seniors.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-xl mx-auto md:mx-0 leading-relaxed">
              Navigate the admissions process with confidence. Connect with experienced seniors for reliable assistance and guidance.
            </p>
            <div className="pt-4">
              <Button 
                onClick={onLoginClick}
                size="lg" 
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Get Started
              </Button>
            </div>
          </div>

          {/* Column 2: Image */}
          <div className="flex justify-center relative">
            {/* Background decoration for image */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-purple-100 rounded-3xl transform rotate-3 scale-105 opacity-50"></div>
            <div className="relative bg-white p-4 rounded-2xl shadow-xl">
              {/* **ACTION REQUIRED**: Replace this placeholder with your new AI-generated Lofi image!
                Generate one with a prompt like: 
                "Lofi anime aesthetic, two students talking over coffee at a campus library, warm afternoon glow, soft colors, Studio Ghibli inspired"
              */}
              <img
                src="https://placehold.co/600x400/A1B5D6/4A3F35?text=Your+Lofi+Image+Here"
                alt="Students collaborating in a cozy library setting"
                className="rounded-lg w-full max-w-md"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;