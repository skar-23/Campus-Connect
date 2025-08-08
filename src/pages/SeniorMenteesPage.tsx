import React, { useState } from "react";
import SeniorNavbar from "@/components/layout/SeniorNavbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  MessageSquare, 
  Video, 
  Phone, 
  Calendar,
  Star,
  Clock,
  Search,
  Filter,
  ArrowLeft,
  User,
  MapPin,
  BookOpen,
  TrendingUp,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { Link } from "react-router-dom";

interface Mentee {
  id: string;
  name: string;
  email: string;
  phone: string;
  branch: string;
  year: string;
  avatar: string;
  location: string;
  joinedDate: string;
  lastActive: string;
  progress: number;
  sessionsCompleted: number;
  rating: number;
  status: 'active' | 'inactive' | 'pending';
  currentGoals: string[];
  recentActivity: string;
}

const SeniorMenteesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("recent");

  // Mock data - replace with real data from your backend
  const mentees: Mentee[] = [
    {
      id: "1",
      name: "Priya Singh",
      email: "priya.singh@nitj.ac.in",
      phone: "+91 9876543210",
      branch: "Computer Science Engineering",
      year: "1st Year",
      avatar: "PS",
      location: "Punjab, India",
      joinedDate: "2024-07-15",
      lastActive: "2 hours ago",
      progress: 85,
      sessionsCompleted: 8,
      rating: 5,
      status: 'active',
      currentGoals: ["Complete admission process", "Find suitable accommodation", "Academic planning"],
      recentActivity: "Completed document verification session"
    },
    {
      id: "2",
      name: "Rahul Kumar",
      email: "rahul.kumar@nitj.ac.in",
      phone: "+91 9876543211",
      branch: "Mechanical Engineering",
      year: "1st Year",
      avatar: "RK",
      location: "Bihar, India",
      joinedDate: "2024-07-20",
      lastActive: "1 day ago",
      progress: 60,
      sessionsCompleted: 4,
      rating: 4,
      status: 'active',
      currentGoals: ["Hostel allocation guidance", "Course selection help"],
      recentActivity: "Asked about hostel facilities"
    },
    {
      id: "3",
      name: "Anita Patel",
      email: "anita.patel@nitj.ac.in",
      phone: "+91 9876543212",
      branch: "Electrical Engineering",
      year: "2nd Year",
      avatar: "AP",
      location: "Gujarat, India",
      joinedDate: "2024-06-10",
      lastActive: "3 hours ago",
      progress: 92,
      sessionsCompleted: 12,
      rating: 5,
      status: 'active',
      currentGoals: ["Internship preparation", "Skill development"],
      recentActivity: "Shared internship opportunities"
    },
    {
      id: "4",
      name: "Vikram Shah",
      email: "vikram.shah@nitj.ac.in",
      phone: "+91 9876543213",
      branch: "Computer Science Engineering",
      year: "1st Year",
      avatar: "VS",
      location: "Rajasthan, India",
      joinedDate: "2024-07-25",
      lastActive: "1 week ago",
      progress: 30,
      sessionsCompleted: 2,
      rating: 4,
      status: 'inactive',
      currentGoals: ["Basic orientation", "Campus navigation"],
      recentActivity: "Completed initial consultation"
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700 border-green-200';
      case 'inactive': return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const filteredMentees = mentees.filter(mentee => {
    const matchesSearch = mentee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentee.branch.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || mentee.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const sortedMentees = [...filteredMentees].sort((a, b) => {
    switch (sortBy) {
      case 'name': return a.name.localeCompare(b.name);
      case 'progress': return b.progress - a.progress;
      case 'rating': return b.rating - a.rating;
      case 'recent':
      default:
        return new Date(b.joinedDate).getTime() - new Date(a.joinedDate).getTime();
    }
  });

  const stats = {
    total: mentees.length,
    active: mentees.filter(m => m.status === 'active').length,
    avgProgress: Math.round(mentees.reduce((acc, m) => acc + m.progress, 0) / mentees.length),
    avgRating: (mentees.reduce((acc, m) => acc + m.rating, 0) / mentees.length).toFixed(1)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <SeniorNavbar />
      
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-16 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left Section - Back Button */}
            <div className="flex items-center space-x-4">
              <Link to="/senior-home">
                <Button 
                  variant="ghost" 
                  className="text-blue-700 hover:text-blue-800 hover:bg-blue-50 transition-all duration-200 rounded-xl font-medium"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Dashboard
                </Button>
              </Link>
            </div>

            {/* Center Section - Title */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                <Users className="h-4 w-4 text-white" />
              </div>
              <div className="text-center">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  My Mentees
                </h1>
                <p className="text-xs text-gray-500 font-medium">
                  Manage and track your mentoring relationships
                </p>
              </div>
            </div>

            {/* Right Section - Quick Stats */}
            <div className="hidden sm:flex items-center space-x-4">
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">{stats.active}</div>
                <div className="text-xs text-gray-500">Active</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">{stats.avgProgress}%</div>
                <div className="text-xs text-gray-500">Avg Progress</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-700">{stats.total}</div>
              <div className="text-sm text-blue-600">Total Mentees</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
            <CardContent className="p-4 text-center">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-700">{stats.active}</div>
              <div className="text-sm text-green-600">Active Mentees</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-700">{stats.avgProgress}%</div>
              <div className="text-sm text-purple-600">Avg Progress</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
            <CardContent className="p-4 text-center">
              <Star className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-700">{stats.avgRating}</div>
              <div className="text-sm text-orange-600">Avg Rating</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search mentees by name or branch..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Filter by Status */}
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
              </div>

              {/* Sort by */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="recent">Recent</option>
                <option value="name">Name</option>
                <option value="progress">Progress</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Mentees Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedMentees.map((mentee) => (
            <Card key={mentee.id} className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-full ${getAvatarColor(mentee.name)} flex items-center justify-center text-white font-bold`}>
                      {mentee.avatar}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{mentee.name}</h3>
                      <p className="text-sm text-blue-600">{mentee.branch}</p>
                      <p className="text-xs text-gray-500">{mentee.year}</p>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(mentee.status)}`}>
                    {mentee.status}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Mentoring Progress</span>
                    <span className="font-semibold text-gray-800">{mentee.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${mentee.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-blue-600">{mentee.sessionsCompleted}</div>
                    <div className="text-xs text-gray-500">Sessions</div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-lg font-bold text-orange-600">{mentee.rating}</span>
                    </div>
                    <div className="text-xs text-gray-500">Rating</div>
                  </div>
                </div>

                {/* Location and Last Active */}
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {mentee.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    Last active: {mentee.lastActive}
                  </div>
                </div>

                {/* Current Goals */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Current Goals:</h4>
                  <div className="space-y-1">
                    {mentee.currentGoals.slice(0, 2).map((goal, index) => (
                      <div key={index} className="text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded">
                        • {goal}
                      </div>
                    ))}
                    {mentee.currentGoals.length > 2 && (
                      <div className="text-xs text-blue-600">
                        +{mentee.currentGoals.length - 2} more
                      </div>
                    )}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Recent Activity:</p>
                  <p className="text-sm text-blue-700">{mentee.recentActivity}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4">
                  <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Message
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Video className="h-4 w-4 mr-1" />
                    Call
                  </Button>
                  <Button size="sm" variant="outline">
                    <Calendar className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {sortedMentees.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No mentees found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || filterStatus !== 'all' 
                  ? "Try adjusting your search or filters"
                  : "You haven't started mentoring any students yet"
                }
              </p>
              {!searchTerm && filterStatus === 'all' && (
                <Button className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
                  Start Mentoring
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SeniorMenteesPage;