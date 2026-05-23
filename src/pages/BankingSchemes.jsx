import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SchemeApplyModal from "../components/homepage/SchemeApplyModal";
import SchemeCard from "../components/SchemeCard";
import { fetchCategory } from "../services/api";
import { STATES, BENEFICIARY_TYPES, GENDERS, SPONSORS, CASTES } from "../utils/filterConstants";

/* ── Scheme data ─────────────────────────────────────────────── */
const mockSchemes = [
  {
    id: 1,
    title: "Ayushman Bharat – Pradhan Mantri Jan Arogya Yojana",
    ministry: "Ministry of Health and Family Welfare",
    desc: "Provides health insurance coverage of ₹5 lakhs per family per year for secondary and tertiary care hospitalisation.",
    benefit: "₹5 Lakhs/year",
    deadline: "Always Open",
    beneficiaries: "50 Crore+",
    tags: ["BPL Family", "SECC Database", "All India"],
    state: "All India",
    beneficiaryType: "BPL Family",
    gender: "All Genders",
    sponsor: "Central Government",
  },
  {
    id: 2,
    title: "Pradhan Mantri Suraksha Bima Yojana",
    ministry: "Ministry of Finance",
    desc: "Accidental death and disability insurance scheme offering coverage of ₹2 lakhs for just ₹12 per year.",
    benefit: "₹2 Lakhs",
    deadline: "Rolling Basis",
    beneficiaries: "30 Crore+",
    tags: ["All India", "General Public", "Central Government"],
    state: "All India",
    beneficiaryType: "General Public",
    gender: "All Genders",
    sponsor: "Central Government",
  },
  {
    id: 3,
    title: "Atal Pension Yojana",
    ministry: "Ministry of Finance",
    desc: "Pension scheme for unorganised sector workers providing guaranteed pension of ₹1,000 to ₹5,000 per month.",
    benefit: "₹1,000–5,000/month",
    deadline: "Always Open",
    beneficiaries: "4 Crore+",
    tags: ["All India", "General Public", "Central Government"],
    state: "All India",
    beneficiaryType: "General Public",
    gender: "All Genders",
    sponsor: "Central Government",
  },
  {
    id: 4,
    title: "PM SVANidhi – Street Vendor Loan",
    ministry: "Ministry of Housing & Urban Affairs",
    desc: "Micro-credit facility for street vendors to resume livelihoods affected post-COVID with loans up to ₹50,000.",
    benefit: "₹10,000–₹50,000 Loan",
    deadline: "Always Open",
    beneficiaries: "50 Lakh+",
    tags: ["Street Vendors", "All India", "Central Government"],
    state: "All India",
    beneficiaryType: "Street Vendors",
    gender: "All Genders",
    sponsor: "Central Government",
  },
  {
    id: 5,
    title: "Pradhan Mantri Mudra Yojana",
    ministry: "Ministry of Finance",
    desc: "Provides loans up to ₹10 lakhs to non-corporate, non-farm small/micro enterprises under Shishu, Kishor & Tarun categories.",
    benefit: "Up to ₹10 Lakhs",
    deadline: "Always Open",
    beneficiaries: "40 Crore+",
    tags: ["Small Business", "All India", "Central Government"],
    state: "All India",
    beneficiaryType: "Small Business",
    gender: "All Genders",
    sponsor: "Central Government",
  },
  {
    id: 6,
    title: "PM Jeevan Jyoti Bima Yojana",
    ministry: "Ministry of Finance",
    desc: "Life insurance scheme offering ₹2 lakh cover for death due to any cause at a premium of ₹436 per year.",
    benefit: "₹2 Lakhs",
    deadline: "Always Open",
    beneficiaries: "16 Crore+",
    tags: ["General Public", "All India", "Central Government"],
    state: "All India",
    beneficiaryType: "General Public",
    gender: "All Genders",
    sponsor: "Central Government",
  },
  {
    id: 7,
    title: "Mahila Samman Savings Certificate",
    ministry: "Ministry of Finance",
    desc: "Special one-time savings scheme for women and girls offering 7.5% interest rate with partial withdrawal facility.",
    benefit: "7.5% Interest",
    deadline: "31 Mar 2025",
    beneficiaries: "Open",
    tags: ["Women", "All India", "Central Government"],
    state: "All India",
    beneficiaryType: "Women",
    gender: "Female",
    sponsor: "Central Government",
  },
  {
    id: 8,
    title: "Stand Up India Scheme",
    ministry: "Department of Financial Services",
    desc: "Facilitates bank loans between ₹10 lakhs and ₹1 crore to SC/ST and women borrowers for greenfield enterprises.",
    benefit: "₹10 L – ₹1 Crore",
    deadline: "Always Open",
    beneficiaries: "1.8 Lakh+",
    tags: ["SC/ST", "Women", "Central Government"],
    state: "All India",
    beneficiaryType: "Women",
    gender: "Female",
    sponsor: "Central Government",
  },
];

