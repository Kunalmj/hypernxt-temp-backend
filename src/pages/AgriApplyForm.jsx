import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AgriApplyForm = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const scheme = state?.scheme || null;

  const [formData, setFormData] = useState({
    farmerName: "",
    aadhaar: "",
    phone: "",
    state: "",
    district: "",
    tehsil: "",
    village: "",
    landSize: "",
    khasraNo: "",
    irrigationType: "",
    cropType: "",
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
      0: ["farmerName", "aadhaar", "phone", "state", "district", "tehsil", "village"],
      1: ["landSize", "khasraNo", "irrigationType", "cropType"],
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
    { id: 0, label: "Personal Info" },
    { id: 1, label: "Land Details" },
    { id: 2, label: "Bank Info" },
    { id: 3, label: "Documents" },
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
          <h1 className="text-3xl font-bold text-slate-800 mb-3">Application Submitted!</h1>
          <p className="text-slate-500 mb-2 text-base">
            Your application for <span className="font-semibold text-blue-700">{scheme?.title || "the scheme"}</span> has been submitted successfully.
          </p>
          <p className="text-sm text-slate-400 mb-8">Application ID: <span className="font-mono font-semibold text-slate-600">AGR-{Date.now().toString().slice(-8)}</span></p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => navigate("/agri-results", { state: { results: [] } })} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-sm">
              Back to Results
            </button>
            <button onClick={() => navigate("/")} className="px-6 py-3 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl transition-colors">
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
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors mb-6 text-sm font-medium">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to Results
          </button>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Agriculture Scheme Application</h1>
          {scheme && (
            <div className="mt-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
              <p className="text-lg font-semibold">{scheme.title}</p>
              <div className="flex flex-wrap gap-3 mt-2 text-sm text-blue-100">
                <span> {scheme.provider}</span>
                <span> {scheme.amount}</span>
                <span> Deadline: {scheme.deadline}</span>
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
        {/* PERSONAL INFO SECTION */}
        {activeSection === 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 space-y-6 animate-fadeIn">
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-1">Personal Information</h2>
              <p className="text-sm text-slate-500">Provide your basic personal and contact details.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label="Farmer's Name" required value={formData.farmerName} onChange={(v) => update("farmerName", v)} placeholder="e.g. Ram Singh" />
              <Field label="Aadhaar Number" required value={formData.aadhaar} onChange={(v) => update("aadhaar", v)} placeholder="XXXX XXXX XXXX" />
              <Field label="Mobile Number" type="tel" required value={formData.phone} onChange={(v) => update("phone", v)} placeholder="+91 98765 43210" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label="State" required value={formData.state} onChange={(v) => update("state", v)} placeholder="e.g. Punjab" />
              <Field label="District" required value={formData.district} onChange={(v) => update("district", v)} placeholder="e.g. Ludhiana" />
              <Field label="Tehsil/Block" required value={formData.tehsil} onChange={(v) => update("tehsil", v)} placeholder="e.g. Samrala" />
              <Field label="Village" required value={formData.village} onChange={(v) => update("village", v)} placeholder="e.g. Machhiwara" />
            </div>
            <div className="flex justify-end pt-4 flex-col items-end gap-3">
              {error && (
                <div className="text-red-500 text-sm font-semibold animate-bounce">
                  {error}
                </div>
              )}
              <button type="button" onClick={() => handleSectionChange(1)} className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-sm">
                Next: Land Details →
              </button>
            </div>
          </div>
        )}

        {/* LAND DETAILS SECTION */}
        {activeSection === 1 && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 space-y-6 animate-fadeIn">
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-1">Land & Farming Details</h2>
              <p className="text-sm text-slate-500">Details about your agricultural land and crop patterns.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label="Total Land Size (in Hectares)" type="number" required value={formData.landSize} onChange={(v) => update("landSize", v)} placeholder="e.g. 1.5" />
              <Field label="Khasra / Khatauni Number" required value={formData.khasraNo} onChange={(v) => update("khasraNo", v)} placeholder="e.g. 123/4" />
              <SelectField label="Irrigation Type" required value={formData.irrigationType} onChange={(v) => update("irrigationType", v)} options={["Rainfed", "Canal", "Tube Well", "Micro-Irrigation (Drip/Sprinkler)", "Other"]} />
              <SelectField label="Primary Crop Type" required value={formData.cropType} onChange={(v) => update("cropType", v)} options={["Wheat/Rice", "Pulses", "Oilseeds", "Vegetables/Fruits", "Cash Crops (Cotton/Sugarcane)", "Other"]} />
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
                  Next: Bank Info →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* BANK INFO SECTION */}
        {activeSection === 2 && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 space-y-6 animate-fadeIn">
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-1">Bank Information</h2>
              <p className="text-sm text-slate-500">Direct Benefit Transfer (DBT) details for subsidy/funds.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label="Bank Name" required value={formData.bankName} onChange={(v) => update("bankName", v)} placeholder="e.g. State Bank of India" />
              <Field label="Account Number (Aadhaar Seeded)" required value={formData.accountNo} onChange={(v) => update("accountNo", v)} placeholder="XXXXXXXXXXXX" />
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
                  Next: Documents →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* DOCUMENTS & DECLARATION */}
        {activeSection === 3 && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 space-y-6 animate-fadeIn">
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-1">Documents & Declaration</h2>
              <p className="text-sm text-slate-500">Upload required proofs and submit your application.</p>
            </div>

            {/* Document Upload placeholders */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">Required Documents</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {["Aadhaar Card", "Land Record (Khatauni)", "Bank Passbook Front Page", "Passport Photo"].map((doc) => (
                  <div key={doc} className="flex items-center gap-3 p-3 rounded-xl border-2 border-dashed border-slate-200 hover:border-blue-300 transition-colors cursor-pointer group">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500 group-hover:bg-blue-100 transition-colors">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700">{doc}</p>
                      <p className="text-xs text-slate-400">Click to upload</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Declaration */}
            <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.declaration}
                  onChange={(e) => update("declaration", e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-slate-700 leading-relaxed">
                  I hereby declare that I am the rightful owner/tenant of the land mentioned above and the details provided are true. I agree to the <span className="text-blue-700 font-medium">Terms & Conditions</span>.
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
                Submit Application →
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

/* Reusable Field Component */
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

/* Reusable Select Component */
const SelectField = ({ label, required, value, onChange, options }) => (
  <div>
    <label className="block text-sm font-semibold text-slate-700 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all text-[15px] text-slate-700 bg-white appearance-none cursor-pointer"
      >
        <option value="">Select...</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
      </div>
    </div>
  </div>
);

export default AgriApplyForm;
