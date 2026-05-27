import React, { useState } from "react";
import { createPortal } from "react-dom";

const AssistanceModal = ({ formName, isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    issueDescription: "",
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const update = (key, val) => {
    setFormData((prev) => ({ ...prev, [key]: val }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        issueDescription: "",
      });
      onClose();
    }, 2500);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center px-4 transition-opacity duration-300"
      style={{ background: "rgba(15, 23, 42, 0.6)", backdropFilter: "blur(6px)" }}
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white rounded-3xl w-full max-w-[500px] shadow-2xl overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-7 pt-6 pb-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 leading-tight">Request Application Assistance</h2>
            <p className="text-xs text-slate-500 mt-1 font-medium">Get expert support to submit your profile</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Body / Content */}
        {submitted ? (
          <div className="flex flex-col items-center justify-center py-16 px-8 text-center animate-in fade-in duration-300">
            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-5 border border-emerald-100">
              <svg className="w-8 h-8 text-emerald-600 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Request Received!</h3>
            <p className="text-sm text-slate-500 leading-relaxed max-w-[340px]">
              Success! We have recorded your request for <strong>{formName}</strong>. Our dedicated assistants will reach out to you within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-7 py-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">First Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => update("firstName", e.target.value)}
                  placeholder="e.g. Rahul"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Last Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => update("lastName", e.target.value)}
                  placeholder="e.g. Sharma"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Email Address <span className="text-red-500">*</span></label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="rahul.sharma@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Assistance For</label>
              <div className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-500 font-bold truncate">
                {formName}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Describe your issue / queries <span className="text-red-500">*</span></label>
              <textarea
                required
                rows={3}
                value={formData.issueDescription}
                onChange={(e) => update("issueDescription", e.target.value)}
                placeholder="Briefly state what assistance or clarification you need with this application..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all resize-none font-medium leading-relaxed"
              />
            </div>

            <div className="flex gap-3 pt-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 rounded-xl border-2 border-slate-100 text-slate-600 font-bold text-sm bg-white hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Discard
              </button>
              <button
                type="submit"
                className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all cursor-pointer shadow-lg shadow-blue-100 active:scale-95 border-none"
              >
                Submit Request
              </button>
            </div>
          </form>
        )}
      </div>
    </div>,
    document.body
  );
};

export default AssistanceModal;
