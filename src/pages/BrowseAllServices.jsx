import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  IconScholarship, 
  IconStartup, 
  IconAgriculture, 
  IconWomen, 
  IconResearch, 
  IconTender, 
  IconCitizen 
} from "../components/homepage/Icons";

const ALL_SERVICES = [
  { Icon: IconScholarship, title: "Scholarships",   desc: "Find and apply for national and international scholarships matching your profile.", count: "3 Steps", route: "/scholarships" },
    { Icon: IconCitizen, title: "Citizen Schemes", desc: "Explore 3,000+ government welfare schemes across 12 categories — banking, health, housing, and more.", count: "12 Categories", route: "/citizen-schemes" },
  { Icon: IconStartup, title: "Startup/MSME",   desc: "Explore grants, subsidies, and funding opportunities for your business venture.", count: "3 Steps", route: "/startup-msme" },
  { Icon: IconAgriculture, title: "Agriculture",   desc: "Discover government schemes, crop insurance, and subsidies for farmers.", count: "3 Steps", route: "/agriculture" },
  { Icon: IconWomen, title: "Women Programs", desc: "Empowering opportunities in entrepreneurship, education, and skill growth.", count: "3 Steps", route: "/women-programs" },
  { Icon: IconResearch, title: "Research Grants", desc: "Scientific and academic funding for researchers, PhDs, and professors.", count: "5 Steps", route: "/research-grants" },
  { Icon: IconTender, title: "Tenders/RFPs", desc: "Global and domestic business opportunities, procurement, and contracts.", count: "5 Steps", route: "/tenders" },
];

const BrowseAllServices = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8fbff] font-['Inter',_sans-serif] relative overflow-hidden">
      
      {/* SIDE IMAGE - Inspired by Hero.jsx but for the full page */}
      <div className="absolute top-0 left-0 bottom-0 w-1/3 z-0 pointer-events-none overflow-hidden hidden lg:block">
        <img 
            src="/ashoka-stambh.png" 
            alt="" 
            className="absolute top-[10%] left-[-10%] w-[120%] h-auto object-contain saturate-[0.1] brightness-[1.1] contrast-[0.9] opacity-20" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f8fbff]/20 via-[#f8fbff]/10 to-[#f8fbff] z-[1]" />
      </div>

      {/* Header Section */}
      <div className="relative z-10 pt-20 pb-12 px-6">
        <div className="max-w-[1000px] mx-auto text-center">
            <h1 className="text-5xl md:text-5xl font-[800] mb-6 tracking-tighter">
                Browse All <span className="text-blue-700">Services.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-medium">
                Select a category below to explore government initiatives, specialized portals, and welfare programs designed for you.
            </p>
        </div>
      </div>

      {/* Grid Section */}
      <div className="relative z-10 container mx-3 px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1180px] mx-auto">
            {ALL_SERVICES.map(({ Icon: SvcIcon, title, desc, count, route }, i) => (
                <div 
                    key={i} 
                    className="bg-white rounded-[0.9rem] p-6 flex flex-col justify-between cursor-pointer group transition-all duration-300"
                    style={{
                        boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(37,99,235,0.06), 0 0 0 1px rgba(226,232,240,0.8)",
                        borderTop: "2.5px solid transparent",
                      
                        backgroundOrigin: "border-box",
                        backgroundClip: "padding-box, border-box",
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.backgroundImage = "linear-gradient(white, white), linear-gradient(90deg, #3b82f6 0%, #6366f1 100%)",
                        e.currentTarget.style.boxShadow = "0 20px 40px rgba(37,99,235,0.1), 0 0 0 1px #bfdbfe";
                        e.currentTarget.style.transform = "translateY(-10px)";
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.backgroundImage = "";
                        e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(37,99,235,0.06), 0 0 0 1px rgba(226,232,240,0.8)";
                        e.currentTarget.style.transform = "translateY(0)";
                    }}
                    onClick={() => navigate(route)}
                >
                    <div>
                        <div className="flex items-start justify-between mb-8">
                            <div className="w-14 h-14 bg-blue-50 rounded-[0.5rem] flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                <SvcIcon size={28} />
                            </div>
                            <span className="bg-blue-50 text-blue-700 text-[0.7rem] font-bold px-4 py-1.5 rounded-full border border-blue-100 shadow-sm">
                                {count}
                            </span>
                        </div>
                        <h3 className="text-[1.4rem] font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                            {title}
                        </h3>
                        <p className="text-slate-500 font-medium text-sm leading-relaxed mb-0">
                            {desc}
                        </p>
                    </div>
                    <div className="mt-10 flex items-center gap-2 text-[0.85rem] font-black text-blue-600 group-hover:gap-3 transition-all">
                        Apply Now 
                        <span className="text-xl transition-transform group-hover:translate-x-0.5">→</span>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BrowseAllServices;

