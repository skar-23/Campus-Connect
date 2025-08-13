import React from "react";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CTA: React.FC = () => {
  const navigate = useNavigate();

  const handleJuniorClick = () => {
    navigate("/?loginMode=junior");
  };

  const handleSeniorClick = () => {
    navigate("/?loginMode=senior");
  };

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-pink-500 via-purple-600 to-blue-600">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Start Your College Journey
        </h2>
        <p className="text-lg text-purple-100 mb-8 max-w-xl mx-auto">
          Whether you're a new student seeking valuable insights to navigate your first year or a senior ready to make an impact by sharing your experience, this is the community where you'll find genuine connections.
          we're better together.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={handleJuniorClick}
            size="lg"
            className="bg-white text-purple-600 hover:bg-purple-50 px-8 py-3 rounded-full font-bold text-base transform hover:scale-105 transition-all duration-300 shadow-xl"
          >
            I'm New Here
          </Button>
          <Button
            onClick={handleSeniorClick}
            size="lg"
            variant="outline"
            className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-purple-700 px-8 py-3 rounded-full font-bold text-base transform hover:scale-105 transition-all duration-300 flex items-center"
          >
            <Users className="h-5 w-5 mr-2 transition-colors duration-300" />
            <span>I'm a Senior</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;