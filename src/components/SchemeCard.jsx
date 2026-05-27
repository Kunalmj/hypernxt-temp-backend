import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AssistanceModal from "./homepage/AssistanceModal";

const themeStyles = {
  blue: {
    tagBg: "#eff6ff",
    tagBorder: "#bfdbfe",
    tagText: "#1d4ed8",
    hoverShadow: "0 4px 8px rgba(0,0,0,0.07), 0 12px 28px rgba(37,99,235,0.11), inset 0 0 0 1px #bfdbfe",
    primaryBtn: "bg-[#1e3a8a] hover:bg-[#1e40af]",
    btnShadow: "0 2px 8px rgba(30,58,138,0.25)",
    textPrimary: "text-[#1d4ed8]",
    textSecondary: "text-[#1e3a8a]",
    bgLight: "bg-blue-50",
    borderLight: "border-blue-100",
    textLight: "text-blue-700",
    textMuted: "text-blue-500",
    textMutedSecondary: "text-blue-600",
    gradientFrom: "from-blue-50",
    gradientTo: "to-blue-50",
    accentBorder: "border-[#bfdbfe]"
  },
  green: {
    tagBg: "#f0fdf4",
    tagBorder: "#819bd2",
    tagText: "#2563eb",
    hoverShadow: "0 4px 8px rgba(0,0,0,0.07), 0 12px 28px rgba(22,163,74,0.11), inset 0 0 0 1px #bbf7d0",
    primaryBtn: "bg-[#2563eb] hover:bg-[#1d4ed8]",
    btnShadow: "0 2px 8px rgba(37,99,235,0.25)",
    textPrimary: "text-[#2563eb]",
    textSecondary: "text-[#2563eb]",
    bgLight: "bg-[#f0fdf4]",
    borderLight: "border-[#bbf7d0]",
    textLight: "text-[#2563eb]",
    textMuted: "text-[#2563eb]",
    textMutedSecondary: "text-[#1d4ed8]",
    gradientFrom: "from-green-50",
    gradientTo: "to-green-50",
    accentBorder: "border-[#bbf7d0]"
  }
};

