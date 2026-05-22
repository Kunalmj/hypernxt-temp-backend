import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import SchemeApplyModal from "../components/homepage/SchemeApplyModal";
import { STATES, BENEFICIARY_TYPES, GENDERS, SPONSORS, CASTES } from "../utils/filterConstants";

const allSchemes = [
  {
    id: 1,
    title: "Swadesh Darshan Scheme",
    ministry: "Ministry of Tourism",
    desc: "Integrated development of theme-based tourist circuits in the country, aiming to create jobs and promote local culture.",
    benefit: "Infrastructure & Local Promotion",
    deadline: "Ongoing",
    beneficiaries: "Local Communities & Tourists",
    tags: ["Tourism", "Infrastructure", "Central Government"],
    state: "All India",
    beneficiaryType: "General Public",
    gender: "All Genders",
    sponsor: "Central Government",
  },
  {
    id: 2,
    title: "PRASHAD Scheme",
    ministry: "Ministry of Tourism",
    desc: "Pilgrimage Rejuvenation and Spiritual, Heritage Augmentation Drive (PRASHAD) for holistic development of identified pilgrimage destinations.",
    benefit: "Pilgrimage Infrastructure",
    deadline: "Ongoing",
    beneficiaries: "Pilgrims & Residents",
    tags: ["Pilgrimage", "Heritage", "Central Government"],
    state: "All India",
    beneficiaryType: "General Public",
    gender: "All Genders",
    sponsor: "Central Government",
  },
];







const Tag = ({ label }) => (
  <span className="inline-flex items-center text-[0.72rem] font-semibold px-2.5 py-0.5 rounded-full border"
    style={{ background: "#eff6ff", borderColor: "#bfdbfe", color: "#2563eb" }}>
    {label}
  </span>
);

