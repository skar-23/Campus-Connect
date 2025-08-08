import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Rocket, UserPlus, Users } from "lucide-react";

const CTA: React.FC = () => {
  const [showConfetti, setShowConfetti] = useState(false);

  const handleNewUserClick = async () => {
    setShowConfetti(true);
    
    // Dynamically import confetti to avoid SSR issues
    const { default: confetti } = await import('canvas-confetti');
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    
    setTimeout(() => setShowConfetti(false), 3000);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-pink-500 via-purple-600 to-blue-600">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center mb-8">
          <Rocket className="h-12 w-12 text-white mr-4 animate-bounce" />
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Ready to Start Your College Adventure? 🚀
          </h2>
        </div>
        
        <p className="text-xl text-purple-100 mb-12 max-w-2xl mx-auto">
          Whether you're a nervous newbie or an experienced senior ready to help, there's a place for you here!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button
            onClick={handleNewUserClick}
            size="lg"
            className="bg-white text-purple-600 hover:bg-purple-50 px-8 py-4 rounded-full font-bold text-lg transform hover:scale-105 transition-all duration-300 shadow-xl"
          >
            <UserPlus className="h-6 w-6 mr-3" />
            I'm New Here, Help Me Out!
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 rounded-full font-bold text-lg transform hover:scale-105 transition-all duration-300"
          >
            <Users className="h-6 w-6 mr-3" />
            I'm a Senior, Let Me Help!
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;