import React from "react";
import { Link } from "react-router-dom";
import SeniorNavbar from "@/components/layout/SeniorNavbar";
import SeniorHero from "@/components/sections/senior/SeniorHero";
import SeniorDashboard from "@/components/sections/senior/SeniorDashboard";
import SeniorMentoring from "@/components/sections/senior/SeniorMentoring";
import SeniorServices from "@/components/sections/senior/SeniorServices";
import SeniorTestimonials from "@/components/sections/senior/SeniorTestimonials";
import SeniorQuickActions from "@/components/sections/senior/SeniorQuickActions";
import SeniorFAQ from "@/components/sections/senior/SeniorFAQ";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

const SeniorHomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <SeniorNavbar />
      
      <main className="pt-20">
        <SeniorHero />
        <SeniorDashboard />
        <SeniorMentoring />
        <SeniorServices />
        <SeniorQuickActions />
        <SeniorTestimonials />
        <SeniorFAQ />
        
        {/* Update the profile section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Manage Your Profile</h2>
            <p className="text-gray-600 mb-6">Update your information and track your mentoring progress</p>
            <Link to="/senior-profile">
              <Button className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white px-8 py-3 text-lg">
                <User className="h-5 w-5 mr-2" />
                View Profile
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default SeniorHomePage;