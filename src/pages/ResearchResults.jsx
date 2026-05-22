import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { researchGrants as mockGrants } from "../data/researchData";
import RequestServiceModal from "../components/homepage/RequestServiceModal";

const ResearchResults = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState(null);
  const [showModal, setShowModal] = useState(false);
const [selectedService, setSelectedService] = useState("");

  const query = state?.query || null;

  const { filteredGrants, isExactMatch } = useMemo(() => {
    if (!query) return { filteredGrants: mockGrants, isExactMatch: false };

    const matches = mockGrants.filter(g => {
      if (query.type && g.type !== query.type) return false;
      if (query.field && g.field !== query.field) return false;
      if (query.stage && g.stage !== query.stage) return false;
      if (query.institution && g.institution !== query.institution) return false;
      if (query.funding && g.amount !== query.funding) return false;
      return true;
    });

    if (matches.length > 0) {
      return { filteredGrants: matches, isExactMatch: true };
    } else {
      return { filteredGrants: mockGrants, isExactMatch: false };
    }
  }, [query]);

  const handleNewSearch = () => {
    navigate("/research-grants");
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

          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Your Grant Matches</h1>
          <p className="text-lg text-blue-100 max-w-2xl opacity-90">
            {isExactMatch
              ? `We found ${filteredGrants.length} tailored opportunities based on your research profile.`
              : "No exact matches found for your highly specific criteria. Showing all available grants instead."}
          </p>

          {/* Applied Filters Tags */}
          {query && (
            <div className="mt-8 flex flex-wrap gap-2">
              {[
                query.type && { label: query.type },
                query.field && { label: query.field },
                query.stage && { label: query.stage },
                query.institution && { label: query.institution },
                query.funding && { label: query.funding },
              ].filter(Boolean).map((f, i) => (
                <span key={i} className="px-3 py-1 bg-white/10 rounded-md text-sm border border-white/20 backdrop-blur-sm">
                  <span className="font-semibold text-white">{f.label}</span>
                </span>
              ))}
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
              <p className="text-blue-700 text-sm mt-1">We couldn't find grants perfectly matching all your criteria. Here are other opportunities you might consider.</p>
            </div>
          </div>
        )}

        <div className="grid gap-6">
          {filteredGrants.map((g) => (
            <div key={g.id} className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow flex flex-col md:flex-row flex-wrap gap-6 md:items-center">

              <div className="flex-1 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider border border-blue-100">
                    {g.amount}
                  </span>
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider border border-blue-100">
                    {g.duration}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-slate-800">{g.title}</h2>
                <p className="text-sm text-slate-500 font-medium">{g.agency}</p>
                <p className="text-slate-600 text-sm">{g.description}</p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                    {g.institution}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {g.field}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded text-xs font-medium">{g.type}</span>
                  <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded text-xs font-medium">{g.stage}</span>
                  {g.tags?.map((t) => (
                    <span key={t} className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium border border-blue-100">{t}</span>
                  ))}
                </div>
              </div>

              <div className="md:w-48 flex-shrink-0 flex flex-col gap-3">
                <button
                  // onClick={() => navigate("/research-apply", { state: { grant: g } })}
                  onClick={() => {
  setSelectedService(g.title);
  setShowModal(true);
}}
                  className="w-full py-3 bg-blue-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                  Apply Now
                </button>
                <button
                  onClick={() => setExpandedId(expandedId === g.id ? null : g.id)}
                  className="w-full py-3 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold rounded-lg transition-colors"
                >
                  {expandedId === g.id ? "Hide Details" : "View Details"}
                </button>
              </div>

              {/* Expandable Details Panel */}
              {expandedId === g.id && (
                <div className="w-full border-t border-slate-100 pt-6 mt-2 animate-fadeIn">

                  {/* Quick Stats Row */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                      <p className="text-xs font-semibold text-blue-500 uppercase tracking-wider mb-1">Funding</p>
                      <p className="text-base font-bold text-blue-700">{g.amount}</p>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                      <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">Duration</p>
                      <p className="text-base font-bold text-blue-700">{g.duration}</p>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                      <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">Eligibility</p>
                      <p className="text-sm font-bold text-blue-700">{g.stage}</p>
                    </div>
                    <div className="bg-slate-100 rounded-xl p-4 border border-slate-200">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Mode</p>
                      <p className="text-sm font-bold text-slate-700">{g.applicationMode || "Online"}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Benefits */}
                    {g.benefits && (
                      <div className="bg-white rounded-xl p-5 border border-slate-200">
                        <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                          <span className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-xs"></span>
                          What You Get
                        </h4>
                        <ul className="space-y-2">
                          {g.benefits.map((b, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 shrink-0"></span>
                              {b}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Documents Required */}
                    {g.documentsRequired && (
                      <div className="bg-white rounded-xl p-5 border border-slate-200">
                        <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                          <span className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-xs"></span>
                          Documents Required
                        </h4>
                        <ul className="space-y-2">
                          {g.documentsRequired.map((d, i) => (
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
                        Selection Process
                      </h4>
                      <p className="text-sm text-slate-600 leading-relaxed">{g.selectionProcess || "Proposal Review → Evaluation → Approval"}</p>
                      {g.renewalPolicy && (
                        <div className="mt-4 pt-3 border-t border-slate-200">
                          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Fund Release Policy</p>
                          <p className="text-sm text-slate-600">{g.renewalPolicy}</p>
                        </div>
                      )}
                    </div>

                    {/* Important Dates & Contact */}
                    <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                      <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                        <span className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-xs"></span>
                        Important Dates & Contact
                      </h4>
                      {g.importantDates && (
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div>
                            <p className="text-xs text-slate-400 font-medium">Opens</p>
                            <p className="text-sm font-semibold text-slate-700">{g.importantDates.applicationStart}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-400 font-medium">Closes</p>
                            <p className="text-sm font-semibold text-blue-600">{g.importantDates.applicationEnd}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-400 font-medium">Shortlist</p>
                            <p className="text-sm font-semibold text-slate-700">{g.importantDates.shortlistAnnouncement}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-400 font-medium">Disbursement</p>
                            <p className="text-sm font-semibold text-blue-600">{g.importantDates.disbursement}</p>
                          </div>
                        </div>
                      )}
                      {g.contact && (
                        <div className="pt-3 border-t border-slate-200 space-y-1">
                          <p className="text-sm text-slate-600"> {g.contact.email}</p>
                          <p className="text-sm text-slate-600"> {g.contact.helpline}</p>
                        </div>
                      )}
                    </div>

                  </div>

                  {/* Website Link + Apply CTA */}
                  <div className="mt-5 flex flex-col sm:flex-row items-center gap-3 justify-between bg-gradient-to-r from-blue-50 to-blue-50 rounded-xl p-4 border border-blue-100">
                    <a 
                      href={g.website} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-2 text-sm text-blue-700 hover:text-blue-800 hover:underline transition-all"
                    >
                      <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                      <span className="font-medium">{g.website || "Official portal"}</span>
                    </a>
                    <button
                      // onClick={() => navigate("/research-apply", { state: { grant: g } })}
                      onClick={() => {
  setSelectedService(g.title);
  setShowModal(true);
}}
                      className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-sm text-sm"
                    >
                      Apply for this Grant →
                    </button>
                  </div>

                </div>
              )}

            </div>
          ))}
        </div>

        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn { animation: fadeIn 0.25s ease-out; }
        `}</style>
      </div>
    </div>
    </>
  );
};

export default ResearchResults;
