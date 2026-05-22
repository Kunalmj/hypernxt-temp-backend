import React from "react";

const testimonials = [
  { name: "Priya Sharma", location: "Mumbai, MH", tag: "Student", text: "Finding the right scholarship felt impossible until I used FromEase. The guided form helped me secure funding for my masters.", doc: "Scholarship", img: "https://i.pravatar.cc/100?img=47" },
  { name: "Rahul Verma", location: "Delhi, NCR", tag: "Founder", text: "As an early-stage founder, MSME grants were very confusing. The portal simplified the entire process and I received my seed fund.", doc: "Startup Grant", img: "https://i.pravatar.cc/100?img=12" },
  { name: "Vikram Singh", location: "Bangalore, KA", tag: "Developer", text: "The ease of tracking application status is what sets this apart. No more running to government offices for simple updates.", doc: "Digital India", img: "https://i.pravatar.cc/100?img=33" },
  { name: "Meera Reddy", location: "Hyderabad, TS", tag: "Graduate", text: "Skill development grants helped me transition into a tech career. The documentation guide was exceptionally helpful for my application.", doc: "Skill India", img: "https://i.pravatar.cc/100?img=26" },
];

const TestimonialCard = ({ testimonial }) => (
  <div className="flex-shrink-0 w-[320px] md:w-[400px] mx-4">
    <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-sm hover:shadow-md transition-shadow p-6 h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-4 mb-4">
          <img
            src={testimonial.img}
            alt={testimonial.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-[#dbeafe]"
          />
          <div>
            <div className="font-bold text-[#0f172a] text-[0.9rem]">{testimonial.name}</div>
            <div className="text-[0.75rem] text-[#64748b]">
              {testimonial.location} · <span className="text-[#1d4ed8] font-semibold">{testimonial.tag}</span>
            </div>
          </div>
        </div>
        <div className="text-2xl text-[#cbd5e1] leading-none mb-2 font-serif">"</div>
        <p className="text-[#475569] text-[0.88rem] leading-relaxed italic mb-4 whitespace-pre-wrap">
          {testimonial.text}
        </p>
      </div>
      <div className="pt-4 border-t border-[#f1f5f9] flex items-center justify-between">
        <span className="text-[0.65rem] text-[#64748b] uppercase font-bold tracking-wider">Applied For</span>
        <span className="bg-[#f0fdf4] px-3 py-1 rounded-full text-[0.75rem] font-bold text-[#1d4ed8] border border-[#1d4ed8]">
          {testimonial.doc}
        </span>
      </div>
    </div>
  </div>
);

const Testimonials = () => {
  return (
    <>
      {/* Wave Transition */}
      {/* <div className="bg-white leading-none">
        <svg viewBox="0 0 1440 56" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="block w-full h-[40px] md:h-[56px]">
          <path d="M0,28 C360,0 720,56 1080,28 C1260,14 1380,42 1440,28 L1440,56 L0,56 Z" fill="#f8fafc" />
        </svg>
      </div> */}

      <section className="bg-[#f8fafc] py-16 md:py-24 overflow-hidden relative">
        <div className="max-w-[1440px] mx-auto px-6 mb-12 text-center">
          <h2 className="text-[1.8rem] md:text-[2.2rem] font-extrabold text-[#0f172a] mb-4">Real People, Real Results</h2>
          <p className="text-[#64748b] text-[0.95rem] md:text-[1.05rem] max-w-2xl mx-auto font-medium">
            Citizens of India have successfully applied through FormEase.
            Join the community of successful applicants today.
          </p>
        </div>

        {/* Marquee Container */}
        <div className="relative">
          {/* Gradient Fades */}
          <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-[#f8fafc] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-[#f8fafc] to-transparent z-10 pointer-events-none" />

          {/* Scrolling Row */}
          <div className="flex animate-marquee hover:[animation-play-state:paused] whitespace-nowrap">
            {/* First set */}
            {testimonials.map((t, i) => (
              <TestimonialCard key={`t1-${i}`} testimonial={t} />
            ))}
            {/* Second set for seamless loop */}
            {testimonials.map((t, i) => (
              <TestimonialCard key={`t2-${i}`} testimonial={t} />
            ))}
          </div>
        </div>

      </section>
    </>
  );
};

export default Testimonials;

