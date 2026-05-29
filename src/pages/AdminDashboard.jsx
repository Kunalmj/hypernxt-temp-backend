import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getRequestServices } from "../services/api";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [expandedId, setExpandedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [liveRequests, setLiveRequests] = useState([]);
  const [liveLoading, setLiveLoading] = useState(false);
  const [liveError, setLiveError] = useState(null);
  const [liveStatuses, setLiveStatuses] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("form_ease_live_statuses") || "{}");
    } catch {
      return {};
    }
  });

  // Authenticate admin on load
  useEffect(() => {
    const adminSession = localStorage.getItem("form_ease_admin");
    if (!adminSession) {
      navigate("/login");
      return;
    }
    const adminData = JSON.parse(adminSession);
    setAdmin(adminData);
    fetchLiveRequests();
  }, [navigate]);

  const fetchLiveRequests = () => {
    setLiveLoading(true);
    setLiveError(null);
    getRequestServices()
      .then((data) => {
        const list = Array.isArray(data) ? data : (data?.results || []);
        setLiveRequests(list);
      })
      .catch((err) => {
        console.error("Failed to fetch live requests:", err);
        setLiveError("Could not reach the database. The server may be sleeping — try again in a moment.");
      })
      .finally(() => setLiveLoading(false));
  };

  if (!admin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const getRequestKey = (req) => {
    return req.id || `${req.fullName || req.full_name}-${req.selectedService || req.selected_service}`;
  };

  const getRequestStatus = (req) => {
    const key = getRequestKey(req);
    return liveStatuses[key] || "pending";
  };

  const handleStatusChange = (req, newStatus) => {
    const key = getRequestKey(req);
    const updated = { ...liveStatuses, [key]: newStatus };
    setLiveStatuses(updated);
    localStorage.setItem("form_ease_live_statuses", JSON.stringify(updated));
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Filtered requests based on tab and search
  const filteredRequests = liveRequests.filter((req) => {
    const status = getRequestStatus(req);
    const matchesTab = activeTab === "all" || status === activeTab;
    const query = searchQuery.toLowerCase().trim();
    
    const name = String(req.fullName || req.full_name || "").toLowerCase();
    const id = String(req.id || "").toLowerCase();
    const service = String(req.selectedService || req.selected_service || "").toLowerCase();
    const email = String(req.email || "").toLowerCase();
    const phone = String(req.phoneNumber || req.phone_number || "").toLowerCase();
    
    const matchesSearch = !query ||
      name.includes(query) ||
      id.includes(query) ||
      service.includes(query) ||
      email.includes(query) ||
      phone.includes(query);
      
    return matchesTab && matchesSearch;
  });

  // Calculate Stats based on DB submissions
  const stats = {
    total: liveRequests.length,
    pending: liveRequests.filter((r) => getRequestStatus(r) === "pending").length,
    resolved: liveRequests.filter((r) => getRequestStatus(r) === "resolved").length,
    rejected: liveRequests.filter((r) => getRequestStatus(r) === "rejected").length,
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white py-12 px-6 shadow-sm border-b border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="px-3.5 py-1 bg-slate-800 border border-slate-700 rounded-full text-[10px] font-bold uppercase tracking-wider text-slate-300">
                Admin Portal
              </span>
              <span className="px-3.5 py-1 bg-slate-800 border border-slate-700 rounded-full text-[10px] font-bold uppercase tracking-wider text-slate-300">
                Jurisdiction: {admin.location}
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight mt-3 text-slate-100">
              Welcome, {admin.username}
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Manage real-time database scheme and service applications for {admin.location} state.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-10">
        {/* Statistics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Submissions" value={stats.total} type="total" />
          <StatCard title="Pending Review" value={stats.pending} type="pending" />
          <StatCard title="Resolved" value={stats.resolved} type="resolved" />
          <StatCard title="Rejected" value={stats.rejected} type="rejected" />
        </div>

        {/* Controls & List Header */}
        <div className="mt-10 bg-white rounded-2xl shadow-xs border border-slate-200/60 overflow-hidden">
          <div className="border-b border-slate-200 bg-slate-50/50 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-1">
              <div className="flex items-center gap-3">
                <h2 className="text-base font-semibold text-slate-800 shrink-0">
                  Submissions Registry ({filteredRequests.length})
                </h2>
                <button
                  onClick={fetchLiveRequests}
                  disabled={liveLoading}
                  className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-[10px] font-bold rounded-lg transition-colors disabled:opacity-50 flex items-center gap-1.5"
                >
                  {liveLoading ? (
                    <svg className="animate-spin w-3 h-3 text-blue-700" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  ) : (
                    <svg className="w-3 h-3 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  )}
                  Refresh DB
                </button>
              </div>
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Search applicant name, ID, service, email, or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs focus:border-slate-400 outline-none transition-all placeholder:text-slate-400 text-slate-700 font-medium"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex gap-1 bg-slate-100 p-1 rounded-xl w-fit border border-slate-200/40 shrink-0">
              {["all", "pending", "resolved", "rejected"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === tab
                      ? "bg-white text-slate-900 shadow-xs border border-slate-200/50"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Submissions List */}
          {liveLoading && liveRequests.length === 0 ? (
            <div className="p-16 text-center flex flex-col items-center gap-3">
              <svg className="animate-spin h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <p className="text-slate-500 text-sm font-medium">Fetching database submissions…</p>
            </div>
          ) : liveError ? (
            <div className="p-16 text-center">
              <p className="text-red-500 font-semibold text-sm">{liveError}</p>
              <button
                onClick={fetchLiveRequests}
                className="mt-4 px-5 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition-colors"
              >
                Retry Fetching
              </button>
            </div>
          ) : filteredRequests.length === 0 ? (
            <div className="p-16 text-center text-slate-400">
              <svg className="w-12 h-12 text-slate-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5M3.75 5.25h16.5m-16.5 13.5h16.5" />
              </svg>
              <p className="font-semibold text-sm text-slate-600">No submissions found matching this status.</p>
              <p className="text-[11px] text-slate-400 mt-1">Real-time citizen requests will appear here automatically.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredRequests.map((req, idx) => {
                const reqId = req.id || `REQ-DB-${idx + 1}`;
                const isExpanded = expandedId === reqId;
                const status = getRequestStatus(req);
                const dateStr = req.date || (req.created_at ? new Date(req.created_at).toLocaleDateString() : "2026-05-29");

                return (
                  <div key={reqId} className="transition-all hover:bg-slate-50/20">
                    {/* Collapsed View / Row Header */}
                    <div
                      onClick={() => toggleExpand(reqId)}
                      className="px-6 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2.5">
                          <span className="text-sm font-semibold text-slate-800">
                            {req.fullName || req.full_name || "Anonymous Applicant"}
                          </span>
                          <span className="text-xs text-slate-400 font-mono">
                            {reqId}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] font-bold text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md uppercase tracking-wider">
                            Service Request
                          </span>
                          <span className="text-xs text-slate-500 font-semibold text-blue-700 bg-blue-50/50 px-2.5 py-0.5 rounded-md">
                            {req.selectedService || req.selected_service || "General Service"}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between md:justify-end gap-6">
                        <span className="text-xs text-slate-400">
                          Submitted: {dateStr}
                        </span>
                        <div className="flex items-center gap-3">
                          <StatusBadge status={status} />
                          <svg
                            className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Detail View */}
                    {isExpanded && (
                      <div className="px-6 pb-6 pt-2 bg-slate-50/30 border-t border-slate-100 animate-fadeIn">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                          {/* Left: General Details */}
                          <div className="bg-white p-5 rounded-xl border border-slate-200/60 shadow-xs">
                            <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-4">
                              Personal & Contact Information
                            </h3>
                            <div className="space-y-3 text-xs">
                              <DetailItem label="Applicant Name" value={req.fullName || req.full_name} />
                              <DetailItem label="Mobile Number" value={req.phoneNumber || req.phone_number} />
                              <DetailItem label="Email" value={req.email} />
                              <DetailItem label="Contact Preference" value={req.contactMethod || req.contact_method} />
                              <DetailItem label="Aadhaar Number" value="N/A" />
                              <DetailItem label="Date of Birth" value="N/A" />
                              <DetailItem label="Gender" value="N/A" />
                              <DetailItem label="City" value="N/A" />
                              <DetailItem label="State" value={admin.location} />
                            </div>
                          </div>

                          {/* Middle: Technical & Financial Details */}
                          <div className="bg-white p-5 rounded-xl border border-slate-200/60 shadow-xs">
                            <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-4">
                              Technical & Financial Data
                            </h3>
                            <div className="space-y-3 text-xs">
                              <DetailItem label="Selected Service" value={req.selectedService || req.selected_service} />
                              <DetailItem label="Subject" value={req.subject} />
                              <DetailItem label="Contact Method" value={req.contactMethod || req.contact_method} />
                              <hr className="my-2 border-slate-100" />
                              <h4 className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Bank Transfer details (DBT)</h4>
                              <DetailItem label="Bank Name" value="N/A" />
                              <DetailItem label="Account No" value="N/A" />
                              <DetailItem label="IFSC Code" value="N/A" />
                            </div>
                          </div>

                          {/* Right: Statement / Pitch & Actions */}
                          <div className="bg-white p-5 rounded-xl border border-slate-200/60 shadow-xs flex flex-col justify-between">
                            <div>
                              <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">
                                Statement of Purpose / Description
                              </h3>
                              <p className="text-slate-600 text-xs leading-relaxed italic bg-slate-50 p-3 rounded-lg border border-slate-100 max-h-[150px] overflow-y-auto font-medium">
                                "{req.description || "No description provided."}"
                              </p>
                            </div>

                            <div className="mt-6 pt-4 border-t border-slate-100">
                              <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">
                                Decision Console
                              </h4>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleStatusChange(req, "resolved")}
                                  className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2 rounded-lg text-xs transition-colors cursor-pointer"
                                >
                                  Resolve
                                </button>
                                <button
                                  onClick={() => handleStatusChange(req, "rejected")}
                                  className="flex-1 bg-white hover:bg-rose-50/50 text-rose-600 border border-rose-100 font-semibold py-2 rounded-lg text-xs transition-colors cursor-pointer"
                                >
                                  Reject
                                </button>
                                <button
                                  onClick={() => handleStatusChange(req, "pending")}
                                  className="flex-1 bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 font-semibold py-2 rounded-lg text-xs transition-colors cursor-pointer"
                                >
                                  Pend
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.25s ease-out; }
      `}</style>
    </div>
  );
};

const StatCard = ({ title, value, type }) => {
  const icons = {
    total: (
      <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75c.9 0 1.625.725 1.625 1.625v2.25c0 .9-.725 1.625-1.625 1.625H5.625C4.725 10 4 9.275 4 8.375v-2.25c0-.9.725-1.625 1.625-1.625z" />
      </svg>
    ),
    pending: (
      <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
      </svg>
    ),
    resolved: (
      <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
      </svg>
    ),
    rejected: (
      <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
      </svg>
    ),
  };

  return (
    <div className="p-6 rounded-2xl border border-slate-200/80 bg-white shadow-xs flex items-center gap-5">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-slate-50 border border-slate-100 flex-shrink-0">
        {icons[type]}
      </div>
      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{title}</p>
        <p className="text-2xl font-bold text-slate-800 mt-1 leading-none">{value}</p>
      </div>
    </div>
  );
};

const DetailItem = ({ label, value }) => (
  <div>
    <span className="text-slate-400 text-[10px] block font-medium uppercase tracking-wider">{label}</span>
    <span className="text-slate-700 text-xs font-semibold">{value || "N/A"}</span>
  </div>
);

const StatusBadge = ({ status }) => {
  const dotColors = {
    pending: "bg-amber-500",
    resolved: "bg-emerald-500",
    rejected: "bg-slate-400",
  };

  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-slate-200 bg-white text-[10px] font-bold uppercase tracking-wider leading-none text-slate-600 shrink-0">
      <span className={`w-1.5 h-1.5 rounded-full ${dotColors[status]}`} />
      {status}
    </span>
  );
};

export default AdminDashboard;
