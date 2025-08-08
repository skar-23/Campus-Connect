import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { FilePenLine, MessageSquareWarning } from "lucide-react"; // Import icons

const ProfileActions: React.FC = () => {
  const navigate = useNavigate();
  
  const handleReportIssue = () => {
    window.open('https://docs.google.com/forms/d/e/1FAIpQLSfoTge0of1wrZTTbVaoc2CTh7uqQSv3q3-LALT-wUriftj_QA/viewform?usp=dialog', '_blank');
  };
  
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-end">
      <Button
        variant="secondary"
        onClick={handleReportIssue}
      >
        <MessageSquareWarning className="mr-2 h-4 w-4" />
        Report an Issue
      </Button>
      
      <Button onClick={() => navigate('/junior-edit')}>
        <FilePenLine className="mr-2 h-4 w-4" />
        Edit Profile
      </Button>
    </div>
  );
};

export default ProfileActions;