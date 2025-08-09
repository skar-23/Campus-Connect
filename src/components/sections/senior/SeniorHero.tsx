import React from "react";

const SeniorHero: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center md:text-left space-y-7">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Empower the Next Generation
              <span className="block bg-gradient-to-r from-blue-500 to-green-600 bg-clip-text text-transparent">
                Share Your Experience
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-xl mx-auto md:mx-0 leading-relaxed">
              Guide juniors, make a difference, and build a legacy of mentorship
              in your campus community.
            </p>
            <div className="hidden md:block mt-8">
              <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-green-400 rounded-full mx-0 md:mx-0"></div>
            </div>
          </div>

          {/* Visual: Simple Ring with Quote */}
          <div className="flex justify-center relative">
            <div className="relative flex items-center justify-center">
              <svg
                width="320"
                height="320"
                viewBox="0 0 320 320"
                className="absolute"
              >
                <circle
                  cx="160"
                  cy="160"
                  r="140"
                  stroke="url(#ringGradient)"
                  strokeWidth="22"
                  fill="none"
                />
                <defs>
                  <linearGradient
                    id="ringGradient"
                    x1="0"
                    y1="0"
                    x2="320"
                    y2="320"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#38bdf8" />
                    <stop offset="1" stopColor="#22d3ee" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="w-72 h-72 rounded-full flex items-center justify-center bg-white shadow-xl border-4 border-white relative z-10">
                <div className="text-center px-8">
                  <p className="text-xl italic text-blue-700 font-semibold">
                    “Mentoring is about inspiring growth, sharing wisdom, and
                    making a real impact.”
                  </p>
                </div>
              </div>
              {/* Decorative dots */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-200 rounded-full opacity-50"></div>
              <div className="absolute -bottom-6 -left-6 w-6 h-6 bg-green-200 rounded-full opacity-50"></div>
            </div>
          </div>
        </div>
      </div>
      {/* Subtle background gradient blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-blue-100 via-white to-green-100 rounded-full opacity-30 blur-3xl pointer-events-none"></div>
    </section>
  );
};

export default SeniorHero;