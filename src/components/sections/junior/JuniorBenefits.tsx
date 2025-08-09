import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Heart, Trophy } from "lucide-react";

const JuniorBenefits: React.FC = () => {
  const benefits = [
    {
      title: "Verified Guidance from Seniors",
      description: "Get your documents and doubts checked by experienced seniors who have already navigated the admission process. No more confusion—just clear, reliable advice.",
      icon: CheckCircle,
      color: "from-pink-500 to-rose-500",
    },
    {
      title: "Real Campus Insights",
      description: "Learn about campus life, academics, and opportunities directly from seniors. Make informed decisions and feel confident as you start your college journey.",
      icon: Heart,
      color: "from-purple-500 to-violet-500",
    },
    {
      title: "Supportive Community",
      description: "Join a welcoming community where you can ask questions, share experiences, and build connections that last beyond your first year.",
      icon: Trophy,
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            Benefits for Juniors
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
            Discover how Campus Connect helps you start your college journey with confidence, clarity, and real support from those who know it best.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
              Ready to start your journey?
            </p>
            <p className="text-sm text-purple-600">
              Join Campus Connect and make your transition to college smooth and successful.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JuniorBenefits;