const SchemeCard = ({
  scheme,
  expandedId,
  setExpandedId,
  setSelectedService,
  setShowModal,
  colorTheme = "blue"
}) => {
  const navigate = useNavigate();
  const [showAssistanceModal, setShowAssistanceModal] = useState(false);
  const t = themeStyles[colorTheme] || themeStyles.blue;
  const isExpanded = expandedId === scheme.id;

  const parseList = (val, defaultList) => {
    if (!val) return defaultList;
    if (Array.isArray(val)) return val.length > 0 ? val : defaultList;
    if (typeof val === "string") {
      return val
        .split(/\n|\r\n/)
        .map((line) => line.replace(/^[-\*\d\.\>\s#]+/, "").trim())
        .filter((line) => line.length > 0);
    }
    return defaultList;
  };

  // Safe tag extraction
  const tags = Array.isArray(scheme.tags) ? scheme.tags : [];

  // Default values
  const benefitsList = parseList(scheme.benefits, [
    scheme.benefit || "Financial assistance or subsidy as per scheme guidelines",
    "Direct transfer of benefits into the bank account of the beneficiary",
    "Aims to reduce the financial burden on eligible citizens",
    "Empowers individuals and families to access essential resources"
  ]);

  const docsList = parseList(scheme.documentsRequired || scheme.documents, [
    "Aadhaar Card",
    "Identity Proof (Voter ID, PAN Card, etc.)",
    "Address Proof (Utility Bill, Domicile Certificate, etc.)",
    "Bank Account Details (Aadhaar linked)",
    "Active Mobile Number",
    "Income Certificate (if applicable)"
  ]);

  const approvalProcess = scheme.selectionProcess || scheme.application_process || "Verification of eligibility and documents -> Application submission -> Nodal Officer review -> Final approval and direct benefit disbursement.";
  const renewalPolicy = scheme.renewalPolicy || "Subject to periodic eligibility verification and active Aadhaar-seeded bank account.";

  const importantDates = {
    applicationStart: "Ongoing",
    applicationEnd: scheme.deadline || "No deadline",
    shortlistAnnouncement: "Rolling basis",
    disbursement: "Direct Benefit Transfer"
  };

  const contact = {
    email: "support@myscheme.gov.in",
    helpline: "1800-110-033 / 011-24300606"
  };

  return (
    <div
      className="bg-white rounded-2xl p-6 transition-all duration-200 flex flex-col md:flex-row flex-wrap gap-6 md:items-start overflow-hidden border border-slate-200"
      style={{
        boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 4px 12px rgba(37,99,235,0.06), inset 0 0 0 1px rgba(226,232,240,0.8)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = t.hoverShadow;
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.05), 0 4px 12px rgba(37,99,235,0.06), inset 0 0 0 1px rgba(226,232,240,0.8)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Left Content */}
      <div className="flex-1 min-w-0 space-y-3">
        <h3 className={`text-[1.1rem] font-bold ${t.textPrimary} mb-0.5 leading-snug cursor-pointer hover:underline`}>
          {scheme.title}
        </h3>
        <p className="text-[0.77rem] text-[#64748b] font-medium">{scheme.ministry}</p>
        <p className="text-[0.83rem] text-[#374151] leading-relaxed">
          {isExpanded
            ? scheme.desc
            : scheme.desc && scheme.desc.length > 180
            ? scheme.desc.slice(0, 180) + "..."
            : scheme.desc}
        </p>

        {/* Location & Eligibility */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-[#64748b] pt-1">
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-[#94a3b8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {scheme.state === "General" ? "All India" : scheme.state}
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-[#94a3b8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="truncate max-w-[200px] md:max-w-xs">{scheme.beneficiaryType || "General Public"}</span>
          </div>
        </div>

        {/* Tag Badges */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center text-[0.72rem] font-semibold px-2.5 py-0.5 rounded-full border"
              style={{ background: t.tagBg, borderColor: t.tagBorder, color: t.tagText }}
            >
              {tag}
            </span>
          ))}
        </div>

        {scheme.website && (
          <div className="pt-2">
            <a
              href={scheme.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 font-semibold"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Official Website: <span className="underline">{scheme.website}</span>
            </a>
          </div>
        )}
      </div>

      {/* Right Sidebar Meta + Actions */}
      <div className="w-full md:w-48 flex-shrink-0 flex flex-col gap-3 justify-between md:items-end">
        {/* Meta Grid */}
        <div className="flex flex-col gap-2 w-full">
          <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-xl px-3 py-2">
            <p className="text-[0.68rem] text-[#16a34a] font-bold uppercase tracking-wide mb-0.5">Benefit Amount</p>
            <p className="text-[0.88rem] font-extrabold text-[#15803d]">{scheme.benefit}</p>
          </div>
          <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl px-3 py-2">
            <p className="text-[0.68rem] text-[#64748b] font-bold uppercase tracking-wide mb-0.5">Deadline</p>
            <p className="text-[0.82rem] font-semibold text-[#0f172a]">{scheme.deadline}</p>
          </div>
          <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl px-3 py-2">
            <p className="text-[0.68rem] text-[#64748b] font-bold uppercase tracking-wide mb-0.5">Beneficiaries</p>
            <p className="text-[0.82rem] font-semibold text-[#0f172a]">{scheme.beneficiaries || "Open"}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 w-full">
          <button
            onClick={() => navigate("/citizen-apply", { state: { scheme: scheme } })}
            className={`w-full inline-flex items-center justify-center gap-1.5 ${t.primaryBtn} text-white text-[0.8rem] font-bold rounded-xl px-4 py-2.5 border-none cursor-pointer transition-colors`}
            style={{ boxShadow: t.btnShadow }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block mr-1">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            Apply Now
          </button>
          <button
            onClick={() => setExpandedId(isExpanded ? null : scheme.id)}
            className="w-full inline-flex items-center justify-center gap-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-[0.8rem] font-bold rounded-xl px-4 py-2.5 cursor-pointer transition-colors"
          >
            {isExpanded ? "Hide Details" : "View Details"}
          </button>
        </div>
      </div>

      {/* Expandable Dropdown Panel */}
      {isExpanded && (
        <div className="w-full border-t border-slate-100 pt-6 mt-6 animate-fadeIn">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <div className={`${t.bgLight} rounded-xl p-4 border ${t.borderLight}`}>
              <p className={`text-[0.7rem] font-bold ${t.textMuted} uppercase tracking-wider mb-1`}>Financial Benefit</p>
              <p className={`text-sm font-extrabold ${t.textLight}`}>{scheme.benefit}</p>
            </div>
            <div className={`${t.bgLight} rounded-xl p-4 border ${t.borderLight}`}>
              <p className={`text-[0.7rem] font-bold ${t.textMuted} uppercase tracking-wider mb-1`}>Deadline</p>
              <p className={`text-sm font-extrabold ${t.textLight}`}>{scheme.deadline}</p>
            </div>
            <div className={`${t.bgLight} rounded-xl p-4 border ${t.borderLight}`}>
              <p className={`text-[0.7rem] font-bold ${t.textMuted} uppercase tracking-wider mb-1`}>Scheme Type</p>
              <p className={`text-sm font-extrabold ${t.textLight}`}>{scheme.sponsor || "Govt Scheme"}</p>
            </div>
            <div className={`${t.bgLight} rounded-xl p-4 border ${t.borderLight}`}>
              <p className={`text-[0.7rem] font-bold ${t.textMuted} uppercase tracking-wider mb-1`}>Application Mode</p>
              <p className={`text-sm font-extrabold ${t.textLight}`}>Online / CSC Portal</p>
            </div>
          </div>

          {/* Stepper / Lists Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Benefits & Support */}
            <div className="bg-white rounded-xl p-5 border border-slate-200">
              <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                <span className={`w-6 h-6 ${t.bgLight} rounded-lg flex items-center justify-center ${t.textLight} text-xs`}>★</span>
                Benefits & Support
              </h4>
              <ul className="space-y-2">
                {benefitsList.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className={`w-1.5 h-1.5 ${t.primaryBtn.split(" ")[0]} rounded-full mt-1.5 shrink-0`}></span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            {/* Documents Required */}
            <div className="bg-white rounded-xl p-5 border border-slate-200">
              <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                <span className={`w-6 h-6 ${t.bgLight} rounded-lg flex items-center justify-center ${t.textLight} text-xs`}>📋</span>
                Documents Required
              </h4>
              <ul className="space-y-2">
                {docsList.map((d, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className={`w-1.5 h-1.5 ${t.primaryBtn.split(" ")[0]} rounded-full mt-1.5 shrink-0`}></span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            {/* Approval Process */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                <span className={`w-6 h-6 ${t.bgLight} rounded-lg flex items-center justify-center ${t.textLight} text-xs`}>⚙</span>
                Approval Process
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">{approvalProcess}</p>
              {renewalPolicy && (
                <div className="mt-4 pt-3 border-t border-slate-200">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Renewal/Disbursement</p>
                  <p className="text-sm text-slate-600">{renewalPolicy}</p>
                </div>
              )}
            </div>

            {/* Important Dates & Contact */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                <span className={`w-6 h-6 ${t.bgLight} rounded-lg flex items-center justify-center ${t.textLight} text-xs`}>📅</span>
                Important Dates & Contact
              </h4>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <p className="text-xs text-slate-400 font-medium">Opens</p>
                  <p className="text-sm font-semibold text-slate-700">{importantDates.applicationStart}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Closes</p>
                  <p className={`text-sm font-semibold ${t.textMutedSecondary}`}>{importantDates.applicationEnd}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Processing</p>
                  <p className="text-sm font-semibold text-slate-700">{importantDates.shortlistAnnouncement}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Disbursement</p>
                  <p className={`text-sm font-semibold ${t.textMutedSecondary}`}>{importantDates.disbursement}</p>
                </div>
              </div>
              <div className="pt-3 border-t border-slate-200 text-slate-500 text-xs space-y-1">
                <p>Email: {contact.email}</p>
                <p>Helpline: {contact.helpline}</p>
              </div>
            </div>
          </div>

          {/* Footer Bar Link + CTA */}
          <div className={`mt-5 flex flex-col sm:flex-row items-center gap-3 justify-between bg-gradient-to-r ${t.gradientFrom} ${t.gradientTo} rounded-xl p-4 border ${t.accentBorder}`}>
            <a
              href={scheme.website || "https://www.myscheme.gov.in"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2 text-sm text-blue-700 hover:text-blue-800 hover:underline transition-all min-w-0 flex-1 w-full sm:w-auto"
            >
              <svg className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              <span className="font-medium break-all flex-1 min-w-0">{scheme.website || "https://www.myscheme.gov.in"}</span>
            </a>
            <button
              onClick={() => setShowAssistanceModal(true)}
              className={`px-8 py-2.5 ${t.primaryBtn} text-white font-semibold rounded-lg transition-colors shadow-sm text-sm border-none cursor-pointer`}
            >
              Get Assistance →
            </button>
          </div>
        </div>
      )}

      <AssistanceModal
        formName={scheme.title}
        isOpen={showAssistanceModal}
        onClose={() => setShowAssistanceModal(false)}
      />

      {/* Embedded FadeIn Animation Styles */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.25s ease-out; }
      `}</style>
    </div>
  );
};

export default SchemeCard;
