import React from "react";
import { Coffee, Heart } from "lucide-react";

const ChaiThanks: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
          <Coffee className="h-12 w-12 text-white" />
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Say Thanks with Chai! (It's Not Weird, We Promise)
        </h2>
        
        <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
          This isn't some cold, corporate thing. When a senior helps you out, you can buy them a virtual chai as a thank you! It's our way of keeping the good vibes flowing and showing appreciation for those awesome seniors who take time out of their busy schedules to help.
        </p>
        
        <div className="mt-12 flex items-center justify-center space-x-4">
          <Heart className="h-6 w-6 text-red-500 animate-pulse" />
          <span className="text-gray-600 font-medium">Spread the love, one chai at a time</span>
          <Heart className="h-6 w-6 text-red-500 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default ChaiThanks;