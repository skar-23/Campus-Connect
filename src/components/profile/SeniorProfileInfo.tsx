import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  User,
  GraduationCap,
  MapPin,
  Calendar,
  BookOpen,
  Award,
  Target,
  Lightbulb,
  Users,
  MessageSquare,
  Star,
  TrendingUp,
} from "lucide-react";

const SeniorProfileInfo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("about");

  // Mock data - replace with real data from your backend
  const profileData = {
    personalInfo: {
      fullName: "Arjun Sharma",
      studentId: "2020UCS0123",
      branch: "Computer Science Engineering",
      currentYear: "4th Year (Final Year)",
      expectedGraduation: "May 2024",
      cgpa: "8.75",
      location: "Jalandhar, Punjab",
      hometown: "Chandigarh, India",
      dateOfBirth: "March 15, 2002",
      languages: ["Hindi", "English", "Punjabi"],
    },
    academicInfo: {
      department: "Computer Science & Engineering",
      specialization: "Artificial Intelligence & Machine Learning",
      currentSemester: "8th Semester",
      coursework: [
        "Advanced Algorithms",
        "Machine Learning",
        "Database Management Systems",
        "Software Engineering",
        "Computer Networks",
      ],
      projects: [
        {
          title: "E-Learning Platform",
          description:
            "Full-stack web application for online learning with React and Node.js",
          tech: ["React", "Node.js", "MongoDB", "Express"],
        },
        {
          title: "Sentiment Analysis Tool",
          description: "ML model for analyzing sentiment in social media posts",
          tech: ["Python", "TensorFlow", "NLP", "Flask"],
        },
        {
          title: "Campus Connect Platform",
          description: "Mentoring platform connecting seniors with juniors",
          tech: ["React", "TypeScript", "Tailwind CSS"],
        },
      ],
    },
    mentoringInfo: {
      experience: "2+ years",
      mentoringAreas: [
        "Academic Guidance",
        "Career Counseling",
        "Technical Skills",
        "Placement Preparation",
        "Project Development",
        "Interview Preparation",
      ],
      successStories: [
        {
          mentee: "Priya Singh",
          achievement: "Secured internship at Google",
          testimonial: "Arjun's guidance was instrumental in my success!",
        },
        {
          mentee: "Rahul Kumar",
          achievement: "Improved CGPA from 6.5 to 8.2",
          testimonial: "Amazing mentor who helped me focus on academics.",
        },
        {
          mentee: "Sneha Patel",
          achievement: "Won inter-college hackathon",
          testimonial: "His technical guidance was exceptional.",
        },
      ],
      mentoringPhilosophy:
        "I believe in empowering students to discover their potential and providing them with the right guidance at the right time. Every student is unique, and personalized mentoring is key to their success.",
    },
    achievements: [
      {
        title: "Top Mentor Award 2023",
        description: "Recognized as the best mentor in CSE department",
        date: "December 2023",
        icon: Award,
      },
      {
        title: "100+ Hours Mentoring",
        description: "Completed over 100 hours of mentoring sessions",
        date: "November 2023",
        icon: Clock,
      },
      {
        title: "5-Star Rating Maintained",
        description: "Consistently maintained 5-star rating from mentees",
        date: "Ongoing",
        icon: Star,
      },
      {
        title: "Dean's List",
        description:
          "Academic excellence recognition for 3 consecutive semesters",
        date: "2022-2023",
        icon: GraduationCap,
      },
    ],
  };

  const tabs = [
    { id: "about", label: "About", icon: User },
    { id: "academic", label: "Academic", icon: GraduationCap },
    { id: "mentoring", label: "Mentoring", icon: Users },
    { id: "achievements", label: "Achievements", icon: Award },
  ];

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <Button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  className={`flex-1 min-w-fit ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-blue-500 to-green-500 text-white"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  <IconComponent className="h-4 w-4 mr-2" />
                  {tab.label}
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Tab Content */}

      {/* About Tab */}
      {activeTab === "about" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-blue-600" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Full Name
                </label>
                <p className="text-gray-800 font-medium">
                  {profileData.personalInfo.fullName}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Student ID
                </label>
                <p className="text-gray-800 font-medium">
                  {profileData.personalInfo.studentId}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Branch
                </label>
                <p className="text-gray-800 font-medium">
                  {profileData.personalInfo.branch}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Current Year
                </label>
                <p className="text-gray-800 font-medium">
                  {profileData.personalInfo.currentYear}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Expected Graduation
                </label>
                <p className="text-gray-800 font-medium">
                  {profileData.personalInfo.expectedGraduation}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  CGPA
                </label>
                <p className="text-gray-800 font-medium">
                  {profileData.personalInfo.cgpa}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Current Location
                </label>
                <p className="text-gray-800 font-medium flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  {profileData.personalInfo.location}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Hometown
                </label>
                <p className="text-gray-800 font-medium">
                  {profileData.personalInfo.hometown}
                </p>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-500">
                Languages
              </label>
              <div className="flex flex-wrap gap-2 mt-2">
                {profileData.personalInfo.languages.map((language, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                  >
                    {language}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Academic Tab */}
      {activeTab === "academic" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-blue-600" />
                Academic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Department
                  </label>
                  <p className="text-gray-800 font-medium">
                    {profileData.academicInfo.department}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Specialization
                  </label>
                  <p className="text-gray-800 font-medium">
                    {profileData.academicInfo.specialization}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Current Semester
                  </label>
                  <p className="text-gray-800 font-medium">
                    {profileData.academicInfo.currentSemester}
                  </p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">
                  Key Coursework
                </label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {profileData.academicInfo.coursework.map((course, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-green-600" />
                Key Projects
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {profileData.academicInfo.projects.map((project, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <h4 className="font-semibold text-gray-800 mb-2">
                      {project.title}
                    </h4>
                    <p className="text-gray-600 text-sm mb-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Mentoring Tab */}
      {activeTab === "mentoring" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                Mentoring Experience
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Experience
                </label>
                <p className="text-gray-800 font-medium">
                  {profileData.mentoringInfo.experience}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">
                  Areas of Expertise
                </label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {profileData.mentoringInfo.mentoringAreas.map(
                    (area, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                      >
                        {area}
                      </span>
                    )
                  )}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">
                  Mentoring Philosophy
                </label>
                <p className="text-gray-700 leading-relaxed">
                  {profileData.mentoringInfo.mentoringPhilosophy}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Success Stories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {profileData.mentoringInfo.successStories.map(
                  (story, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-4 bg-gradient-to-r from-green-50 to-blue-50"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-800">
                          {story.mentee}
                        </h4>
                        <span className="text-sm text-green-600 font-medium">
                          {story.achievement}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm italic">
                        "{story.testimonial}"
                      </p>
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Achievements Tab */}
      {activeTab === "achievements" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-orange-600" />
              Achievements & Recognition
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {profileData.achievements.map((achievement, index) => {
                const IconComponent = achievement.icon;
                return (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-1">
                        {achievement.title}
                      </h4>
                      <p className="text-gray-600 text-sm mb-2">
                        {achievement.description}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Calendar className="h-3 w-3" />
                        {achievement.date}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SeniorProfileInfo;
