import React from "react";
import { Button } from "@/components/ui/button";
import { Shield, CheckCircle, FileText } from "lucide-react";

const Verification: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center mb-6">
              <Shield className="h-8 w-8 text-purple-600 mr-3" />
              <span className="text-purple-600 font-semibold">
                Document Verification
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Get your admission documents verified through seniors.
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Navigate the admissions process with confidence. Our experienced
              seniors will help verify your documents, ensure you have
              everything needed, and guide you through the entire admission
              process step by step.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-gray-700">
                  Document checklist verification
                </span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-gray-700">
                  Format and requirement validation
                </span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                <span className="text-gray-700">Process guidance and tips</span>
              </div>
            </div>

            <Button
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-3 rounded-full transform hover:scale-105 transition-all duration-300"
            >
              Get Started
            </Button>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl p-8 aspect-square flex items-center justify-center">
              <FileText className="h-32 w-32 text-purple-400" />
              <div className="absolute inset-0 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-3xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Verification;
