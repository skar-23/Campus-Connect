import React from 'react';
// This was the problem. It should be SeniorProfileHeader.
import SeniorProfileHeader from '@/components/profile/SeniorProfileHeader'; 
import Footer from '@/components/layout/Footer';

interface SeniorInfoPageLayoutProps {
  title: string;
  children: React.ReactNode;
}

const SeniorInfoPageLayout: React.FC<SeniorInfoPageLayoutProps> = ({ title, children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Now it uses the correct header for seniors */}
      <SeniorProfileHeader /> 
      <main className="flex-grow container py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-foreground">{title}</h1>
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SeniorInfoPageLayout;