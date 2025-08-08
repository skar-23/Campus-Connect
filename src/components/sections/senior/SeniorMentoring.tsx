import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  MessageSquare, 
  Calendar, 
  Star,
  Clock,
  User,
  Video,
  Phone
} from "lucide-react";
import { Link } from "react-router-dom";

const SeniorMentoring: React.FC = () => {
  // Mock data for current mentees
  const currentMentees = [
    {
      id: 1,
      name: "Priya Singh",
      branch: "Computer Science",
      year: "1st Year",
      avatar: "PS",
      lastMessage: "Thank you for the admission guidance!",
      lastActive: "2 hours ago",
      progress: 85,
      sessions: 5,
      rating: 5
    },
    {
      id: 2,
      name: "Rahul Kumar",
      branch: "Mechanical Engineering",
      year: "1st Year",
      avatar: "RK",
      lastMessage: "When is the next mentoring session?",
      lastActive: "1 day ago",
      progress: 60,
      sessions: 3,
      rating: 4
    },
    {
      id: 3,
      name: "Anita Patel",
      branch: "Electrical Engineering",
      year: "2nd Year",
      avatar: "AP",
      lastMessage: "Need help with hostel allocation",
      lastActive: "3 hours ago",
      progress: 92,
      sessions: 8,
      rating: 5
    }
  ];

  const upcomingSessions = [
    {
      id: 1,
      mentee: "Vikram Shah",
      time: "Tomorrow at 3:00 PM",
      topic: "Career Guidance",
      type: "video"
    },
    {
      id: 2,
      mentee: "Sneha Reddy",
      time: "Today at 6:00 PM",
      topic: "Document Verification",
      type: "chat"
    }
  ];

  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-gradient-to-br from-blue-500 to-blue-600',
      'bg-gradient-to-br from-green-500 to-green-600',
      'bg-gradient-to-br from-purple-500 to-purple-600',
      'bg-gradient-to-br from-pink-500 to-pink-600',
      'bg-gradient-to-br from-orange-500 to-orange-600',
      'bg-gradient-to-br from-teal-500 to-teal-600'
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">My Mentoring Dashboard</h2>
          <p className="text-gray-600">Track your mentoring progress and upcoming sessions with juniors.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Current Mentees */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  Current Mentees ({currentMentees.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentMentees.map((mentee) => (
                    <div key={mentee.id} className="p-4 bg-gray-50 rounded-lg border hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-full ${getAvatarColor(mentee.name)} flex items-center justify-center text-white font-bold`}>
                            {mentee.avatar}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">{mentee.name}</h4>
                            <p className="text-sm text-blue-600">{mentee.branch}</p>
                            <p className="text-xs text-gray-500">{mentee.year}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 mb-1">
                            {[...Array(mentee.rating)].map((_, i) => (
                              <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                            ))}
                          </div>
                          <p className="text-xs text-gray-500">{mentee.sessions} sessions</p>
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Mentoring Progress</span>
                          <span className="font-medium">{mentee.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${mentee.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-600 truncate">{mentee.lastMessage}</p>
                          <p className="text-xs text-gray-500 mt-1">Last active: {mentee.lastActive}</p>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button size="sm" variant="outline" className="px-3">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="px-3">
                            <Video className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <Link to="/senior-mentees">
                    <Button variant="outline" className="border-blue-300 text-blue-600 hover:bg-blue-50">
                      View All Mentees
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Sessions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-green-600" />
                  Upcoming Sessions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingSessions.map((session) => (
                    <div key={session.id} className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-800">{session.mentee}</h4>
                        {session.type === 'video' ? (
                          <Video className="h-4 w-4 text-blue-500" />
                        ) : (
                          <MessageSquare className="h-4 w-4 text-green-500" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{session.topic}</p>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        {session.time}
                      </div>
                      <Button size="sm" className="w-full mt-3 bg-green-600 hover:bg-green-700">
                        Join Session
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="mt-4 text-center">
                  <Link to="/senior-schedule">
                    <Button variant="ghost" className="text-blue-600 hover:bg-blue-50 w-full">
                      View Full Schedule
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Mentoring Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">This Month</span>
                    <span className="font-bold text-blue-600">24 Hours</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Average Rating</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="font-bold text-orange-600">4.8</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Helped</span>
                    <span className="font-bold text-green-600">156 Students</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeniorMentoring;