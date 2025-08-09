import React from "react";
import { GraduationCap, Lightbulb, AlertTriangle, Users } from "lucide-react";

const AboutIdeaPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12 px-2">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-purple-100">
        <div className="flex flex-col items-center mb-10">
          <GraduationCap className="h-12 w-12 text-pink-500 mb-2" />
          <h1 className="text-4xl font-extrabold text-center text-purple-700 mb-2">
            The Idea Behind Campus Connect
          </h1>
          <p className="text-gray-700 mb-4 text-center max-w-2xl">
            Discover why we built Campus Connect and the real problems we faced as students during admissions.
          </p>
          <Lightbulb className="h-8 w-8 text-yellow-400" />
        </div>

        <div className="mb-12">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="h-6 w-6 text-pink-500" />
            <h2 className="text-2xl font-semibold text-pink-600">Our Inspiration</h2>
          </div>
          <p className="text-gray-800 text-base ml-8">
            Campus Connect was born from our own struggles and confusion during the college admission process. We realized that every year, thousands of students face the same challenges—lack of clear guidance, fear of missing important deadlines, and the anxiety of stepping into a new environment without support. We wanted to create a platform where juniors and seniors could connect, share experiences, and make the transition to college life smoother and friendlier for everyone.
          </p>
        </div>

        <div className="mb-12">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-6 w-6 text-yellow-500" />
            <h2 className="text-2xl font-semibold text-yellow-600">Problems We Faced During Admissions</h2>
          </div>
          <ul className="list-disc ml-8 space-y-3 text-gray-800 text-base">
            <li>
              <strong>Lack of Reliable Information:</strong> Official websites were often confusing or outdated, and it was hard to find accurate details about the admission process, required documents, and deadlines.
            </li>
            <li>
              <strong>No Direct Guidance:</strong> We didn’t know any seniors personally, so we missed out on practical tips and real-life advice that could have saved us time and stress.
            </li>
            <li>
              <strong>Fear of Missing Out:</strong> With so many forms, notices, and updates, it was easy to overlook something important and risk losing our seat or facing unnecessary hurdles.
            </li>
            <li>
              <strong>Feeling Alone:</strong> The transition to college felt overwhelming, and not having a support system made it harder to adjust and feel confident.
            </li>
            <li>
              <strong>Communication Gaps:</strong> There was no easy way to ask questions or get quick help from someone who had already been through the process.
            </li>
          </ul>
        </div>

        <div className="mb-12">
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-6 w-6 text-purple-600" />
            <h2 className="text-2xl font-semibold text-purple-600">How Campus Connect Helps</h2>
          </div>
          <ul className="list-disc ml-8 space-y-3 text-gray-800 text-base">
            <li>
              <strong>Direct Senior Guidance:</strong> Juniors can connect with seniors for real, practical advice and mentorship.
            </li>
            <li>
              <strong>Centralized Updates:</strong> All important admission updates, documents, and deadlines are shared in one place.
            </li>
            <li>
              <strong>Community Support:</strong> No one has to feel alone—our platform encourages friendship, support, and positive interactions.
            </li>
            <li>
              <strong>Safe & Respectful Environment:</strong> We have clear rules and reporting features to ensure everyone feels safe and respected.
            </li>
          </ul>
        </div>

        <div className="text-center text-gray-500 text-sm mt-8">
          Campus Connect is built by students, for students. We hope it makes your journey smoother, happier, and more connected!
        </div>
      </div>
    </div>
  );
};

export default AboutIdeaPage;