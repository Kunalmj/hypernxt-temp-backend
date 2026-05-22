import React from "react";

const PricingPage = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [modalType, setModalType] = React.useState("government");

  const governmentFeatures = [
    "Government Schemes",
    "Agriculture Schemes",
    "Women Programs",
    "General Forms",
  ];

  const premiumFeatures = [
    {
      title: "Scholarships",
      desc: "SOP writing, application review",
    },
    {
      title: "Startup Grants",
      desc: "Business plans, pitch decks",
    },
    {
      title: "MSME Subsidies",
      desc: "Registration, compliance",
    },
    {
      title: "Research Grants",
      desc: "Proposal writing, budget planning",
    },
    {
      title: "Tenders/RFPs",
      desc: "Bid preparation & submission",
    },
  ];

  return (
    <>
      {/* MODAL */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{
            background: "rgba(15,23,42,0.55)",
            backdropFilter: "blur(4px)",
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-[20px] w-full max-w-[470px] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* HEADER */}
            <div className="px-5 py-4 border-b border-[#e2e8f0] flex items-start justify-between">
              <div>
                <h2 className="text-[1.3rem] font-black text-[#0f172a] mb-1">
                  {modalType === "government"
                    ? "Get Started - ₹100"
                    : "Contact Sales"}
                </h2>

                <p className="text-[#64748b] text-[0.82rem] leading-relaxed">
                  {modalType === "government"
                    ? "Fill out the form to proceed."
                    : "Tell us about your requirements."}
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="text-[#64748b] text-2xl leading-none hover:text-[#0f172a]"
              >
                ×
              </button>
            </div>

            {/* FORM */}
            <div className="p-4">
              <div className="space-y-3">
                {/* FULL NAME */}
                <div>
                  <label className="block text-xs font-bold text-[#0f172a] mb-1">
                    Full Name *
                  </label>

                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full h-10 rounded-[14px] border border-[#d1d5db] px-4 text-sm outline-none focus:border-[#2563eb]"
                  />
                </div>

                {/* EMAIL */}
                <div>
                  <label className="block text-xs font-bold text-[#0f172a] mb-1">
                    Email Address *
                  </label>

                  <input
                    type="email"
                    placeholder="your.email@example.com"
                    className="w-full h-10 rounded-[14px] border border-[#d1d5db] px-4 text-sm outline-none focus:border-[#2563eb]"
                  />
                </div>

                {/* PHONE */}
                <div>
                  <label className="block text-xs font-bold text-[#0f172a] mb-1">
                    Phone / WhatsApp *
                  </label>

                  <input
                    type="text"
                    placeholder="+91 98765 43210"
                    className="w-full h-10 rounded-[14px] border border-[#d1d5db] px-4 text-sm outline-none focus:border-[#2563eb]"
                  />
                </div>

                {/* SERVICE */}
                <div>
                  <label className="block text-xs font-bold text-[#0f172a] mb-1">
                    Service Required *
                  </label>

                  <select className="w-full h-10 rounded-[14px] border border-[#d1d5db] px-4 text-sm outline-none focus:border-[#2563eb]">
                    {modalType === "government" ? (
                      <>
                        <option>Government Schemes</option>
                        <option>Agriculture Schemes</option>
                        <option>Women Programs</option>
                        <option>General Forms</option>
                      </>
                    ) : (
                      <>
                        <option>Scholarships</option>
                        <option>Startup Grants</option>
                        <option>MSME Subsidies</option>
                        <option>Research Grants</option>
                        <option>Tenders/RFPs</option>
                      </>
                    )}
                  </select>
                </div>

                {/* TEXTAREA */}
                <div>
                  <label className="block text-xs font-bold text-[#0f172a] mb-1">
                    Requirement
                  </label>

                  <textarea
                    rows={2}
                    placeholder="Describe your requirements..."
                    className="w-full rounded-[14px] border border-[#d1d5db] px-4 py-2 text-sm outline-none resize-none focus:border-[#2563eb]"
                  />
                </div>
              </div>

              {/* BUTTONS */}
              <div className="flex gap-3 mt-5">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 h-10 rounded-[12px] border border-[#d1d5db] text-[#0f172a] font-bold text-sm"
                >
                  Cancel
                </button>

                <button className="flex-1 h-10 rounded-[12px] bg-gradient-to-r from-[#0284c7] to-[#2563eb] text-white font-bold text-sm">
                  Submit →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PAGE */}
      <div className="min-h-screen bg-[#f8fafc]">
        {/* HERO */}
        <section className="px-6 pt-24 pb-16 text-center bg-gradient-to-b from-[#eff6ff] to-[#f8fafc]">
          <div className="inline-flex items-center gap-2 bg-white border border-[#bfdbfe] rounded-full px-5 py-2 text-sm font-semibold text-[#2563eb] shadow-sm mb-6">
            ₹ Simple & Transparent Pricing
          </div>

          <h1 className="text-[2.5rem] md:text-[4rem] leading-[1.05] font-black tracking-[-0.04em] text-[#0f172a] max-w-5xl mx-auto">
            <span className="text-[#2563eb]">
              Government Schemes, Scholarships,
              <br />
              Startup Grants & Tenders
            </span>
            <br />
            Application Assistance
          </h1>

          <p className="mt-6 text-lg text-[#475569] max-w-2xl mx-auto leading-relaxed">
            Choose the plan that fits your needs — from flat-rate
            government forms to customized premium services.
          </p>
        </section>

        {/* CARDS */}
        <section className="max-w-5xl mx-auto px-6 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            
            {/* LEFT CARD */}
            <div className="bg-white rounded-[28px] border border-[#e2e8f0] p-6 shadow-[0_10px_30px_rgba(37,99,235,0.08)] overflow-hidden flex flex-col h-full">
              
              <h2 className="text-2xl font-black text-[#0f172a] mb-1">
                Government Forms
              </h2>

              <p className="text-[#64748b] text-sm mb-6">
                Perfect for government scheme applications
              </p>

              <div className="flex items-end gap-2 mb-6">
                <span className="text-5xl font-black text-[#0f172a]">
                  ₹100
                </span>

                <span className="text-[#64748b] text-lg mb-1">
                  / application
                </span>
              </div>

              {/* FLEXIBLE CONTENT */}
              <div className="flex-1 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wide text-[#0f172a]">
                  Includes:
                </h3>

                {governmentFeatures.map((item) => (
                  <div
                    key={item}
                    className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl px-4 py-3"
                  >
                    <div className="font-bold text-sm text-[#0f172a]">
                      {item}
                    </div>
                  </div>
                ))}
              </div>

              {/* BOTTOM */}
              <div className="mt-auto pt-6">
                <button
                  onClick={() => {
                    setModalType("government");
                    setShowModal(true);
                  }}
                  className="w-full h-12 rounded-2xl bg-gradient-to-r from-[#0284c7] to-[#2563eb] text-white font-bold text-base"
                >
                  Get Started →
                </button>

                <div className="mt-4 text-center">
                  <a
                    href="/faq"
                    className="text-[#2563eb] font-semibold text-sm hover:underline"
                  >
                    View Frequently Asked Questions →
                  </a>
                </div>
              </div>
            </div>

            {/* RIGHT CARD */}
            <div className="bg-white rounded-[28px] border border-[#e2e8f0] p-6 shadow-[0_10px_30px_rgba(37,99,235,0.08)] overflow-hidden flex flex-col h-full">
              
              <h2 className="text-2xl font-black text-[#0f172a] mb-1">
                Scholarships & Startup Services
              </h2>

              <p className="text-[#64748b] text-sm mb-6">
                Customized solutions for advanced applications
              </p>

              <div className="text-4xl font-black text-[#0f172a] mb-6">
                Contact Sales
              </div>

              {/* FLEXIBLE CONTENT */}
              <div className="flex-1 space-y-3">
                {premiumFeatures.map((item) => (
                  <div
                    key={item.title}
                    className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl px-4 py-3"
                  >
                    <div className="font-bold text-sm text-[#0f172a]">
                      {item.title}
                    </div>

                    <div className="text-xs text-[#64748b] mt-1">
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>

              {/* BOTTOM */}
              <div className="mt-auto pt-6">
                <button
                  onClick={() => {
                    setModalType("premium");
                    setShowModal(true);
                  }}
                  className="w-full h-12 rounded-2xl bg-gradient-to-r from-[#0284c7] to-[#2563eb] text-white font-bold text-base"
                >
                  Contact Sales →
                </button>

                <div className="mt-4 text-center">
                  <a
                    href="/faq"
                    className="text-[#2563eb] font-semibold text-sm hover:underline"
                  >
                    View Frequently Asked Questions →
                  </a>
                </div>
              </div>
            </div>

          </div>
        </section>
      </div>
    </>
  );
};

export default PricingPage;