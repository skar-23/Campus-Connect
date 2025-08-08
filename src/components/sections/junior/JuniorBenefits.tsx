import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Zap, Heart, Trophy, Coffee, Sparkles } from "lucide-react";

const JuniorBenefits: React.FC = () => {
  const benefits = [
    {
      title: "Skip the Stress, Bestie! 😌",
      description: "No more sleepless nights wondering if your docs are right. Our seniors got your back with instant verification vibes!",
      icon: CheckCircle,
      color: "from-pink-500 to-rose-500",
      emoji: "✨"
    },
    {
      title: "Real Talk from Real People 💯",
      description: "Get the tea from seniors who literally survived the same chaos. No cap, just honest advice that actually works!",
      icon: Heart,
      color: "from-purple-500 to-violet-500",
      emoji: "🫶"
    },
    {
      title: "24/7 Support Squad 🚀",
      description: "Stuck at 2 AM? We're here! Our senior fam is always ready to help because we know the struggle is REAL.",
      icon: Zap,
      color: "from-blue-500 to-cyan-500",
      emoji: "⚡"
    },
    {
      title: "Level Up Your Game 📈",
      description: "From campus hacks to study tips, get insider knowledge that'll make you the main character of your college story!",
      icon: Trophy,
      color: "from-green-500 to-emerald-500",
      emoji: "🎯"
    },
    {
      title: "It's Giving... FREE! 💸",
      description: "Zero cost, maximum value! Because helping each other out is what we're about. No hidden fees, no premium plans, just pure support!",
      icon: Sparkles,
      color: "from-yellow-500 to-orange-500",
      emoji: "🆓"
    },
    {
      title: "Find Your Campus Tribe 👥",
      description: "Connect with seniors who share your vibe. Build lasting friendships and create your support network before you even step on campus!",
      icon: Coffee,
      color: "from-teal-500 to-green-500",
      emoji: "🤝"
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="text-4xl">🔥</span>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Benefits for Juniors
            </h2>
            <span className="text-4xl">🔥</span>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Why Campus Connect hits different? Here's the lowdown on how we're about to change your entire college experience! 
          </p>
          <div className="mt-4 text-sm text-purple-600 font-medium">
            *No printer lies detected* 📠
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-0 shadow-lg bg-white/80 backdrop-blur-sm overflow-hidden relative">
                {/* Gradient border effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${benefit.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg`}></div>
                
                <CardContent className="p-6 relative">
                  <div className="text-center">
                    {/* Icon with gradient background */}
                    <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${benefit.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    
                    {/* Emoji floating effect */}
                    <div className="text-2xl mb-3 group-hover:animate-bounce">
                      {benefit.emoji}
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors duration-300">
                      {benefit.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed text-sm">
                      {benefit.description}
                    </p>
                    
                    {/* Decorative element */}
                    <div className="mt-4 w-12 h-1 bg-gradient-to-r from-pink-400 to-purple-500 mx-auto rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className="inline-block p-4 bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl">
            <p className="text-lg font-medium text-gray-700 mb-2">
              Ready to glow up your college journey? 💅
            </p>
            <p className="text-sm text-purple-600">
              Join the Campus Connect fam and watch your admission stress disappear! ✨
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JuniorBenefits;