import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { IconScholarship, IconStartup, IconAgriculture, IconWomen, IconResearch, IconTender, IconCitizen } from "./Icons";

const services = [
  { Icon: IconScholarship, title: "Scholarships",   desc: "Find and apply for national and international scholarships matching your profile.", count: "3 Steps", route: "/scholarships" },
    { Icon: IconCitizen, title: "Citizen Schemes", desc: "Explore 3,000+ government welfare schemes across 12 categories — banking, health, housing, and more.", count: "12 Categories", route: "/citizen-schemes" },
  { Icon: IconStartup, title: "Startup/MSME",   desc: "Explore grants, subsidies, and funding opportunities for your business venture.", count: "3 Steps", route: "/startup-msme" },
  { Icon: IconAgriculture, title: "Agriculture",   desc: "Discover government schemes, crop insurance, and subsidies for farmers.", count: "3 Steps", route: "/agriculture" },
  { Icon: IconWomen, title: "Women Programs", desc: "Empowering opportunities in entrepreneurship, education, and skill growth.", count: "3 Steps", route: "/women-programs" },
  { Icon: IconResearch, title: "Research Grants", desc: "Scientific and academic funding for researchers, PhDs, and professors.", count: "5 Steps", route: "/research-grants" },
  { Icon: IconTender, title: "Tenders/RFPs", desc: "Global and domestic business opportunities, procurement, and contracts.", count: "5 Steps", route: "/tenders" },
];

const BrowseServices = ({ query = "" }) => {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);

  const filtered = services.filter(s => 
    s.title.toLowerCase().includes(query.toLowerCase()) || 
    s.desc.toLowerCase().includes(query.toLowerCase())
  );

  const displayedServices = showAll ? filtered : filtered.slice(0, 6);

  return (
    <>
      {/* Wave → Browse */}
      <div className="bg-[#f0f7ff] leading-none">
        <svg viewBox="0 0 1440 56" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="block w-full h-[40px] md:h-[56px]">
          <path d="M0,28 C240,56 480,0 720,28 C960,56 1200,8 1440,28 L1440,56 L0,56 Z" fill="white" />
        </svg>
      </div>

      <section className="bg-white py-12 md:py-16 px-6">
        <div className="max-w-[1100px] mx-auto text-center md:text-left">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-[1.6rem] md:text-[1.9rem] font-extrabold text-[#0f172a] mb-2">Browse All Services</h2>
            <p className="text-[#64748b] text-[0.85rem] md:text-[0.93rem] max-w-lg mx-auto">Select a document type to start your guided application</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {displayedServices.map(({ Icon: SvcIcon, title, desc, count, route }) => (
              <div 
                key={title}
                className="bg-white border border-[#e2e8f0] rounded-2xl p-7 flex flex-col justify-between cursor-pointer group"
                style={{
                  transition: "all 0.28s cubic-bezier(0.4,0,0.2,1)",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(37,99,235,0.06), 0 0 0 1px rgba(226,232,240,0.8)",
                  borderTop: "2.5px solid transparent",
                  backgroundImage: "linear-gradient(white, white), linear-gradient(90deg, #3b82f6 0%, #6366f1 100%)",
                  backgroundOrigin: "border-box",
                  backgroundClip: "padding-box, border-box",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.07), 0 12px 32px rgba(37,99,235,0.13), 0 2px 0 0 #3b82f6 inset";
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.borderColor = "#bfdbfe";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(37,99,235,0.06), 0 0 0 1px rgba(226,232,240,0.8)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "#e2e8f0";
                }}
              >
                <div>
                  <div className="flex items-start justify-between mb-5 px-1">
                    <div className="w-12 h-12 bg-[#eff6ff] rounded-2xl flex items-center justify-center">
                      <SvcIcon size={24} color="#2563eb" />
                    </div>
                    <span className="bg-[#f0f9ff] text-[#0369a1] text-[0.72rem] font-bold px-3 py-1 rounded-full border border-[#bae6fd]">{count}</span>
                  </div>
                  <h3 className="text-[1.05rem] font-bold text-[#0f172a] mb-2">{title}</h3>
                  <p className="text-[0.85rem] text-[#64748b] leading-relaxed mb-0">{desc}</p>
                </div>
                <button 
                  onClick={() => navigate(route)}
                  className="mt-6 inline-flex items-center gap-1 text-[#1d4ed8] text-[0.85rem] font-bold bg-transparent border-none cursor-pointer p-0 transition-all group"
                >
                  Apply Now <span className="text-lg transition-transform group-hover:translate-x-1">→</span>
                </button>
              </div>
            ))}
          </div>

          {filtered.length > 6 && (
            <div className="flex justify-center mt-10">
              <button
                onClick={() => setShowAll(!showAll)}
                className="px-6 py-3 bg-[#2563eb] text-white rounded-xl font-semibold hover:bg-[#1d4ed8] transition flex items-center gap-2"
              >
                {showAll ? "Show Less" : "All Services"}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    transform: showAll ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s"
                  }}
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
            </div>
          )}
        </div>
        
      </section>
    </>
  );
};

export default BrowseServices;
