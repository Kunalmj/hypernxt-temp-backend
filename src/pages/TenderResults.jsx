import React, { useMemo, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchCategory } from "../services/api";
import { tenders as mockTenders } from "../data/tenderData";
import RequestServiceModal from "../components/homepage/RequestServiceModal";

const TenderResults = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [usingFallback, setUsingFallback] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const query = state?.query || null;

  useEffect(() => {
    setLoading(true);
    fetchCategory("tenders_rfps/")
      .then((res) => {
        const rawResults = res?.results || [];
        const mapped = rawResults.map((item, index) => {
          return {
            id: item.id || `api-${index}`,
            title: item.title || "Untitled Tender",
            org: item.provider || item.org || "Various Organizations",
            tenderId: item.source_key || item.tenderId || `TEN-${index}`,
            value: item.amount || item.value || "Refer to official website",
            deadline: item.deadline || "Check official website",
            emd: item.emd || "Refer to official website",
            location: item.location || "Pan India",
            orgType: item.orgType || "All",
            type: item.type || "Tender",
            industry: item.industry || "General",
            tags: Array.isArray(item.tags)
              ? item.tags
              : (typeof item.tags === "string"
                ? item.tags.split(",").map(t => t.trim()).filter(Boolean)
                : [item.type, item.industry || "General"].filter(Boolean)),
            website: item.url || "#",
            description: item.description || `${item.title} offered by ${item.provider || "Various Organizations"}.`,
            applicationMode: "Online",
            selectionProcess: "Submission -> Evaluation -> Selection",
            benefits: null,
            documentsRequired: null,
            importantDates: {
              publishDate: "Refer to official website",
              preSubmissionMeeting: "Refer to official website",
              lastDateSubmission: item.deadline || "Check official website",
              openingDate: "Refer to official website"
            },
            contact: null
          };
        });
        setTenders(mapped);
        setUsingFallback(false);
        setError(null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch tenders, falling back to local database:", err);
        setTenders(mockTenders);
        setUsingFallback(true);
        setError(null);
        setLoading(false);
      });
  }, [retryCount]);

  const { filteredTenders, isExactMatch } = useMemo(() => {
    const baseTenders = tenders.length > 0 ? tenders : [];
    if (!query || baseTenders.length === 0) {
      return { filteredTenders: baseTenders, isExactMatch: false };
    }

    const matches = baseTenders.filter(t => {
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
      return { filteredTenders: baseTenders, isExactMatch: false };
    }
  }, [tenders, query]);

  const handleNewSearch = () => {
    navigate("/tenders");
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
            onClick={handleNewSearch}
            className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors mb-8 text-sm font-medium"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to Search
          </button>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Your Tender & RFP Matches</h1>
          <p className="text-lg text-blue-100 max-w-2xl opacity-90">
            {loading || error
              ? "Connecting to tender portals, please wait…"
              : isExactMatch
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

        {!loading && !error && usingFallback && (
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg mb-8 shadow-sm flex items-center justify-between gap-4">
            <div className="flex items-start gap-4 text-left">
              <svg className="w-6 h-6 text-amber-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <h3 className="text-amber-800 font-semibold">Offline Database Mode</h3>
                <p className="text-amber-700 text-sm mt-1">
                  We are showing matching tenders from our offline backup because the live server is currently sleeping.
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setLoading(true);
                setRetryCount(prev => prev + 1);
              }}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold rounded-lg transition-colors whitespace-nowrap"
            >
              Retry Live Connection
            </button>
          </div>
        )}

        {!loading && !error && !isExactMatch && query && filteredTenders.length > 0 && (
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-8 shadow-sm flex items-start gap-4">
            <svg className="w-6 h-6 text-blue-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <div>
              <h3 className="text-blue-800 font-semibold">No exact matches</h3>
              <p className="text-blue-700 text-sm mt-1">We couldn't find tenders perfectly matching all your criteria. Here are other opportunities you might consider.</p>
            </div>
          </div>
        )}

        <div className="grid gap-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <svg className="animate-spin h-10 w-10 text-blue-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-slate-700 font-semibold text-lg mb-1">
                {retryCount > 0 ? "Retrying connection…" : "Fetching tenders…"}
              </p>
              <p className="text-slate-400 text-sm">The data server may take up to 30 seconds to start up</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-amber-100 shadow-sm">
              <svg className="w-12 h-12 text-red-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              <p className="text-red-600 font-semibold mb-1">Could not reach the tender portal</p>
              <p className="text-slate-500 text-sm mb-5">The server took too long to respond. Please try again.</p>
              <button
                onClick={() => { setError(null); setRetryCount((c) => c + 1); setLoading(true); }}
                className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Retry Now
              </button>
            </div>
          ) : filteredTenders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <svg className="w-12 h-12 text-slate-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <p className="text-slate-700 font-semibold mb-1">No tenders found</p>
              <p className="text-slate-500 text-sm mb-4">Try adjusting your search filters to see more results.</p>
              <button
                onClick={() => navigate("/tenders")}
                className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                New Search
              </button>
            </div>
          ) : (
            filteredTenders.map((t) => (
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
                <p className="text-slate-600 text-sm">
                  {expandedId === t.id 
                    ? t.description 
                    : (t.description && t.description.length > 180 
                      ? t.description.slice(0, 180) + "..." 
                      : t.description)}
                </p>

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
                {t.website && t.website !== "#" && (
                  <div className="mt-3">
                    <a 
                      href={t.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-1.5 text-xs text-blue-600 hover:text-blue-800 font-semibold w-full"
                    >
                      <svg className="w-3.5 h-3.5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      <span className="underline break-all flex-1 min-w-0">
                        Official Website: {t.website}
                      </span>
                    </a>
                  </div>
                )}
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
                      className="flex items-start gap-2 text-sm text-blue-700 hover:text-blue-800 hover:underline transition-all min-w-0 flex-1 w-full sm:w-auto"
                    >
                      <svg className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                      <span className="font-medium break-all flex-1 min-w-0">{t.website || "Official tender portal"}</span>
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
          )))}
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
