import { Link, NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [bottomOffset, setBottomOffset] = useState(24);
  const [admin, setAdmin] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Close dropdown on click outside
  useEffect(() => {
    if (!dropdownOpen) return;
    const handleClose = () => setDropdownOpen(false);
    window.addEventListener("click", handleClose);
    return () => window.removeEventListener("click", handleClose);
  }, [dropdownOpen]);

  useEffect(() => {
    const session = localStorage.getItem("form_ease_admin");
    if (session) {
      setAdmin(JSON.parse(session));
    } else {
      setAdmin(null);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname === "/ai-helper") return;

    const handleScroll = () => {
      const footer = document.querySelector("footer");
      if (!footer) {
        setBottomOffset(window.innerWidth <= 768 ? 20 : 24);
        return;
      }

      const footerRect = footer.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const defaultBottom = window.innerWidth <= 768 ? 20 : 24;

      if (footerRect.top < viewportHeight) {
        const visibleFooterHeight = viewportHeight - footerRect.top;
        setBottomOffset(defaultBottom + visibleFooterHeight);
      } else {
        setBottomOffset(defaultBottom);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [location.pathname]);

  return (
    <nav style={{
      position: "sticky",
      top: 0,
      zIndex: 50,
      padding: "12px 24px",
      display: "flex",
      justifyContent: "center",
      pointerEvents: "none",
    }}>
      <div style={{ 
        pointerEvents: "auto",
        maxWidth:"1000px", 
        width: "100%", 
        height:"64px", 
        display:"flex", 
        alignItems:"center", 
        justifyContent:"space-between",
        padding: "0 12px 0 24px",
        background: "rgba(255, 255, 255, 1)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(191,219,254,0.6)",
        boxShadow: "0 10px 40px rgba(30,58,138,0.08), 0 1px 3px rgba(0,0,0,0.05)",
        borderRadius: "9999px"
      }}>

        {/* LOGO */}
        <Link to="/" style={{ textDecoration:"none", display:"flex", alignItems:"center", gap:"10px" }}>
          <div style={{ width:"45px", height:"45px", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <img src="/logo.svg" alt="Logo" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>
          <div>
            <div style={{ fontSize:"1.1rem", fontWeight:"800", lineHeight:"1.1", color:"#1e3a8a", letterSpacing:"-0.02em" }}>FormEase</div>
            <div style={{ fontSize:"0.65rem", color:"#64748b", fontWeight:"500", lineHeight:"1" }}> All-in-One Platform</div>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <div style={{ display:"flex", alignItems:"center", gap:"32px" }} className="hide-mobile">
          {[
            { to: "/", label: "Home", end: true },
            { to: "/about", label: "About Us" },
            { to: "/browse-all", label: "Services" },
            { to: "/price", label: "Price" },
          ].map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              style={({ isActive }) => ({
                textDecoration: "none",
                fontSize: "0.9rem",
                fontWeight: "600",
                color: isActive ? "#1d4ed8" : "#374151",
                borderBottom: isActive ? "2px solid #1d4ed8" : "2px solid transparent",
                paddingBottom: "4px",
                transition: "all 0.2s",
              })}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div style={{ display:"flex", alignItems:"center", gap:"12px" }} className="hide-mobile">
          {admin ? (
            <div style={{ position: "relative" }}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setDropdownOpen(!dropdownOpen);
                }}
                style={{
                  fontSize: "0.85rem",
                  fontWeight: "700",
                  color: "#1e3a8a",
                  border: "1px solid rgba(191,219,254,0.6)",
                  padding: "8px 18px",
                  borderRadius: "9999px",
                  background: "#f0f7ff",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#e0effe";
                  e.currentTarget.style.borderColor = "rgba(147,197,253,0.8)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#f0f7ff";
                  e.currentTarget.style.borderColor = "rgba(191,219,254,0.6)";
                }}
              >
                <span>{admin.username} ({admin.location})</span>
                <svg
                  style={{
                    width: "12px",
                    height: "12px",
                    transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s",
                  }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {dropdownOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "45px",
                    right: 0,
                    background: "white",
                    border: "1px solid rgba(226, 232, 240, 0.8)",
                    borderRadius: "16px",
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
                    width: "180px",
                    padding: "8px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                    zIndex: 100,
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Link
                    to="/admin/dashboard"
                    onClick={() => setDropdownOpen(false)}
                    style={{
                      fontSize: "0.85rem",
                      fontWeight: "600",
                      color: "#334155",
                      textDecoration: "none",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      display: "block",
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#f1f5f9";
                      e.currentTarget.style.color = "#1e3a8a";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "#334155";
                    }}
                  >
                    Admin Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      localStorage.removeItem("form_ease_admin");
                      window.location.href = "/";
                    }}
                    style={{
                      background: "transparent",
                      border: "none",
                      fontSize: "0.85rem",
                      fontWeight: "600",
                      color: "#dc2626",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      textAlign: "left",
                      cursor: "pointer",
                      width: "100%",
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#fef2f2";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    Logout Session
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Log In */}
              <Link
                to="/login"
                style={{ background:"transparent", color:"#1e3a8a", border:"none", padding:"9px 16px", borderRadius:"8px", fontSize:"0.875rem", fontWeight:"700", cursor:"pointer", textDecoration:"none", transition:"opacity 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.opacity="0.8"}
                onMouseLeave={e => e.currentTarget.style.opacity="1"}
              >
                Log In
              </Link>

              {/* Sign Up */}
              <Link
                to="/signup"
                style={{ background:"#1e3a8a", color:"white", border:"none", padding:"10px 24px", borderRadius:"9999px", fontSize:"0.875rem", fontWeight:"700", cursor:"pointer", textDecoration:"none", transition:"background 0.2s", boxShadow:"0 2px 8px rgba(30,58,138,0.25)", display:"inline-block" }}
                onMouseEnter={e => e.currentTarget.style.background="#1e40af"}
                onMouseLeave={e => e.currentTarget.style.background="#1e3a8a"}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* MOBILE BUTTON */}
        <button
          style={{ display:"none", background:"none", border:"none", fontSize:"1.5rem", cursor:"pointer", color:"#374151" }}
          className="show-mobile"
          onClick={() => setOpen(!open)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div style={{ pointerEvents:"auto", position: "absolute", top: "90px", left: "24px", right: "24px", background:"rgba(255,255,255,0.96)", backdropFilter:"blur(16px)", border:"1px solid rgba(191,219,254,0.5)", borderRadius:"24px", padding:"16px 24px 20px", boxShadow:"0 20px 40px rgba(0,0,0,0.1)" }}>
          {[
            { to: "/", label: "Home", end: true },
            { to: "/about", label: "About Us" },
            { to: "/browse-all", label: "Services" },
             { to: "/price", label: "Price" },
             ...(admin ? [{ to: "/admin/dashboard", label: "Admin Dashboard" }] : []),
          ].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              style={{ display:"block", padding:"10px 0", color:"#374151", textDecoration:"none", fontSize:"0.9rem", fontWeight:"500", borderBottom:"1px solid #f0f4ff" }}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div style={{ display:"flex", gap:"10px", marginTop:"12px" }}>
            {admin ? (
              <button
                onClick={() => {
                  localStorage.removeItem("form_ease_admin");
                  window.location.href = "/";
                }}
                style={{ flex:1, background:"#dc2626", color:"white", border:"none", padding:"11px", borderRadius:"8px", fontWeight:"700", fontSize:"0.9rem", cursor:"pointer" }}
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" style={{ flex:1, background:"transparent", color:"#1e3a8a", border:"1px solid #1e3a8a", padding:"11px", borderRadius:"8px", fontWeight:"700", fontSize:"0.9rem", cursor:"pointer", textDecoration:"none", textAlign:"center" }} onClick={() => setOpen(false)}>
                  Log In
                </Link>
                <Link to="/signup" style={{ flex:1, background:"#1e3a8a", color:"white", border:"none", padding:"11px", borderRadius:"8px", fontWeight:"700", fontSize:"0.9rem", cursor:"pointer", textDecoration:"none", textAlign:"center" }} onClick={() => setOpen(false)}>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
      {/* Try AI Button */}
      {location.pathname !== "/ai-helper" && (
        <Link
          to="/ai-helper"
          className="ai-round-btn"
          style={{ bottom: `${bottomOffset}px` }}
        >
          <span className="ai-ripple-ring" style={{ animationDelay: "0s" }} />
          <span className="ai-ripple-ring" style={{ animationDelay: "0.8s" }} />
          <span className="ai-ripple-ring" style={{ animationDelay: "1.6s" }} />
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="10" rx="2" />
            <path d="M12 11V7M8 15h.01M16 15h.01M8 19h8" />
            <circle cx="12" cy="5" r="2" />
          </svg>
        </Link>
      )}

      <style>{`
        .ai-round-btn {
          position: fixed;
          right: 24px;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #1e3a8a;
          color: white !important;
          border-radius: 50%;
          box-shadow: 0 10px 30px rgba(30,58,138,0.22), 0 1px 5px rgba(0,0,0,0.1);
          border: 1px solid rgba(191,219,254,0.4);
          text-decoration: none;
          pointer-events: auto;
          z-index: 60;
          transition: background 0.25s ease, transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s ease;
        }
        .ai-round-btn:hover {
          background: #1e40af;
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 12px 35px rgba(30,58,138,0.3), 0 3px 8px rgba(0,0,0,0.15);
        }
        .ai-round-btn::after {
          content: "Use AI Helper";
          position: absolute;
          bottom: 60px;
          left: 50%;
          transform: translateX(-50%) translateY(10px);
          background: #0f172a;
          color: white;
          padding: 6px 12px;
          font-size: 0.75rem;
          font-weight: 600;
          border-radius: 8px;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        .ai-round-btn:hover::after {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
        .ai-round-btn svg {
          flex-shrink: 0;
        }
        .ai-ripple-ring {
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          border-radius: 50%;
          border: 2px solid rgba(59, 130, 246, 0.5);
          pointer-events: none;
          z-index: -1;
          animation: pulse-wave 2.4s infinite cubic-bezier(0.215, 0.61, 0.355, 1);
        }
        @keyframes pulse-wave {
          0% {
            transform: scale(0.95);
            opacity: 0.8;
          }
          100% {
            transform: scale(1.6);
            opacity: 0;
          }
        }
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .show-mobile { display: block !important; }
          .ai-round-btn {
            right: 20px !important;
            left: auto !important;
            width: 46px !important;
            height: 46px !important;
          }
          .ai-round-btn::after {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;
