import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/* ── Inline SVG icons for each category ─────────────────────── */
const IconBanking = ({ size = 22, color = "#2563eb" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 7V5a2 2 0 0 0-4 0v2M12 12v4M8 12v4" />
    <path d="M2 11h20" />
  </svg>
);

const IconHealth = ({ size = 22, color = "#16a34a" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.72-8.72 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const IconHousing = ({ size = 22, color = "#2563eb" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const IconSafety = ({ size = 22, color = "#64748b" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const IconScience = ({ size = 22, color = "#d97706" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const IconSkills = ({ size = 22, color = "#dc2626" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M8 21h8M12 17v4" />
    <path d="M7 8h10M7 12h6" />
  </svg>
);

const IconSocial = ({ size = 22, color = "#7c3aed" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const IconSports = ({ size = 22, color = "#16a34a" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </svg>
);

const IconTransport = ({ size = 22, color = "#0891b2" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13" rx="2" />
    <path d="M16 8h4l3 5v3h-7V8z" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

const IconTravel = ({ size = 22, color = "#dc2626" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21 4 19 2c-2-2-4-2-5.5-.5L10 5 1.8 6.2l5.7 5.7-1 4.8 4.8-1 5.5 5.5z" />
  </svg>
);

const IconUtility = ({ size = 22, color = "#2563eb" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);

const IconWomenChild = ({ size = 22, color = "#db2777" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="5" r="3" />
    <path d="M12 8v6M9 14l3 6 3-6" />
    <path d="M9 11H6M15 11h3" />
  </svg>
);

/* ── Category data ───────────────────────────────────────────── */
const categories = [
  {
    id: "banking",
    Icon: IconBanking,
    iconBg: "#eff6ff",
    title: "Banking, Financial Services and Insurance",
    desc: "Loans, insurance schemes, and financial assistance programs",
    count: 326,
  },
  {
    id: "health",
    Icon: IconHealth,
    iconBg: "#f0fdf4",
    title: "Health & Wellness",
    desc: "Healthcare schemes, insurance, and wellness programs",
    count: 287,
  },
  {
    id: "housing",
    Icon: IconHousing,
    iconBg: "#eff6ff",
    title: "Housing & Shelter",
    desc: "Housing schemes, affordable housing, and shelter programs",
    count: 133,
  },
  {
    id: "safety",
    Icon: IconSafety,
    iconBg: "#f8fafc",
    title: "Public Safety, Law & Justice",
    desc: "Legal aid, safety programs, and justice initiatives",
    count: 33,
  },
  {
    id: "science",
    Icon: IconScience,
    iconBg: "#fffbeb",
    title: "Science, IT & Communications",
    desc: "Technology schemes, innovation programs, and digital initiatives",
    count: 105,
  },
  {
    id: "skills",
    Icon: IconSkills,
    iconBg: "#fff1f2",
    title: "Skills & Employment",
    desc: "Skill training, employment programs, and job assistance",
    count: 395,
  },
  {
    id: "social",
    Icon: IconSocial,
    iconBg: "#f5f3ff",
    title: "Social Welfare & Empowerment",
    desc: "Social security, welfare programs, and empowerment schemes",
    count: 1432,
  },
  {
    id: "sports",
    Icon: IconSports,
    iconBg: "#f0fdf4",
    title: "Sports & Culture",
    desc: "Sports development, cultural programs, and talent support",
    count: 258,
  },
  {
    id: "transport",
    Icon: IconTransport,
    iconBg: "#ecfeff",
    title: "Transport & Infrastructure",
    desc: "Transportation schemes and infrastructure development",
    count: 90,
  },
  {
    id: "travel",
    Icon: IconTravel,
    iconBg: "#fff1f2",
    title: "Travel & Tourism",
    desc: "Tourism promotion, travel subsidies, and hospitality support",
    count: 97,
  },
  {
    id: "utility",
    Icon: IconUtility,
    iconBg: "#eff6ff",
    title: "Utility & Sanitation",
    desc: "Water, sanitation, and utility service schemes",
    count: 58,
  },
  {
    id: "women",
    Icon: IconWomenChild,
    iconBg: "#fdf2f8",
    title: "Women and Child",
    desc: "Programs for women, children, and family welfare",
    count: 464,
  },
];

/* ── Component ───────────────────────────────────────────────── */
const CitizenSchemesPortal = () => {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f5f7fb] flex justify-center px-4 py-8 md:py-12">
      <div
        className="w-full max-w-6xl bg-white rounded-2xl overflow-hidden"
        style={{
          boxShadow:
            "0 2px 8px rgba(0,0,0,0.06), 0 8px 32px rgba(37,99,235,0.09), 0 24px 64px rgba(37,99,235,0.06), inset 0 0 0 1px rgba(226,232,240,0.9)",
        }}
      >
        {/* ── Header ──────────────────────────────────────────── */}
        <div className="px-8 md:px-14 pt-10 pb-6 border-b border-[#f1f5f9]">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-[#2563eb] text-sm font-semibold bg-transparent border-none cursor-pointer p-0 mb-6 hover:opacity-75 transition-opacity"
          >
            ← Back
          </button>
          <h1 className="text-[1.75rem] md:text-[2rem] font-extrabold text-[#0f172a] text-center mb-1">
            Select a Category
          </h1>
          <p className="text-[#2563eb] text-[0.88rem] md:text-[0.93rem] text-center max-w-md mx-auto">
            Choose from various scheme categories to find opportunities that match your needs
          </p>
        </div>

        {/* ── Grid ────────────────────────────────────────────── */}
        <div className="px-6 md:px-12 py-8 md:py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {categories.map(({ id, Icon, iconBg, title, desc, count }) => {
              const isActive = selected === id;
              return (
                <div
                  key={id}
                  onClick={() => setSelected(id)}
                  className="bg-white border rounded-2xl p-6 cursor-pointer flex flex-col justify-between transition-all duration-200"
                  style={{
                    borderColor: isActive ? "#3b82f6" : "#e2e8f0",
                    boxShadow: isActive
                      ? "0 0 0 1.5px #3b82f6, 0 4px 16px rgba(37,99,235,0.13)"
                      : "0 1px 3px rgba(0,0,0,0.05), 0 4px 12px rgba(37,99,235,0.05)",
                    backgroundColor: isActive ? "#f0f7ff" : "#fff",
                    transform: isActive ? "translateY(-3px)" : "translateY(0)",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.boxShadow =
                        "0 4px 8px rgba(0,0,0,0.07), 0 12px 32px rgba(37,99,235,0.1)";
                      e.currentTarget.style.transform = "translateY(-3px)";
                      e.currentTarget.style.borderColor = "#bfdbfe";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.boxShadow =
                        "0 1px 3px rgba(0,0,0,0.05), 0 4px 12px rgba(37,99,235,0.05)";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.borderColor = "#e2e8f0";
                    }
                  }}
                >
                  <div>
                    {/* Icon row + count badge */}
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: iconBg }}
                      >
                        <Icon size={22} />
                      </div>
                      <span className="text-[#0369a1] text-[0.72rem] font-bold bg-[#f0f9ff] border border-[#bae6fd] px-2.5 py-0.5 rounded-full">
                        {count}
                      </span>
                    </div>

                    <h3 className="text-[0.95rem] font-bold text-[#0f172a] mb-1 leading-snug">
                      {title}
                    </h3>
                    <p className="text-[0.82rem] text-[#64748b] leading-relaxed">
                      {desc}
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/citizen-schemes/${id}`);
                    }}
                    className="mt-5 inline-flex items-center gap-1 text-[#1d4ed8] text-[0.82rem] font-bold bg-transparent border-none cursor-pointer p-0 group"
                  >
                    Explore{" "}
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </button>
                </div>
              );
            })}
          </div>

          {/* ── CTA ─────────────────────────────────────────── */}
          {selected && (
            <div className="flex justify-center mt-10">
              <button
                onClick={() => {
                  navigate(`/citizen-schemes/${selected}`);
                }}
                className="bg-[#1e3a8a] text-white border-none px-10 py-3.5 rounded-xl font-bold text-sm cursor-pointer shadow-md transition-colors hover:bg-[#1e40af]"
              >
                Explore {categories.find((c) => c.id === selected)?.title} →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CitizenSchemesPortal;
