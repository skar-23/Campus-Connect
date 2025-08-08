import React from "react";
import InfoPageLayout from "@/components/layout/InfoPageLayout"; // Import our reusable layout
import { Card, CardContent } from "@/components/ui/card"; // Import the Card component

const JuniorTermsPage: React.FC = () => {
  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <InfoPageLayout title="Terms & Conditions">
      <Card>
        <CardContent className="p-8 prose prose-stone dark:prose-invert max-w-none">
          <p className="text-sm text-muted-foreground">Last updated: {currentDate}</p>
          
          <section>
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using this website (the "Site"), you agree to be bound by these Terms and Conditions (the "Terms"). 
              If you do not agree to these Terms, please do not use the Site.
            </p>
          </section>
          
          <section>
            <h2>2. Description of Service</h2>
            <p>
              The Site is designed to connect incoming juniors with seniors from the same college. The purpose is to assist 
              juniors with admission procedures, acclimatization to local conditions, and to bridge the gap between differing 
              cultural or regional backgrounds.
            </p>
          </section>
          
          <section>
            <h2>3. User Eligibility</h2>
            <p>
              The Site is intended for users who are either incoming juniors or current seniors of the college.
              By registering or using the Site, you represent that you are of legal age to form a binding contract 
              under applicable law.
            </p>
          </section>
          
          <section>
            <h2>4. User Obligations and Conduct</h2>
            <ul>
              <li>
                <strong>Accuracy of Information:</strong> You agree to provide accurate, current, 
                and complete information during registration and when using the Site.
              </li>
              <li>
                <strong>Respectful Communication:</strong> Users must interact respectfully. 
                Harassment, abuse, or any form of misbehavior is strictly prohibited.
              </li>
              <li>
                <strong>Resolution of Disputes:</strong> Any disputes between users 
                (whether between juniors and seniors or vice versa) must be resolved between the parties involved. 
                The Site does not mediate or resolve user disputes.
              </li>
            </ul>
          </section>
          
          {/* ... You can continue this structure for all other sections ... */}

          <section>
            <h2>Contact Information</h2>
            <p>
              For any questions or concerns about these Terms, please write to us at{' '}
              <a href="mailto:stdntpartner@gmail.com" className="text-accent hover:underline">
                stdntpartner@gmail.com
              </a>
            </p>
          </section>
        </CardContent>
      </Card>
    </InfoPageLayout>
  );
};

export default JuniorTermsPage;