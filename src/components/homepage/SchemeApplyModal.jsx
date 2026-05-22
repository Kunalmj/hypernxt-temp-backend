import React, { useState } from "react";

const SchemeApplyModal = ({ schemeName, onClose }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    scheme: schemeName || "",
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

  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      style={{ background: "rgba(15,23,42,0.55)", backdropFilter: "blur(4px)" }}
      onClick={handleBackdrop}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-[500px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 pt-5 pb-4 border-b border-[#f1f5f9] flex items-center justify-between bg-white">
          <div>
            <h2 className="text-[1.1rem] font-black text-[#0f172a]">Scheme Application</h2>
            <p className="text-[0.78rem] text-[#64748b] mt-0.5 font-medium">Applying for: {schemeName}</p>
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
          <div className="flex flex-col items-center justify-center py-14 px-8 text-center bg-white">
            <div className="w-16 h-16 bg-[#d1fae5] rounded-full flex items-center justify-center mb-5 animate-bounce">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h3 className="text-[1.15rem] font-black text-[#0f172a] mb-2">Application Submitted!</h3>
            <p className="text-[0.85rem] text-[#64748b] leading-relaxed max-w-[320px]">
              Success! Your application for <strong>{schemeName}</strong> has been received. Our team will contact you within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4 bg-white">
            <div className="grid grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[0.78rem] font-bold text-[#0f172a] mb-1.5">Full Name <span className="text-blue-500">*</span></label>
                <input type="text" required value={form.name} onChange={e => set("name", e.target.value)}
                  placeholder="Enter full name"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] text-[0.85rem] text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb]/10 transition-all"
                />
              </div>
              <div>
                <label className="block text-[0.78rem] font-bold text-[#0f172a] mb-1.5">Email Address <span className="text-blue-500">*</span></label>
                <input type="email" required value={form.email} onChange={e => set("email", e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] text-[0.85rem] text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb]/10 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[0.78rem] font-bold text-[#0f172a] mb-1.5">Phone Number <span className="text-blue-500">*</span></label>
                <input type="tel" required value={form.phone} onChange={e => set("phone", e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] text-[0.85rem] text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb]/10 transition-all"
                />
              </div>
              <div>
                <label className="block text-[0.78rem] font-bold text-[#0f172a] mb-1.5">Scheme Details</label>
                <div className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] text-[0.82rem] text-[#64748b] font-semibold truncate">
                  {schemeName}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[0.78rem] font-bold text-[#0f172a] mb-1.5">Brief Description / Remarks <span className="text-blue-500">*</span></label>
              <textarea required rows={3} value={form.description} onChange={e => set("description", e.target.value)}
                placeholder="Mention any specific requirements or questions regarding your application..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#e2e8f0] text-[0.85rem] text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb]/10 transition-all resize-none"
              />
            </div>

            <div>
              <label className="block text-[0.78rem] font-bold text-[#0f172a] mb-2.5">Preferred Contact Method <span className="text-blue-500">*</span></label>
              <div className="grid grid-cols-3 gap-3">
                {["Email", "Phone", "WhatsApp"].map((label) => (
                  <button key={label} type="button" onClick={() => set("contactMethod", label)}
                    className={`py-2.5 rounded-xl border-2 transition-all cursor-pointer font-bold text-[0.78rem] ${
                      form.contactMethod === label
                        ? "border-[#2563eb] bg-[#eff6ff] text-[#1e40af]"
                        : "border-[#f1f5f9] bg-white text-[#64748b] hover:border-[#e2e8f0]"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-3">
              <button type="button" onClick={onClose}
                className="flex-1 py-3 rounded-xl border-2 border-[#f1f5f9] text-[#475569] font-bold text-[0.85rem] bg-white hover:bg-[#f8fafc] transition-colors cursor-pointer"
              >Discard</button>
              <button type="submit"
                className="flex-1 py-3 rounded-xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-[0.85rem] transition-all cursor-pointer shadow-lg shadow-blue-200 active:scale-95"
              >Submit Application →</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SchemeApplyModal;
