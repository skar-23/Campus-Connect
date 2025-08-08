import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { FilePenLine, MessageSquareWarning } from "lucide-react"; // Import icons

const SeniorProfileActions: React.FC = () => {
  const handleRaiseIssue = () => {
    window.open('https://docs.google.com/forms/d/e/1FAIpQLSe7OIarVQZe7_uQ2TiJJQlWZ72uTlAt4rv5jM-4r00viXM3Wg/viewform?usp=dialog', '_blank');
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-end">
      <Button
        variant="secondary"
        onClick={handleRaiseIssue}
      >
        <MessageSquareWarning className="mr-2 h-4 w-4" />
        Raise Issue
      </Button>
      
      {/* Use asChild to make the button behave like a Link */}
      <Button asChild>
        <Link to="/senior-edit">
          <FilePenLine className="mr-2 h-4 w-4" />
          Edit Profile
        </Link>
      </Button>
    </div>
  );
};

export default SeniorProfileActions;