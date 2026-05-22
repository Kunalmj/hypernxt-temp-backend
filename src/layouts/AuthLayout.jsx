// import React from "react";
// import { Link, Outlet, useLocation } from "react-router-dom";

// const AuthLayout = () => {
//   const location = useLocation();

//   return (
//     <div 
//       className="min-h-screen relative flex items-center justify-center p-4 md:p-8 overflow-hidden"
//       style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}
//     >
//       {/* Global Background Image */}
//       <div className="absolute inset-0 z-0 bg-slate-900">
//         <img
//           src="/contentb.jpeg"
//           alt="Global Background"
//           className="absolute inset-0 w-full h-full object-cover opacity-80"
//         />
//         {/* Dark overlay to ensure the card stands out */}
//         <div className="absolute inset-0 bg-slate-900/60 mix-blend-multiply"></div>
//       </div>

//       {/* Main Card Container */}
//       <div className="w-full max-w-[1000px] h-[600px] md:h-[650px] relative z-10 flex shadow-2xl rounded-[2.5rem]">

//         {/* Left Side: Image Area with Border */}
//         <div className="hidden md:block absolute top-0 left-0 w-[60%] h-full rounded-[2.5rem] border-[14px] border-white/90 z-20 overflow-hidden bg-slate-950">
//           <img
//             src="/indian-flag-tall.png"
//           alt="Indian Flag Background"
//             className="absolute w-full h-full object-cover object-top"
//           />

//           <div className="w-full h-full relative z-30 pointer-events-auto">

//             {/* Left Side Header */}
//             <div className="absolute top-8 left-8 text-white font-bold tracking-wide flex items-center gap-2 text-sm drop-shadow-lg">
//               Citizen Services
//             </div>

//             <div className="absolute top-8 right-12 text-sm font-bold flex gap-3 z-20 items-center drop-shadow-lg">
//               <Link to="/login" className={`px-5 py-2 rounded-full transition-all ${location.pathname === '/login' ? 'bg-white text-slate-900 shadow-md' : 'border border-white/40 text-white hover:bg-white hover:text-slate-900'}`}>Login</Link>
//               <Link to="/signup" className={`px-5 py-2 rounded-full transition-all ${location.pathname === '/signup' ? 'bg-white text-slate-900 shadow-md' : 'border border-white/40 text-white hover:bg-white hover:text-slate-900'}`}>Sign Up</Link>
//             </div>

//           </div>
//         </div>

//         {/* Right Side: Solid White Form Area */}
//         <div
//           className="w-full md:w-[50%] h-full bg-white absolute top-0 right-0 z-30 flex flex-col rounded-[2rem] md:rounded-[2.5rem] md:[clip-path:polygon(10%_0,100%_0,100%_100%,0%_100%)]"
//         >
//           {/* Header */}
//           <div className="flex justify-between items-center px-8 md:pl-[20%] md:pr-10 pt-8">
//             <Link to="/" className="font-black text-xl tracking-tight text-slate-900 uppercase">
//               OPPURTUNITY<span className="text-blue-600">HUB</span>
//             </Link>
//           </div>

//           {/* Scrollable Form Content */}
//           <style>{`
//             .no-scrollbar::-webkit-scrollbar {
//               display: none;
//             }
//           `}</style>
//           <div 
//             className="flex-1 flex flex-col items-center justify-center px-8 md:pl-[20%] md:pr-10 py-6 overflow-y-auto w-full no-scrollbar"
//             style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
//           >
//             <div className="w-full max-w-[360px] mx-auto">
//               <Outlet key={location.pathname} />
//             </div>
//           </div>

//           {/* Social Icons Footer */}
//           <div className="flex justify-center gap-6 pb-6 md:pl-[20%] md:-ml-6 text-slate-400">
//             <Link to="#" className="hover:text-slate-600 transition"><svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg></Link>
//             <Link to="#" className="hover:text-slate-600 transition"><svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg></Link>
//             <Link to="#" className="hover:text-slate-600 transition"><svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg></Link>
//             <Link to="#" className="hover:text-slate-600 transition"><svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg></Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuthLayout;



