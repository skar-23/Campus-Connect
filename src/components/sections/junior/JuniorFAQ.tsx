import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

const JuniorFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How does document verification work?",
      answer: "Our senior students review your admission documents and provide feedback on completeness, accuracy, and any potential issues. They've been through the same process and know exactly what to look for."
    },
    {
      question: "Is the service free?",
      answer: "Yes! Campus Connect is completely free for all students. Our seniors volunteer their time to help juniors because they understand the challenges of the admission process."
    },
    {
      question: "How quickly will I get help?",
      answer: "Most document verifications are completed within 24 hours. For urgent queries, seniors typically respond within a few hours during active times."
    },
    {
      question: "Can I choose which senior helps me?",
      answer: "Yes, you can browse senior profiles and choose based on their department, year, or specialization. You can also let us match you with the most suitable senior."
    },
    {
      question: "What if I need help outside of admission process?",
      answer: "Our seniors can help with campus navigation, hostel information, study tips, local area guidance, and general college life advice."
    },
    {
      question: "How do I know the seniors are reliable?",
      answer: "All our senior volunteers are verified current students. We maintain ratings and reviews to ensure quality help. You can see their profiles and past help history."
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Got questions? We've got answers! Here are the most common questions from juniors.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader 
                className="cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <CardTitle className="flex items-center justify-between text-lg font-semibold text-gray-800">
                  <span>{faq.question}</span>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-purple-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-purple-500" />
                  )}
                </CardTitle>
              </CardHeader>
              {openIndex === index && (
                <CardContent className="pt-0">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JuniorFAQ;