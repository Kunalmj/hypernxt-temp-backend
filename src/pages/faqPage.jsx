import React, { useState } from "react";

const faqData = [
  {
    question: "What is included in the ₹100 Government Forms package?",
    answer:
      "The ₹100 flat rate covers complete assistance for one government scheme application, including form filling, document verification, eligibility check, and submission support.",
  },
  {
    question:
      "Why is pricing on request for Scholarships and Startup services?",
    answer:
      "Scholarships, startup grants, and research proposals vary in complexity and scope. We provide customized quotes based on your specific needs.",
  },
  {
    question: "How long does the application process take?",
    answer:
      "Government forms usually take 2–3 business days. Premium services vary depending on complexity and urgency.",
  },
  {
    question: "Do you offer refunds if my application is rejected?",
    answer:
      "We ensure your application is complete and professionally prepared, though approvals depend on the issuing authority.",
  },
  {
    question: "Can I get help with multiple applications?",
    answer:
      "Yes. We also provide package discounts for multiple scholarship or startup applications.",
  },
];

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="min-h-screen bg-[#f8fafc] py-20 px-5">

      {/* HEADER */}
      <div className="max-w-2xl mx-auto text-center mb-12">

        <div className="inline-flex items-center gap-2 bg-[#e0f2fe] text-[#0284c7] px-4 py-2 rounded-full text-xs font-bold mb-5">
          ❔ Frequently Asked Questions
        </div>

        <h1 className="text-[2.3rem] md:text-[3rem] leading-none font-black text-[#0f172a] mb-4">
          Got Questions?
        </h1>

        <p className="text-[#64748b] text-base leading-relaxed">
          Find answers to common questions about pricing and services
        </p>
      </div>

      {/* FAQ */}
      <div className="max-w-4xl mx-auto space-y-4">

        {faqData.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className="bg-white border border-[#e2e8f0] rounded-[22px] overflow-hidden shadow-sm hover:shadow-md transition-all"
            >

              {/* QUESTION */}
              <button
                onClick={() =>
                  setOpenIndex(isOpen ? null : index)
                }
                className="w-full flex items-start justify-between gap-4 text-left px-6 py-5"
              >

                <h2 className="text-[1.1rem] font-bold text-[#0f172a] leading-relaxed">
                  {faq.question}
                </h2>

                <div className="w-9 h-9 rounded-full bg-[#0284c7] text-white flex items-center justify-center text-sm flex-shrink-0">
                  {isOpen ? "−" : "↓"}
                </div>
              </button>

              {/* ANSWER */}
              {isOpen && (
                <div className="px-6 pb-6">
                  <p className="text-[#475569] text-[0.95rem] leading-7">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          );
        })}

      </div>
    </div>
  );
};

export default FAQPage;