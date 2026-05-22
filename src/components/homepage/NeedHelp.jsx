import { IconScholarship, IconStartup, IconAgriculture, IconStatus, IconRefresh, IconPhone } from "./Icons";
import { Link } from "react-router-dom";

const helpServices = [
  { Icon: IconStatus,  title: "Status Tracking",      desc: "Track your application in real-time", path: "/help/status" },
  { Icon: IconRefresh, title: "Correction Services",  desc: "Update errors in existing applications", path: "/help/correction" },
  { Icon: IconPhone,   title: "Expert Support",       desc: "Talk to an application expert live", path: "/help/expert" },
];

const NeedHelp = () => {
  return (
    <>
      {/* Wave → Help */}
      <div className="bg-white leading-none">
        <svg viewBox="0 0 1440 56" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="block w-full h-[40px] md:h-[56px]">
          <path d="M0,28 C360,0 720,56 1080,28 C1260,14 1380,42 1440,28 L1440,56 L0,56 Z" fill="#f8fafc" />
        </svg>
      </div>

      <section className="bg-[#f8fafc] py-12 md:py-16 px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-[1.6rem] md:text-[1.9rem] font-extrabold text-[#0f172a] mb-2">Need Help with Applications?</h2>
            <p className="text-[#64748b] text-[0.85rem] md:text-[0.93rem] max-w-lg mx-auto">Our expert team provides professional assistance for all scheme applications</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {helpServices.map(({ Icon: HIcon, title, desc, path }) => (
              <div 
                key={title}
                className="bg-white border border-[#e2e8f0] rounded-2xl p-6 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 hover:border-[#bfdbfe]"
                style={{ transition: "all 0.25s" }}
              >
                <div className="w-11 h-11 bg-[#eff6ff] rounded-xl flex items-center justify-center mb-4">
                  <HIcon size={22} color="#2563eb" />
                </div>
                <h4 className="font-bold text-[#0f172a] mb-2 text-[0.95rem]">{title}</h4>
                <p className="text-[0.83rem] text-[#64748b] leading-relaxed mb-4">{desc}</p>
                <Link to={path} className="text-[0.82rem] text-[#1d4ed8] font-bold bg-transparent border-none cursor-pointer p-0 inline-flex items-center gap-1 group text-decoration-none">
                  Learn More <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            ))}
          </div>


        </div>
      </section>
    </>
  );
};

export default NeedHelp;
