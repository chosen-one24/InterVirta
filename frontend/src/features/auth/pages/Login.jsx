



import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useauth.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { loading, handleLogin } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      await handleLogin({ email, password });
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050505]">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-white/5 border-t-white" />
          <p className="mt-5 text-sm tracking-wide text-slate-400">Signing you in...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050505] px-6 py-12 selection:bg-white/10 selection:text-white">
      <div className="w-full max-w-md">
        {/* Header and Branding */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-3 mb-6">
            {/* Logo matches top-left of screenshot: subtle pink/purple circle */}
            <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-[#d946ef] to-[#8b5cf6] text-sm font-bold text-white shadow-[0_0_15px_rgba(217,70,239,0.25)]">
              I
            </div>
            <div className="text-left">
              <div className="text-lg font-bold tracking-tight text-white leading-none">InterVirta</div>
              <div className="text-[9px] font-semibold tracking-[0.2em] text-slate-500 uppercase mt-1">
                AI Interview Coach
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-white">
            Welcome Back
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Sign in to continue your interview preparation.
          </p>
        </div>

        {/* Form Container */}
        <div className="rounded-3xl border border-white/5 bg-[#0f0f10] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          {error && (
            <div className="mb-6 flex items-center gap-3 rounded-2xl border border-rose-500/20 bg-rose-500/10 px-5 py-4 text-sm font-medium text-rose-300">
              <svg className="h-5 w-5 shrink-0 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{error}</span>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="mb-2 block text-xs font-semibold tracking-wider uppercase text-slate-400">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className="w-full rounded-2xl border border-white/5 bg-[#111111] px-5 py-4 text-sm text-white placeholder-slate-600 outline-none transition-all duration-200 focus:border-white/15 focus:bg-[#151515] focus:ring-2 focus:ring-white/5"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold tracking-wider uppercase text-slate-400">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full rounded-2xl border border-white/5 bg-[#111111] px-5 py-4 text-sm text-white placeholder-slate-600 outline-none transition-all duration-200 focus:border-white/15 focus:bg-[#151515] focus:ring-2 focus:ring-white/5"
              />
            </div>

            {/* Clean, high-contrast premium white-on-black button */}
            <button
              type="submit"
              className="w-full rounded-2xl bg-white py-4 text-sm font-semibold text-black transition-all duration-200 hover:bg-slate-200 active:scale-[0.98]"
            >
              Sign In
            </button>
          </form>

          {/* Footer Navigation Link */}
          <div className="mt-8 border-t border-white/5 pt-6 text-center">
            <p className="text-xs text-slate-400">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-white transition-colors duration-200 hover:text-slate-300"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;