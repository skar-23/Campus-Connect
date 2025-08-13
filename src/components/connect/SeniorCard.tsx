import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MapPin, 
  CheckCircle,
  MessageSquare,
  Mail,
  Phone,
  GraduationCap,
  Building,
  Globe,
  Lock
} from "lucide-react";
import { Senior } from "@/types/senior";
// Removed getUserAvatar import - now using database avatar URLs

interface SeniorCardProps {
  senior: Senior;
}

const SeniorCard: React.FC<SeniorCardProps> = ({ senior }) => {
  const [requestSent, setRequestSent] = useState(false);

  // Use database avatar URL directly

  const handleWhatsAppChat = () => {
    if (senior.contactNumber) {
      const message = encodeURIComponent(`Hi ${senior.name}, I'm a junior at NITJ and would like to connect with you for guidance.`);
      const whatsappUrl = `https://wa.me/${senior.contactNumber.replace(/[^0-9]/g, '')}?text=${message}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  const handleEmailRequest = () => {
    const subject = encodeURIComponent(`Connection Request from NITJ Junior`);
    const body = encodeURIComponent(`Hi ${senior.name},\n\nI'm a junior at NITJ and would like to connect with you for guidance and mentorship.\n\nThank you!`);
    const mailtoUrl = `mailto:?subject=${subject}&body=${body}`;
    window.open(mailtoUrl);
  };

  const handleCall = () => {
    if (senior.contactNumber) {
      const phoneUrl = `tel:${senior.contactNumber}`;
      window.open(phoneUrl);
    }
  };

  return (
    <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 bg-gradient-to-br from-white via-white to-gray-50 border-0 shadow-lg overflow-hidden relative">
      {/* Decorative gradient border */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-lg p-[1px]">
        <div className="h-full w-full bg-white rounded-lg"></div>
      </div>
      
      <CardContent className="relative p-6 z-10">
        {/* Header with Avatar and Info */}
        <div className="flex items-start gap-4 mb-6">
          <div className="relative">
            {/* Database Avatar */}
            <div className="w-12 h-12 rounded-xl overflow-hidden shadow-lg transform group-hover:scale-110 transition-transform duration-300 border-2 border-white">
              <img 
                src={senior.avatarId} 
                alt={senior.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to colored circle with initials if image fails
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = document.createElement('div');
                  fallback.className = 'w-full h-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg';
                  fallback.textContent = senior.name.charAt(0).toUpperCase();
                  target.parentElement?.appendChild(fallback);
                }}
              />
            </div>
            {/* Verified badge */}
            {senior.verified && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white shadow-md">
                <CheckCircle className="h-2.5 w-2.5 text-white" />
              </div>
            )}
          </div>

          <div className="flex-1">
            {/* Name without heart button */}
            <div className="mb-2">
              <h3 className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors duration-300">
                {senior.name}
              </h3>
            </div>

            {/* Public/Private status with icon */}
            <div className="flex items-center gap-1 mb-3">
              {senior.isPublic ? (
                <div className="flex items-center gap-1 text-green-600">
                  <Globe className="h-3 w-3" />
                  <span className="text-xs font-medium">Public</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-gray-500">
                  <Lock className="h-3 w-3" />
                  <span className="text-xs font-medium">Private</span>
                </div>
              )}
            </div>

            {/* Branch and Year in styled boxes */}
            <div className="flex flex-wrap gap-2 mb-3">
              <div className="flex items-center gap-1 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                <Building className="h-3 w-3" />
                {senior.branch}
              </div>
              <div className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                <GraduationCap className="h-3 w-3" />
                {senior.graduationYear}
              </div>
            </div>

            {/* Location with enhanced styling */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-gray-600">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium">{senior.nativePlace}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons with enhanced styling */}
        <div className="flex gap-3">
          {senior.isPublic ? (
            <>
              <Button
                onClick={handleWhatsAppChat}
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                size="sm"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                WhatsApp
              </Button>
              <Button
                onClick={handleCall}
                variant="outline"
                size="sm"
                className="border-2 border-green-200 text-green-600 hover:bg-green-50 hover:border-green-300 rounded-xl font-semibold px-4 transition-all duration-300"
              >
                <Phone className="mr-1 h-4 w-4" />
                Call
              </Button>
            </>
          ) : (
            <Button
              onClick={handleEmailRequest}
              className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              size="sm"
            >
              <Mail className="mr-2 h-4 w-4" />
              Send Request
            </Button>
          )}
        </div>

        {/* Subtle background pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-100/30 to-transparent rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
      </CardContent>
    </Card>
  );
};

export default SeniorCard;