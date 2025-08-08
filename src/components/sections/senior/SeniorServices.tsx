import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, MessageSquare, Calendar, Award, BookOpen } from "lucide-react";

const SeniorServices: React.FC = () => {
  const services = [
    {
      title: "Mentoring & Guidance",
      description: "Share your experience and guide juniors through their academic journey and career decisions.",
      image: "https://placehold.co/600x400/A1B5D6/4A3F35?text=Mentoring+%26+Guidance",
      features: ["One-on-one sessions", "Group mentoring", "Career counseling"],
      icon: Users,
      color: "from-blue-500 to-cyan-600"
    },
    {
      title: "Document Verification",
      description: "Help juniors verify their admission documents and ensure they have everything needed for a smooth process.",
      image: "https://placehold.co/600x400/B8E6B8/4A3F35?text=Document+Verification",
      features: ["Quick verification", "Expert guidance", "Process clarity"],
      icon: CheckCircle,
      color: "from-green-500 to-teal-600"
    },
    {
      title: "Live Q&A Sessions",
      description: "Conduct live sessions to answer questions about college life, academics, and career opportunities.",
      image: "https://placehold.co/600x400/E8A09A/4A3F35?text=Live+QA+Sessions",
      features: ["Interactive sessions", "Real-time help", "Group discussions"],
      icon: MessageSquare,
      color: "from-purple-500 to-pink-600"
    }
  ];

  const impactStats = [
    { label: "Students Helped", value: "500+", icon: Users },
    { label: "Sessions Conducted", value: "1,200+", icon: Calendar },
    { label: "Success Stories", value: "200+", icon: Award },
    { label: "Resources Shared", value: "300+", icon: BookOpen }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
            How You're Making a Difference
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your guidance and experience are invaluable to juniors. Here's how you're contributing to their success.
          </p>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {impactStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Services */}
        <div className="space-y-16">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            const isReversed = index % 2 === 1;
            
            return (
              <Card key={index} className="overflow-hidden border-0 shadow-xl">
                <div className={`grid md:grid-cols-2 gap-8 items-center ${isReversed ? 'md:grid-flow-row-dense' : ''}`}>
                  
                  {/* Image Column */}
                  <div className={`relative ${isReversed ? 'md:col-start-1' : ''}`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl transform rotate-3 scale-105 opacity-50"></div>
                    <img
                      src={service.image}
                      alt={service.title}
                      className="relative rounded-lg w-full h-80 object-cover shadow-lg"
                    />
                  </div>

                  {/* Content Column */}
                  <div className="p-8">
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${service.color} rounded-full flex items-center justify-center mr-4`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-800">{service.title}</h3>
                    </div>
                    
                    <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="space-y-3">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center">
                          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mr-3">
                            <CheckCircle className="h-3 w-3 text-white" />
                          </div>
                          <span className="text-gray-700 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-2 border-blue-200">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Ready to Make an Even Bigger Impact?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Join our senior mentor program and help shape the future of incoming students. Your experience matters!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-semibold px-8 py-3 rounded-full transform hover:scale-105 transition-all duration-300">
                  Start Mentoring Now
                </button>
                <button className="border-2 border-blue-300 text-blue-600 hover:bg-blue-50 font-semibold px-8 py-3 rounded-full transform hover:scale-105 transition-all duration-300">
                  Learn More
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SeniorServices;