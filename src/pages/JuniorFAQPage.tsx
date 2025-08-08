import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import InfoPageLayout from "@/components/layout/InfoPageLayout"; // Import our new layout

const faqData = [
  {
    id: "item-1",
    question: "How can I connect with my Seniors?",
    answer: "Open the 'Connect With Senior' section, select any senior from the list, and use the 'Contact Senior' button to send them an email. You can also call them directly if they have provided their phone number.",
  },
  {
    id: "item-2",
    question: "What documents are needed for the Admission Process?",
    answer: "The exact list of documents can vary. The best way to get accurate information is to connect with a senior who has recently gone through the process. They can provide the most up-to-date requirements.",
  },
  {
    id: "item-3",
    question: "In what cases can I seek help from seniors?",
    answer: "You can ask for help with anything related to the admission process, document verification, finding accommodation, understanding campus life, or any other challenges you face as a new student.",
  },
];

const JuniorFAQPage: React.FC = () => {
  return (
    <InfoPageLayout title="Frequently Asked Questions (FAQ)">
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
    </InfoPageLayout>
  );
};

export default JuniorFAQPage;