const FilterSelect = ({ label, value, onChange, options }) => (
  <div className="mb-5">
    <label className="block text-[0.78rem] font-bold text-[#374151] mb-1.5 uppercase tracking-wide">{label}</label>
    <div className="relative">
      <select value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none bg-white border border-[#e2e8f0] rounded-xl px-3 py-2.5 text-[0.85rem] text-[#0f172a] font-medium cursor-pointer focus:outline-none focus:border-[#2563eb]">
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#94a3b8]">▾</span>
    </div>
  </div>
);

const TravelSchemes = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [showFilters, setShowFilters] = useState(true);
  const [filters, setFilters] = useState({ state: "All States", beneficiaryType: "All Beneficiaries", gender: "All Genders", sponsor: "All Sponsors" });

  const filtered = useMemo(() => {
    return allSchemes.filter((s) => {
      if (search && !s.title.toLowerCase().includes(search.toLowerCase()) && !s.desc.toLowerCase().includes(search.toLowerCase())) return false;
      if (filters.state !== "All States" && s.state !== filters.state) return false;
      if (filters.beneficiaryType !== "All Beneficiaries" && s.beneficiaryType !== filters.beneficiaryType) return false;
      if (filters.gender !== "All Genders" && s.gender !== filters.gender && s.gender !== "All Genders") return false;
      if (filters.sponsor !== "All Sponsors" && s.sponsor !== filters.sponsor) return false;
      const schemeCaste = s.caste || "All Categories";
      if (filters.caste !== "All Categories" && schemeCaste !== filters.caste && schemeCaste !== "All Categories") return false;
      return true;
    });
  }, [search, filters]);

  return (
    <>
      {showModal && (
        <SchemeApplyModal
          schemeName={selectedService}
          onClose={() => setShowModal(false)}
        />
      )}
      <div className="min-h-screen bg-[#f5f7fb]">
      {/* <div className="bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] px-6 md:px-12 py-8"> */}
      <div
  className="px-8 md:px-14 pt-10 pb-8 border-b border-[#1e293b] relative overflow-hidden"
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
        <div className="max-w-6xl mx-auto">
          <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1.5 text-blue-200 text-[0.82rem] font-semibold bg-transparent border-none cursor-pointer p-0 mb-4 hover:text-white transition-colors">← Back to All Categories</button>
          <h1 className="text-white text-[1.45rem] md:text-[1.75rem] font-extrabold mb-1">Travel &amp; Tourism</h1>
          <p className="text-rose-100 text-[0.85rem]">Explore 97 schemes in this category</p>
          <div className="mt-5 relative max-w-2xl">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94a3b8]"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg></span>
            <input type="text" placeholder="Search schemes..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-11 pr-4 py-3 rounded-xl border-none text-[0.9rem] text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-blue-300" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.12)" }} />
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 flex gap-6 items-start">
        {showFilters && (
          <aside className="w-64 flex-shrink-0 bg-white rounded-2xl p-5 sticky top-[96px]" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(37,99,235,0.06), inset 0 0 0 1px rgba(226,232,240,0.8)" }}>
            <div className="flex items-center gap-2 mb-5"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg><span className="font-bold text-[#0f172a] text-[0.9rem]">Filters</span></div>
            <FilterSelect label="State/UT" value={filters.state} onChange={(v) => setFilters({...filters, state: v})} options={STATES} />
            <FilterSelect label="Beneficiary Type" value={filters.beneficiaryType} onChange={(v) => setFilters({...filters, beneficiaryType: v})} options={BENEFICIARY_TYPES} />
            <FilterSelect label="Gender" value={filters.gender} onChange={(v) => setFilters({...filters, gender: v})} options={GENDERS} />
            <FilterSelect label="Sponsored By" value={filters.sponsor} onChange={(v) => setFilters({...filters, sponsor: v})} options={SPONSORS} />
            <FilterSelect label="Caste / Category"  value={filters.caste}           onChange={(v) => setFilter("caste", v)}           options={CASTES} />
            <button onClick={() => setFilters({ state: "All States", beneficiaryType: "All Beneficiaries", gender: "All Genders", sponsor: "All Sponsors", caste: "All Categories" })} className="w-full mt-1 py-2 rounded-xl text-[0.8rem] font-semibold text-[#64748b] border border-[#e2e8f0] bg-transparent cursor-pointer hover:border-[#2563eb] hover:text-[#2563eb] transition-colors">Reset Filters</button>
          </aside>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-5">
            <p className="text-[0.92rem] text-[#0f172a] font-semibold"><span className="text-[#2563eb] font-extrabold">{filtered.length}</span> Schemes Found</p>
            <button onClick={() => setShowFilters((p) => !p)} className="inline-flex items-center gap-2 text-[0.8rem] font-semibold text-[#64748b] border border-[#e2e8f0] bg-white rounded-xl px-4 py-2 cursor-pointer hover:border-[#2563eb] hover:text-[#2563eb] transition-colors" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>{showFilters ? "Hide Filters" : "Show Filters"}</button>
          </div>
          <div className="flex flex-col gap-4">
            {filtered.length === 0 ? (<div className="bg-white rounded-2xl p-10 text-center" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06), inset 0 0 0 1px rgba(226,232,240,0.8)" }}><p className="text-[#64748b] text-[0.9rem]">No schemes match your filters.</p></div>) : (
              filtered.map((scheme) => (
                <div key={scheme.id} className="bg-white rounded-2xl p-6 flex gap-4 transition-all duration-200" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 4px 12px rgba(37,99,235,0.06), inset 0 0 0 1px rgba(226,232,240,0.8)" }}>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[1rem] font-bold text-[#1e3a8a] mb-0.5 leading-snug cursor-pointer hover:underline">{scheme.title}</h3>
                    <p className="text-[0.77rem] text-[#64748b] mb-2">{scheme.ministry}</p>
                    <p className="text-[0.83rem] text-[#374151] leading-relaxed mb-3">{scheme.desc}</p>
                    <div className="flex flex-wrap gap-1.5">{scheme.tags.map((t) => <Tag key={t} label={t} />)}</div>
                  </div>
                  <div className="flex flex-col justify-between items-end flex-shrink-0 min-w-[160px] gap-3">
                    <div className="flex flex-col gap-2 text-right w-full">
                      <div className="bg-[#eff6ff] border border-[#bfdbfe] rounded-xl px-3 py-2"><p className="text-[0.68rem] text-[#2563eb] font-bold uppercase tracking-wide mb-0.5">Benefit</p><p className="text-[0.82rem] font-semibold text-[#0f172a]">{scheme.benefit}</p></div>
                    </div>
                    
                    <div className="flex flex-col gap-2 w-full">
                      <button
                        onClick={() => {
                          setSelectedService(scheme.title);
                          setShowModal(true);
                        }}
                        className="w-full inline-flex items-center justify-center gap-1.5 bg-[#1e3a8a] text-white text-[0.8rem] font-bold rounded-xl px-4 py-2.5 border-none cursor-pointer hover:bg-[#1d4ed8] transition-colors"
                        
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block mr-1"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                        Apply Now
                      </button>
                      <button
                        onClick={() => navigate("/scheme-details", { state: { scheme } })}
                        className="w-full inline-flex items-center justify-center gap-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-[0.8rem] font-bold rounded-xl px-4 py-2.5 cursor-pointer transition-colors"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default TravelSchemes;
