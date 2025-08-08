import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Activity, 
  Users, 
  MessageSquare, 
  Calendar,
  Star,
  TrendingUp,
  Award,
  Clock,
  CheckCircle,
  User
} from "lucide-react";

const SeniorProfileActivity: React.FC = () => {
  // Mock data - replace with real data from your backend
  const recentActivity = [
    {
      id: 1,
      type: "mentoring",
      title: "Completed mentoring session",
      description: "Helped Priya Singh with career guidance",
      time: "2 hours ago",
      icon: Users,
      color: "text-blue-600"
    },
    {
      id: 2,
      type: "achievement",
      title: "Earned Top Mentor badge",
      description: "Recognized for excellent mentoring",
      time: "1 day ago",
      icon: Award,
      color: "text-orange-600"
    },
    {
      id: 3,
      type: "message",
      title: "New message received",
      description: "Rahul Kumar asked about internships",
      time: "2 days ago",
      icon: MessageSquare,
      color: "text-green-600"
    },
    {
      id: 4,
      type: "session",
      title: "Scheduled new session",
      description: "Upcoming session with Anita Patel",
      time: "3 days ago",
      icon: Calendar,
      color: "text-purple-600"
    }
  ];

  const upcomingSessions = [
    {
      id: 1,
      mentee: "Vikram Shah",
      topic: "Technical Interview Prep",
      time: "Today at 4:00 PM",
      duration: "1 hour"
    },
    {
      id: 2,
      mentee: "Sneha Reddy",
      topic: "Project Discussion",
      time: "Tomorrow at 2:00 PM",
      duration: "45 minutes"
    },
    {
      id: 3,
      mentee: "Amit Kumar",
      topic: "Career Guidance",
      time: "Dec 20 at 10:00 AM",
      duration: "1 hour"
    }
  ];

  const monthlyStats = {
    sessionsCompleted: 12,
    hoursContributed: 18,
    newMentees: 3,
    avgRating: 4.9
  };

  const achievements = [
    { title: "Top Mentor", badge: "🏆", color: "bg-yellow-100 text-yellow-800" },
    { title: "100+ Hours", badge: "⏰", color: "bg-blue-100 text-blue-800" },
    { title: "5★ Rating", badge: "⭐", color: "bg-purple-100 text-purple-800" },
    { title: "25+ Mentees", badge: "👥", color: "bg-green-100 text-green-800" }
  ];

  return (
    <div className="space-y-6">
      
      {/* Monthly Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            This Month's Impact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{monthlyStats.sessionsCompleted}</div>
              <div className="text-xs text-blue-700">Sessions</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{monthlyStats.hoursContributed}h</div>
              <div className="text-xs text-green-700">Hours</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{monthlyStats.newMentees}</div>
              <div className="text-xs text-purple-700">New Mentees</div>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{monthlyStats.avgRating}</div>
              <div className="text-xs text-orange-700">Avg Rating</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Award className="h-5 w-5 text-orange-600" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {achievements.map((achievement, index) => (
              <div key={index} className={`p-3 rounded-lg text-center ${achievement.color}`}>
                <div className="text-2xl mb-1">{achievement.badge}</div>
                <div className="text-xs font-medium">{achievement.title}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Sessions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calendar className="h-5 w-5 text-green-600" />
            Upcoming Sessions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingSessions.map((session) => (
              <div key={session.id} className="p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <User className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-gray-800 text-sm">{session.mentee}</span>
                </div>
                <p className="text-xs text-gray-600 mb-1">{session.topic}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{session.time}</span>
                  <span>{session.duration}</span>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4 text-blue-600 border-blue-300 hover:bg-blue-50">
            View All Sessions
          </Button>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Activity className="h-5 w-5 text-purple-600" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => {
              const IconComponent = activity.icon;
              return (
                <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`p-2 rounded-full bg-white ${activity.color}`}>
                    <IconComponent className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-800 text-sm mb-1">{activity.title}</h4>
                    <p className="text-xs text-gray-600 mb-1">{activity.description}</p>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <Button variant="ghost" className="w-full mt-4 text-purple-600 hover:bg-purple-50">
            View All Activity
          </Button>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
            <Users className="h-4 w-4 mr-2" />
            View My Mentees
          </Button>
          <Button variant="outline" className="w-full border-blue-300 text-blue-600 hover:bg-blue-50">
            <MessageSquare className="h-4 w-4 mr-2" />
            Check Messages
          </Button>
          <Button variant="outline" className="w-full border-green-300 text-green-600 hover:bg-green-50">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Session
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SeniorProfileActivity;