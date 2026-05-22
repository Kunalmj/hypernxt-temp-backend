import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ScholarshipApplyForm = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const scholarship = state?.scholarship || null;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    aadhaar: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    institution: "",
    course: "",
    yearOfStudy: "",
    cgpa: "",
    class12Percent: "",
    familyIncome: "",
    bankName: "",
    accountNo: "",
    ifsc: "",
    essay: "",
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
      0: ["fullName", "email", "phone", "dob", "gender", "aadhaar", "address", "city", "state", "pincode"],
      1: ["institution", "course", "yearOfStudy", "cgpa", "class12Percent"],
      2: ["familyIncome", "bankName", "accountNo", "ifsc"],
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
    { id: 1, label: "Academic" },
    { id: 2, label: "Financial" },
    { id: 3, label: "Statement" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f0f4ff] to-white flex items-center justify-center p-6 font-sans">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 max-w-lg w-full p-10 text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-3">Application Submitted!</h1>
          <p className="text-slate-500 mb-2 text-base">
            Your application for <span className="font-semibold text-blue-700">{scholarship?.title || "the scholarship"}</span> has been submitted successfully.
          </p>
          <p className="text-sm text-slate-400 mb-8">Application ID: <span className="font-mono font-semibold text-slate-600">SCH-{Date.now().toString().slice(-8)}</span></p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => navigate("/scholarship-results", { state: { results: [] } })} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-sm">
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
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Scholarship Application</h1>
          {scholarship && (
            <div className="mt-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
              <p className="text-lg font-semibold">{scholarship.title}</p>
              <div className="flex flex-wrap gap-3 mt-2 text-sm text-blue-100">
                <span> {scholarship.provider}</span>
                <span> {scholarship.amount}</span>
                <span> Deadline: {scholarship.deadline}</span>
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
        {/* PERSONAL SECTION */}
        {activeSection === 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 space-y-6 animate-fadeIn">
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-1">Personal Information</h2>
              <p className="text-sm text-slate-500">Provide your basic personal details for the application.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label="Full Name (as per Aadhaar)" required value={formData.fullName} onChange={(v) => update("fullName", v)} placeholder="e.g. Rahul Sharma" />
              <Field label="Email Address" type="email" required value={formData.email} onChange={(v) => update("email", v)} placeholder="rahul@example.com" />
              <Field label="Mobile Number" type="tel" required value={formData.phone} onChange={(v) => update("phone", v)} placeholder="+91 98765 43210" />
              <Field label="Date of Birth" type="date" required value={formData.dob} onChange={(v) => update("dob", v)} />
              <SelectField label="Gender" required value={formData.gender} onChange={(v) => update("gender", v)} options={["Male", "Female", "Other"]} />
              <Field label="Aadhaar Number" required value={formData.aadhaar} onChange={(v) => update("aadhaar", v)} placeholder="XXXX XXXX XXXX" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <Field label="Full Address" required value={formData.address} onChange={(v) => update("address", v)} placeholder="House No, Street, Locality" />
              </div>
              <Field label="City" required value={formData.city} onChange={(v) => update("city", v)} placeholder="e.g. New Delhi" />
              <Field label="State" required value={formData.state} onChange={(v) => update("state", v)} placeholder="e.g. Delhi" />
              <Field label="PIN Code" required value={formData.pincode} onChange={(v) => update("pincode", v)} placeholder="e.g. 110001" />
            </div>
            <div className="flex justify-end pt-4 flex-col items-end gap-3">
              {error && (
                <div className="text-red-500 text-sm font-semibold animate-bounce">
                  {error}
                </div>
              )}
              <button type="button" onClick={() => handleSectionChange(1)} className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-sm">
                Next: Academic Details →
              </button>
            </div>
          </div>
        )}

        {/* ACADEMIC SECTION */}
        {activeSection === 1 && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 space-y-6 animate-fadeIn">
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-1">Academic Details</h2>
              <p className="text-sm text-slate-500">Your current academic status and previous qualifications.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label="Institution Name" required value={formData.institution} onChange={(v) => update("institution", v)} placeholder="e.g. IIT Delhi" />
              <Field label="Course / Program" required value={formData.course} onChange={(v) => update("course", v)} placeholder="e.g. B.Tech Computer Science" />
              <SelectField label="Year of Study" required value={formData.yearOfStudy} onChange={(v) => update("yearOfStudy", v)} options={["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year"]} />
              <Field label="Current CGPA / Percentage" required value={formData.cgpa} onChange={(v) => update("cgpa", v)} placeholder="e.g. 8.5 or 85%" />
              <Field label="Class 12 Percentage" required value={formData.class12Percent} onChange={(v) => update("class12Percent", v)} placeholder="e.g. 92.5%" />
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
                  Next: Financial Info →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* FINANCIAL SECTION */}
        {activeSection === 2 && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 space-y-6 animate-fadeIn">
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-1">Financial Information</h2>
              <p className="text-sm text-slate-500">Bank details for scholarship disbursement.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                  Next: Statement →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STATEMENT & DECLARATION */}
        {activeSection === 3 && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 space-y-6 animate-fadeIn">
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-1">Personal Statement & Declaration</h2>
              <p className="text-sm text-slate-500">Tell us why you deserve this scholarship.</p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Statement of Purpose <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.essay}
                onChange={(e) => update("essay", e.target.value)}
                rows={6}
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all text-[15px] text-slate-700 resize-none"
                placeholder="Describe your academic goals, achievements, and why you are the ideal candidate for this scholarship (min 100 words)..."
                required
              />
              <p className="text-xs text-slate-400 mt-1">{formData.essay.split(/\s+/).filter(Boolean).length} / 100 words minimum</p>
            </div>

            {/* Document Upload placeholders */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">Required Documents</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {["Aadhaar Card (PDF)", "Class 12 Marksheet", "Current Year Marksheet", "Income Certificate", "Passport Photo"].map((doc) => (
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
                  I hereby declare that all information provided is true and correct to the best of my knowledge. I understand that any false information may lead to cancellation of my application. I agree to the <span className="text-blue-600 font-medium">Terms & Conditions</span> and <span className="text-blue-600 font-medium">Privacy Policy</span>.
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

export default ScholarshipApplyForm;
