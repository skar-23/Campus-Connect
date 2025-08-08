import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save, X, Plus, Trash2 } from "lucide-react";

interface SeniorProfileEditProps {
  onCancel: () => void;
}

const SeniorProfileEdit: React.FC<SeniorProfileEditProps> = ({ onCancel }) => {
  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: "Arjun Sharma",
      phone: "+91 9876543210",
      location: "Jalandhar, Punjab",
      hometown: "Chandigarh, India",
      bio: "Passionate about technology and helping junior students navigate their academic journey. Experienced in web development, competitive programming, and mentoring.",
      languages: ["Hindi", "English", "Punjabi"]
    },
    academicInfo: {
      specialization: "Artificial Intelligence & Machine Learning",
      cgpa: "8.75",
      coursework: [
        "Advanced Algorithms",
        "Machine Learning", 
        "Database Management Systems",
        "Software Engineering",
        "Computer Networks"
      ]
    },
    mentoringInfo: {
      experience: "2+ years",
      mentoringAreas: [
        "Academic Guidance",
        "Career Counseling",
        "Technical Skills", 
        "Placement Preparation",
        "Project Development",
        "Interview Preparation"
      ],
      mentoringPhilosophy: "I believe in empowering students to discover their potential and providing them with the right guidance at the right time. Every student is unique, and personalized mentoring is key to their success.",
      isAvailable: true
    }
  });

  const [newLanguage, setNewLanguage] = useState("");
  const [newCourse, setNewCourse] = useState("");
  const [newMentoringArea, setNewMentoringArea] = useState("");

  const handleInputChange = (section: string, field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const addArrayItem = (section: string, field: string, value: string, setValue: (val: string) => void) => {
    if (value.trim()) {
      setFormData(prev => {
        const sectionData = prev[section as keyof typeof prev] as any;
        const currentArray = sectionData[field] as string[];
        
        return {
          ...prev,
          [section]: {
            ...sectionData,
            [field]: [...currentArray, value.trim()]
          }
        };
      });
      setValue("");
    }
  };

  const removeArrayItem = (section: string, field: string, index: number) => {
    setFormData(prev => {
      const sectionData = prev[section as keyof typeof prev] as any;
      const currentArray = sectionData[field] as string[];
      
      return {
        ...prev,
        [section]: {
          ...sectionData,
          [field]: currentArray.filter((_, i) => i !== index)
        }
      };
    });
  };

  const handleSave = () => {
    // Here you would typically save the data to your backend
    console.log("Saving profile data:", formData);
    onCancel(); // Close edit mode
  };

  return (
    <div className="space-y-6">
      
      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={formData.personalInfo.fullName}
                onChange={(e) => handleInputChange('personalInfo', 'fullName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                value={formData.personalInfo.phone}
                onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Location</label>
              <input
                type="text"
                value={formData.personalInfo.location}
                onChange={(e) => handleInputChange('personalInfo', 'location', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hometown</label>
              <input
                type="text"
                value={formData.personalInfo.hometown}
                onChange={(e) => handleInputChange('personalInfo', 'hometown', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea
              value={formData.personalInfo.bio}
              onChange={(e) => handleInputChange('personalInfo', 'bio', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Tell others about yourself, your interests, and what makes you a great mentor..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Languages</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.personalInfo.languages.map((language, index) => (
                <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  {language}
                  <button
                    onClick={() => removeArrayItem('personalInfo', 'languages', index)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newLanguage}
                onChange={(e) => setNewLanguage(e.target.value)}
                placeholder="Add language"
                className="flex-1 px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Button
                onClick={() => addArrayItem('personalInfo', 'languages', newLanguage, setNewLanguage)}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Academic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Academic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
              <input
                type="text"
                value={formData.academicInfo.specialization}
                onChange={(e) => handleInputChange('academicInfo', 'specialization', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CGPA</label>
              <input
                type="text"
                value={formData.academicInfo.cgpa}
                onChange={(e) => handleInputChange('academicInfo', 'cgpa', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Key Coursework</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.academicInfo.coursework.map((course, index) => (
                <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                  {course}
                  <button
                    onClick={() => removeArrayItem('academicInfo', 'coursework', index)}
                    className="text-green-500 hover:text-green-700"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newCourse}
                onChange={(e) => setNewCourse(e.target.value)}
                placeholder="Add course"
                className="flex-1 px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Button
                onClick={() => addArrayItem('academicInfo', 'coursework', newCourse, setNewCourse)}
                size="sm"
                className="bg-green-600 hover:bg-green-700"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mentoring Information */}
      <Card>
        <CardHeader>
          <CardTitle>Mentoring Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
              <input
                type="text"
                value={formData.mentoringInfo.experience}
                onChange={(e) => handleInputChange('mentoringInfo', 'experience', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Availability Status</label>
              <select
                value={formData.mentoringInfo.isAvailable ? 'available' : 'unavailable'}
                onChange={(e) => handleInputChange('mentoringInfo', 'isAvailable', e.target.value === 'available')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="available">Available for Mentoring</option>
                <option value="unavailable">Currently Unavailable</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Areas of Mentoring</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.mentoringInfo.mentoringAreas.map((area, index) => (
                <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                  {area}
                  <button
                    onClick={() => removeArrayItem('mentoringInfo', 'mentoringAreas', index)}
                    className="text-purple-500 hover:text-purple-700"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newMentoringArea}
                onChange={(e) => setNewMentoringArea(e.target.value)}
                placeholder="Add mentoring area"
                className="flex-1 px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Button
                onClick={() => addArrayItem('mentoringInfo', 'mentoringAreas', newMentoringArea, setNewMentoringArea)}
                size="sm"
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mentoring Philosophy</label>
            <textarea
              value={formData.mentoringInfo.mentoringPhilosophy}
              onChange={(e) => handleInputChange('mentoringInfo', 'mentoringPhilosophy', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Describe your approach to mentoring..."
            />
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-end">
        <Button onClick={onCancel} variant="outline" className="px-8">
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
        <Button onClick={handleSave} className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 px-8">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default SeniorProfileEdit;