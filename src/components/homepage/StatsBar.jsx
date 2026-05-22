import React from "react";
import { IconUsers, IconDoc, IconShield, IconStar } from "./Icons";

const stats = [
  { Icon: IconUsers,  value: "50,000+", label: "Applications Filed" },
  { Icon: IconDoc,    value: "3+",      label: "Documents Supported" },
  { Icon: IconShield, value: "98%",     label: "Success Rate" },
  { Icon: IconStar,   value: "4.9/5",   label: "User Rating" },
];

const StatsBar = () => {
  return (
    <section className="bg-[#f0f7ff] pb-10 md:pb-14">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="bg-white border border-[#e2e8f0] rounded-2xl md:rounded-3xl shadow-lg grid grid-cols-2 md:grid-cols-4 overflow-hidden">
          {stats.map(({ Icon: StatIcon, value, label }, i) => (
            <div 
              key={label} 
              className={`flex items-center gap-3.5 p-5 md:p-6 lg:p-7 ${
                i % 2 === 0 ? "border-r border-[#f1f5f9]" : "md:border-r md:border-[#f1f5f9]"
              } ${
                i < 2 ? "border-b border-[#f1f5f9] md:border-b-0" : ""
              } ${
                i === 3 ? "md:border-r-0" : ""
              }`}
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#eff6ff] flex items-center justify-center flex-shrink-0">
                <StatIcon size={20} color="#2563eb" />
              </div>
              <div>
                <div className="text-lg md:text-[1.3rem] font-extrabold text-[#1d4ed8] leading-tight">{value}</div>
                <div className="text-[0.7rem] md:text-[0.78rem] color-[#64748b] font-medium uppercase tracking-wide opacity-80">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
