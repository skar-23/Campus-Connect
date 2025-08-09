import React from "react";
import SeniorNavbar from "@/components/layout/SeniorNavbar";
import SeniorHero from "@/components/sections/senior/SeniorHero";
import SeniorFAQ from "@/components/sections/senior/SeniorFAQ";
import Footer from "@/components/layout/Footer";

// Animated Senior Impact Cards Section
const SeniorImpactSection: React.FC = () => (
  <section
    id="senior-role"
    className="py-24 px-4 sm:px-6 lg:px-8 bg-white/80 transition-all duration-700"
  >
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-500 to-green-600 bg-clip-text text-transparent">
        How Seniors Make a Difference
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Card 1 */}
        <div className="bg-white rounded-2xl shadow-xl p-10 flex flex-col items-center border-t-4 border-blue-400 group hover:-translate-y-3 hover:shadow-2xl transition-all duration-500 ease-in-out animate-fade-in-up delay-100">
          <div className="mb-6 animate-bounce-slow">
            <svg width="56" height="56" fill="none" viewBox="0 0 56 56">
              <circle cx="28" cy="28" r="26" fill="#e0f2fe" />
              <path d="M18 38v-2a8 8 0 0116 0v2" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="28" cy="24" r="5" stroke="#38bdf8" strokeWidth="2.5"/>
            </svg>
          </div>
          <h3 className="text-2xl font-semibold text-blue-700 mb-3 text-center">Guiding Juniors</h3>
          <p className="text-gray-600 text-center text-lg">
            Seniors provide direction and clarity to juniors, helping them navigate academic and campus life with confidence.
          </p>
        </div>
        {/* Card 2 */}
        <div className="bg-white rounded-2xl shadow-xl p-10 flex flex-col items-center border-t-4 border-green-400 group hover:-translate-y-3 hover:shadow-2xl transition-all duration-500 ease-in-out animate-fade-in-up delay-300">
          <div className="mb-6 animate-bounce-slow">
            <svg width="56" height="56" fill="none" viewBox="0 0 56 56">
              <circle cx="28" cy="28" r="26" fill="#d1fae5" />
              <path d="M18 34l10 10 10-10" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M28 44V14" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </div>
          <h3 className="text-2xl font-semibold text-green-700 mb-3 text-center">Sharing Experience</h3>
          <p className="text-gray-600 text-center text-lg">
            By sharing real experiences, seniors help juniors avoid common pitfalls and make informed decisions.
          </p>
        </div>
        {/* Card 3 */}
        <div className="bg-white rounded-2xl shadow-xl p-10 flex flex-col items-center border-t-4 border-blue-400 group hover:-translate-y-3 hover:shadow-2xl transition-all duration-500 ease-in-out animate-fade-in-up delay-500">
          <div className="mb-6 animate-bounce-slow">
            <svg width="56" height="56" fill="none" viewBox="0 0 56 56">
              <circle cx="28" cy="28" r="26" fill="#e0f2fe" />
              <path d="M18 28h20M28 18v20" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </div>
          <h3 className="text-2xl font-semibold text-blue-700 mb-3 text-center">Building Community</h3>
          <p className="text-gray-600 text-center text-lg">
            Seniors foster a supportive environment, encouraging collaboration and a sense of belonging for all juniors.
          </p>
        </div>
      </div>
    </div>
    {/* Animations */}
    <style>
      {`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(40px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s cubic-bezier(.4,0,.2,1) both;
        }
        .delay-100 { animation-delay: .1s; }
        .delay-300 { animation-delay: .3s; }
        .delay-500 { animation-delay: .5s; }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0);}
          50% { transform: translateY(-10px);}
        }
        .animate-bounce-slow {
          animation: bounce-slow 2.5s infinite;
        }
      `}
    </style>
  </section>
);

const SeniorHomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <SeniorNavbar />
      <main className="pt-20">
        <section id="senior-hero">
          <SeniorHero />
        </section>
        <SeniorImpactSection />
        <section id="senior-faq">
          <SeniorFAQ />
        </section>
        {/* "Still have questions" section has been removed */}
      </main>
      <Footer />
    </div>
  );
};

export default SeniorHomePage;