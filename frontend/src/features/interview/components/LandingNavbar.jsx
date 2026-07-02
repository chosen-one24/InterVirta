import React from "react";
import { Link } from "react-router";
import logo from "../../../assets/logo.svg";

const LandingNavbar = () => {
  return (
    <header className="border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        {/* Left Branding */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="InterVirta Logo" className="h-10 w-10 rounded-2xl object-contain shrink-0" />
          <div>
            <p className="text-lg font-semibold tracking-tight text-white leading-none">InterVirta</p>
            <p className="text-[9px] font-semibold tracking-[0.2em] text-slate-500 uppercase mt-1">AI INTERVIEW COACH</p>
          </div>
        </div>

        {/* Center Links */}
        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200"
          >
            How it Works
          </a>
          <a
            href="https://github.com/chosen-one24/InterVirta"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200"
          >
            GitHub
          </a>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="text-sm font-semibold text-slate-300 transition-all duration-300 hover:text-white"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black transition-all duration-300 hover:bg-slate-200 active:scale-[0.98]"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
};

export default LandingNavbar;
