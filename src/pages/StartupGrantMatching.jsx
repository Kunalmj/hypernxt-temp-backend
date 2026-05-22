import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Icons = {
  Stage: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>,
  Sector: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
  Location: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>,
  Funding: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>,
  Registration: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>,
  Exit: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
};

import { indianStates as IndianStates } from "../utils/states";

const fundingOptions = [
  { label: "<5 Lakhs", min: 0, max: 5 },
  { label: "5–20 Lakhs", min: 5, max: 20 },
  { label: "20–50 Lakhs", min: 20, max: 50 },
  { label: "50L–1Cr", min: 50, max: 100 },
  { label: ">1Cr", min: 100, max: 9999 },
];

const extraTags = [
  "Women-led",
  "Student startup",
  "Rural startup",
  "Sustainability / Climate",
  "DeepTech"
];

const StartupGrantMatching = () => {
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Clear any stale data left from previous sessions
  useEffect(() => {
    localStorage.removeItem("grantSearchState");
  }, []);

  const [data, setData] = useState({
    stage: "",
    sectors: [],
    location: { state: "", city: "", panIndia: false },
    funding: { min: 0, max: 0, label: "" },
    registration: [],
    tags: []
  });

  const steps = [
    { id: 1, title: "Stage" },
    { id: 2, title: "Sector" },
    { id: 3, title: "Location" },
    { id: 4, title: "Funding" },
    { id: 5, title: "Registration" },
  ];

  const sectionRefs = useRef({});

  // Step detection for scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveStep(Number(entry.target.dataset.step));
          }
        });
      },
      { threshold: 0.6, rootMargin: "-100px 0px -100px 0px" }
    );

    Object.values(sectionRefs.current).forEach((sec) => {
      if (sec) observer.observe(sec);
    });

    return () => observer.disconnect();
  }, []);

  const handleNextStep = (stepId) => {
    if (stepId < 5) {
      const nextEl = sectionRefs.current[stepId + 1];
      if (nextEl) {
        nextEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const handleMultiSelect = (field, value) => {
    setData((prev) => {
      const isSelected = prev[field].includes(value);
      return {
        ...prev,
        [field]: isSelected
          ? prev[field].filter((item) => item !== value)
          : [...prev[field], value],
      };
    });
  };

  const isNextDisabled = (step) => {
    if (step === 1) return !data.stage;
    if (step === 2) return data.sectors.length === 0;
    if (step === 3) return !data.location.panIndia && !data.location.state;
    if (step === 4) return !data.funding.label;
    if (step === 5) return data.registration.length === 0;
    return false;
  };

  const isFormValid = !isNextDisabled(1) && !isNextDisabled(2) && !isNextDisabled(3) && !isNextDisabled(4) && !isNextDisabled(5);

  const [error, setError] = useState("");

  const handleSubmit = () => {
    setError("");
    if (!isFormValid) {
      setError("Please fill out all required fields in all steps before proceeding.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/startup-grant-results", { state: { query: data } });
    }, 1500);
  };

  return (
    <div className="h-screen bg-gradient-to-b from-white to-blue-100 flex justify-center p-6 font-sans overflow-hidden">
      <div className="w-full max-w-7xl h-full flex overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
        
        {/* Left Sidebar (Stepper) */}
        <aside className="w-[340px] bg-[#153e9c] p-10 hidden md:flex flex-col relative overflow-hidden shrink-0 rounded-l-2xl">
          {/* Overlay gradient graphic to mimic the architecture building */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-[400px] opacity-20 pointer-events-none"
            style={{ 
              background: "radial-gradient(circle at bottom, rgba(255,255,255,0.8) 0%, transparent 70%)",
              clipPath: "polygon(50% 10%, 100% 100%, 0% 100%)" 
            }}
          ></div>
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#0b2259]/80 to-transparent pointer-events-none"></div>

          <h2 className="text-3xl mb-12 text-white flex items-center relative z-10 tracking-tight">
            <span className="font-extrabold mr-1.5">Startup</span> <span className="font-light opacity-80">Portal</span>
          </h2>

          <div className="flex flex-col gap-2 relative z-10">
            {steps.map((s) => {
              const isActive = activeStep === s.id;
              const Icon = s.id === 1 ? Icons.Stage : s.id === 2 ? Icons.Sector : s.id === 3 ? Icons.Location : s.id === 4 ? Icons.Funding : Icons.Registration;
              
              return (
                <div 
                  key={s.id} 
                  className={`flex items-center gap-4 p-3 rounded-2xl cursor-pointer transition-all duration-300 ${isActive ? 'bg-[#2954b8]' : 'hover:bg-white/5'}`} 
                  onClick={() => handleNextStep(s.id - 1)}
                >
                  <div className={`w-[52px] h-[52px] rounded-[14px] flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-white text-[#153e9c] shadow-md' : 'bg-white/10 text-white/70'}`}>
                    <Icon />
                  </div>
                  <span className={`flex-1 text-[16px] transition-all duration-300 ${isActive ? 'text-white font-semibold' : 'text-white/70 font-medium'}`}>
                    {s.title}
                  </span>
                  {isActive && <div className="w-2 h-2 bg-white rounded-full mr-1"></div>}
                </div>
              );
            })}
          </div>

          <div className="mt-auto relative z-10 pt-10 pb-4">
            <button className="flex items-center gap-3 text-white/80 hover:text-white transition-colors font-semibold text-[15px]" onClick={() => navigate('/')}>
              <Icons.Exit />
              Exit Portal
            </button>
          </div>
        </aside>

        {/* Main Form Flow */}
        <main className="flex-1 overflow-y-auto scroll-smooth">
          <div className="sticky top-0 bg-white/80 backdrop-blur-md z-20 border-b border-slate-100 p-6 shadow-sm">
             <div className="max-w-3xl mx-auto flex items-center justify-between">
               <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-600">
                 Find the Right Grant
               </h1>
               <div className="text-sm font-medium text-slate-500 bg-slate-100 px-4 py-1.5 rounded-full">
                 Step {activeStep} of 5
               </div>
             </div>
          </div>

          <div className="max-w-3xl mx-auto px-8 py-12 space-y-32 pb-40">
            
            {/* STEP 1: Stage */}
            <section ref={(el) => (sectionRefs.current[1] = el)} data-step="1" className="scroll-mt-32">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-800 mb-3">Startup Stage</h2>
                <p className="text-slate-500 text-lg">What stage is your startup currently in?</p>
              </div>
              <div className="relative">
                <select 
                  value={data.stage}
                  onChange={(e) => setData({ ...data, stage: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all text-[15px] font-medium text-slate-700 bg-white appearance-none cursor-pointer"
                >
                  <option value="" disabled>Select your startup stage</option>
                  {["Idea", "Prototype / MVP", "Early Revenue", "Growth"].map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
            </section>

            {/* STEP 2: Sector */}
            <section ref={(el) => (sectionRefs.current[2] = el)} data-step="2" className="scroll-mt-32">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-800 mb-3">Sector & Industry</h2>
                <p className="text-slate-500 text-lg">Select all the sectors that apply to your startup.</p>
              </div>
              <div className="flex flex-wrap gap-4">
                {["AI / ML", "FinTech", "HealthTech", "EdTech", "AgriTech", "CleanTech", "SaaS"].map((s) => {
                  const isSelected = data.sectors.includes(s);
                  return (
                    <button
                      key={s}
                      onClick={() => handleMultiSelect("sectors", s)}
                      className={`px-6 py-3 rounded-full text-base font-medium transition-all duration-200 border-2
                        ${isSelected 
                          ? "border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-200" 
                          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* STEP 3: Location */}
            <section ref={(el) => (sectionRefs.current[3] = el)} data-step="3" className="scroll-mt-32">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-800 mb-3">Location</h2>
                <p className="text-slate-500 text-lg">Where is your startup headquartered?</p>
              </div>
              
              <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
                <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
                  <input 
                    type="checkbox" 
                    checked={data.location.panIndia}
                    onChange={(e) => setData({ ...data, location: { ...data.location, panIndia: e.target.checked } })}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="font-medium text-slate-800">Operational PAN India</span>
                </label>

                {!data.location.panIndia && (
                  <div className="grid grid-cols-2 gap-6 pt-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-2">State</label>
                      <select 
                        value={data.location.state}
                        onChange={(e) => setData({ ...data, location: { ...data.location, state: e.target.value } })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-[15px]"
                      >
                        <option value="">Select State</option>
                        {IndianStates.map(st => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-2">City (Optional)</label>
                      <input 
                        type="text" 
                        value={data.location.city}
                        onChange={(e) => setData({ ...data, location: { ...data.location, city: e.target.value } })}
                        placeholder="Enter city"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-[15px]"
                      />
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* STEP 4: Funding Requirement */}
            <section ref={(el) => (sectionRefs.current[4] = el)} data-step="4" className="scroll-mt-32">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-800 mb-3">Funding Requirement</h2>
                <p className="text-slate-500 text-lg">How much capital are you looking to raise?</p>
              </div>
              <div className="relative">
                <select 
                  value={data.funding.label}
                  onChange={(e) => {
                    const selected = fundingOptions.find(f => f.label === e.target.value);
                    setData({ ...data, funding: selected });
                  }}
                  className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all text-[15px] font-medium text-slate-700 bg-white appearance-none cursor-pointer"
                >
                  <option value="" disabled>Select required funding</option>
                  {fundingOptions.map(f => (
                    <option key={f.label} value={f.label}>{f.label}</option>
                  ))}
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
            </section>

            {/* STEP 5: Registration & Final */}
            <section ref={(el) => (sectionRefs.current[5] = el)} data-step="5" className="scroll-mt-32">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-800 mb-3">Registration & Details</h2>
                <p className="text-slate-500 text-lg">Select your entity type and any special tags.</p>
              </div>
              
              <div className="space-y-10">
                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-4 uppercase tracking-wider">Registration Type</label>
                  <div className="relative">
                    <select 
                      value={data.registration[0] || ""}
                      onChange={(e) => setData({ ...data, registration: [e.target.value] })}
                      className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none transition-all text-[15px] font-medium text-slate-700 bg-white appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Select entity type</option>
                      {["Not Registered", "Pvt Ltd", "LLP", "MSME", "DPIIT Startup"].map(r => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </div>
                </div>

                {/* Extra Filters */}
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <label className="block text-sm font-semibold text-slate-800 mb-4 uppercase tracking-wider">Additional Tags (Optional)</label>
                  <div className="flex flex-wrap gap-3">
                    {extraTags.map((tag) => {
                      const isSelected = data.tags.includes(tag);
                      return (
                        <button
                          key={tag}
                          onClick={() => handleMultiSelect("tags", tag)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border
                            ${isSelected 
                              ? "border-slate-800 bg-slate-800 text-white" 
                              : "border-slate-200 bg-white text-slate-600 hover:bg-slate-100"
                            }`}
                        >
                          {isSelected ? " " : "+ "}{tag}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="mt-16 flex flex-col items-center">
                <button
                  onClick={handleSubmit}
                  disabled={isNextDisabled(5) || isLoading}
                  className="group relative inline-flex items-center justify-center px-10 py-4 text-lg font-bold text-white transition-all duration-200 bg-gradient-to-r from-blue-600 to-indigo-600 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 hover:shadow-lg hover:-translate-y-1 w-full md:w-auto min-w-[240px] disabled:opacity-70 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-3">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Finding Grants...
                    </div>
                  ) : (
                    "Find Grants →"
                  )}
                </button>
                {error && <p className="mt-4 text-sm font-medium text-red-500">{error}</p>}
                {!error && <p className="mt-4 text-sm text-slate-500">Fill in all steps to find your best grants.</p>}
              </div>
            </section>
            
          </div>
        </main>
      </div>
    </div>
  );
};

export default StartupGrantMatching;
