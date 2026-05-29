import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { submitApplication } from "../utils/applicationsStore";
import { createRequestService } from "../services/api";

const CitizenApplyForm = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const scheme = state?.scheme || null;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    aadhaar: "",
    category: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    occupation: "",
    familyIncome: "",
    bankName: "",
    accountNo: "",
    ifsc: "",
    additionalDetails: "",
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
      0: ["fullName", "email", "phone", "dob", "gender", "aadhaar", "category"],
      1: ["address", "city", "state", "pincode"],
      2: ["occupation", "familyIncome", "bankName", "accountNo", "ifsc"],
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
    { id: 0, label: "Personal" },
    { id: 1, label: "Address" },
    { id: 2, label: "Financial & Professional" },
    { id: 3, label: "Review & Submit" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    submitApplication({
      id: `APP-CIT-${Date.now().toString().slice(-4)}`,
      applicantName: formData.fullName,
      phone: formData.phone,
      state: formData.state,
      schemeName: scheme?.title || "Citizen Scheme Benefit",
      schemeType: "Citizen Scheme",
      status: "pending",
      details: formData,
    });
    try {
      await createRequestService({
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phone,
        selectedService: scheme?.title || "Citizen Scheme Benefit",
        description: formData.additionalDetails || "Citizen scheme application submitted.",
        contactMethod: "Email",
        subject: `Citizen Scheme Application: ${scheme?.title || "Scheme"}`,
      });
    } catch (err) {
      console.error("API request-service failed:", err);
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f0f4ff] to-white flex items-center justify-center p-6 font-sans">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 max-w-lg w-full p-10 text-center">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-3">Application Submitted!</h1>
          <p className="text-slate-500 mb-2 text-base">
            Your application for <span className="font-semibold text-blue-700">{scheme?.title || "the scheme"}</span> has been submitted successfully.
          </p>
          <p className="text-sm text-slate-400 mb-8">Application ID: <span className="font-mono font-semibold text-slate-600">CIT-{Date.now().toString().slice(-8)}</span></p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => navigate(-1)} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-sm">
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
            Back to Schemes
          </button>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Citizen Scheme Application Assistance</h1>
          {scheme && (
            <div className="mt-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
              <p className="text-lg font-semibold">{scheme.title}</p>
              <div className="flex flex-wrap gap-3 mt-2 text-sm text-blue-100">
                <span> {scheme.ministry || "Government of India"}</span>
                <span> {scheme.benefit}</span>
                <span> Deadline: {scheme.deadline || "Ongoing"}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Section Tabs */}
      <div className="max-w-4xl mx-auto px-6 -mt-5">
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-1.5 flex gap-1 overflow-x-auto scrollbar-thin">
          {sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => handleSectionChange(sec.id)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all min-w-[120px] ${
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
        {/* PERSONAL SECTION */}
        {activeSection === 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 space-y-6 animate-fadeIn">
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-1">Personal Information</h2>
              <p className="text-sm text-slate-500">Provide your basic personal details for the application.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label="Full Name (as per Aadhaar)" required value={formData.fullName} onChange={(v) => update("fullName", v)} placeholder="e.g. Anil Kumar" />
              <Field label="Email Address" type="email" required value={formData.email} onChange={(v) => update("email", v)} placeholder="anil@example.com" />
              <Field label="Mobile Number" type="tel" required value={formData.phone} onChange={(v) => update("phone", v)} placeholder="+91 98765 43210" />
              <Field label="Date of Birth" type="date" required value={formData.dob} onChange={(v) => update("dob", v)} />
              <SelectField label="Gender" required value={formData.gender} onChange={(v) => update("gender", v)} options={["Male", "Female", "Other"]} />
              <Field label="Aadhaar Number" required value={formData.aadhaar} onChange={(v) => update("aadhaar", v)} placeholder="XXXX XXXX XXXX" />
              <SelectField label="Social Category" required value={formData.category} onChange={(v) => update("category", v)} options={["General", "OBC", "SC", "ST"]} />
            </div>
            <div className="flex justify-end pt-4 flex-col items-end gap-3">
              {error && (
                <div className="text-red-500 text-sm font-semibold animate-bounce">
                  {error}
                </div>
              )}
              <button type="button" onClick={() => handleSectionChange(1)} className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-sm">
                Next: Address Details →
              </button>
            </div>
          </div>
        )}

        {/* ADDRESS SECTION */}
        {activeSection === 1 && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 space-y-6 animate-fadeIn">
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-1">Residential Address</h2>
              <p className="text-sm text-slate-500">Provide your current residential address details.</p>
            </div>
            <div className="space-y-5">
              <Field label="Full Address" required value={formData.address} onChange={(v) => update("address", v)} placeholder="House No, Street, Locality" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <Field label="City" required value={formData.city} onChange={(v) => update("city", v)} placeholder="e.g. Patna" />
                <Field label="State" required value={formData.state} onChange={(v) => update("state", v)} placeholder="e.g. Bihar" />
                <Field label="PIN Code" required value={formData.pincode} onChange={(v) => update("pincode", v)} placeholder="e.g. 800001" />
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
                  Next: Financial & Professional →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* FINANCIAL & PROFESSIONAL SECTION */}
        {activeSection === 2 && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 space-y-6 animate-fadeIn">
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-1">Financial & Professional Details</h2>
              <p className="text-sm text-slate-500">Information regarding your occupation and bank account.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <SelectField label="Occupation Status" required value={formData.occupation} onChange={(v) => update("occupation", v)} options={["Salaried", "Self-Employed / Business", "Farmer", "Student", "Unemployed", "Retired", "Other"]} />
              <SelectField label="Annual Family Income" required value={formData.familyIncome} onChange={(v) => update("familyIncome", v)} options={["Below ₹1 LPA", "₹1 - ₹3 LPA", "₹3 - ₹6 LPA", "₹6 - ₹10 LPA", "Above ₹10 LPA"]} />
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
                  Next: Review & Submit →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* REVIEW & SUBMIT SECTION */}
        {activeSection === 3 && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 space-y-6 animate-fadeIn">
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-1">Review & Upload Documents</h2>
              <p className="text-sm text-slate-500">Provide final details, attach documents, and submit your request.</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Additional Information or Specific Assistance Notes (Optional)
              </label>
              <textarea
                value={formData.additionalDetails}
                onChange={(e) => update("additionalDetails", e.target.value)}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all text-[15px] text-slate-700 resize-none animate-fadeIn"
                placeholder="Mention any specific help or documents you need assistance with..."
              />
            </div>

            {/* Document Placeholders */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">Upload Copy of Documents (Optional)</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {["Aadhaar Card Copy", "Income Certificate Proof", "Address Proof (Ration Card/Voter ID)", "Passport Size Photo"].map((doc) => (
                  <div key={doc} className="flex items-center gap-3 p-3 rounded-xl border-2 border-dashed border-slate-200 hover:border-blue-300 transition-colors cursor-pointer group">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500 group-hover:bg-blue-100 transition-colors">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700">{doc}</p>
                      <p className="text-xs text-slate-400">Click to select file</p>
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
                  I hereby declare that all the information provided in this assistance request is true and accurate. I understand that EasyForm provides application assistance services and is not a government body. I agree to the <span className="text-blue-600 font-medium">Terms & Conditions</span>.
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

export default CitizenApplyForm;
