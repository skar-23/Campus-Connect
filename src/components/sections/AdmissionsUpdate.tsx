import React from "react";

const admissionLinks = [
  {
    name: "B.Tech Admission Brochure 2025",
    url: "https://www.nitj.ac.in/nitj_files/links/BTech_Admission_Brochure_2025.pdf",
  },
  {
    name: "Fee Structure 2025",
    url: "https://www.nitj.ac.in/nitj_files/links/Fee_Structure_2025.pdf",
  },
  {
    name: "Important Dates",
    url: "https://www.nitj.ac.in/nitj_files/links/Important_Dates_2025.pdf",
  },
  // Add more links as needed from the official page
];

const AdmissionsUpdate: React.FC = () => (
  <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 rounded-2xl shadow-2xl p-10 my-12 border border-purple-100">
    <div className="flex items-center gap-4 mb-6">
      <img
        src="https://www.nitj.ac.in/images/logo.png"
        alt="NITJ Logo"
        className="w-14 h-14 rounded-full border-2 border-purple-300 shadow"
      />
      <h2 className="text-4xl font-extrabold text-purple-700 tracking-tight drop-shadow">
        NITJ Admissions 2025
      </h2>
    </div>
    <div className="mb-6">
      <span className="inline-block bg-gradient-to-r from-pink-400 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow">
        For Juniors & Seniors
      </span>
    </div>
    <p className="mb-6 text-lg text-gray-700 leading-relaxed">
      <span className="font-semibold text-purple-700">Welcome, future NITJians!</span> Here’s a quick, student-friendly guide for both seniors and juniors about the <b>upcoming 2025 admissions</b> process. We’ve simplified the steps and provided all the important documents you’ll need below.
    </p>
    <div className="grid md:grid-cols-2 gap-8 mb-8">
      <div>
        <h3 className="text-xl font-bold text-pink-600 mb-3 flex items-center gap-2">
          <span className="material-icons text-purple-500">school</span>
          Step-by-Step Process
        </h3>
        <ol className="list-decimal ml-6 text-base text-gray-800 space-y-2">
          <li>
            <span className="font-semibold">Visit the official NITJ admissions portal</span> for the latest updates and announcements.
          </li>
          <li>
            Download and read the <span className="font-semibold">Admission Brochure</span> for eligibility, process, and required documents.
          </li>
          <li>
            Note the <span className="font-semibold">important dates</span> for application, counseling, and document verification.
          </li>
          <li>
            Review the <span className="font-semibold">fee structure</span> and prepare the necessary payments.
          </li>
          <li>
            For detailed steps, visit the official page below.
          </li>
        </ol>
      </div>
      <div>
        <h3 className="text-xl font-bold text-blue-600 mb-3 flex items-center gap-2">
          <span className="material-icons text-pink-500">cloud_download</span>
          Quick Downloads
        </h3>
        <ul className="list-none space-y-3">
          {admissionLinks.map((link) => (
            <li key={link.url} className="flex items-center gap-2">
              <span className="material-icons text-purple-400">attach_file</span>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 underline hover:text-purple-700 font-medium transition"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
    <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
      <a
        href="https://www.nitj.ac.in/admissions/index.html#btech"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-lg font-bold shadow-lg hover:from-pink-600 hover:to-purple-700 transition text-lg"
      >
        Go to Official NITJ Admissions Page
      </a>
      <span className="text-gray-400 text-sm">Reference: Official NITJ website</span>
    </div>
    <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded shadow-inner mt-8">
      <p className="text-purple-800 font-medium">
        <span className="material-icons align-middle mr-2 text-pink-500">info</span>
        For any doubts, reach out to the admissions office or connect with seniors for guidance!
      </p>
    </div>
  </div>
);

export default AdmissionsUpdate;