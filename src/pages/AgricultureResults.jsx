import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { agricultureSchemes as mockSchemes } from "../data/agricultureData";
// import RequestServiceModal from "./RequestServiceModal";

import RequestServiceModal from "../components/homepage/RequestServiceModal";

const AgricultureResults = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState(null);
  const [showModal, setShowModal] = useState(false);
const [selectedService, setSelectedService] = useState("");

  const query = state?.query || null;

  const { filteredSchemes, isExactMatch } = useMemo(() => {
    if (!query) return { filteredSchemes: mockSchemes, isExactMatch: false };

    const matches = mockSchemes.filter(s => {
      if (query.farmerType && s.farmerType !== "General" && s.farmerType !== query.farmerType) return false;
      if (query.landSize && s.landSize !== "Any" && s.landSize !== query.landSize) return false;
      if (query.state && s.state !== "General" && s.state !== "All India" && s.state !== query.state) return false;
      if (query.support && s.type !== "General" && s.type !== query.support) return false;
      return true;
    });

    if (matches.length > 0) {
      return { filteredSchemes: matches, isExactMatch: true };
    } else {
      return { filteredSchemes: mockSchemes, isExactMatch: false };
    }
  }, [query]);

  const handleNewSearch = () => {
    navigate("/agriculture");
  };

  return (
    <>
  {showModal && (
    <RequestServiceModal
      service={selectedService}
      onClose={() => setShowModal(false)}
    />
  )}
    <div className="min-h-screen bg-[#f8fafc] font-sans pb-20">
      {/* Header section */}
      {/* <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white pt-20 pb-16 px-6"> */}
      <div
  className="relative text-white pt-20 pb-16 px-6 overflow-hidden"
  style={{
    backgroundImage: `
      linear-gradient(rgba(15,23,42,0.82), rgba(30,41,59,0.82)),
      url('/scolarship.png')
    `,
    backgroundSize: "cover",
    backgroundPosition: "center 85%",
    backgroundRepeat: "no-repeat",
  }}
>
        <div className="max-w-5xl mx-auto">
          <button 
            onClick={handleNewSearch}
            className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors mb-8 text-sm font-medium"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to Search
          </button>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Your Agriculture Scheme Matches</h1>
          <p className="text-lg text-blue-100 max-w-2xl opacity-90">
            {isExactMatch 
              ? `We found ${filteredSchemes.length} tailored opportunities based on your farming profile.`
              : "No exact matches found for your highly specific criteria. Showing all available schemes instead."}
          </p>

          {/* Applied Filters Tags */}
          {query && (
            <div className="mt-8 flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-white/10 rounded-md text-sm border border-white/20 backdrop-blur-sm">
                <span className="font-semibold text-white">{query.farmerType || "Any Farmer Type"}</span>
              </span>
              <span className="px-3 py-1 bg-white/10 rounded-md text-sm border border-white/20 backdrop-blur-sm">
                <span className="font-semibold text-white">{query.landSize || "Any Land Size"}</span>
              </span>
              <span className="px-3 py-1 bg-white/10 rounded-md text-sm border border-white/20 backdrop-blur-sm">
                <span className="font-semibold text-white">{query.state || "Any State"}</span>
              </span>
              <span className="px-3 py-1 bg-white/10 rounded-md text-sm border border-white/20 backdrop-blur-sm">
                <span className="font-semibold text-white">{query.support || "Any Support Needed"}</span>
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-5xl mx-auto px-6 mt-6">
        
        {!isExactMatch && query && (
           <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-8 shadow-sm flex items-start gap-4">
              <svg className="w-6 h-6 text-blue-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              <div>
                <h3 className="text-blue-800 font-semibold">No exact matches</h3>
                <p className="text-blue-700 text-sm mt-1">We couldn't find schemes perfectly matching all your criteria. Here are other opportunities you might consider.</p>
              </div>
           </div>
        )}

        <div className="grid gap-6">
          {filteredSchemes.map((s) => (
            <div key={s.id} className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow flex flex-col md:flex-row flex-wrap gap-6 md:items-center">
              
              <div className="flex-1 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider border border-blue-100">
                    {s.amount}
                  </span>
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider border border-blue-100">
                    {s.deadline}
                  </span>
                </div>
                
                <h2 className="text-2xl font-bold text-slate-800">{s.title}</h2>
                <p className="text-sm text-slate-500 font-medium">{s.provider}</p>
                <p className="text-slate-600 text-sm">{s.description}</p>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    {s.state === "General" ? "All India" : s.state}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {s.eligibility}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded text-xs font-medium">
                    {s.type}
                  </span>
                  <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded text-xs font-medium">
                    {s.farmerType === "General" ? "All Farmers" : s.farmerType}
                  </span>
                  <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded text-xs font-medium">
                    {s.landSize === "Any" ? "Any Land Size" : s.landSize}
                  </span>
                  {s.tags?.map((t) => (
                    <span key={t} className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium border border-blue-100">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="md:w-48 flex-shrink-0 flex flex-col gap-3">
                <button 
                  // onClick={() => navigate("/agri-apply", { state: { scheme: s } })}
                  onClick={() => {
  setSelectedService(s.title);
  setShowModal(true);
}}
                  className="w-full py-3 bg-blue-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                  Apply Now
                </button>
                <button 
                  onClick={() => setExpandedId(expandedId === s.id ? null : s.id)}
                  className="w-full py-3 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold rounded-lg transition-colors"
                >
                  {expandedId === s.id ? "Hide Details" : "View Details"}
                </button>
              </div>

              {/* Expandable Details Panel */}
              {expandedId === s.id && (
                <div className="w-full border-t border-slate-100 pt-6 mt-2 animate-fadeIn">

                  {/* Quick Stats Row */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                      <p className="text-xs font-semibold text-blue-500 uppercase tracking-wider mb-1">Financial Benefit</p>
                      <p className="text-base font-bold text-blue-700">{s.amount}</p>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                      <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">Deadline</p>
                      <p className="text-base font-bold text-blue-600">{s.deadline}</p>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                      <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">Scheme Type</p>
                      <p className="text-base font-bold text-blue-700">{s.type}</p>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                      <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">Application Mode</p>
                      <p className="text-sm font-bold text-blue-700">{s.applicationMode || "Online"}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Benefits */}
                    {s.benefits && (
                      <div className="bg-white rounded-xl p-5 border border-slate-200">
                        <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                          <span className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-xs"></span>
                          Benefits & Support
                        </h4>
                        <ul className="space-y-2">
                          {s.benefits.map((b, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 shrink-0"></span>
                              {b}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Documents Required */}
                    {s.documentsRequired && (
                      <div className="bg-white rounded-xl p-5 border border-slate-200">
                        <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                          <span className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-xs"></span>
                          Documents Required
                        </h4>
                        <ul className="space-y-2">
                          {s.documentsRequired.map((d, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 shrink-0"></span>
                              {d}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Selection Process */}
                    <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                      <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                        <span className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-xs"></span>
                        Approval Process
                      </h4>
                      <p className="text-sm text-slate-600 leading-relaxed">{s.selectionProcess || "Document Verification -> Approval"}</p>
                      {s.renewalPolicy && (
                        <div className="mt-4 pt-3 border-t border-slate-200">
                          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Renewal/Disbursement</p>
                          <p className="text-sm text-slate-600">{s.renewalPolicy}</p>
                        </div>
                      )}
                    </div>

                    {/* Important Dates & Contact */}
                    <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                      <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                        <span className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-xs"></span>
                        Important Dates & Contact
                      </h4>
                      {s.importantDates && (
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div>
                            <p className="text-xs text-slate-400 font-medium">Opens</p>
                            <p className="text-sm font-semibold text-slate-700">{s.importantDates.applicationStart}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-400 font-medium">Closes</p>
                            <p className="text-sm font-semibold text-blue-600">{s.importantDates.applicationEnd}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-400 font-medium">Processing</p>
                            <p className="text-sm font-semibold text-slate-700">{s.importantDates.shortlistAnnouncement}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-400 font-medium">Disbursement</p>
                            <p className="text-sm font-semibold text-blue-600">{s.importantDates.disbursement}</p>
                          </div>
                        </div>
                      )}
                      {s.contact && (
                        <div className="pt-3 border-t border-slate-200">
                          <p className="text-sm text-slate-600"> {s.contact.email}</p>
                          <p className="text-sm text-slate-600"> {s.contact.helpline}</p>
                        </div>
                      )}
                    </div>

                  </div>

                  {/* Website Link + Apply CTA */}
                  <div className="mt-5 flex flex-col sm:flex-row items-center gap-3 justify-between bg-gradient-to-r from-blue-50 to-blue-50 rounded-xl p-4 border border-blue-100">
                    <a 
                      href={s.website} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-2 text-sm text-blue-700 hover:text-blue-800 hover:underline transition-all"
                    >
                      <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                      <span className="font-medium">{s.website || "Official website"}</span>
                    </a>
                    <button
                      // onClick={() => navigate("/agri-apply", { state: { scheme: s } })}
                      onClick={() => {
  setSelectedService(s.title);
  setShowModal(true);
}}
                      className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-sm text-sm"
                    >
                      Apply for this Scheme →
                    </button>
                  </div>

                </div>
              )}

            </div>
          ))}
          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(8px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .animate-fadeIn { animation: fadeIn 0.25s ease-out; }
          `}</style>
        </div>
      </div>
    </div>
    </>
  );
  
};

export default AgricultureResults;
