import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Users, 
  MessageSquare, 
  Award, 
  TrendingUp,
  UserCheck,
  Calendar
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const SeniorHero: React.FC = () => {
  const { user } = useAuth();

  // Mock data - replace with real data from your backend
  const stats = {
    menteesHelped: 24,
    messagesExchanged: 156,
    hoursContributed: 48,
    rating: 4.8
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Welcome & Stats */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Welcome back,{" "}
                <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  {user?.name || "Senior"}!
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Continue making a difference in juniors' lives. Your guidance shapes their future at NIT Jalandhar.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardContent className="p-4 text-center">
                  <UserCheck className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-700">{stats.menteesHelped}</div>
                  <div className="text-sm text-blue-600">Mentees Helped</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardContent className="p-4 text-center">
                  <MessageSquare className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-700">{stats.messagesExchanged}</div>
                  <div className="text-sm text-green-600">Messages Sent</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <CardContent className="p-4 text-center">
                  <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-700">{stats.hoursContributed}h</div>
                  <div className="text-sm text-purple-600">Time Contributed</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                <CardContent className="p-4 text-center">
                  <Award className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-orange-700">{stats.rating}/5</div>
                  <div className="text-sm text-orange-600">Avg Rating</div>
                </CardContent>
              </Card>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/senior-mentoring">
                <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-medium px-8 py-3">
                  <Users className="mr-2 h-5 w-5" />
                  View My Mentees
                </Button>
              </Link>
              <Link to="/senior-messages">
                <Button variant="outline" className="w-full sm:w-auto border-blue-300 text-blue-600 hover:bg-blue-50 px-8 py-3">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Check Messages
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-80 h-80 bg-gradient-to-br from-blue-400 via-purple-500 to-green-400 rounded-full flex items-center justify-center shadow-2xl">
                <div className="w-72 h-72 bg-white rounded-full flex items-center justify-center">
                  <div className="text-center">
                    <Users className="h-20 w-20 text-blue-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Mentoring Excellence</h3>
                    <p className="text-sm text-gray-600">Guiding the next generation</p>
                  </div>
                </div>
              </div>
              
              {/* Floating Cards */}
              <Card className="absolute -top-4 -right-4 bg-white shadow-lg border-0 p-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium text-green-600">Impact Growing</span>
                </div>
              </Card>
              
              <Card className="absolute -bottom-4 -left-4 bg-white shadow-lg border-0 p-3">
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-orange-500" />
                  <span className="text-sm font-medium text-orange-600">Top Mentor</span>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeniorHero;