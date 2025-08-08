import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Users, 
  MessageSquare, 
  Calendar, 
  FileCheck, 
  BookOpen, 
  Award,
  Video,
  TrendingUp 
} from "lucide-react";

const SeniorQuickActions: React.FC = () => {
  const quickActions = [
    {
      title: "View My Mentees",
      description: "Check on your current mentees and their progress",
      icon: Users,
      link: "/senior-mentees",
      color: "from-blue-500 to-cyan-600",
      count: "8 Active"
    },
    {
      title: "Pending Requests",
      description: "Review and respond to new mentoring requests",
      icon: MessageSquare,
      link: "/senior-requests",
      color: "from-orange-500 to-red-600",
      count: "3 New"
    },
    {
      title: "Schedule Sessions",
      description: "Manage your mentoring sessions and availability",
      icon: Calendar,
      link: "/senior-schedule",
      color: "from-purple-500 to-pink-600",
      count: "5 This Week"
    },
    {
      title: "Document Reviews",
      description: "Help juniors verify their admission documents",
      icon: FileCheck,
      link: "/senior-documents",
      color: "from-green-500 to-teal-600",
      count: "12 Pending"
    },
    {
      title: "Live Sessions",
      description: "Conduct live Q&A sessions for multiple students",
      icon: Video,
      link: "/senior-live-sessions",
      color: "from-indigo-500 to-purple-600",
      count: "Next: Today 6 PM"
    },
    {
      title: "Resource Library",
      description: "Share study materials and career guidance resources",
      icon: BookOpen,
      link: "/senior-resources",
      color: "from-teal-500 to-green-600",
      count: "15 Shared"
    },
    {
      title: "Impact Analytics",
      description: "Track your mentoring impact and student success",
      icon: TrendingUp,
      link: "/senior-analytics",
      color: "from-yellow-500 to-orange-600",
      count: "95% Success Rate"
    },
    {
      title: "Recognition Center",
      description: "View your achievements and mentor badges",
      icon: Award,
      link: "/senior-achievements",
      color: "from-pink-500 to-rose-600",
      count: "5 Badges Earned"
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
            Senior Dashboard Actions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Quick access to all your mentoring tools and activities. Manage your impact efficiently.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-0 shadow-lg bg-gradient-to-br from-white to-gray-50 overflow-hidden relative">
                {/* Gradient border effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${action.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg`}></div>
                
                <CardHeader className="text-center pb-4 relative z-10">
                  <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  
                  <CardTitle className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 mb-2">
                    {action.title}
                  </CardTitle>
                  
                  {/* Count/Status Badge */}
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${action.color} text-white shadow-sm`}>
                    {action.count}
                  </div>
                </CardHeader>
                
                <CardContent className="text-center pt-0 relative z-10">
                  <p className="text-gray-600 text-sm mb-6 leading-relaxed">{action.description}</p>
                  <Link to={action.link}>
                    <Button 
                      className={`w-full bg-gradient-to-r ${action.color} hover:opacity-90 text-white font-semibold py-2 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg`}
                    >
                      Access Now
                    </Button>
                  </Link>
                </CardContent>

                {/* Subtle background pattern */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-100/20 to-transparent rounded-full -translate-y-12 translate-x-12 group-hover:scale-150 transition-transform duration-700"></div>
              </Card>
            );
          })}
        </div>

        {/* Quick Stats Summary */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-2 border-blue-200">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">24</div>
                  <div className="text-gray-600">Active Mentees</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">156</div>
                  <div className="text-gray-600">Total Helped</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 mb-2">48h</div>
                  <div className="text-gray-600">This Month</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600 mb-2">4.8⭐</div>
                  <div className="text-gray-600">Avg Rating</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SeniorQuickActions;