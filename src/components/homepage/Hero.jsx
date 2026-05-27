import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconSearch, IconScholarship, IconStartup, IconAgriculture, IconTender, IconWomen, IconResearch, IconCitizen } from "./Icons";

const pills = [
  { label: "Scholarships", Icon: IconScholarship, route: "/scholarships" },
  { label: "Startup MSME", Icon: IconStartup, route: "/startup-msme" },
  { label: "Agriculture", Icon: IconAgriculture, route: "/agriculture" },
  { label: "Tenders", Icon: IconTender, route: "/tenders" },
  { label: "Women Programs", Icon: IconWomen, route: "/women-programs" },
];

const ALL_SERVICES = [
  { Icon: IconScholarship, title: "Scholarships", route: "/scholarships" },
  { Icon: IconStartup, title: "Startup/MSME", route: "/startup-msme" },
  { Icon: IconAgriculture, title: "Agriculture", route: "/agriculture" },
  { Icon: IconWomen, title: "Women Programs", route: "/women-programs" },
  { Icon: IconResearch, title: "Research Grants", route: "/research-grants" },
  { Icon: IconTender, title: "Tenders/RFPs", route: "/tenders" },
  { Icon: IconCitizen, title: "Citizen Schemes", route: "/citizen-schemes" },
];

