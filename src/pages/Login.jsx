import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { indianStates } from "../utils/states";

const Login = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", username: "", location: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (isAdmin) {
      if (form.username !== "admin" || form.password !== "admin") {
        setError("Invalid admin credentials. Access denied.");
        return;
      }
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (isAdmin) {
        localStorage.setItem(
          "form_ease_admin",
          JSON.stringify({
            username: "admin",
            location: form.location || "Punjab",
          })
        );
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    }, 1500);
  };

  return (
    <div className="w-full text-center">
      <div className="mb-6">
        <h1 className="text-[2.2rem] font-black mb-2 pt-5 tracking-tight text-slate-900 leading-none">
          {isAdmin ? "Admin Portal" : "Hi Citizen"}
        </h1>
        <p className="text-slate-600 text-sm font-medium">
          {isAdmin ? "Log in to manage your location" : "Welcome to FormEase"}
        </p>
      </div>

      {/* Mode Selection Tab */}
      <div className="flex bg-slate-100 p-1.5 rounded-xl mb-6">
        <button
          type="button"
          onClick={() => setIsAdmin(false)}
          className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
            !isAdmin ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"
          }`}
        >
          Citizen
        </button>
        <button
          type="button"
          onClick={() => setIsAdmin(true)}
          className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
            isAdmin ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"
          }`}
        >
          Admin
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <div className="space-y-4">
          {!isAdmin ? (
            <>
              <input
                type="email"
                required
                placeholder="Citizen ID or Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-white border border-slate-200 rounded-xl px-5 py-3.5 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all placeholder:text-slate-400 font-medium"
              />
              <input
                type="password"
                required
                placeholder="Security PIN"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full bg-white border border-slate-200 rounded-xl px-5 py-3.5 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all placeholder:text-slate-400 font-medium"
              />
            </>
          ) : (
            <>
              <input
                type="text"
                required
                placeholder="Admin Username"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                className="w-full bg-white border border-slate-200 rounded-xl px-5 py-3.5 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all placeholder:text-slate-400 font-medium"
              />
              <input
                type="password"
                required
                placeholder="Admin Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full bg-white border border-slate-200 rounded-xl px-5 py-3.5 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all placeholder:text-slate-400 font-medium"
              />
              <div className="relative">
                <select
                  required
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="w-full bg-white border border-slate-200 rounded-xl px-5 py-3.5 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all text-slate-700 font-medium appearance-none cursor-pointer"
                >
                  <option value="">Select Jurisdiction State</option>
                  {indianStates.filter(s => s !== "All India").map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </>
          )}
        </div>
        
        {error && (
          <div className="text-red-500 text-xs font-semibold bg-red-50 border border-red-100 p-3 rounded-lg text-center mt-2">
            {error}
          </div>
        )}

        {!isAdmin && (
          <div className="flex justify-end pt-1">
            <Link to="#" className="text-xs font-bold text-red-500 hover:text-red-600 transition-colors">Forgot password?</Link>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-[0_8px_20px_-8px_rgba(37,99,235,0.6)] text-sm disabled:opacity-70 mt-2 cursor-pointer"
        >
          {loading ? "Establishing Session..." : "Login"}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-[1px] bg-slate-200"></div>
          <span className="text-xs text-slate-400 font-medium">OR</span>
          <div className="flex-1 h-[1px] bg-slate-200"></div>
        </div>

        {/* Google Sign In */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-3 border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold py-3.5 rounded-xl transition-all duration-300 cursor-pointer"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        <div className="text-center mt-8">
          <span className="text-xs text-slate-500 font-medium">Don't have an account? </span>
          <Link to="/signup" className="text-xs font-bold text-red-500 hover:text-red-600">Sign up</Link> 
        </div>
      </form>
    </div>
  );
};

export default Login;
