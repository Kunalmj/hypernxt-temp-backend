import React, { useState } from "react";
import { createRequestService } from "../../services/api";

/* ── Contact method icons ─────────────────────────────────────── */
const IconEmail = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const IconPhoneOutline = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l1.32-1.32a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const IconWhatsApp = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

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
  const [submitting, setSubmitting] = useState(false);

  const set = (key, val) =>
    setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createRequestService({
        fullName: form.name,
        email: form.email,
        phoneNumber: form.phone,
        selectedService: form.specificService,
        description: form.description,
        contactMethod: form.contactMethod,
        subject: form.subject || "Service request",
      });
    } catch (err) {
      console.error("Failed to submit service request:", err);
    } finally {
      setSubmitting(false);
      setSubmitted(true);
      setTimeout(onClose, 2500);
    }
  };

  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{
        background: "rgba(15,23,42,0.55)",
        backdropFilter: "blur(4px)",
      }}
      onClick={handleBackdrop}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-[500px] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 pt-5 pb-4 border-b border-[#f1f5f9] flex items-center justify-between">
          <div>
            <h2 className="text-[1.05rem] font-extrabold text-[#0f172a]">
              Request Service
            </h2>

            <p className="text-[0.78rem] text-[#64748b] mt-0.5">
              {service}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] flex items-center justify-center text-[#64748b]"
          >
            ✕
          </button>
        </div>

        {/* Success */}
        {submitted ? (
          <div className="flex flex-col items-center justify-center py-12 px-8 text-center">
            <div className="w-14 h-14 bg-[#d1fae5] rounded-full flex items-center justify-center mb-4">
              ✓
            </div>

            <h3 className="text-[1rem] font-extrabold text-[#0f172a] mb-1.5">
              Request Submitted!
            </h3>

            <p className="text-[0.82rem] text-[#64748b] leading-relaxed">
              Our team will contact you within 24 hours.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="px-6 py-4 space-y-3"
          >
            {/* Inputs */}
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                required
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-[#e2e8f0]"
              />

              <input
                type="email"
                required
                placeholder="Email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-[#e2e8f0]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <input
                type="tel"
                required
                placeholder="Phone Number"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-[#e2e8f0]"
              />

              <select
                required
                value={form.specificService}
                onChange={(e) =>
                  set("specificService", e.target.value)
                }
                className="w-full px-3 py-2.5 rounded-xl border border-[#e2e8f0]"
              >
                <option value="">Select Service</option>

                {serviceOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <textarea
              required
              rows={3}
              value={form.description}
              onChange={(e) =>
                set("description", e.target.value)
              }
              placeholder="Describe your requirements..."
              className="w-full px-3 py-2.5 rounded-xl border border-[#e2e8f0] resize-none"
            />

            {/* Contact Method */}
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { label: "Email", Icon: IconEmail },
                { label: "Phone", Icon: IconPhoneOutline },
                { label: "WhatsApp", Icon: IconWhatsApp },
              ].map(({ label, Icon }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() =>
                    set("contactMethod", label)
                  }
                  className={`flex flex-col items-center gap-1.5 py-2.5 rounded-xl border-2 ${
                    form.contactMethod === label
                      ? "border-[#3b82f6] bg-[#eff6ff] text-[#1d4ed8]"
                      : "border-[#e2e8f0]"
                  }`}
                >
                  <Icon />
                  {label}
                </button>
              ))}
            </div>
<div>
  <input
    type="text"
    placeholder="Enter Subject"
    value={form.subject || ""}
    onChange={(e) => set("subject", e.target.value)}
    className="w-full px-3 py-2.5 rounded-xl border border-[#e2e8f0]"
  />
</div>
            {/* Buttons */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl border border-[#e2e8f0]"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={submitting}
                className="flex-1 py-2.5 rounded-xl bg-[#1d4ed8] text-white font-bold disabled:opacity-60"
              >
                {submitting ? "Submitting…" : "Submit Request →"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default RequestServiceModal;