/* ── Filter select ───────────────────────────────────────────── */
const FilterSelect = ({ label, value, onChange, options }) => (
  <div className="mb-5">
    <label className="block text-[0.78rem] font-bold text-[#374151] mb-1.5 uppercase tracking-wide">{label}</label>
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none bg-white border border-[#e2e8f0] rounded-xl px-3 py-2.5 text-[0.85rem] text-[#0f172a] font-medium cursor-pointer focus:outline-none focus:border-[#3b82f6]"
        style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}
      >
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#94a3b8]">▾</span>
    </div>
  </div>
);

/* ── Main component ──────────────────────────────────────────── */
const BankingSchemes = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [showFilters, setShowFilters] = useState(true);
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [usingFallback, setUsingFallback] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [filters, setFilters] = useState({
    state: "All States",
    beneficiaryType: "All Beneficiaries",
    gender: "All Genders",
    sponsor: "All Sponsors",
    caste: "All Categories",
  });

  const setFilter = (key, val) => setFilters((f) => ({ ...f, [key]: val }));

  useEffect(() => {
    setLoading(true);
    fetchCategory("banking_financial_services_and_insurance/")
      .then((res) => {
        const rawResults = res?.results || [];
        const mapped = rawResults.map((item, index) => {
          return {
            id: item.id || `api-${index}`,
            title: item.title || "Untitled Scheme",
            ministry: item.provider || item.ministry || "Ministry / Department",
            desc: item.description || item.desc || "No description provided.",
            benefit: item.amount || item.benefit || "As per guidelines",
            deadline: item.deadline || "Ongoing",
            beneficiaries: item.beneficiaries || "Open",
            tags: Array.isArray(item.tags)
              ? item.tags
              : (typeof item.tags === "string"
                ? item.tags.split(",").map(t => t.trim()).filter(Boolean)
                : ["Govt Scheme"]),
            state: item.state || "All India",
            website: item.url || item.source_url || "https://www.myscheme.gov.in",
            beneficiaryType: item.beneficiaryType || "General Public",
            gender: item.gender || "All Genders",
            sponsor: item.sponsor || "Central Government",
            caste: item.caste || "All Categories",
          };
        });
        setSchemes(mapped);
        setUsingFallback(false);
        setError(null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch banking schemes, falling back to local database:", err);
        setSchemes(mockSchemes);
        setUsingFallback(true);
        setError(null);
        setLoading(false);
      });
  }, [retryCount]);

  const filtered = useMemo(() => {
    const baseSchemes = schemes.length > 0 ? schemes : [];
    return baseSchemes.filter((s) => {
      if (search && !s.title.toLowerCase().includes(search.toLowerCase()) &&
        !s.desc.toLowerCase().includes(search.toLowerCase())) return false;
      if (filters.state !== "All States" && s.state !== filters.state) return false;
      if (filters.beneficiaryType !== "All Beneficiaries" && s.beneficiaryType !== filters.beneficiaryType) return false;
      if (filters.gender !== "All Genders" && s.gender !== filters.gender && s.gender !== "All Genders") return false;
      if (filters.sponsor !== "All Sponsors" && s.sponsor !== filters.sponsor) return false;
      const schemeCaste = s.caste || "All Categories";
      if (filters.caste !== "All Categories" && schemeCaste !== filters.caste && schemeCaste !== "All Categories") return false;
      return true;
    });
  }, [search, filters, schemes]);

  return (
    <>
      {showModal && (
        <SchemeApplyModal
          schemeName={selectedService}
          onClose={() => setShowModal(false)}
        />
      )}
      <div className="min-h-screen bg-[#f5f7fb]">

      {/* ── Blue header banner ─────────────────────────────── */}
      {/* <div className="bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] px-6 md:px-12 py-8"> */}
      <div
  className="relative text-white pt-20 pb-16 px-6 overflow-hidden"
  style={{
    backgroundImage: `
      linear-gradient(rgba(15,23,42,0.82), rgba(30,41,59,0.82)),
      url('/banking.jpg')
    `,
    backgroundSize: "cover",
    backgroundPosition: "center 85%",
    backgroundRepeat: "no-repeat",
  }}
>
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1.5 text-blue-200 text-[0.82rem] font-semibold bg-transparent border-none cursor-pointer p-0 mb-4 hover:text-white transition-colors"
          >
            ← Back to All Categories
          </button>
          <h1 className="text-white text-[1.45rem] md:text-[1.75rem] font-extrabold mb-1">
            Banking, Financial Services and Insurance
          </h1>

          {/* Search bar */}
          <div className="mt-5 relative max-w-2xl">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8]">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search schemes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border-none bg-white text-[0.9rem] text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-blue-300"
              style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.12)" }}
            />
          </div>
        </div>
      </div>

      {/* ── Body ───────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 flex gap-6 items-start">

        {/* Sidebar filters */}
        {showFilters && (
          <aside className="w-64 flex-shrink-0 bg-white rounded-2xl p-5 sticky top-[96px]"
            style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(37,99,235,0.06), inset 0 0 0 1px rgba(226,232,240,0.8)" }}>
            <div className="flex items-center gap-2 mb-5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
              </svg>
              <span className="font-bold text-[#0f172a] text-[0.9rem]">Filters</span>
            </div>
            <FilterSelect label="State/UT" value={filters.state} onChange={(v) => setFilter("state", v)} options={STATES} />
            <FilterSelect label="Beneficiary Type" value={filters.beneficiaryType} onChange={(v) => setFilter("beneficiaryType", v)} options={BENEFICIARY_TYPES} />
            <FilterSelect label="Gender" value={filters.gender} onChange={(v) => setFilter("gender", v)} options={GENDERS} />
            <FilterSelect label="Sponsored By" value={filters.sponsor} onChange={(v) => setFilter("sponsor", v)} options={SPONSORS} />
            <FilterSelect label="Caste / Category"  value={filters.caste}           onChange={(v) => setFilter("caste", v)}           options={CASTES} />
            <button
              onClick={() => setFilters({ state: "All States", beneficiaryType: "All Beneficiaries", gender: "All Genders", sponsor: "All Sponsors", caste: "All Categories" })}
              className="w-full mt-1 py-2 rounded-xl text-[0.8rem] font-semibold text-[#64748b] border border-[#e2e8f0] bg-transparent cursor-pointer hover:border-[#3b82f6] hover:text-[#2563eb] transition-colors"
            >
              Reset Filters
            </button>
          </aside>
        )}

        {/* Scheme list */}
        <div className="flex-1 min-w-0">
          {!loading && !error && usingFallback && (
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg mb-8 shadow-sm flex items-center justify-between gap-4">
              <div className="flex items-start gap-4 text-left">
                <svg className="w-6 h-6 text-amber-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <h3 className="text-amber-800 font-semibold">Offline Database Mode</h3>
                  <p className="text-amber-700 text-sm mt-1">
                    We are showing matching schemes from our offline backup because the live server is currently sleeping.
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
          {/* Result bar */}
          <div className="flex items-center justify-between mb-5">
            <p className="text-[0.92rem] text-[#0f172a] font-semibold">
              <span className="text-[#2563eb] font-extrabold">{filtered.length}</span> Schemes Found
            </p>
            <button
              onClick={() => setShowFilters((p) => !p)}
              className="inline-flex items-center gap-2 text-[0.8rem] font-semibold text-[#64748b] border border-[#e2e8f0] bg-white rounded-xl px-4 py-2 cursor-pointer hover:border-[#3b82f6] hover:text-[#2563eb] transition-colors"
              style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
              </svg>
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
          </div>

          {/* Cards */}
          <div className="flex flex-col gap-4">
            {loading ? (
              <div className="bg-white rounded-2xl p-10 text-center flex flex-col items-center justify-center border border-slate-200"
                style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
                <svg className="animate-spin h-8 w-8 text-blue-600 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-slate-600 font-medium">{retryCount > 0 ? "Retrying connection…" : "Fetching schemes…"}</p>
              </div>
            ) : error ? (
              <div className="bg-white rounded-2xl p-10 text-center flex flex-col items-center justify-center border border-amber-100"
                style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
                <p className="text-red-600 font-semibold mb-2">Could not reach the database server</p>
                <button
                  onClick={() => { setError(null); setRetryCount((c) => c + 1); setLoading(true); }}
                  className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Retry Now
                </button>
              </div>
            ) : filtered.length === 0 ? (
              <div className="bg-white rounded-2xl p-10 text-center"
                style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06), inset 0 0 0 1px rgba(226,232,240,0.8)" }}>
                <p className="text-[#64748b] text-[0.9rem]">No schemes match your filters. Try adjusting them.</p>
              </div>
            ) : (
              filtered.map((scheme) => (
                <SchemeCard
                  key={scheme.id}
                  scheme={scheme}
                  expandedId={expandedId}
                  setExpandedId={setExpandedId}
                  setSelectedService={setSelectedService}
                  setShowModal={setShowModal}
                  colorTheme="blue"
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default BankingSchemes;
