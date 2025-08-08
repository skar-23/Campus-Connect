import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Clock, 
  CheckCircle, 
  MessageSquare, 
  Calendar,
  User,
  ArrowRight,
  Bell
} from "lucide-react";
import { Link } from "react-router-dom";

const SeniorDashboard: React.FC = () => {
  // Mock data - replace with real data from your backend
  const recentActivity = [
    {
      id: 1,
      type: "message",
      title: "New message from Priya Singh",
      description: "Asked about hostel admission process",
      time: "2 hours ago",
      icon: MessageSquare,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      id: 2,
      type: "mentoring",
      title: "Mentoring session completed",
      description: "Helped Rahul with branch selection",
      time: "1 day ago",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      id: 3,
      type: "reminder",
      title: "Upcoming mentoring session",
      description: "Session with Ankit tomorrow at 3 PM",
      time: "Tomorrow",
      icon: Calendar,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ];

  const pendingRequests = [
    {
      id: 1,
      name: "Sneha Patel",
      branch: "Computer Science",
      location: "Mumbai, Maharashtra",
      message: "Need guidance about admission process and documents required.",
      time: "2 hours ago"
    },
    {
      id: 2,
      name: "Vikram Kumar",
      branch: "Electrical Engineering",
      location: "Delhi, India",
      message: "Looking for help with hostel allocation and college life.",
      time: "5 hours ago"
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Dashboard</h2>
          <p className="text-gray-600">Stay updated with your mentoring activities and pending requests.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => {
                    const IconComponent = activity.icon;
                    return (
                      <div key={activity.id} className={`flex items-start gap-4 p-4 rounded-lg ${activity.bgColor} border border-gray-200`}>
                        <div className={`p-2 rounded-lg bg-white ${activity.color}`}>
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-800 mb-1">{activity.title}</h4>
                          <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                          <span className="text-xs text-gray-500">{activity.time}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 text-center">
                  <Link to="/senior-activity">
                    <Button variant="outline" className="border-blue-300 text-blue-600 hover:bg-blue-50">
                      View All Activity
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pending Requests */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-orange-600" />
                  Pending Requests
                  <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs font-medium">
                    {pendingRequests.length}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingRequests.map((request) => (
                    <div key={request.id} className="p-4 bg-gray-50 rounded-lg border">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                          <User className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-800">{request.name}</h4>
                          <p className="text-sm text-blue-600">{request.branch}</p>
                          <p className="text-xs text-gray-500">{request.location}</p>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{request.message}</p>
                      
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white flex-1">
                          Accept
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-300 flex-1">
                          Decline
                        </Button>
                      </div>
                      
                      <p className="text-xs text-gray-500 mt-2">{request.time}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 text-center">
                  <Link to="/senior-requests">
                    <Button variant="ghost" className="text-blue-600 hover:bg-blue-50 w-full">
                      View All Requests
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeniorDashboard;