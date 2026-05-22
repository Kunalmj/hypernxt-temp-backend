import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const TenderApplyForm = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const tender = state?.tender || null;

  const [formData, setFormData] = useState({
    companyName: "",
    registrationNo: "",
    gst: "",
    pan: "",
    contactPerson: "",
    designation: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    stateField: "",
    annualTurnover: "",
    yearsExperience: "",
    similarWorks: "",
    bankName: "",
    accountNo: "",
    ifsc: "",
    declaration: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [error, setError] = useState("");

  const update = (key, val) => {
    setFormData((p) => ({ ...p, [key]: val }));
    setError("");
  };

  const validateSection = (targetIndex) => {
    if (targetIndex <= activeSection) return true;

    const requiredFields = {
      0: ["companyName", "registrationNo", "gst", "pan", "contactPerson", "designation", "phone", "email", "address", "city", "stateField"],
      1: ["annualTurnover", "yearsExperience", "similarWorks"],
      2: ["bankName", "accountNo", "ifsc"],
    };

    for (let i = activeSection; i < targetIndex; i++) {
      const fields = requiredFields[i];
      if (!fields) continue;

      for (const field of fields) {
        if (!formData[field] || formData[field].toString().trim() === "") {
          setError(`Please fill all required fields in the "${sections[i].label}" section.`);
          return false;
        }
      }
    }
    return true;
  };

  const handleSectionChange = (index) => {
    if (validateSection(index)) {
      setActiveSection(index);
      window.scrollTo(0, 0);
    }
  };

  const sections = [
    { id: 0, label: "Company Info" },
    { id: 1, label: "Eligibility" },
    { id: 2, label: "Bank Details" },
    { id: 3, label: "Documents & EMD" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f0f4ff] to-white flex items-center justify-center p-6 font-sans">
        <div className="bg-white rounded-3xl shadow-xl border border-blue-100 max-w-lg w-full p-10 text-center">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-3">Bid Submitted!</h1>
          <p className="text-slate-500 mb-2 text-base">
            Your bid for{" "}
            <span className="font-semibold text-blue-700">
              {tender?.title || "the tender"}
            </span>{" "}
            has been successfully submitted.
          </p>
          <p className="text-xs text-slate-400 mb-1">
            Tender ID: <span className="font-mono font-semibold text-slate-600">{tender?.tenderId || "N/A"}</span>
          </p>
          <p className="text-sm text-slate-400 mb-8">
            Reference No:{" "}
            <span className="font-mono font-semibold text-slate-600">
              BID-{Date.now().toString().slice(-8)}
            </span>
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate("/tender-results", { state: { results: [] } })}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-sm"
            >
              Back to Tenders
            </button>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl transition-colors"
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0f4ff] to-white font-sans pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white pt-10 pb-14 px-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors mb-6 text-sm font-medium"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Results
          </button>
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 bg-white/15 border border-white/25 rounded-full text-xs font-bold tracking-wider uppercase">
              {tender?.type || "Tender"}
            </span>
            <span className="px-3 py-1 bg-white/15 border border-white/25 rounded-full text-xs font-bold tracking-wider uppercase text-amber-200">
              EMD: {tender?.emd || "N/A"}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
            Tender Bid Application
          </h1>
          {tender && (
            <div className="mt-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
              <p className="text-lg font-semibold">{tender.title}</p>
              <div className="flex flex-wrap gap-3 mt-2 text-sm text-blue-100">
                <span> {tender.org}</span>
                <span> {tender.value}</span>
                <span> Deadline: {tender.deadline}</span>
                <span className="font-mono text-blue-200">{tender.tenderId}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Section Tabs */}
      <div className="max-w-4xl mx-auto px-6 -mt-5">
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-1.5 flex gap-1">
          {sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => handleSectionChange(sec.id)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeSection === sec.id
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              {sec.label}
            </button>
          ))}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto px-6 mt-8">

        {/* COMPANY INFO */}
        {activeSection === 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 space-y-6 animate-fadeIn">
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-1">Company Information</h2>
              <p className="text-sm text-slate-500">Registered entity details for the bidding company.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <Field label="Registered Company Name" required value={formData.companyName} onChange={(v) => update("companyName", v)} placeholder="e.g. Apex Solar Solutions Pvt. Ltd." />
              </div>
              <Field label="Company Registration No." required value={formData.registrationNo} onChange={(v) => update("registrationNo", v)} placeholder="e.g. CIN: U74999MH2015PTC123456" />
              <Field label="GST Registration No." required value={formData.gst} onChange={(v) => update("gst", v)} placeholder="e.g. 27AAPCS1234A1ZC" />
              <Field label="PAN Number" required value={formData.pan} onChange={(v) => update("pan", v)} placeholder="e.g. AAPCS1234A" />
              <Field label="Contact Person Name" required value={formData.contactPerson} onChange={(v) => update("contactPerson", v)} placeholder="e.g. Rahul Mehta" />
              <Field label="Designation" required value={formData.designation} onChange={(v) => update("designation", v)} placeholder="e.g. Director / GM Procurement" />
              <Field label="Official Phone" type="tel" required value={formData.phone} onChange={(v) => update("phone", v)} placeholder="+91 98765 43210" />
              <Field label="Official Email" type="email" required value={formData.email} onChange={(v) => update("email", v)} placeholder="tender@apexsolar.com" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="md:col-span-3">
                <Field label="Registered Office Address" required value={formData.address} onChange={(v) => update("address", v)} placeholder="Street, Area, Locality" />
              </div>
              <Field label="City" required value={formData.city} onChange={(v) => update("city", v)} placeholder="e.g. Mumbai" />
              <Field label="State" required value={formData.stateField} onChange={(v) => update("stateField", v)} placeholder="e.g. Maharashtra" />
            </div>
            <div className="flex justify-end pt-4 flex-col items-end gap-3">
              {error && (
                <div className="text-red-500 text-sm font-semibold animate-bounce">
                  {error}
                </div>
              )}
              <button type="button" onClick={() => handleSectionChange(1)} className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-sm">
                Next: Eligibility →
              </button>
            </div>
          </div>
        )}

        {/* ELIGIBILITY */}
        {activeSection === 1 && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 space-y-6 animate-fadeIn">
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-1">Eligibility & Experience</h2>
              <p className="text-sm text-slate-500">Provide financial and technical eligibility details.</p>
            </div>

            {/* Eligibility Criteria Reminder */}
            {tender?.eligibility && (
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                <p className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-2">Required Eligibility for this Tender</p>
                <ul className="space-y-1">
                  {tender.eligibility.map((e, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-blue-800">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 shrink-0"></span>
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label="Average Annual Turnover (Last 3 Years, in ₹)" required value={formData.annualTurnover} onChange={(v) => update("annualTurnover", v)} placeholder="e.g. 1,50,00,000" />
              <Field label="Years of Experience in Relevant Field" type="number" required value={formData.yearsExperience} onChange={(v) => update("yearsExperience", v)} placeholder="e.g. 5" />
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  List of Similar Works Completed <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.similarWorks}
                  onChange={(e) => update("similarWorks", e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all text-[15px] text-slate-700 resize-none"
                  placeholder="1. Project name, Client, Value, Year of completion&#10;2. Project name, Client, Value, Year of completion"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col gap-3 pt-4">
              {error && (
                <div className="text-red-500 text-sm font-semibold text-right animate-bounce">
                  {error}
                </div>
              )}
              <div className="flex justify-between">
                <button type="button" onClick={() => handleSectionChange(0)} className="px-6 py-3 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl transition-colors">
                  ← Previous
                </button>
                <button type="button" onClick={() => handleSectionChange(2)} className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-sm">
                  Next: Bank Details →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* BANK DETAILS */}
        {activeSection === 2 && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 space-y-6 animate-fadeIn">
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-1">Bank Details</h2>
              <p className="text-sm text-slate-500">For EMD refund and payment processing.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label="Bank Name" required value={formData.bankName} onChange={(v) => update("bankName", v)} placeholder="e.g. State Bank of India" />
              <Field label="Account Number" required value={formData.accountNo} onChange={(v) => update("accountNo", v)} placeholder="XXXXXXXXXXXX" />
              <Field label="IFSC Code" required value={formData.ifsc} onChange={(v) => update("ifsc", v)} placeholder="e.g. SBIN0001234" />
            </div>
            <div className="flex flex-col gap-3 pt-4">
              {error && (
                <div className="text-red-500 text-sm font-semibold text-right animate-bounce">
                  {error}
                </div>
              )}
              <div className="flex justify-between">
                <button type="button" onClick={() => handleSectionChange(1)} className="px-6 py-3 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl transition-colors">
                  ← Previous
                </button>
                <button type="button" onClick={() => handleSectionChange(3)} className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-sm">
                  Next: Documents & EMD →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* DOCUMENTS & EMD */}
        {activeSection === 3 && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 space-y-6 animate-fadeIn">
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-1">Documents & EMD Declaration</h2>
              <p className="text-sm text-slate-500">Upload supporting documents and confirm EMD payment.</p>
            </div>

            {/* EMD Info Banner */}
            <div className="bg-amber-50 rounded-xl p-4 border border-amber-200 flex items-start gap-3">
              <svg className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <p className="text-sm font-bold text-amber-800">EMD Required: {tender?.emd || "As specified"}</p>
                <p className="text-xs text-amber-700 mt-0.5">Pay via Demand Draft (DD) or online NEFT/RTGS. Upload proof below.</p>
              </div>
            </div>

            {/* Document Uploads */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">Required Documents</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {(tender?.documentsRequired || [
                  "Company Registration Certificate",
                  "GST & PAN Card",
                  "Audited Balance Sheet (3 years)",
                  "Experience Certificates",
                  "EMD Payment Proof",
                  "Technical Specifications / Proposal"
                ]).map((doc) => (
                  <div key={doc} className="flex items-center gap-3 p-3 rounded-xl border-2 border-dashed border-slate-200 hover:border-blue-300 transition-colors cursor-pointer group">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500 group-hover:bg-blue-100 transition-colors shrink-0">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700">{doc}</p>
                      <p className="text-xs text-slate-400">Click to upload (PDF/JPG)</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Declaration */}
            <div className="bg-blue-50 rounded-xl p-5 border border-blue-100 mt-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.declaration}
                  onChange={(e) => update("declaration", e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-slate-700 leading-relaxed">
                  I hereby declare that the information provided is accurate and the company meets all eligibility criteria. I confirm the EMD of{" "}
                  <span className="font-semibold text-blue-700">{tender?.emd || "the specified amount"}</span> has been paid. I accept the <span className="text-blue-700 font-medium">Terms & Conditions</span> of this tender.
                </span>
              </label>
            </div>

            <div className="flex justify-between pt-4">
              <button type="button" onClick={() => handleSectionChange(2)} className="px-6 py-3 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl transition-colors">
                ← Previous
              </button>
              <button
                type="submit"
                disabled={!formData.declaration}
                className="px-10 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                Submit Bid →
              </button>
            </div>
          </div>
        )}
      </form>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
      `}</style>
    </div>
  );
};

/* Reusable Field */
const Field = ({ label, type = "text", required, value, onChange, placeholder }) => (
  <div>
    <label className="block text-sm font-semibold text-slate-700 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all text-[15px] text-slate-700 placeholder:text-slate-400"
    />
  </div>
);

export default TenderApplyForm;
