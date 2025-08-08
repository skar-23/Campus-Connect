import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, ChevronUp, HelpCircle, Users } from "lucide-react";

const SeniorFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How much time do I need to commit as a mentor?",
      answer: "The time commitment is flexible and entirely up to you! Most mentors spend 2-4 hours per week helping juniors. You can set your availability and choose how many students you want to mentor based on your schedule."
    },
    {
      question: "What kind of support do I provide as a senior mentor?",
      answer: "As a mentor, you can help with document verification, admission guidance, campus navigation, study tips, career advice, and general college life questions. You choose the areas where you feel most confident helping."
    },
    {
      question: "Do I get any recognition for my mentoring work?",
      answer: "Absolutely! We have a recognition system with badges, certificates, and public acknowledgment. Top mentors are featured on our platform and receive special recognition from the college administration."
    },
    {
      question: "How are juniors matched with me?",
      answer: "Juniors can browse mentor profiles and choose based on department, specialization, or interests. They can also be automatically matched based on their needs and your expertise areas."
    },
    {
      question: "Can I set boundaries on what help I provide?",
      answer: "Yes! You can specify your areas of expertise and availability in your profile. You're not obligated to help with everything - focus on areas where you can provide the most value."
    },
    {
      question: "What if I need to take a break from mentoring?",
      answer: "You can pause your mentoring anytime by updating your availability status. We understand that academics and other commitments come first. You can resume whenever you're ready."
    },
    {
      question: "How do I handle difficult or inappropriate requests?",
      answer: "We have clear guidelines and a reporting system. If you encounter any inappropriate behavior or requests outside your comfort zone, you can report them to our support team immediately."
    },
    {
      question: "Will mentoring help with my own career development?",
      answer: "Definitely! Mentoring develops leadership skills, communication abilities, and teaching experience - all valuable for your resume and future career. Many companies value mentoring experience highly."
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
            Senior Mentor FAQ
          </h2>
          <p className="text-lg text-gray-600">
            Common questions about being a mentor and helping junior students
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
              <CardHeader 
                className="cursor-pointer hover:bg-gradient-to-r hover:from-blue-50 hover:to-green-50 transition-colors duration-200"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <CardTitle className="flex items-center justify-between text-lg font-semibold text-gray-800">
                  <span className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-blue-500" />
                    {faq.question}
                  </span>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-blue-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-blue-500" />
                  )}
                </CardTitle>
              </CardHeader>
              {openIndex === index && (
                <CardContent className="pt-0 pb-6">
                  <div className="pl-8">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* Additional Help Section */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-blue-500 to-green-600 text-white border-0">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
              <p className="text-blue-100 mb-6">
                Our support team is here to help you make the most of your mentoring experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105">
                  Contact Support
                </button>
                <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105">
                  Mentor Guidelines
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SeniorFAQ;