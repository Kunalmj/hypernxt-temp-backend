import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  IconScholarship, IconStartup, IconAgriculture, IconWomen,
  IconResearch, IconTender, IconCitizen, IconUsers, IconDoc,
  IconShield, IconStar, IconBot, IconStatus, IconPhone, IconRefresh,
} from "../components/homepage/Icons";

/* ── Contact method icons ─────────────────────────────────────── */
const IconEmail = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);
const IconPhoneOutline = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l1.32-1.32a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const IconWhatsApp = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

/* ── Request Service Modal ────────────────────────────────────── */
const serviceOptions = [
  "Citizen Schemes Assistance",
  "Scholarship Application Services",
  "Startup Grant Assistance",
  "MSME Subsidy Support",
  "Agriculture Scheme Help",
  "Women Program Guidance",
  "Research Grant Support",
  "Tender/RFP Filing Services",
];

const RequestServiceModal = ({ service, onClose }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    specificService: service || "",
    description: "",
    contactMethod: "Email",
  });
  const [submitted, setSubmitted] = useState(false);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(onClose, 2500);
  };

  // Close on backdrop click
  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(15,23,42,0.55)", backdropFilter: "blur(4px)" }}
      onClick={handleBackdrop}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-[500px] shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 pt-5 pb-4 border-b border-[#f1f5f9] flex items-center justify-between">
          <div>
            <h2 className="text-[1.05rem] font-extrabold text-[#0f172a]">Request Service</h2>
            <p className="text-[0.78rem] text-[#64748b] mt-0.5">{service}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] flex items-center justify-center text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#0f172a] transition-colors cursor-pointer"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        {/* Body */}
        {submitted ? (
          <div className="flex flex-col items-center justify-center py-12 px-8 text-center">
            <div className="w-14 h-14 bg-[#d1fae5] rounded-full flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h3 className="text-[1rem] font-extrabold text-[#0f172a] mb-1.5">Request Submitted!</h3>
            <p className="text-[0.82rem] text-[#64748b] leading-relaxed">Our team will contact you within 24 hours on your preferred channel.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 py-4 space-y-3">

            {/* Row 1: Name + Email */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[0.76rem] font-bold text-[#0f172a] mb-1">Full Name <span className="text-red-500">*</span></label>
                <input type="text" required value={form.name} onChange={e => set("name", e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full px-3 py-2.5 rounded-xl border border-[#e2e8f0] text-[0.82rem] text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/15 transition-all"
                />
              </div>
              <div>
                <label className="block text-[0.76rem] font-bold text-[#0f172a] mb-1">Email Address <span className="text-red-500">*</span></label>
                <input type="email" required value={form.email} onChange={e => set("email", e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-3 py-2.5 rounded-xl border border-[#e2e8f0] text-[0.82rem] text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/15 transition-all"
                />
              </div>
            </div>

            {/* Row 2: Phone + Service */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[0.76rem] font-bold text-[#0f172a] mb-1">Phone / WhatsApp <span className="text-red-500">*</span></label>
                <input type="tel" required value={form.phone} onChange={e => set("phone", e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3 py-2.5 rounded-xl border border-[#e2e8f0] text-[0.82rem] text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/15 transition-all"
                />
              </div>
              <div>
                <label className="block text-[0.76rem] font-bold text-[#0f172a] mb-1">Service Needed <span className="text-red-500">*</span></label>
                <div className="relative">
                  <select required value={form.specificService} onChange={e => set("specificService", e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#e2e8f0] text-[0.82rem] text-[#0f172a] bg-white appearance-none focus:outline-none focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/15 transition-all cursor-pointer"
                  >
                    <option value="" disabled>Select a service</option>
                    {serviceOptions.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#94a3b8] text-xs">▾</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-[0.76rem] font-bold text-[#0f172a] mb-1">Brief Description <span className="text-red-500">*</span></label>
              <textarea required rows={2} value={form.description} onChange={e => set("description", e.target.value)}
                placeholder="Describe your requirements, timeline, and any specific needs..."
                className="w-full px-3 py-2.5 rounded-xl border border-[#e2e8f0] text-[0.82rem] text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/15 transition-all resize-none"
              />
            </div>

            {/* Contact Method */}
            <div>
              <label className="block text-[0.76rem] font-bold text-[#0f172a] mb-2">Preferred Contact Method <span className="text-red-500">*</span></label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { label: "Email", Icon: IconEmail },
                  { label: "Phone", Icon: IconPhoneOutline },
                  { label: "WhatsApp", Icon: IconWhatsApp },
                ].map(({ label, Icon: CIcon }) => (
                  <button key={label} type="button" onClick={() => set("contactMethod", label)}
                    className={`flex flex-col items-center gap-1.5 py-2.5 rounded-xl border-2 transition-all cursor-pointer font-semibold text-[0.75rem] ${
                      form.contactMethod === label
                        ? "border-[#3b82f6] bg-[#eff6ff] text-[#1d4ed8]"
                        : "border-[#e2e8f0] bg-white text-[#64748b] hover:border-[#bfdbfe] hover:bg-[#f8fafc]"
                    }`}
                  >
                    <CIcon />{label}
                  </button>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button type="button" onClick={onClose}
                className="flex-1 py-2.5 rounded-xl border-2 border-[#e2e8f0] text-[#374151] font-bold text-[0.82rem] bg-white hover:bg-[#f8fafc] transition-colors cursor-pointer"
              >Cancel</button>
              <button type="submit"
                className="flex-1 py-2.5 rounded-xl bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-bold text-[0.82rem] transition-colors cursor-pointer shadow-md shadow-blue-200 flex items-center justify-center gap-2"
              >Submit Request →</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

/* ── Local icon helpers ───────────────────────────────────────── */
const IconCheck = ({ color = "#2563eb" }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconMSME = ({ size = 22, color = "#2563eb" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

/* ── Data ─────────────────────────────────────────────────────── */
const stats = [
  { Icon: IconUsers,  value: "50,000+", label: "Applications Filed" },
  { Icon: IconDoc,    value: "1,200+",  label: "Schemes Indexed" },
  { Icon: IconShield, value: "98%",     label: "Success Rate" },
  { Icon: IconStar,   value: "4.9/5",   label: "User Rating" },
];

const serviceCards = [
   {
    id: "scholarship",
    Icon: IconScholarship,
    title: "Scholarship Application Services",
    desc: "Expert assistance for scholarship applications worldwide.",
    tag: "3 Steps",
    included: [
      "SOP/Essay Writing & Editing",
      "Application Review & Optimization",
      "Document Preparation & Verification",
      "Interview Preparation & Mock Sessions",
      "Eligibility Assessment & Guidance",
    ],
    route: "/scholarships",
  },
  {
    id: "citizen",
    Icon: IconCitizen,
    title: "Citizen Schemes Assistance",
    desc: "Comprehensive support for government welfare schemes.",
    tag: "Popular",
    included: [
      "Scheme Eligibility Assessment",
      "Application Form Filling & Submission",
      "Document Verification & Preparation",
      "Benefit Claim Processing",
      "Government Portal Navigation Support",
    ],
    route: "/citizen-schemes",
  },
 
  {
    id: "startup",
    Icon: IconStartup,
    title: "Startup Grant Assistance",
    desc: "Professional support for securing startup funding.",
    tag: "5 Steps",
    included: [
      "Business Plan Writing & Review",
      "Pitch Deck Creation & Design",
      "Financial Projections & Modeling",
      "Grant Proposal Writing",
      "Application Strategy & Support",
    ],
    route: "/startup-msme",
  },
  {
    id: "msme",
    Icon: IconMSME,
    title: "MSME Subsidy Support",
    desc: "Comprehensive assistance for MSME schemes and subsidies.",
    tag: "3 Steps",
    included: [
      "MSME Registration Assistance",
      "Documentation Support & Filing",
      "Compliance Guidance & Review",
      "Subsidy Application Filing",
      "Claim Processing Support",
    ],
    route: "/startup-msme",
  },
  {
    id: "agri",
    Icon: IconAgriculture,
    title: "Agriculture Scheme Help",
    desc: "Dedicated support for agricultural schemes and subsidies.",
    tag: "3 Steps",
    included: [
      "Scheme Application Assistance",
      "Subsidy Claim Processing",
      "Documentation & Verification",
      "Government Liaison Support",
      "Eligibility Assessment",
    ],
    route: "/agriculture",
  },
  {
    id: "women",
    Icon: IconWomen,
    title: "Women Program Guidance",
    desc: "Specialized assistance for women-focused programs.",
    tag: "3 Steps",
    included: [
      "Application Support & Guidance",
      "Document Verification & Preparation",
      "Eligibility Assessment",
      "Form Filling Assistance",
      "Program Selection Consultation",
    ],
    route: "/women-programs",
  },
  {
    id: "research",
    Icon: IconResearch,
    title: "Research Grant Support",
    desc: "Expert help for research grant applications.",
    tag: "5 Steps",
    included: [
      "Research Proposal Writing",
      "Budget Planning & Justification",
      "Ethics Clearance Support",
      "Application Review & Editing",
      "Grant Writing Consultation",
    ],
    route: "/research-grants",
  },
  {
    id: "tender",
    Icon: IconTender,
    title: "Tender/RFP Filing Services",
    desc: "Professional assistance for government tenders and RFPs.",
    tag: "5 Steps",
    included: [
      "Tender Document Preparation",
      "Technical & Financial Bid Writing",
      "EMD & Bank Guarantee Assistance",
      "Compliance & Documentation Support",
      "Bid Submission & Follow-up",
    ],
    route: "/tenders",
  },
];

const howItWorks = [
  { step: "01", title: "Choose Service", desc: "Select the service portal that matches your need — scholarship, grant, tender, or scheme." },
  { step: "02", title: "Submit Request", desc: "Fill out a simple guided form with your profile details and required information." },
  { step: "03", title: "Get Contacted", desc: "Our expert team reviews your profile and reaches out within 24 hours." },
  { step: "04", title: "Secure Funding", desc: "We complete and submit your application, tracking it until a decision is made." },
];

const helpLinks = [
  { Icon: IconRefresh, title: "Correction Services",  desc: "Update errors in existing applications", path: "/help/correction" },
  { Icon: IconStatus,      title: "Status Tracking",     desc: "Track your application in real-time",       path: "/help/status" },
  { Icon: IconPhone,       title: "Expert Support",      desc: "Talk to an application specialist live",    path: "/help/expert" },
];

/* ── Component ────────────────────────────────────────────────── */
const Services = ({ hideCTA = false, isHome = false }) => {
  const navigate = useNavigate();
  const [modalService, setModalService] = useState(null);
  const [showAllServices, setShowAllServices] = useState(false);

  const openModal = (serviceName) => setModalService(serviceName);
  const closeModal = () => setModalService(null);

  const displayedCards = (isHome && !showAllServices) ? serviceCards.slice(0, 6) : serviceCards;

  return (
    <div
      style={{
        background: "linear-gradient(160deg, #f0f7ff 0%, #f5f8ff 40%, #fdf4fb 75%, #fff8f5 100%)",
        minHeight: "100vh",
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
      }}
    >
      {/* Modal */}
      {modalService && <RequestServiceModal service={modalService} onClose={closeModal} />}
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden flex items-center bg-gradient-to-br from-[#ece9ff] via-[#e8f0ff] to-[#f0eeff] min-h-[420px] -mt-[50px] pt-[20px]">
        {/* Blob glows */}
        <div className="absolute top-[-100px] left-[-100px] w-[520px] h-[520px] rounded-full pointer-events-none z-0 hidden md:block" style={{ background: "radial-gradient(circle at 40% 40%, #a5b4fc 0%, transparent 65%)", opacity: 0.45 }} />
        <div className="absolute bottom-[-80px] right-[-80px] w-[440px] h-[440px] rounded-full pointer-events-none z-0 hidden md:block" style={{ background: "radial-gradient(circle at 60% 60%, #c4b5fd 0%, transparent 65%)", opacity: 0.4 }} />

        <div className="relative z-10 w-full flex flex-col items-center px-6 py-14 md:py-20 text-center">
          <span className="inline-flex items-center gap-1.5 bg-white/88 border border-[#bfdbfe] text-[#1d4ed8] text-[0.72rem] font-bold px-5 py-2 rounded-full backdrop-blur-md shadow-md mb-6 tracking-wide uppercase">
            Professional Application Assistance
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0f172a] leading-[1.2] mb-5 tracking-tight max-w-3xl">
            Expert Help for Every{" "}
            <span className="text-[#1d4ed8] border-b-[3px] border-[#3b82f6] pb-0.5">
              Application
            </span>
          </h1>
          <p className="text-[#64748b] text-[0.9rem] md:text-[1rem] max-w-lg leading-relaxed mb-0">
            From scholarships and startup grants to government tenders —{" "}
            <br className="hidden md:inline" />
            our experts handle the complexity so you don't have to.
          </p>
        </div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0 leading-0 z-20 pointer-events-none">
          <svg viewBox="0 0 1440 72" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="block w-full h-[40px] md:h-[72px]">
            <path d="M0,40 C180,80 360,0 540,36 C720,72 900,10 1080,44 C1260,78 1380,28 1440,40 L1440,72 L0,72 Z" fill="#f0f7ff" />
          </svg>
        </div>
      </section>

      {/* ── Stats Bar ─────────────────────────────────────────── */}
      {/* <section className="bg-[#f0f7ff] pb-10 md:pb-14">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="bg-white border border-[#e2e8f0] rounded-2xl md:rounded-3xl shadow-lg grid grid-cols-2 md:grid-cols-4 overflow-hidden">
            {stats.map(({ Icon: StatIcon, value, label }, i) => (
              <div
                key={label}
                className={`flex items-center gap-3.5 p-5 md:p-6 lg:p-7 ${i % 2 === 0 ? "border-r border-[#f1f5f9]" : "md:border-r md:border-[#f1f5f9]"} ${i < 2 ? "border-b border-[#f1f5f9] md:border-b-0" : ""} ${i === 3 ? "md:border-r-0" : ""}`}
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#eff6ff] flex items-center justify-center flex-shrink-0">
                  <StatIcon size={20} color="#2563eb" />
                </div>
                <div>
                  <div className="text-lg md:text-[1.3rem] font-extrabold text-[#1d4ed8] leading-tight">{value}</div>
                  <div className="text-[0.7rem] md:text-[0.78rem] text-[#64748b] font-medium uppercase tracking-wide opacity-80">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* wave */}
      <div className="bg-[#f0f7ff] leading-none">
        <svg viewBox="0 0 1440 56" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="block w-full h-[40px] md:h-[56px]">
          <path d="M0,28 C240,56 480,0 720,28 C960,56 1200,8 1440,28 L1440,56 L0,56 Z" fill="white" />
        </svg>
      </div>

      {/* ── Services Grid ─────────────────────────────────────── */}
      <section className="bg-white py-12 md:py-16 px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-[1.6rem] md:text-[1.9rem] font-extrabold text-[#0f172a] mb-2">Our Services</h2>
            <p className="text-[#64748b] text-[0.85rem] md:text-[0.93rem] max-w-lg mx-auto">
              Choose from our comprehensive range of application assistance services tailored to your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {displayedCards.map(({ id, Icon: SIcon, title, desc, tag, included, route }) => (
              <div
                key={id}
                className="bg-white border border-[#e2e8f0] rounded-2xl p-6 flex flex-col transition-all duration-250 hover:shadow-xl hover:-translate-y-1 hover:border-[#bfdbfe] group"
                style={{
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 4px 12px rgba(37,99,235,0.06)",
                  transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
                }}
              >
                {/* Icon + tag */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-[#eff6ff] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <SIcon size={24} color="#2563eb" />
                  </div>
                  <span className="bg-[#f0f9ff] text-[#0369a1] text-[0.7rem] font-bold px-3 py-1 rounded-full border border-[#bae6fd]">{tag}</span>
                </div>

                {/* Title + desc */}
                <h3 className="text-[1rem] font-bold text-[#0f172a] mb-1 leading-snug">{title}</h3>
                <p className="text-[0.83rem] text-[#64748b] leading-relaxed mb-4">{desc}</p>

                {/* What's included */}
                <div className="mb-5 flex-1">
                  <p className="text-[0.68rem] font-black uppercase text-[#94a3b8] tracking-[0.15em] mb-3">What's Included:</p>
                  <ul className="space-y-2">
                    {included.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-[0.82rem] font-medium text-[#374151]">
                        <span className="mt-0.5 shrink-0"><IconCheck /></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                

                {/* CTA */}
                <button
                  onClick={() => openModal(title)}
                  className="w-full bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 text-[0.85rem] shadow-md shadow-blue-100 mt-auto"
                >
                  Get Started →
                </button>
              </div>
            ))}
          </div>

          {isHome && serviceCards.length > 6 && (
            <div className="flex justify-center mt-10">
              <button
                onClick={() => setShowAllServices(!showAllServices)}
                className="px-6 py-3 bg-[#2563eb] text-white rounded-xl font-semibold hover:bg-[#1d4ed8] transition flex items-center gap-2 cursor-pointer"
              >
                {showAllServices ? "Show Less" : "All Services"}
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
                    transform: showAllServices ? "rotate(180deg)" : "rotate(0deg)",
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

      {/* wave */}
      <div className="bg-white leading-none">
        <svg viewBox="0 0 1440 56" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="block w-full h-[40px] md:h-[56px]">
          <path d="M0,28 C360,0 720,56 1080,28 C1260,14 1380,42 1440,28 L1440,56 L0,56 Z" fill="#f8fafc" />
        </svg>
      </div>

      {/* ── How It Works ──────────────────────────────────────── */}
      <section className="bg-[#f8fafc] py-12 md:py-16 px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-[1.6rem] md:text-[1.9rem] font-extrabold text-[#0f172a] mb-2">How It Works</h2>
            <p className="text-[#64748b] text-[0.85rem] md:text-[0.93rem] max-w-md mx-auto">Simple 4-step process to get expert assistance</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 relative">
            {/* Connector line desktop */}
            <div className="hidden lg:block absolute top-[46px] left-[14%] right-[14%] h-[2px] bg-[#e2e8f0] z-0" />

            {howItWorks.map(({ step, title, desc }, i) => (
              <div key={step} className="bg-white border border-[#e2e8f0] rounded-2xl p-6 text-center shadow-sm relative z-10" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 4px 12px rgba(37,99,235,0.06)" }}>
                <div className="w-14 h-14 bg-[#1d4ed8] text-white rounded-2xl flex items-center justify-center text-[1.1rem] font-extrabold mx-auto mb-5 shadow-lg shadow-blue-200 border-4 border-white">
                  {step}
                </div>
                <h3 className="font-bold text-[#0f172a] text-[0.95rem] mb-2">{title}</h3>
                <p className="text-[0.82rem] text-[#64748b] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* wave */}
      {/* <div className="bg-[#f8fafc] leading-none">
        <svg viewBox="0 0 1440 56" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="block w-full h-[40px] md:h-[56px]">
          <path d="M0,28 C240,56 480,0 720,28 C960,56 1200,8 1440,28 L1440,56 L0,56 Z" fill="white" />
        </svg>
      </div> */}

      {/* ── Quick Help Links ───────────────────────────────────── */}
      {/* <section className="bg-white py-10 md:py-10 px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-[1.6rem] md:text-[1.9rem] font-extrabold text-[#0f172a] mb-2">Need Quick Help?</h2>
            <p className="text-[#64748b] text-[0.85rem] md:text-[0.93rem] max-w-lg mx-auto">Access targeted help for specific services instantly</p>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-3 gap-5 md:gap-6 max-w-4xl mx-auto">
            {helpLinks.map(({ Icon: HIcon, title, desc, path }) => (
              <div
                key={title}
                className="bg-white border border-[#e2e8f0] rounded-2xl p-6 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 hover:border-[#bfdbfe] group cursor-pointer"
                onClick={() => navigate(path)}
                style={{ transition: "all 0.25s" }}
              >
                <div className="w-11 h-11 bg-[#eff6ff] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <HIcon size={22} color="#2563eb" />
                </div>
                <h4 className="font-bold text-[#0f172a] mb-2 text-[0.95rem]">{title}</h4>
                <p className="text-[0.83rem] text-[#64748b] leading-relaxed mb-4">{desc}</p>
                <span className="text-[0.82rem] text-[#1d4ed8] font-bold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn More <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* wave */}
      {/* <div className="bg-white leading-none">
        <svg viewBox="0 0 1440 56" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="block w-full h-[40px] md:h-[56px]">
          <path d="M0,28 C240,56 480,0 720,28 C960,56 1200,8 1440,28 L1440,56 L0,56 Z" fill="#f8fafc" />
        </svg>
      </div> */}

      {/* ── AI CTA Banner (same as home page) ─────────────────── */}
      {!hideCTA && (
        <section className="bg-[#f8fafc] px-6 pb-14 md:pb-16">
          <div className="max-w-[1100px] mx-auto">
            <div className="bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#1d4ed8] rounded-[24px] md:rounded-[32px] p-8 md:p-12 lg:p-14 flex flex-col lg:flex-row lg:items-center justify-between gap-8 md:gap-10 shadow-2xl overflow-hidden relative">
              {/* Background Accent */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

              <div className="flex-1 text-center lg:text-left z-10">
                <span className="inline-flex items-center gap-2 bg-white/10 text-white/90 text-[0.72rem] font-bold px-4 py-1.5 rounded-full mb-5 tracking-widest uppercase border border-white/20">
                  <IconBot size={15} color="white" /> Ready to Get Started?
                </span>
                <h3 className="text-[1.3rem] md:text-2xl font-extrabold text-white mb-3 tracking-tight">
                  Don't Let Complex Applications Hold You Back
                </h3>
                <p className="text-white/70 text-[0.85rem] md:text-[0.9rem] leading-relaxed max-w-md mx-auto lg:mx-0">
                  Our experts guide you through every step — from eligibility check to final submission. Available 24/7.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:justify-center lg:justify-end z-10">
                <Link
                  to="/ai-helper"
                  className="bg-white text-[#1e3a8a] border-none px-6 py-3.5 rounded-xl font-bold text-sm cursor-pointer flex items-center justify-center gap-2 transition-opacity hover:opacity-90 text-decoration-none"
                >
                  <IconBot size={16} color="#1e3a8a" /> Try AI Helper
                </Link>
                <Link
                  to="/contact"
                  className="bg-white/10 text-white/90 border border-white/25 px-6 py-3.5 rounded-xl font-bold text-sm cursor-pointer transition-colors hover:bg-white/15 text-decoration-none flex items-center justify-center"
                >
                  Contact an Expert
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Services;
