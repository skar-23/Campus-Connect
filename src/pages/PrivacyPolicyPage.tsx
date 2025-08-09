import React from "react";
import { GraduationCap, ShieldCheck, Users, User } from "lucide-react";

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12 px-2">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-purple-100">
        <div className="flex flex-col items-center mb-10">
          <GraduationCap className="h-12 w-12 text-pink-500 mb-2" />
          <h1 className="text-4xl font-extrabold text-center text-purple-700 mb-2">
            Privacy Policy & Terms and Conditions
          </h1>
          <p className="text-gray-700 mb-4 text-center max-w-2xl">
            Welcome to Campus Connect. Please read these terms and conditions carefully. By using our platform, you agree to abide by all the rules and policies outlined below. These terms are designed to ensure a safe, respectful, and supportive environment for all users.
          </p>
          <ShieldCheck className="h-8 w-8 text-purple-400" />
        </div>

        <div className="mb-12">
          <div className="flex items-center gap-2 mb-2">
            <User className="h-6 w-6 text-pink-500" />
            <h2 className="text-2xl font-semibold text-pink-600">For Juniors</h2>
          </div>
          <ul className="list-disc ml-8 space-y-3 text-gray-800 text-base">
            <li>
              <strong>Respect & Conduct:</strong> Treat all seniors and fellow juniors with respect. Any form of harassment, bullying, or inappropriate behavior will not be tolerated.
            </li>
            <li>
              <strong>Reporting Issues:</strong> If you experience or witness any misbehavior, harassment, or feel uncomfortable at any time, please use the report feature or contact us immediately. We will take necessary action, including investigation and possible removal of the offending user.
            </li>
            <li>
              <strong>Personal Information:</strong> Do not share sensitive personal information (such as passwords, financial details, or home address) with anyone on the platform.
            </li>
            <li>
              <strong>Authenticity:</strong> Use your real identity and provide accurate information during registration and interactions.
            </li>
            <li>
              <strong>Platform Use:</strong> Use Campus Connect only for its intended purpose: connecting with seniors for guidance, mentorship, and support.
            </li>
            <li>
              <strong>Responsibility:</strong> You are responsible for your interactions. We are not liable for any offline meetings or exchanges that occur outside the platform.
            </li>
            <li>
              <strong>Content:</strong> Do not post or share any offensive, illegal, or inappropriate content.
            </li>
            <li>
              <strong>Account Security:</strong> Keep your login credentials secure. Report any suspicious activity immediately.
            </li>
            <li>
              <strong>Disclaimer:</strong> Campus Connect is not responsible for any loss, damage, or harm resulting from your use of the platform or interactions with other users.
            </li>
          </ul>
        </div>

        <div className="mb-12">
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-6 w-6 text-purple-600" />
            <h2 className="text-2xl font-semibold text-purple-600">For Seniors</h2>
          </div>
          <ul className="list-disc ml-8 space-y-3 text-gray-800 text-base">
            <li>
              <strong>Mentorship & Conduct:</strong> Guide juniors with integrity, patience, and respect. Any form of harassment, discrimination, or inappropriate behavior will result in immediate action.
            </li>
            <li>
              <strong>Boundaries:</strong> Maintain professional boundaries. Do not request or share personal or sensitive information unnecessarily.
            </li>
            <li>
              <strong>Reporting Issues:</strong> If a junior or another user behaves inappropriately, please report the incident. We will review and take necessary action.
            </li>
            <li>
              <strong>Content Sharing:</strong> Share only helpful, relevant, and appropriate information. Do not post or distribute offensive or illegal content.
            </li>
            <li>
              <strong>Platform Use:</strong> Use Campus Connect solely for mentorship, guidance, and community support.
            </li>
            <li>
              <strong>Responsibility:</strong> You are responsible for your interactions. We are not liable for any offline meetings or exchanges that occur outside the platform.
            </li>
            <li>
              <strong>Account Security:</strong> Protect your account credentials and report any suspicious activity.
            </li>
            <li>
              <strong>Disclaimer:</strong> Campus Connect is not responsible for any loss, damage, or harm resulting from your use of the platform or interactions with other users.
            </li>
          </ul>
        </div>

        <div className="mb-12">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="h-6 w-6 text-gray-700" />
            <h2 className="text-2xl font-semibold text-gray-700">General Terms</h2>
          </div>
          <ul className="list-disc ml-8 space-y-3 text-gray-800 text-base">
            <li>
              <strong>Zero Tolerance Policy:</strong> We have zero tolerance for harassment, abuse, or any form of discrimination.
            </li>
            <li>
              <strong>Reporting & Action:</strong> All reports are taken seriously. We reserve the right to suspend or remove any user who violates these terms.
            </li>
            <li>
              <strong>Data Privacy:</strong> We respect your privacy and do not share your personal data with third parties except as required by law.
            </li>
            <li>
              <strong>Platform Changes:</strong> We may update these terms at any time. Continued use of the platform means you accept the updated terms.
            </li>
            <li>
              <strong>Liability:</strong> Campus Connect is a facilitator for connections and is not responsible for the actions of individual users.
            </li>
          </ul>
        </div>

        <div className="text-center text-gray-500 text-sm mt-8">
          If you have any questions or concerns about these terms, please contact us at{" "}
          <a href="mailto:hello@campusconnect.com" className="text-pink-600 underline">
            hello@campusconnect.com
          </a>
          .
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;