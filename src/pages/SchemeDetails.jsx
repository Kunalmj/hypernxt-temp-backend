import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import SchemeApplyModal from "../components/homepage/SchemeApplyModal";

const SchemeDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const scheme = state?.scheme;
  
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (scheme) {
      const saved = JSON.parse(localStorage.getItem("savedSchemes") || "[]");
      setIsSaved(saved.includes(scheme.title));
    }
  }, [scheme]);

  const handleSave = () => {
    const saved = JSON.parse(localStorage.getItem("savedSchemes") || "[]");
    let newSaved;
    if (isSaved) {
      newSaved = saved.filter(s => s !== scheme.title);
    } else {
      newSaved = [...saved, scheme.title];
    }
    localStorage.setItem("savedSchemes", JSON.stringify(newSaved));
    setIsSaved(!isSaved);
  };

  const handleShare = async () => {
    const shareData = {
      title: scheme.title,
      text: scheme.desc,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!scheme) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Scheme Not Found</h2>
          <button 
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans pb-20">
      {/* Modal */}
      {showApplyModal && (
        <SchemeApplyModal 
          schemeName={scheme.title} 
          onClose={() => setShowApplyModal(false)} 
        />
      )}

      {/* Dark Header Section */}
      <div className="bg-[#0f172a] text-white pt-16 pb-24 px-6 relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 opacity-5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 opacity-5 rounded-full -ml-10 -mb-10 blur-2xl"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-blue-100 hover:text-white transition-colors mb-6 text-sm font-medium group"
          >
            <span className="transition-transform group-hover:-translate-x-1">←</span> Back to Schemes
          </button>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-extrabold mb-3 tracking-tight leading-tight">
                {scheme.title}
              </h1>
              <p className="text-lg text-blue-100 font-medium opacity-90 mb-4">
                {scheme.ministry || "Ministry of Health and Family Welfare"}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {scheme.tags?.map((tag, idx) => (
                  <span key={idx} className="px-3 py-1 bg-white/5 rounded-md text-xs font-medium border border-white/10 text-slate-300 backdrop-blur-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-xl">
              <div className="relative w-16 h-16 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 36 36">
                  <path
                    className="text-white/20"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-blue-400"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeDasharray="95, 100"
                    strokeLinecap="round"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span className="absolute text-sm font-bold">95%</span>
              </div>
              <div>
                <p className="text-[0.7rem] uppercase font-bold tracking-wider text-blue-200">Match Score</p>
                <p className="text-sm font-bold">Recommended for You</p>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Main Content & Sidebar */}
      <div className="max-w-6xl mx-auto px-6 -mt-12 flex flex-col lg:flex-row gap-8 relative z-20">
        
        {/* Main Column */}
        <div className="flex-1 space-y-6">
          
          {/* Overview Card */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden transition-all hover:shadow-md">
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h2 className="text-xl font-bold text-slate-800">Overview</h2>
              </div>
              <p className="text-slate-600 leading-relaxed">
                {scheme.desc || "The scheme aims to provide comprehensive health coverage to citizens across the country. It focuses on ensuring that no citizen faces financial hardship due to medical emergencies. Through a network of empanelled hospitals, beneficiaries can access quality healthcare services without worry."}
              </p>
              <p className="text-slate-600 leading-relaxed mt-4">
                It specifically targets vulnerable sections of society, providing a safety net for those who need it most. The scheme covers a wide range of secondary and tertiary care procedures, including pre and post-hospitalisation expenses.
              </p>
            </div>
          </section>

          {/* Eligibility Card */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden transition-all hover:shadow-md">
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h2 className="text-xl font-bold text-slate-800">Eligibility Criteria</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Target Beneficiaries</h3>
                  <ul className="space-y-3">
                    {["Low-income families", "Vulnerable occupational groups", "Rural households", "Identified urban clusters"].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 group">
                        <span className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xs mt-0.5 group-hover:bg-blue-600 group-hover:text-white transition-colors"></span>
                        <span className="text-slate-600 text-sm font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Requirements</h3>
                  <ul className="space-y-3">
                    {["Must be a resident of India", "Income must be below specified limit", "Not covered by other private insurance", "Possession of valid identity documents"].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 group">
                        <span className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xs mt-0.5 group-hover:bg-blue-600 group-hover:text-white transition-colors">!</span>
                        <span className="text-slate-600 text-sm font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Benefits Card */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden transition-all hover:shadow-md">
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h2 className="text-xl font-bold text-slate-800">Benefits & Coverage</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { title: "Financial Cover", value: scheme.benefit || "₹5 Lakhs/year", color: "blue" },
                  { title: "Network Hospitals", value: "25,000+", color: "blue" },
                  { title: "Family Size", value: "No Limit", color: "blue" }
                ].map((stat, idx) => (
                  <div key={idx} className={`bg-${stat.color}-50 p-5 rounded-2xl border border-${stat.color}-100 transition-transform hover:scale-[1.02]`}>
                    <p className={`text-xs font-bold text-${stat.color}-500 uppercase tracking-wider mb-1`}>{stat.title}</p>
                    <p className={`text-lg font-extrabold text-${stat.color}-700`}>{stat.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-bold text-slate-700 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                    What's Covered
                  </h4>
                  <ul className="space-y-2">
                    {["Pre-hospitalisation expenses", "In-patient hospitalisation", "Diagnostic tests \u0026 medication", "Post-hospitalisation follow-ups"].map((item, i) => (
                      <li key={i} className="text-sm text-slate-600 flex items-center gap-2">
                        <span className="w-1 h-1 bg-slate-400 rounded-full"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-bold text-slate-700 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                    Additional Benefits
                  </h4>
                  <ul className="space-y-2">
                    {["Cashless treatment", "Paperless processing", "Portability across India", "Helpline assistance 24/7"].map((item, i) => (
                      <li key={i} className="text-sm text-slate-600 flex items-center gap-2">
                        <span className="w-1 h-1 bg-slate-400 rounded-full"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Application Process Card */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden transition-all hover:shadow-md">
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>
                </div>
                <h2 className="text-xl font-bold text-slate-800">How to Apply</h2>
              </div>

              <div className="relative space-y-8 pl-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                {[
                  { step: "1", title: "Check Eligibility", desc: "Visit the official portal to check if your family is listed in the SECC database." },
                  { step: "2", title: "Identify Document", desc: "Gather your Aadhaar Card, Ration Card, or any valid government photo ID." },
                  { step: "3", title: "Visit Hospital", desc: "Contact the Pradhan Mantri Arogya Mitra at any empanelled hospital for help." },
                  { step: "4", title: "Verification", desc: "The hospital will verify your documents and register you for treatment." }
                ].map((item, idx) => (
                  <div key={idx} className="relative group">
                    <div className="absolute -left-8 top-0 w-6 h-6 bg-white border-2 border-blue-600 rounded-full flex items-center justify-center text-xs font-bold text-blue-600 z-10 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 mb-1">{item.title}</h4>
                      <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Frequently Asked Questions */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden transition-all hover:shadow-md">
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h2 className="text-xl font-bold text-slate-800">Frequently Asked Questions</h2>
              </div>

              <div className="space-y-4">
                {[
                  { q: "Is there any income limit for this scheme?", a: "Yes, the family income should not exceed the specified limit which varies by state and beneficiary category. Please check the official portal for exact figures." },
                  { q: "Can I apply for this if I already have private insurance?", a: "Generally, if you have comprehensive private insurance, you might not be eligible. However, some schemes allow for dual coverage up to certain limits." },
                  { q: "What is the processing time for the application?", a: "Typically, applications are processed within 15-30 working days once all documents are verified by the nodal agency." }
                ].map((faq, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                    <h4 className="font-bold text-slate-800 mb-2 flex items-start gap-2 text-sm md:text-base">
                      <span className="text-blue-600 font-black">Q.</span>
                      {faq.q}
                    </h4>
                    <p className="text-sm text-slate-500 pl-6 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

        </div>

        {/* Sidebar Column */}
        <div className="lg:w-80 space-y-6">
          
          {/* Main Action Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden top-24">
            <div className="p-6 space-y-6">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Benefit Value</p>
                <p className="text-2xl font-black text-blue-600">{scheme.benefit || "₹5,00,000"}</p>
                <p className="text-sm text-slate-500">Per Family / Per Year</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span>Deadline: <span className="font-bold text-slate-800">{scheme.deadline || "Open"}</span></span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                  <span>Region: <span className="font-bold text-slate-800">{scheme.state || "Pan India"}</span></span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <button 
                  onClick={() => navigate("/citizen-apply", { state: { scheme: scheme } })}
                  className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl shadow-md shadow-blue-200 hover:bg-blue-700 hover:-translate-y-0.5 transition-all active:scale-95 text-center flex items-center justify-center gap-1.5"
                >
                  Apply Now
                </button>
                {scheme.website && scheme.website !== "#" && (
                  <a 
                    href={scheme.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-sm shadow-sm hover:-translate-y-0.5"
                  >
                    <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    Visit Official Website
                  </a>
                )}
              </div>

              <div className="flex gap-2 pt-2 border-t border-slate-100">
                <button 
                  onClick={handleSave}
                  className={`flex-1 py-2 text-xs font-bold flex items-center justify-center gap-1.5 rounded-lg transition-colors ${
                    isSaved ? "bg-red-50 text-red-600 hover:bg-red-100" : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <svg className="w-4 h-4" fill={isSaved ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  {isSaved ? "Saved" : "Save"}
                </button>
                <button 
                  onClick={handleShare}
                  className="flex-1 py-2 text-xs font-bold text-slate-600 flex items-center justify-center gap-1.5 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Share
                </button>
              </div>
            </div>


          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              Contact Support
            </h3>
            <div className="space-y-4">
              <div className="group">
                <p className="text-[0.7rem] uppercase font-bold text-slate-400 mb-0.5">National Helpline</p>
                <p className="text-sm font-bold text-slate-700 group-hover:text-blue-600 transition-colors">14555</p>
              </div>
              <div className="group">
                <p className="text-[0.7rem] uppercase font-bold text-slate-400 mb-0.5">Email Address</p>
                <p className="text-sm font-bold text-slate-700 group-hover:text-blue-600 transition-colors">pmjay@nha.gov.in</p>
              </div>
              <div className="group">
                <p className="text-[0.7rem] uppercase font-bold text-slate-400 mb-0.5">Headquarters</p>
                <p className="text-sm font-bold text-slate-700 leading-snug">National Health Authority, 7th Floor, Tower-L, Connaught Place, New Delhi</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default SchemeDetails;
