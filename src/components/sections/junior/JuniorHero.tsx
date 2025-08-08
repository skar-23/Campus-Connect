import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MessageCircle, Users, BookOpen } from "lucide-react";

const JuniorHero: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <div className="text-center md:text-left space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Welcome to your{" "}
              <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                Campus Journey
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-xl mx-auto md:mx-0 leading-relaxed">
              Connect with experienced seniors, get your documents verified, and navigate your admission process with confidence. Your journey starts here!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/chat">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Chat with Seniors
                </Button>
              </Link>
              <Link to="/seniors">
                <Button 
                  variant="outline"
                  size="lg" 
                  className="border-2 border-purple-500 text-purple-600 hover:bg-purple-50 font-semibold px-8 py-3 rounded-full transform hover:scale-105 transition-all duration-300"
                >
                  <Users className="mr-2 h-5 w-5" />
                  Find Seniors
                </Button>
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="flex justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-purple-100 rounded-3xl transform rotate-3 scale-105 opacity-50"></div>
            <div className="relative bg-white p-4 rounded-2xl shadow-xl">
              <img
                src="https://placehold.co/600x400/A1B5D6/4A3F35?text=Junior+Student+Journey"
                alt="Junior student getting guidance from seniors"
                className="rounded-lg w-full max-w-md"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default JuniorHero;