import React from "react";
import { Link, Outlet, useLocation ,useNavigate } from "react-router-dom";

const AuthLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div 
      className="min-h-screen relative flex items-center justify-center p-4 md:p-8 overflow-hidden bg-slate-950"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <button
  onClick={() => navigate(-1)}
  className="absolute top-6 left-6 z-50 w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-all shadow-sm"
>
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 18l-6-6 6-6" />
  </svg>
</button>
      
      {/* Background Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/20 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>

      {/* Main Card Container */}
      <div className="w-full max-w-[1100px] h-[650px] relative z-10 flex shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] rounded-[2.5rem] overflow-hidden border border-white/10">

        {/* Left Side: Modern Visual Panel */}
        <div className="hidden md:flex relative w-[55%] h-full bg-slate-900 flex-col justify-between p-12 overflow-hidden">
          
          {/* Animated Mesh Gradient Background */}
          <div className="absolute inset-0 z-0 opacity-40">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-transparent to-indigo-900"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
          </div>

          <div className="relative z-10">
            
            <div className="flex items-center gap-2 mb-8">
               <div className="w-8 h-8 bg-blue-500 rounded-lg rotate-12"></div>
               <span className="text-white font-bold tracking-widest text-xs uppercase opacity-70">Premium Access</span>
            </div>
            
            <h2 className="text-4xl font-bold text-white leading-tight">
              Unlock your <br />
              <span className="text-blue-400">Professional</span> potential.
            </h2>
            <p className="text-slate-400 mt-4 max-w-xs text-sm leading-relaxed">
              Join thousands of citizens accessing exclusive opportunities and career resources daily.
            </p>
          </div>

          {/* Navigation Links at Bottom Left */}
          <div className="relative z-10 flex gap-1 bg-slate-950/50 p-1.5 rounded-2xl border border-white/5 backdrop-blur-xl w-fit">
            <Link 
              to="/login" 
              className={`px-8 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                location.pathname === '/login' 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                : 'text-slate-400 hover:text-white'
              }`}
            >
              Login
            </Link>
            <Link 
              to="/signup" 
              className={`px-8 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                location.pathname === '/signup' 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                : 'text-slate-400 hover:text-white'
              }`}
            >
              Register
            </Link>
          </div>
        </div>

        {/* Right Side: Form Area */}
        <div className="w-full md:w-[45%] h-full bg-white flex flex-col relative z-20">
          
          {/* Logo Header */}
          {/* <div className="pt-12 px-8 flex justify-center md:justify-start">
            <Link to="/" className="group flex items-center gap-1">
              <span className="font-black text-2xl tracking-tighter text-slate-900">
                FORMEASE<span className="text-blue-600 group-hover:text-indigo-600 transition-colors"></span>
              </span>
            </Link>
          </div> */}

          {/* Form Content */}
          {/* <div className="flex-1 flex flex-col items-center justify-center px-8 lg:px-12 py-6 overflow-y-auto no-scrollbar"> */}
          <div className="flex-1 flex flex-col items-center justify-center px-8 lg:px-12 py-6 overflow-hidden">
            <div className="w-full max-w-[340px]">
              <Outlet key={location.pathname} />
            </div>
          </div>

          {/* Social Footer */}
          <div className="pb-8 px-8 flex flex-col items-center">
            <div className="w-full h-[1px] bg-slate-100 mb-6"></div>
             <div className="flex justify-center gap-6 pb-6 md:pl-[20%] md:-ml-6 text-slate-400">
            <Link to="#" className="hover:text-slate-600 transition"><svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg></Link>
            <Link to="#" className="hover:text-slate-600 transition"><svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg></Link>
            <Link to="#" className="hover:text-slate-600 transition"><svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg></Link>
           <Link to="#" className="hover:text-slate-600 transition"><svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg></Link>
       </div>
          </div>
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

const SocialIcon = ({ path }) => (
  <Link to="#" className="hover:text-blue-600 transition-all duration-300 transform hover:scale-110">
    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d={path} /></svg>
  </Link>
);

export default AuthLayout;