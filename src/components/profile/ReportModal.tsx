import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { X, Flag, Send, AlertTriangle } from "lucide-react";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReport: (reportData: any) => void;
}

const ReportModal: React.FC<ReportModalProps> = ({ 
  isOpen, 
  onClose, 
  onSubmitReport 
}) => {
  const [reportType, setReportType] = useState("");
  const [description, setDescription] = useState("");
  const [reporterName, setReporterName] = useState("");
  const [reporterEmail, setReporterEmail] = useState("");

  if (!isOpen) return null;

  const reportTypes = [
    { value: "inappropriate-content", label: "Inappropriate Content" },
    { value: "harassment", label: "Harassment or Bullying" },
    { value: "spam", label: "Spam or Fake Information" },
    { value: "privacy-violation", label: "Privacy Violation" },
    { value: "impersonation", label: "Impersonation" },
    { value: "other", label: "Other" }
  ];

  const handleSubmit = () => {
    if (!reportType || !description || !reporterName || !reporterEmail) {
      alert("Please fill in all fields");
      return;
    }

    const reportData = {
      type: reportType,
      description,
      reporterName,
      reporterEmail,
      timestamp: new Date().toISOString()
    };

    onSubmitReport(reportData);
    
    // Reset form
    setReportType("");
    setDescription("");
    setReporterName("");
    setReporterEmail("");
    
    alert("Report submitted successfully. Our team will review it within 24 hours.");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-2">
            <Flag className="h-5 w-5 text-red-600" />
            <h2 className="text-xl font-bold text-gray-800">Report an Issue</h2>
          </div>
          <Button 
            onClick={onClose}
            variant="ghost" 
            size="sm"
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Warning */}
          <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-orange-800">Important</h4>
                <p className="text-xs text-orange-700 mt-1">
                  Please ensure your report is accurate. False reports may result in action against your account.
                </p>
              </div>
            </div>
          </div>

          {/* Report Type */}
          <div>
            <Label className="text-sm font-medium mb-3 block">What are you reporting?</Label>
            <RadioGroup value={reportType} onValueChange={setReportType}>
              {reportTypes.map((type) => (
                <div key={type.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={type.value} id={type.value} />
                  <Label htmlFor={type.value} className="text-sm">
                    {type.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className="text-sm font-medium">
              Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Please provide details about the issue..."
              className="mt-1 resize-none"
              rows={4}
            />
          </div>

          {/* Reporter Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Your Information</h3>
            <div>
              <Label htmlFor="reporterName">Full Name <span className="text-red-500">*</span></Label>
              <Input
                id="reporterName"
                value={reporterName}
                onChange={(e) => setReporterName(e.target.value)}
                placeholder="Enter your full name"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="reporterEmail">Email Address <span className="text-red-500">*</span></Label>
              <Input
                id="reporterEmail"
                type="email"
                value={reporterEmail}
                onChange={(e) => setReporterEmail(e.target.value)}
                placeholder="Enter your email address"
                className="mt-1"
              />
            </div>
          </div>

          {/* Privacy Note */}
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs text-blue-700">
              Your contact information will only be used to follow up on this report and will not be shared publicly.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50 flex gap-3">
          <Button 
            onClick={onClose}
            variant="outline"
            className="flex-1"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            className="flex-1 bg-red-600 hover:bg-red-700"
            disabled={!reportType || !description || !reporterName || !reporterEmail}
          >
            <Send className="mr-2 h-4 w-4" />
            Submit Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;