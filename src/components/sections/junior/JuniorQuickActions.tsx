import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  FileCheck, 
  MessageSquare, 
  MapPin, 
  Calendar, 
  Book, 
  Phone 
} from "lucide-react";

const JuniorQuickActions: React.FC = () => {
  const quickActions = [
    {
      title: "Document Verification",
      description: "Get your admission documents verified by seniors",
      icon: FileCheck,
      link: "/verification",
      color: "from-blue-500 to-cyan-600"
    },
    {
      title: "Chat with Seniors",
      description: "Direct communication with experienced seniors",
      icon: MessageSquare,
      link: "/chat",
      color: "from-green-500 to-teal-600"
    },
    {
      title: "Campus Navigation",
      description: "Find your way around the campus easily",
      icon: MapPin,
      link: "/campus-map",
      color: "from-purple-500 to-pink-600"
    },
    {
      title: "Schedule Meeting",
      description: "Book one-on-one sessions with seniors",
      icon: Calendar,
      link: "/schedule",
      color: "from-orange-500 to-red-600"
    },
    {
      title: "Study Resources",
      description: "Access study materials and guides",
      icon: Book,
      link: "/resources",
      color: "from-indigo-500 to-purple-600"
    },
    {
      title: "Emergency Contact",
      description: "Get immediate help when needed",
      icon: Phone,
      link: "/emergency",
      color: "from-red-500 to-pink-600"
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-4">
            Quick Actions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need for a smooth admission process, all in one place
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg">
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-800 group-hover:text-purple-600 transition-colors duration-300">
                    {action.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 mb-6">{action.description}</p>
                  <Link to={action.link}>
                    <Button 
                      className={`w-full bg-gradient-to-r ${action.color} hover:opacity-90 text-white font-semibold py-2 rounded-lg transition-all duration-300`}
                    >
                      Get Started
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default JuniorQuickActions;