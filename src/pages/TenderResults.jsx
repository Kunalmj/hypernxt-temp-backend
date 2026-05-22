import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { tenders as mockTenders } from "../data/tenderData";
import RequestServiceModal from "../components/homepage/RequestServiceModal";

const TenderResults = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState(null);
  const [showModal, setShowModal] = useState(false);
const [selectedService, setSelectedService] = useState("");

  const query = state?.query || null;

  const { filteredTenders, isExactMatch } = useMemo(() => {
    if (!query) return { filteredTenders: mockTenders, isExactMatch: false };

    const matches = mockTenders.filter(t => {
      if (query.type && t.type !== query.type) return false;
      if (query.industry && t.industry !== "General" && t.industry !== query.industry) return false;
      if (query.budget && t.budget !== query.budget) return false;
      if (query.location && t.location !== query.location && t.location !== "Pan India" && t.location !== "Multiple Locations") return false;
      if (query.orgType && query.orgType !== "All" && t.orgType !== query.orgType) return false;
      return true;
    });

    if (matches.length > 0) {
      return { filteredTenders: matches, isExactMatch: true };
    } else {
      return { filteredTenders: mockTenders, isExactMatch: false };
    }
  }, [query]);

  return (
    <>
  {showModal && (
    <RequestServiceModal
      service={selectedService}
      onClose={() => setShowModal(false)}
    />
  )}
    <div className="min-h-screen bg-[#f8fafc] font-sans pb-20">
      {/* Header */}
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
            onClick={() => navigate("/tenders")}
            className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors mb-8 text-sm font-medium"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to Search
          </button>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Your Tender & RFP Matches</h1>
          <p className="text-lg text-blue-100 max-w-2xl opacity-90">
            {isExactMatch
              ? `We found ${filteredTenders.length} tailored opportunities based on your business capabilities.`
              : "No exact matches found for your criteria. Showing all available tenders instead."}
          </p>

          {query && (
            <div className="mt-8 flex flex-wrap gap-2">
              {[query.type, query.industry, query.budget, query.location, query.orgType].filter(Boolean).map((f, i) => (
                <span key={i} className="px-3 py-1 bg-white/10 rounded-md text-sm border border-white/20 backdrop-blur-sm font-semibold text-white">
                  {f}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="max-w-5xl mx-auto px-6 mt-6">

        {!isExactMatch && query && (
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-8 shadow-sm flex items-start gap-4">
            <svg className="w-6 h-6 text-blue-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <div>
              <h3 className="text-blue-800 font-semibold">No exact matches</h3>
              <p className="text-blue-700 text-sm mt-1">We couldn't find tenders perfectly matching all your criteria. Here are other opportunities you might consider.</p>
            </div>
          </div>
        )}

        <div className="grid gap-6">
          {filteredTenders.map((t) => (
            <div key={t.id} className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow flex flex-col md:flex-row flex-wrap gap-6 md:items-center">

              <div className="flex-1 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider border border-blue-100">
                    {t.value}
                  </span>
                  <span className="px-3 py-1 bg-blue-50 text-red-700 rounded-full text-xs font-bold uppercase tracking-wider border border-blue-100">
                     {t.deadline}
                  </span>
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider border border-blue-100">
                    EMD: {t.emd}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-slate-800">{t.title}</h2>
                <p className="text-sm text-slate-500 font-medium">{t.org} · <span className="font-mono text-slate-400">{t.tenderId}</span></p>
                <p className="text-slate-600 text-sm">{t.description}</p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    {t.location}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                    {t.orgType}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded text-xs font-medium">{t.type}</span>
                  <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded text-xs font-medium">{t.industry}</span>
                  {t.tags?.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium border border-blue-100">{tag}</span>
                  ))}
                </div>
              </div>

              <div className="md:w-48 flex-shrink-0 flex flex-col gap-3">
                <button
                  // onClick={() => navigate("/tender-apply", { state: { tender: t } })}
                  onClick={() => {
  setSelectedService(t.title);
  setShowModal(true);
}}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-sm"
                >
                  Bid Now
                </button>
                <button
                  onClick={() => setExpandedId(expandedId === t.id ? null : t.id)}
                  className="w-full py-3 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold rounded-lg transition-colors"
                >
                  {expandedId === t.id ? "Hide Details" : "View Details"}
                </button>
              </div>

              {/* Expandable Details Panel */}
              {expandedId === t.id && (
                <div className="w-full border-t border-slate-100 pt-6 mt-2 animate-fadeIn">

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                      <p className="text-xs font-semibold text-blue-500 uppercase tracking-wider mb-1">Contract Value</p>
                      <p className="text-base font-bold text-blue-700">{t.value}</p>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                      <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">Bid Deadline</p>
                      <p className="text-base font-bold text-blue-600">{t.deadline}</p>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                      <p className="text-xs font-semibold text-blue-500 uppercase tracking-wider mb-1">EMD Amount</p>
                      <p className="text-base font-bold text-blue-700">{t.emd}</p>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                      <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">Bid Mode</p>
                      <p className="text-sm font-bold text-blue-700">{t.bidSubmissionMode?.split(" (")[0] || "Online"}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Scope of Work */}
                    {t.scopeOfWork && (
                      <div className="bg-white rounded-xl p-5 border border-slate-200 md:col-span-2">
                        <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                          <span className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-xs"></span>
                          Scope of Work
                        </h4>
                        <p className="text-sm text-slate-600 leading-relaxed">{t.scopeOfWork}</p>
                      </div>
                    )}

                    {/* Eligibility */}
                    {t.eligibility && (
                      <div className="bg-white rounded-xl p-5 border border-slate-200">
                        <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                          <span className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-xs"></span>
                          Eligibility Criteria
                        </h4>
                        <ul className="space-y-2">
                          {t.eligibility.map((e, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 shrink-0"></span>
                              {e}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Documents Required */}
                    {t.documentsRequired && (
                      <div className="bg-white rounded-xl p-5 border border-slate-200">
                        <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                          <span className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-xs"></span>
                          Documents Required
                        </h4>
                        <ul className="space-y-2">
                          {t.documentsRequired.map((d, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 shrink-0"></span>
                              {d}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Important Dates */}
                    {t.importantDates && (
                      <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                        <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                          <span className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-xs"></span>
                          Key Dates
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <p className="text-xs text-slate-400 font-medium">Published</p>
                            <p className="text-sm font-semibold text-slate-700">{t.importantDates.publishDate}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-400 font-medium">Pre-bid Meeting</p>
                            <p className="text-sm font-semibold text-slate-700">{t.importantDates.preSubmissionMeeting}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-400 font-medium">Last Date</p>
                            <p className="text-sm font-semibold text-blue-600">{t.importantDates.lastDateSubmission}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-400 font-medium">Bid Opening</p>
                            <p className="text-sm font-semibold text-blue-600">{t.importantDates.openingDate}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Contact */}
                    {t.contact && (
                      <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                        <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                          <span className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-xs"></span>
                          Contact & Portal
                        </h4>
                        <div className="space-y-2">
                          <p className="text-sm text-slate-600"> {t.contact.email}</p>
                          <p className="text-sm text-slate-600"> {t.contact.helpline}</p>
                          <div className="pt-2 border-t border-slate-200 mt-2">
                            <p className="text-xs text-slate-400 font-medium mb-1">Submission Portal</p>
                            <p className="text-sm font-medium text-blue-600">{t.bidSubmissionMode}</p>
                          </div>
                        </div>
                      </div>
                    )}

                  </div>

                  {/* Tender Portal + Bid CTA */}
                  <div className="mt-5 flex flex-col sm:flex-row items-center gap-3 justify-between bg-gradient-to-r from-blue-50 to-blue-50 rounded-xl p-4 border border-blue-100">
                    <a 
                      href={t.website} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-2 text-sm text-blue-700 hover:text-blue-800 hover:underline transition-all"
                    >
                      <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                      <span className="font-medium">{t.website || "Official tender portal"}</span>
                    </a>
                    <button
                      // onClick={() => navigate("/tender-apply", { state: { tender: t } })}
                      onClick={() => {
  setSelectedService(t.title);
  setShowModal(true);
}}
                      className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-sm text-sm"
                    >
                      Submit Bid for this Tender →
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

export default TenderResults;
