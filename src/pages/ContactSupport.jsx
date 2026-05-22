import React from "react";

const ContactSupport = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] relative overflow-hidden font-sans text-slate-800">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-100/50 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-100/50 rounded-full blur-[100px] pointer-events-none -translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[0.65rem] font-bold tracking-widest uppercase mb-6 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
            24/7 Support Available
          </div> */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight text-slate-900">
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Touch.</span>
          </h1>
          <p className="text-base md:text-lg text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
            Have questions about a specific scheme or need technical support with your FormEase account? Our dedicated team is here to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Left: Info Cards */}
          <div className="lg:col-span-5 space-y-5 md:space-y-6">
            {[
                // { t: "Expert Support", v: "1800-300-4000", ext: "Toll Free", d: "Mon-Sat, 9am - 6pm IST", icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" },
                { t: "Email Inquiry", v: "contact@formease.in", ext: "", d: "Average response time: 4 hours", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
                // { t: "Headquarters", v: "Civic Tower, Sector 62", ext: "", d: "Bhubaneswar, Odisha, India", icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" }
            ].map((item, i) => (
                <div key={i} className="group flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6 p-6 sm:p-8 rounded-[2rem] bg-white border border-slate-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 shadow-md">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 text-blue-600 shadow-sm group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300">
                        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="sm:w-6 sm:h-6"><path d={item.icon} /></svg>
                    </div>
                    <div>
                        <div className="text-[0.6rem] sm:text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest mb-1.5">{item.t}</div>
                        <div className="text-lg sm:text-xl font-bold text-slate-900 mb-1 flex flex-wrap items-baseline gap-2">
                          {item.v}
                          {item.ext && <span className="text-[0.6rem] font-bold text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded uppercase tracking-wider">{item.ext}</span>}
                        </div>
                        <div className="text-xs sm:text-sm text-slate-500 font-medium">{item.d}</div>
                    </div>
                </div>
            ))}
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-10 md:p-12 rounded-[2rem] md:rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 relative overflow-hidden">
                {/* Internal Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full blur-[80px] pointer-events-none"></div>

                <form className="space-y-6 sm:space-y-8 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                        <div className="space-y-2 sm:space-y-3">
                            <label className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                            <input type="text" placeholder="John Doe" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 sm:px-6 py-3.5 sm:py-4 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium shadow-inner shadow-slate-100/50" />
                        </div>
                        <div className="space-y-2 sm:space-y-3">
                            <label className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                            <input type="email" placeholder="john@example.com" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 sm:px-6 py-3.5 sm:py-4 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium shadow-inner shadow-slate-100/50" />
                        </div>
                    </div>
                    <div className="space-y-2 sm:space-y-3">
                        <label className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest ml-1">Inquiry Subject</label>
                        <div className="relative">
                          <select className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 sm:px-6 py-3.5 sm:py-4 text-sm text-slate-900 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium appearance-none cursor-pointer shadow-inner shadow-slate-100/50">
                              <option>Scheme Eligibility Question</option>
                              <option>Technical Issue</option>
                              <option>Document Correction</option>
                              <option>Partnership Inquiry</option>
                              <option>Other</option>
                          </select>
                          <div className="absolute inset-y-0 right-5 sm:right-6 flex items-center pointer-events-none text-slate-400">
                             <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
                          </div>
                        </div>
                    </div>
                    <div className="space-y-2 sm:space-y-3">
                        <label className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest ml-1">Your Message</label>
                        <textarea rows="5" placeholder="How can we help you?" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 sm:px-6 py-3.5 sm:py-4 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium resize-none shadow-inner shadow-slate-100/50"></textarea>
                    </div>
                    <button className="w-full bg-blue-600 text-white font-bold py-4 sm:py-5 rounded-2xl shadow-xl shadow-blue-600/20 hover:shadow-blue-600/40 hover:bg-blue-700 transition-all hover:-translate-y-1 tracking-wider uppercase text-sm mt-4 sm:mt-2">
                        Send Message
                    </button>
                </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactSupport;