const Hero = ({ query, setQuery }) => {
  const navigate = useNavigate();
  const [isFocused, setIsFocus] = useState(false);

  const filtered = ALL_SERVICES.filter(s => 
    query && s.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section
      className="relative overflow-hidden flex items-center bg-gradient-to-br from-[#ece9ff] via-[#e8f0ff] to-[#f0eeff] min-h-[500px] md:min-h-[575px] -mt-[88px] pt-[88px]"
    >
      {/* Blob glows (Hidden/Simplified on mobile for performance) */}
      <div className="absolute top-[-100px] left-[-100px] w-[520px] h-[520px] rounded-full bg-radial-gradient from-[#a5b4fc]/45 to-transparent pointer-events-none z-0 hidden md:block" style={{ background: "radial-gradient(circle at 40% 40%, #a5b4fc 0%, transparent 65%)", opacity: 0.45 }} />
      <div className="absolute bottom-[-80px] right-[-80px] w-[440px] h-[440px] rounded-full bg-radial-gradient from-[#c4b5fd]/40 to-transparent pointer-events-none z-0 hidden md:block" style={{ background: "radial-gradient(circle at 60% 60%, #c4b5fd 0%, transparent 65%)", opacity: 0.4 }} />

      {/* LEFT IMAGE - Hidden on mobile */}
      <div className="absolute top-0 left-0 bottom-0 w-1/3 z-1 pointer-events-none overflow-hidden hidden lg:block">
        <img src="/docs-illustration.png" alt="" className="absolute bottom-[-5%] left-[-8%] w-[118%] h-[115%] object-contain object-bottom-left mix-blend-multiply saturate-[0.22] brightness-[1.15] contrast-[0.9] hue-rotate-[230deg] opacity-85" />
        <div className="absolute inset-0 bg-[#a5b4fc]/20 mix-blend-multiply z-[2]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#ece9ff]/5 via-[#e8f0ff]/72 to-[#e8f0ff] z-[3]" />
      </div>

      {/* RIGHT IMAGE - Hidden on mobile */}
      <div className="absolute top-0 right-0 bottom-0 w-1/3 z-1 pointer-events-none overflow-hidden hidden lg:block">
        <img src="/parliament-illustration.png" alt="" className="absolute bottom-[-5%] right-[-8%] w-[118%] h-[115%] object-contain object-bottom-right mix-blend-multiply saturate-[0.18] brightness-[1.18] contrast-[0.88] hue-rotate-[220deg] opacity-82" />
        <div className="absolute inset-0 bg-[#c4b5fd]/22 mix-blend-multiply z-[2]" />
        <div className="absolute inset-0 bg-gradient-to-l from-[#f0eeff]/5 via-[#edf4ff]/72 to-[#edf4ff] z-[3]" />
      </div>

      {/* CENTER CONTENT */}
      <div className="relative z-10 w-full flex flex-col items-center px-6 py-12 md:py-20">
        <span className="inline-flex items-center gap-1.5 bg-white/88 border border-[#bfdbfe] text-[#1d4ed8] text-[0.7rem] md:text-[0.78rem] font-bold px-4 md:px-5 py-2 rounded-full backdrop-blur-md shadow-md mb-6 tracking-wide uppercase">
          Welcome to FormEase
        </span>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0f172a] leading-[1.2] mb-5 tracking-tight text-center max-w-4xl">
          Discover Scholarships, Grants,<br className="hidden md:block" />
          Tenders &{" "}
          <span className="text-[#1d4ed8] inline border-b-[3px] border-[#3b82f6] pb-0.5">
            Opportunities
          </span>
        </h1>

        <p className="text-[#64748b] text-[0.85rem] md:text-[0.95rem] max-w-md mb-10 leading-relaxed text-center">
          Find and apply for government schemes, startup funding, agriculture subsidies, and legal documents in one unified platform.
        </p>

        {/* Search */}
        <div className="relative w-full max-w-lg">
          <div className="flex items-center bg-white/95 border-1.5 border-[#dbeafe] rounded-full overflow-hidden shadow-xl w-full backdrop-blur-md transition-all focus-within:ring-4 focus-within:ring-blue-100 focus-within:border-blue-300">
            <span className="pl-4.5 flex items-center flex-shrink-0">
              <IconSearch />
            </span>
            <input 
              type="text" 
              value={query} 
              onChange={e => setQuery(e.target.value)} 
              onFocus={() => setIsFocus(true)}
              onBlur={() => setTimeout(() => setIsFocus(false), 200)}
              placeholder="Search documents, services..."
              className="flex-1 border-none outline-none px-3 py-3.5 md:py-4 text-sm md:text-[0.9rem] text-[#1e293b] bg-transparent" 
            />
            <button
              className="bg-[#1d4ed8] text-white border-none px-6 md:px-8 font-bold text-sm cursor-pointer transition-colors hover:bg-[#1e40af] whitespace-nowrap self-stretch flex items-center justify-center ml-[-1px]"
            >Search</button>
          </div>

          {/* DROPDOWN */}
          {isFocused && filtered.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="py-2">
                {filtered.map(({ title, route, Icon: SvcIcon }) => (
                  <button
                    key={title}
                    onMouseDown={(e) => { 
                      e.preventDefault(); // Prevent blur from firing before this
                      navigate(route); 
                      setQuery(""); 
                      setIsFocus(false);
                    }}
                    className="w-full flex items-center gap-3 px-5 py-3 hover:bg-slate-50 transition-colors border-none bg-transparent cursor-pointer text-left group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <SvcIcon size={18} />
                    </div>
                    <span className="text-sm font-semibold text-slate-700">{title}</span>
                    <span className="ml-auto text-[0.7rem] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded uppercase tracking-wider group-hover:text-blue-500">Open Form</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Pills */}
        <div className="flex flex-wrap justify-center gap-2.5 mt-8 max-w-2xl">
          {pills.map(({ label, Icon: PillIcon, route }) => (
            <button 
              key={label} 
              onClick={() => route && navigate(route)}
              className="flex items-center gap-1.5 bg-white/92 border border-[#dbeafe] rounded-full px-4 py-2 text-[0.75rem] md:text-[0.8rem] text-[#374151] font-semibold cursor-pointer shadow-sm transition-all backdrop-blur-md hover:border-[#93c5fd] hover:text-[#1d4ed8] hover:bg-[#f0f7ff]/95"
            >
              <PillIcon size={14} color="#2563eb" /> {label}
            </button>
          ))}
        </div>
      </div>

      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 right-0 leading-0 z-20 pointer-events-none">
        <svg viewBox="0 0 1440 72" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="block w-full h-[40px] md:h-[72px]">
          <path d="M0,40 C180,80 360,0 540,36 C720,72 900,10 1080,44 C1260,78 1380,28 1440,40 L1440,72 L0,72 Z" fill="#f0f7ff" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
