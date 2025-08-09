import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Clock, Shield, Heart } from "lucide-react";

const JuniorServices: React.FC = () => {
  const services = [
    {
      title: "Document Verification",
      description: "Get your admission documents verified by experienced seniors who have been through the same process.",
      image: "https://placehold.co/600x400/E8A09A/4A3F35?text=Document+Verification",
      features: ["Quick verification", "Expert guidance", "24/7 support"],
      icon: CheckCircle
    },
    {
      title: "Admission Guidance",
      description: "Step-by-step guidance through the entire admission process from seniors who understand the challenges.",
      image: "https://placehold.co/600x400/A1B5D6/4A3F35?text=Admission+Guidance",
      features: ["Hostel Allotment process", "Fee Payments Guidence", "Doubt resolution"],
      icon: Clock
    },
    {
      title: "Campus Navigation",
      description: "Learn about campus facilities, hostels, dining options, and important locations from current students.",
      image: "https://placehold.co/600x400/B8E6B8/4A3F35?text=Campus+Navigation",
      features: ["Campus tours", "Facility information", "Local tips"],
      icon: Shield
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-4">
            How We Help You
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We understand the challenges of being new. Our services are designed to make your transition smooth and stress-free.
          </p>
        </div>

        <div className="space-y-16">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            const isReversed = index % 2 === 1;
            
            return (
              <Card key={index} className="overflow-hidden border-0 shadow-xl">
                <div className={`grid md:grid-cols-2 gap-8 items-center ${isReversed ? 'md:grid-flow-row-dense' : ''}`}>
                  
                  {/* Image Column */}
                  <div className={`relative ${isReversed ? 'md:col-start-1' : ''}`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl transform rotate-3 scale-105 opacity-50"></div>
                    <img
                      src={service.image}
                      alt={service.title}
                      className="relative rounded-lg w-full h-80 object-cover shadow-lg"
                    />
                  </div>

                  {/* Content Column */}
                  <div className="p-8">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
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
      </div>
    </section>
  );
};

export default JuniorServices;