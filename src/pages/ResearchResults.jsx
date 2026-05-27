import React, { useMemo, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchCategory } from "../services/api";
import { researchGrants as mockGrants } from "../data/researchData";
import RequestServiceModal from "../components/homepage/RequestServiceModal";
import AssistanceModal from "../components/homepage/AssistanceModal";

const ResearchResults = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [grants, setGrants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [usingFallback, setUsingFallback] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [showAssistanceModal, setShowAssistanceModal] = useState(false);
  const [selectedAssistanceScheme, setSelectedAssistanceScheme] = useState("");

  const query = state?.query || null;

  useEffect(() => {
    setLoading(true);
    fetchCategory("research_grants/")
      .then((res) => {
        const rawResults = res?.results || [];
        const mapped = rawResults.map((item, index) => {
          const type = item.type || "Research Grant";
          const field = item.field || "General";
          const stage = item.stage || "All Stages";
          const institution = item.institution || "Any Institution";

          return {
            id: item.id || `api-${index}`,
            title: item.title || "Untitled Grant",
            agency: item.provider || "Various Agencies",
            amount: item.amount || "Refer to official website",
            duration: item.duration || "Check official website",
            description: item.description || `${item.title} offered by ${item.provider || "Various Agencies"}.`,
            type,
            field,
            stage,
            institution,
            tags: Array.isArray(item.tags)
              ? item.tags
              : (typeof item.tags === "string"
                ? item.tags.split(",").map(t => t.trim()).filter(Boolean)
                : ["Research", type, field].filter(Boolean)),
            website: item.url || "#",
            deadline: item.deadline || "Check official website",
            applicationMode: "Online",
            selectionProcess: "Proposal Review -> Evaluation -> Approval",
            renewalPolicy: null,
            benefits: item.amount ? [item.amount] : null,
            documentsRequired: null,
            importantDates: {
              applicationStart: "Refer to official website",
              applicationEnd: item.deadline || "Check official website",
              shortlistAnnouncement: "Refer to official website",
              disbursement: "As per guidelines"
            },
            contact: null
          };
        });
        setGrants(mapped);
        setUsingFallback(false);
        setError(null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch research grants, falling back to local database:", err);
        setGrants(mockGrants);
        setUsingFallback(true);
        setError(null);
        setLoading(false);
      });
  }, [retryCount]);

  const { filteredGrants, isExactMatch } = useMemo(() => {
    const baseGrants = grants.length > 0 ? grants : [];
    if (!query || baseGrants.length === 0) {
      return { filteredGrants: baseGrants, isExactMatch: false };
    }

    const matches = baseGrants.filter(g => {
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
      return { filteredGrants: baseGrants, isExactMatch: false };
    }
  }, [grants, query]);

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
  <AssistanceModal
    formName={selectedAssistanceScheme}
    isOpen={showAssistanceModal}
    onClose={() => setShowAssistanceModal(false)}
  />
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
            {loading || error
              ? "Connecting to grant portals, please wait…"
              : isExactMatch
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

        {!loading && !error && usingFallback && (
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg mb-8 shadow-sm flex items-center justify-between gap-4">
            <div className="flex items-start gap-4 text-left">
              <svg className="w-6 h-6 text-amber-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <h3 className="text-amber-800 font-semibold">Offline Database Mode</h3>
                <p className="text-amber-700 text-sm mt-1">
                  We are showing matching grants from our offline backup because the live server is currently sleeping.
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

        {!loading && !error && !isExactMatch && query && filteredGrants.length > 0 && (
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-8 shadow-sm flex items-start gap-4">
            <svg className="w-6 h-6 text-blue-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <div>
              <h3 className="text-blue-800 font-semibold">No exact matches</h3>
              <p className="text-blue-700 text-sm mt-1">We couldn't find grants perfectly matching all your criteria. Here are other opportunities you might consider.</p>
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
                {retryCount > 0 ? "Retrying connection…" : "Fetching grants…"}
              </p>
              <p className="text-slate-400 text-sm">The data server may take up to 30 seconds to start up</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-amber-100 shadow-sm">
              <svg className="w-12 h-12 text-red-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              <p className="text-red-600 font-semibold mb-1">Could not reach the grant portal</p>
              <p className="text-slate-500 text-sm mb-5">The server took too long to respond. Please try again.</p>
              <button
                onClick={() => { setError(null); setRetryCount((c) => c + 1); setLoading(true); }}
                className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Retry Now
              </button>
            </div>
          ) : filteredGrants.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <svg className="w-12 h-12 text-slate-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <p className="text-slate-700 font-semibold mb-1">No grants found</p>
              <p className="text-slate-500 text-sm mb-4">Try adjusting your search filters to see more results.</p>
              <button
                onClick={handleNewSearch}
                className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                New Search
              </button>
            </div>
          ) : (
            filteredGrants.map((g) => (
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
                <p className="text-slate-600 text-sm">
                  {expandedId === g.id 
                    ? g.description 
                    : (g.description && g.description.length > 180 
                      ? g.description.slice(0, 180) + "..." 
                      : g.description)}
                </p>

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
                {g.website && g.website !== "#" && (
                  <div className="mt-3">
                    <a 
                      href={g.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-1.5 text-xs text-blue-600 hover:text-blue-800 font-semibold w-full"
                    >
                      <svg className="w-3.5 h-3.5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      <span className="underline break-all flex-1 min-w-0">
                        Official Website: {g.website}
                      </span>
                    </a>
                  </div>
                )}
              </div>

              <div className="md:w-48 flex-shrink-0 flex flex-col gap-3">
                  <button 
                    onClick={() => navigate("/research-apply", { state: { grant: g } })}
                    className="w-full py-3 bg-blue-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2 text-center border-none cursor-pointer"
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
                          <span className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-xs">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </span>
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
                          <span className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-xs">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </span>
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
                        <span className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-xs">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                          </svg>
                        </span>
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
                        <span className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-xs">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </span>
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
                      className="flex items-start gap-2 text-sm text-blue-700 hover:text-blue-800 hover:underline transition-all min-w-0 flex-1 w-full sm:w-auto"
                    >
                      <svg className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                      <span className="font-medium break-all flex-1 min-w-0">{g.website || "Official portal"}</span>
                    </a>
                    <button
                      onClick={() => {
                        setSelectedAssistanceScheme(g.title);
                        setShowAssistanceModal(true);
                      }}
                      className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-sm text-sm cursor-pointer border-none"
                    >
                      Get Assistance →
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

export default ResearchResults;
