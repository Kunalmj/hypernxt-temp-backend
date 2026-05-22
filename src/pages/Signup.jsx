import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const PLANS = [
  {
    id: "enterprise",
    name: "Social Worker",
    tagline: "For community assistance",
    price: "Free",
    features: ["Bulk registrations", "Tracking dashboard"],
    desc: "Designed for NGOs and social workers helping local communities access benefits."
  }
];

const Signup = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [plan, setPlan] = useState("enterprise");
  const [loading, setLoading] = useState(false);

  const nextStep = (e) => {
    e.preventDefault();
    setStep((s) => s + 1);
  };

  const prevStep = () => setStep((s) => s - 1);

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 2000);
  };

  return (
    <div className="w-full text-center">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[2.5rem] font-black mb-2 tracking-tight text-slate-900 leading-none">
          {step === 1 && "Start Journey"}
          {step === 2 && "Your Details"}
          {step === 3 && "Service Level"}
        </h1>

        <p className="text-slate-600 text-sm font-medium">
          {step === 1 && "Create your account"}
          {step === 2 && "Enter official information"}
          {step === 3 && "Choose portal access level"}
        </p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              step >= i ? "bg-blue-600 w-6" : "bg-slate-200 w-1.5"
            }`}
          ></div>
        ))}
      </div>

      {/* STEP 1 */}
      {step === 1 && (
        <div className="space-y-4 text-left">

          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 text-center">
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Create Your Account
            </h3>

            <p className="text-sm text-slate-600 leading-relaxed">
              Register to access government schemes, scholarships,
              subsidies, grants, and citizen services through FormEase.
            </p>
          </div>

          <button
            onClick={() => setStep(2)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-[0_8px_20px_-8px_rgba(37,99,235,0.6)] mt-4 text-sm"
          >
            Continue
          </button>

          <div className="text-center mt-6">
            <span className="text-xs text-slate-500 font-medium">
              Already have an account?
            </span>{" "}
            <Link
              to="/login"
              className="text-xs font-bold text-blue-600 hover:text-blue-700"
            >
              Login
            </Link>
          </div>

        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <form onSubmit={nextStep} className="space-y-4 text-left">

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              required
              placeholder="First Name"
              value={form.firstName}
              onChange={(e) =>
                setForm({ ...form, firstName: e.target.value })
              }
              className="w-full bg-white border border-slate-200 rounded-xl px-5 py-3.5 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all placeholder:text-slate-400 font-medium"
            />

            <input
              type="text"
              required
              placeholder="Last Name"
              value={form.lastName}
              onChange={(e) =>
                setForm({ ...form, lastName: e.target.value })
              }
              className="w-full bg-white border border-slate-200 rounded-xl px-5 py-3.5 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all placeholder:text-slate-400 font-medium"
            />
          </div>

          <input
            type="email"
            required
            placeholder="Contact Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            className="w-full bg-white border border-slate-200 rounded-xl px-5 py-3.5 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all placeholder:text-slate-400 font-medium"
          />

          <input
            type="password"
            required
            placeholder="Portal Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            className="w-full bg-white border border-slate-200 rounded-xl px-5 py-3.5 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-all placeholder:text-slate-400 font-medium"
          />

          <div className="flex gap-3 pt-2">

            <button
              type="button"
              onClick={prevStep}
              className="w-12 h-[46px] bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold rounded-xl transition-all flex items-center justify-center shrink-0"
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
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-[0_8px_20px_-8px_rgba(37,99,235,0.6)] text-sm"
            >
              Next Step
            </button>

          </div>
        </form>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <form onSubmit={handleSubmit} className="space-y-4 text-left">

          <div className="grid grid-cols-1 gap-3">
            {PLANS.map((p) => (
              <label
                key={p.id}
                className={`flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer ${
                  plan === p.id
                    ? "border-blue-600 bg-blue-50/50 shadow-sm"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <input
                  type="radio"
                  name="plan"
                  className="hidden"
                  checked={plan === p.id}
                  onChange={() => setPlan(p.id)}
                />

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-bold text-sm ${
                        plan === p.id
                          ? "text-blue-700"
                          : "text-slate-900"
                      }`}
                    >
                      {p.name}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {p.tagline}
                  </p>
                </div>

                <div className="text-right">
                  <div
                    className={`font-black text-sm ${
                      plan === p.id
                        ? "text-blue-600"
                        : "text-slate-900"
                    }`}
                  >
                    {p.price}
                  </div>
                </div>
              </label>
            ))}
          </div>

          <div className="flex gap-3 pt-2">

            <button
              type="button"
              onClick={prevStep}
              className="w-12 h-[46px] bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold rounded-xl transition-all flex items-center justify-center shrink-0"
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
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-[0_8px_20px_-8px_rgba(37,99,235,0.6)] disabled:opacity-50 text-sm"
            >
              {loading ? "Registering..." : "Complete Signup"}
            </button>

          </div>
        </form>
      )}
    </div>
  );
};

export default Signup;