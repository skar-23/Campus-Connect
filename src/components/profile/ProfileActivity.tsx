import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, MessageSquare, Users, BookOpen, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { JuniorProfile } from "@/pages/JuniorProfilePage";

interface ProfileActivityProps {
  profile: JuniorProfile;
}

const ProfileActivity: React.FC<ProfileActivityProps> = ({ profile }) => {
  const recentActivities = [
    {
      type: "connection",
      message: "Connected with Priya Singh (CSE '21)",
      time: "2 hours ago",
      icon: Users,
      color: "text-blue-600"
    },
    {
      type: "message",
      message: "Received guidance on React.js",
      time: "1 day ago",
      icon: MessageSquare,
      color: "text-green-600"
    },
    {
      type: "project",
      message: "Updated portfolio project",
      time: "3 days ago",
      icon: BookOpen,
      color: "text-purple-600"
    },
    {
      type: "connection",
      message: "Connected with Amit Kumar (ECE '20)",
      time: "1 week ago",
      icon: Users,
      color: "text-blue-600"
    }
  ];

  const quickActions = [
    {
      label: "Find Mentors",
      description: "Connect with seniors",
      href: "/connect",
      color: "bg-purple-500 hover:bg-purple-600"
    },
    {
      label: "Join Communities",
      description: "Find study groups",
      href: "/communities",
      color: "bg-blue-500 hover:bg-blue-600"
    },
    {
      label: "Resources",
      description: "Access materials",
      href: "/resources",
      color: "bg-green-500 hover:bg-green-600"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-orange-600" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => {
              const IconComponent = activity.icon;
              return (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className={`p-1.5 bg-white rounded-lg ${activity.color}`}>
                    <IconComponent className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 mb-1">
                      {activity.message}
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.href}>
                <Button
                  className={`w-full justify-start text-left ${action.color} text-white`}
                  variant="default"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  <div>
                    <div className="font-medium">{action.label}</div>
                    <div className="text-xs opacity-90">{action.description}</div>
                  </div>
                </Button>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Profile Completion */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Completion</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Profile Progress</span>
              <span className="font-medium">85%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
            <p className="text-xs text-gray-600">
              Add more achievements to complete your profile!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileActivity;