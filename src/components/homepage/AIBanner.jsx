import { Link } from "react-router-dom";
import { IconBot } from "./Icons";

const AIBanner = () => {
  return (
    <>
      {/* Wave → AI Banner */}
      <div className="bg-[#f8fafc] leading-none">
        <svg viewBox="0 0 1440 56" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="block w-full h-[40px] md:h-[56px]">
          <path d="M0,28 C240,56 480,0 720,28 C960,56 1200,8 1440,28 L1440,56 L0,56 Z" fill="white" />
        </svg>
      </div>

      <section className="bg-white px-6 pb-14 md:pb-16">
        <div className="max-w-[1100px] mx-auto">
          <div className="bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#1d4ed8] rounded-[24px] md:rounded-[32px] p-8 md:p-12 lg:p-14 flex flex-col lg:flex-row lg:items-center justify-between gap-8 md:gap-10 shadow-2xl overflow-hidden relative">
            
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

            <div className="flex-1 text-center lg:text-left z-10">
              <span className="inline-flex items-center gap-2 bg-white/10 text-white/90 text-[0.7rem] md:text-[0.75rem] font-bold px-4 py-1.5 rounded-full mb-5 tracking-widest uppercase border border-white/20">
                <IconBot size={15} color="white" /> AI-Powered Assistance
              </span>
              <h3 className="text-[1.3rem] md:text-2xl font-extrabold text-white mb-3 tracking-tight">
                Can't Find What You're Looking For?
              </h3>
              <p className="text-white/70 text-[0.85rem] md:text-[0.9rem] leading-relaxed max-w-md mx-auto lg:mx-0">
                Use our AI assistant to get personalized guidance for any document application — available 24/7.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:justify-center lg:justify-end z-10">
              <Link to="/ai-helper" className="bg-white text-[#1e3a8a] border-none px-6 py-3.5 rounded-xl font-bold text-sm cursor-pointer flex items-center justify-center gap-2 transition-opacity hover:opacity-90 text-decoration-none">
                <IconBot size={16} color="#1e3a8a" /> Try AI Helper
              </Link>
              <Link to="/contact" className="bg-white/10 text-white/90 border border-white/25 px-6 py-3.5 rounded-xl font-bold text-sm cursor-pointer transition-colors hover:bg-white/15 text-decoration-none flex items-center justify-center">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AIBanner;
