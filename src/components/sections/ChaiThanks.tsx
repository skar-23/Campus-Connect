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
          Say Thanks with Chai!
          It's Not Weird, We Promise
        </h2>
        
        <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
          In college, seniors are more than classmates ahead of you—they can be guides, supporters, and friends. When they help you, show your gratitude with a chai or snack at the campus café. It’s not about money, but about sharing moments. Let’s spread the message: seniors can be mentors and family, and happiness comes from kindness, not just money.
        </p>
        
        <div className="mt-12 flex items-center justify-center space-x-4">
          <Heart className="h-6 w-6 text-red-500 animate-pulse" />
          <span className="text-gray-600 font-medium">Spread the love, with a simple chai</span>
          <Heart className="h-6 w-6 text-red-500 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default ChaiThanks;