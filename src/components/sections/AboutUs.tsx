import React from "react";
import { Button } from "@/components/ui/button";
import { Users, BookOpen, Zap } from "lucide-react";

const AboutUs: React.FC = () => {
  const features = [
    {
      icon: Users,
      title: "Real Connections (Not LinkedIn Fake)",
      description:
        "Connect with genuine seniors who actually want to help you succeed in college.",
    },
    {
      icon: BookOpen,
      title: "Learn the Real Stuff (Not Just Textbooks)",
      description:
        "Get insider knowledge about campus life, professors, and survival tips.",
    },
    {
      icon: Zap,
      title: "Level Up Your Intro Game 🚀",
      description:
        "Master the art of making friends and building your college network.",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-6">
            What's Campus Connect All About?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Think of it as your college big sibling network! We're here to make
            sure you don't walk into college like a deer in headlights. Our
            platform connects you with awesome seniors who've been there, done
            that, and are ready to share the real tea about college life.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-pink-50 to-purple-50 p-8 rounded-2xl border border-pink-100 hover:border-pink-200 transform hover:-translate-y-2 transition-all duration-300 hover:shadow-xl"
            >
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
