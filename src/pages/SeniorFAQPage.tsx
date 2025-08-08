import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SeniorProfileHeader from "@/components/profile/SeniorProfileHeader"; // Using the senior header
import Footer from "@/components/layout/Footer"; // Using the main footer

const faqData = [
  {
    id: "item-1",
    question: "How will I be connected to Juniors?",
    answer: "You won't need to initiate the connection. Juniors will see your profile in their 'Connect with Seniors' section and will reach out to you directly via the contact information you've provided.",
  },
  {
    id: "item-2",
    question: "Through what means will juniors contact me?",
    answer: "Juniors will be able to see the contact details you've shared on your profile, such as your email or phone number. They will use that information to initiate the connection.",
  },
  {
    id: "item-3",
    question: "What do Juniors expect from me?",
    answer: "Mostly, juniors will ask about the admission process, document verification, hostel bookings, and general campus life. Occasionally, they may ask for other advice or help.",
  },
  {
    id: "item-4",
    question: "To what level do I need to help Juniors?",
    answer: "It's completely up to you. We encourage you to help where you can. If you don't know the answer to something, it's perfectly okay to say so or to connect them with another senior who might know.",
  },
];

const SeniorFAQPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SeniorProfileHeader />
      <main className="flex-grow container py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-foreground">
            Frequently Asked Questions (Senior)
          </h1>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqData.map((item) => (
              <AccordionItem key={item.id} value={item.id} className="border rounded-lg bg-card">
                <AccordionTrigger className="p-6 text-left font-semibold hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="p-6 pt-0 text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SeniorFAQPage;