import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, ChevronUp, HelpCircle, Users } from "lucide-react";

const SeniorFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How do I ensure my safety and privacy while mentoring?",
      answer:
        "Your privacy and safety are our top priorities. Do not share personal contact details unless you are comfortable. Use the platform's messaging system for all communications, and report any inappropriate behavior immediately to the support team.",
    },
    {
      question: "Can I choose which juniors to mentor?",
      answer:
        "Yes, you can review requests and accept only those you feel comfortable with. You are never obligated to mentor anyone you do not wish to.",
    },
    {
      question: "What if a junior asks for help outside my expertise?",
      answer:
        "You can politely let them know your areas of expertise. If needed, you can refer them to another mentor or direct them to the appropriate resources.",
    },
    {
      question: "How do I handle inappropriate or uncomfortable requests?",
      answer:
        "If you receive any inappropriate or uncomfortable requests, please report them immediately using the platform's reporting tools. Our team will take swift action to ensure your safety.",
    },
    {
      question: "Is my personal information visible to juniors?",
      answer:
        "Only the information you choose to share in your mentor profile is visible. Your email, phone number, and other sensitive details remain private unless you decide to share them.",
    },
    {
      question: "Can I take a break or stop mentoring at any time?",
      answer:
        "Absolutely. You can update your availability status or pause mentoring whenever you need to. Your well-being and academic priorities come first.",
    },
    {
      question: "How do I get support if I face any issues?",
      answer:
        "You can reach out to the support team via the help section on the platform. We are here to assist you with any concerns or questions.",
    },
    {
      question: "Will mentoring affect my academics?",
      answer:
        "Mentoring is designed to be flexible. You can set your own schedule and limit the number of juniors you mentor, ensuring it does not interfere with your studies.",
    },
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
            Genuine questions about mentoring and your safety as a senior
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
      </div>
    </section>
  );
};

export default SeniorFAQ;