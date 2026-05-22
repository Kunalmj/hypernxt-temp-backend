import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Icons = {
  Type: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
  Area: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>,
  Stage: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>,
  Institution: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>,
  Funding: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>,
  Exit: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
};

const ResearchPortal = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [data, setData] = useState({
    type: "",
    field: "",
    funding: "",
    stage: "",
    institution: "",
  });

  const sectionRefs = useRef({});

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

  const steps = [
    { id: 1, title: "Grant Type", icon: Icons.Type },
    { id: 2, title: "Research Field", icon: Icons.Area },
    { id: 3, title: "Career Stage", icon: Icons.Stage },
    { id: 4, title: "Institution Type", icon: Icons.Institution },
    { id: 5, title: "Funding Required", icon: Icons.Funding },
  ];

  const handleSubmit = () => {
    setError("");
    if (!data.type || !data.field || !data.stage || !data.institution || !data.funding) {
      setError("Please fill out all required fields before proceeding.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/research-results", { state: { query: data } });
    }, 1500);
  };

  return (
    <div className="h-screen bg-gradient-to-b from-white to-blue-100 flex justify-center p-6 font-sans overflow-hidden">
      <div className="w-full max-w-7xl h-full flex overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">

        {/* SIDEBAR */}
        <aside className="w-[340px] bg-[#153e9c] p-10 hidden md:flex flex-col relative overflow-hidden shrink-0 rounded-l-2xl">
          <div 
            className="absolute bottom-0 left-0 right-0 h-[400px] opacity-20 pointer-events-none"
            style={{ 
              background: "radial-gradient(circle at bottom, rgba(255,255,255,0.8) 0%, transparent 70%)",
              clipPath: "polygon(50% 10%, 100% 100%, 0% 100%)" 
            }}
          ></div>
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#0b2259]/80 to-transparent pointer-events-none"></div>

          <h2 className="text-3xl mb-12 text-white flex items-center relative z-10 tracking-tight">
            <span className="font-extrabold mr-1.5">Research</span> <span className="font-light opacity-80">Portal</span>
          </h2>

          <div className="flex flex-col gap-2 relative z-10">
            {steps.map((s) => {
              const isActive = activeStep === s.id;
              const Icon = s.icon;
              
              return (
                <div 
                  key={s.id} 
                  className={`flex items-center gap-4 p-3 rounded-2xl cursor-pointer transition-all duration-300 ${isActive ? 'bg-[#2954b8]' : 'hover:bg-white/5'}`} 
                  onClick={() => {
                    const el = sectionRefs.current[s.id];
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
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

        {/* MAIN */}
        <main className="flex-1 overflow-y-auto scroll-smooth">
          <div className="sticky top-0 bg-white/80 backdrop-blur-md z-20 border-b border-slate-100 p-6 shadow-sm">
            <div className="max-w-3xl mx-auto flex items-center justify-between">
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-600">
                Research Grant Finder
              </h1>
              <div className="text-sm font-medium text-slate-500 bg-slate-100 px-4 py-1.5 rounded-full">
                Step {activeStep} of 5
              </div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto px-8 py-12 space-y-12 pb-24">

            {/* SECTION 1 */}
            <section ref={(el) => (sectionRefs.current[1] = el)} data-step="1" className="scroll-mt-32">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Researcher Type</h2>
                <p className="text-slate-500 text-base">Select your current professional status</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border-2 border-slate-100 shadow-sm flex flex-wrap gap-4">
                {["PhD Scholar", "Early Career", "Faculty", "Medical Researcher", "Industry Researcher"].map((t) => {
                  const isSelected = data.type === t;
                  return (
                    <button
                      key={t}
                      onClick={() => setData({ ...data, type: t })}
                      className={`px-6 py-3 rounded-full text-base font-medium transition-all duration-200 border-2
                        ${isSelected
                          ? "border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-200"
                          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* 2️⃣ RESEARCH FIELD */}
            <section ref={(el) => (sectionRefs.current[2] = el)} data-step="2" className="scroll-mt-32 pt-4">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Research Area</h2>
                <p className="text-slate-500 text-base">Select your primary field of research</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border-2 border-slate-100 shadow-sm flex flex-wrap gap-4">
                {[
                  "Physical Sciences",
                  "Life Sciences",
                  "Engineering",
                  "Medical Sciences",
                  "Social Sciences",
                  "Humanities",
                  "Mathematics",
                  "Interdisciplinary",
                ].map((f) => {
                  const isSelected = data.field === f;
                  return (
                    <button
                      key={f}
                      onClick={() => setData({ ...data, field: f })}
                      className={`px-6 py-3 rounded-full text-base font-medium transition-all duration-200 border-2
                        ${isSelected
                          ? "border-blue-600 bg-blue-600 text-white shadow-md shadow-blue-200"
                          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                    >
                      {f}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* 3️⃣ CAREER STAGE */}
            <section ref={(el) => (sectionRefs.current[3] = el)} data-step="3" className="scroll-mt-32 pt-4">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Career Stage</h2>
                <p className="text-slate-500 text-base">Where are you in your research career?</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border-2 border-slate-100 shadow-sm flex flex-wrap gap-4">
                {["PhD Student", "Postdoc", "Assistant Professor", "Professor"].map((s) => {
                  const isSelected = data.stage === s;
                  return (
                    <button
                      key={s}
                      onClick={() => setData({ ...data, stage: s })}
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

            {/* 4️⃣ INSTITUTION TYPE */}
            <section ref={(el) => (sectionRefs.current[4] = el)} data-step="4" className="scroll-mt-32 pt-4">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Institution Type</h2>
                <p className="text-slate-500 text-base">Type of organization you are affiliated with</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border-2 border-slate-100 shadow-sm">
                <div className="relative">
                <select 
                  value={data.institution}
                  onChange={(e) => setData({ ...data, institution: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all text-[15px] font-medium text-slate-700 bg-white appearance-none cursor-pointer"
                >
                  <option value="" disabled>Select institution type</option>
                  {[
                    "Central University",
                    "State University",
                    "IIT/NIT/IIIT",
                    "Private University",
                    "Research Institute",
                    "Medical College",
                  ].map(i => (
                    <option key={i} value={i}>{i}</option>
                  ))}
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </div>
                </div>
              </div>
            </section>

            {/* 5️⃣ FUNDING REQUIRED */}
            <section ref={(el) => (sectionRefs.current[5] = el)} data-step="5" className="scroll-mt-32 pt-4">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Funding Requirements</h2>
                <p className="text-slate-500 text-base">Estimate the funding needed for your project</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border-2 border-slate-100 shadow-sm">
                <div className="relative">
                <select 
                  value={data.funding}
                  onChange={(e) => setData({ ...data, funding: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all text-[15px] font-medium text-slate-700 bg-white appearance-none cursor-pointer"
                >
                  <option value="" disabled>Select funding requirement</option>
                  {[
                    "Under ₹10 Lakhs",
                    "₹10-25 Lakhs",
                    "₹25-50 Lakhs",
                    "Above ₹50 Lakhs",
                  ].map(f => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </div>
                </div>
              </div>

              <div className="mt-16 flex flex-col items-center">
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
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
                {!error && <p className="mt-4 text-sm text-slate-500">Fill in all steps to find your best research grants.</p>}
              </div>
            </section>

          </div>
        </main>
      </div>
    </div>
  );
};

export default ResearchPortal;