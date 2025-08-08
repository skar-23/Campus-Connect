import React from "react";
import SeniorInfoPageLayout from "@/components/layout/SeniorInfoPageLayout"; // Import our new senior layout
import { Card, CardContent } from "@/components/ui/card"; // Import the Card component

const SeniorTermsPage: React.FC = () => {
  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <SeniorInfoPageLayout title="Terms & Conditions">
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

          {/* The rest of your terms and conditions sections would go here, following the same pattern */}
          
          <section>
            <h2>10. Termination</h2>
            <ul>
                <li>The Site reserves the right to terminate or suspend your access to the Site at its sole discretion, without notice, for conduct that violates these Terms or is harmful to other users or the Site's operations.</li>
                <li>Termination does not relieve you of any obligations incurred prior to termination.</li>
                <li>Seniors must follow the College code of conduct for Anti-Ragging. If any junior files Anti-Ragging charges against you, this site is not responsible. You are responsible for any penalty laid on you by the College Management. Not following Anti-Ragging rules will terminate you from the site.</li>
            </ul>
          </section>

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
    </SeniorInfoPageLayout>
  );
};

export default SeniorTermsPage;