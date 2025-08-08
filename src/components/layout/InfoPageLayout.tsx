import React from 'react';
import ProfileHeader from '@/components/profile/ProfileHeader';
import Footer from '@/components/layout/Footer';

interface InfoPageLayoutProps {
  title: string;
  children: React.ReactNode;
}

const InfoPageLayout: React.FC<InfoPageLayoutProps> = ({ title, children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <ProfileHeader />
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

export default InfoPageLayout;