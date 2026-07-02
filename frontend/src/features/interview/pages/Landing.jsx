import React, { useEffect } from "react";
import { Link, Navigate } from "react-router";
import { useAuth } from "../../auth/hooks/useauth.js";
import LandingNavbar from "../components/LandingNavbar.jsx";
import GlassCard from "../components/GlassCard.jsx";
import GradientButton from "../components/GradientButton.jsx";
import SectionTitle from "../components/SectionTitle.jsx";
import DashboardStatCard from "../components/DashboardStatCard.jsx";
import RecentReportCard from "../components/RecentReportCard.jsx";
import ReportCard from "../components/ReportCard.jsx";
import logo from "../../../assets/logo.svg";
import heroImg from "../../../assets/hero.png";

const Landing = () => {
  const { user, loading } = useAuth();

  // Redirect authenticated users to the dashboard
  if (!loading && user) {
    return <Navigate to="/dashboard" replace />;
  }

  // Static preview mockups data
  const mockReport1 = {
    _id: "demo-1",
    title: "Senior Full Stack Engineer",
    matchScore: 84,
    createdAt: new Date(2026, 6, 2).toISOString()
  };

  const mockReport2 = {
    _id: "demo-2",
    title: "AI Product Designer",
    matchScore: 91,
    createdAt: new Date(2026, 6, 2).toISOString()
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-100 flex flex-col font-sans overflow-x-hidden selection:bg-rose-500/30">
      {/* ── Background Gradients ── */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute left-1/2 top-[-10%] h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-rose-500/10 blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-500/5 blur-[120px]" />
      </div>

      {/* ── Public Navbar ── */}
      <LandingNavbar />

      {/* ── 1. Hero Section ── */}
      <section className="relative mx-auto max-w-6xl w-full px-6 py-16 lg:py-24 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        
        {/* Left Side Copy */}
        <div className="flex-1 space-y-6 lg:space-y-8 text-center lg:text-left">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold tracking-widest uppercase select-none animate-premium-glow-pulse">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
            AI-Powered Interview Preparation
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
            Prepare <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500">Smarter</span>. <br />
            Crack Interviews Faster.
          </h1>

          {/* Subtitle */}
          <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
            InterVirta analyzes your resume against a target job description using AI to generate:
          </p>

          {/* Bullet List */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300 text-sm max-w-md mx-auto lg:mx-0 text-left font-medium">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-500" /> Match Score Analysis
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-500" /> Skill Gap Auditing
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-500" /> Technical Questions
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-500" /> Behavioral Scenarios
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-500" /> 7-Day Prep Roadmap
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-500" /> ATS-Friendly Resumes
            </li>
          </ul>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Link to="/register" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-8 py-4 bg-white text-black font-black text-sm rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_4px_20px_rgba(255,255,255,0.15)] cursor-pointer">
                GET STARTED
              </button>
            </Link>
            <a 
              href="https://github.com/chosen-one24/InterVirta" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full sm:w-auto"
            >
              <GradientButton className="w-full sm:w-auto">
                VIEW GITHUB
              </GradientButton>
            </a>
          </div>
        </div>

        {/* Right Side UI Mockup (Actual App Components Preview) */}
        <div className="flex-1 w-full relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/10 to-indigo-500/10 blur-3xl rounded-[3rem] -z-10" />
          
          <GlassCard className="p-6 sm:p-8 space-y-6 max-w-lg mx-auto border-white/10 hover:border-white/15 transition-all duration-300 select-none pointer-events-none">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-500">Live Preview</p>
                <h3 className="text-lg font-bold text-white mt-1">Mock Workspace</h3>
              </div>
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            {/* Stats Mockup Grid */}
            <div className="grid grid-cols-2 gap-4">
              <DashboardStatCard title="Resume Score" value="84%" accent="text-emerald-400" />
              <DashboardStatCard title="Ready Rate" value="91%" accent="text-indigo-400" />
            </div>

            {/* Recent Report Card Mockup */}
            <RecentReportCard report={mockReport1} />

            {/* Report Card Preview Mockup */}
            <ReportCard report={mockReport2} onDelete={() => {}} />
          </GlassCard>
        </div>
      </section>

      {/* ── 2. Features Grid ── */}
      <section id="features" className="mx-auto max-w-6xl w-full px-6 py-16 lg:py-24 border-t border-white/5 space-y-12 sm:space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <SectionTitle
            eyebrow="Capabilities"
            title="Smarter Prep. Better Results."
            description="Designed for candidates targeting highly competitive job positions."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Card 1: Resume Parsing */}
          <GlassCard className="hover:-translate-y-1 hover:border-white/10 hover:bg-white/[0.03] transition-all duration-300 flex flex-col gap-4">
            <div className="h-10 w-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center font-bold">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white">Resume Parsing</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Upload your PDF/DOCX resume to instantly extract and organize key technical skills.
            </p>
          </GlassCard>

          {/* Card 2: AI Match Score */}
          <GlassCard className="hover:-translate-y-1 hover:border-white/10 hover:bg-white/[0.03] transition-all duration-300 flex flex-col gap-4">
            <div className="h-10 w-10 rounded-xl bg-fuchsia-500/10 text-fuchsia-500 flex items-center justify-center font-bold">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white">AI Match Score</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Get an instant, data-backed compatibility percentage comparing your profile against target jobs.
            </p>
          </GlassCard>

          {/* Card 3: Technical Prep */}
          <GlassCard className="hover:-translate-y-1 hover:border-white/10 hover:bg-white/[0.03] transition-all duration-300 flex flex-col gap-4">
            <div className="h-10 w-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white">Technical Questions</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Get 5 custom-tailored technical and coding questions mapped specifically to target roles.
            </p>
          </GlassCard>

          {/* Card 4: Behavioral Questions */}
          <GlassCard className="hover:-translate-y-1 hover:border-white/10 hover:bg-white/[0.03] transition-all duration-300 flex flex-col gap-4">
            <div className="h-10 w-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center font-bold">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white">Behavioral Scenarios</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Analyze stakeholder scenarios and practice responses with elite answer templates.
            </p>
          </GlassCard>

          {/* Card 5: Preparation Plan */}
          <GlassCard className="hover:-translate-y-1 hover:border-white/10 hover:bg-white/[0.03] transition-all duration-300 flex flex-col gap-4">
            <div className="h-10 w-10 rounded-xl bg-fuchsia-500/10 text-fuchsia-500 flex items-center justify-center font-bold">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0-2.25h.008v.008H7.5v-.008zm0 4.5h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white">7-Day Prep Roadmap</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Step through a highly structured prep guide with precise day-by-day task lists.
            </p>
          </GlassCard>

          {/* Card 6: ATS Resume Generator */}
          <GlassCard className="hover:-translate-y-1 hover:border-white/10 hover:bg-white/[0.03] transition-all duration-300 flex flex-col gap-4">
            <div className="h-10 w-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white">ATS Resume Builder</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Build and download tailored, job-specific ATS resumes optimized to bypass standard parser blocks.
            </p>
          </GlassCard>

        </div>
      </section>

      {/* ── 3. How It Works Section ── */}
      <section id="how-it-works" className="mx-auto max-w-6xl w-full px-6 py-16 lg:py-24 border-t border-white/5 space-y-12 sm:space-y-16">
        <div className="text-center max-w-2xl mx-auto">
          <SectionTitle
            eyebrow="Workflow"
            title="Three Steps to Strategy"
            description="Our structured AI pipeline transforms job goals into direct interview guides."
          />
        </div>

        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-8 relative">
          
          {/* Step 1 */}
          <GlassCard className="flex-1 hover:-translate-y-1 hover:border-white/10 hover:bg-white/[0.03] transition-all duration-300 p-8 flex flex-col justify-between min-h-[220px]">
            <div className="space-y-4">
              <div className="h-9 w-9 rounded-full bg-rose-500 text-black font-black flex items-center justify-center text-sm shadow-[0_0_15px_rgba(244,63,94,0.3)]">
                1
              </div>
              <h4 className="text-lg font-bold text-white">Upload Professional Resume</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Provide your active experience profile by uploading a PDF/DOCX or writing a short self description.
              </p>
            </div>
          </GlassCard>

          {/* Connection Arrow 1 */}
          <div className="hidden lg:flex items-center justify-center text-slate-700">
            <svg className="w-8 h-8 rotate-0 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>

          {/* Step 2 */}
          <GlassCard className="flex-1 hover:-translate-y-1 hover:border-white/10 hover:bg-white/[0.03] transition-all duration-300 p-8 flex flex-col justify-between min-h-[220px]">
            <div className="space-y-4">
              <div className="h-9 w-9 rounded-full bg-fuchsia-500 text-black font-black flex items-center justify-center text-sm shadow-[0_0_15px_rgba(217,70,239,0.3)]">
                2
              </div>
              <h4 className="text-lg font-bold text-white">Paste Job Requirements</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Input the target role description to check alignment requirements and parse vital keywords.
              </p>
            </div>
          </GlassCard>

          {/* Connection Arrow 2 */}
          <div className="hidden lg:flex items-center justify-center text-slate-700">
            <svg className="w-8 h-8 rotate-0 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>

          {/* Step 3 */}
          <GlassCard className="flex-1 hover:-translate-y-1 hover:border-white/10 hover:bg-white/[0.03] transition-all duration-300 p-8 flex flex-col justify-between min-h-[220px]">
            <div className="space-y-4">
              <div className="h-9 w-9 rounded-full bg-indigo-500 text-black font-black flex items-center justify-center text-sm shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                3
              </div>
              <h4 className="text-lg font-bold text-white">Generate Interview Report</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Wait a few seconds for Gemini AI to return compatibility match details, skill gaps, customized Q&As, and plans.
              </p>
            </div>
          </GlassCard>

        </div>
      </section>

      {/* ── 4. App Screenshot Section ── */}
      <section className="mx-auto max-w-6xl w-full px-6 py-16 lg:py-24 border-t border-white/5 space-y-12 sm:space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <SectionTitle
            eyebrow="Console"
            title="Premium Dashboard Frame"
            description="Explore the elegant desktop portal designed to organize prep roadmaps."
          />
        </div>

        {/* Browser Mock Frame */}
        <div className="relative group max-w-5xl mx-auto">
          {/* Backing glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/5 to-indigo-500/5 blur-[120px] rounded-3xl -z-10 group-hover:scale-105 transition-all duration-500" />
          
          <div className="rounded-2xl border border-white/10 bg-[#0f0f10]/80 p-3 shadow-2xl backdrop-blur-xl">
            {/* Header controls */}
            <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-3 px-3">
              <div className="flex gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="rounded bg-white/[0.03] px-10 py-1 text-[11px] text-slate-500 border border-white/5 select-none font-medium">
                intervirta.ai/dashboard
              </div>
              <div className="w-14" /> {/* spacer */}
            </div>

            {/* Actual Screenshot image */}
            <div className="overflow-hidden rounded-lg bg-[#050505] border border-white/5">
              <img 
                src={heroImg} 
                alt="InterVirta Console Preview" 
                className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Public Footer ── */}
      <footer className="mt-auto border-t border-white/5 bg-[#050505]/40 backdrop-blur-md">
        <div className="mx-auto max-w-6xl w-full px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Left: Branding */}
          <div className="flex items-center gap-3">
            <img src={logo} alt="InterVirta Logo" className="h-8 w-8 rounded-xl object-contain" />
            <div>
              <p className="text-base font-bold tracking-tight text-white leading-none">InterVirta</p>
              <p className="text-[8px] font-bold tracking-[0.2em] text-slate-500 uppercase mt-1">AI INTERVIEW COACH</p>
            </div>
          </div>

          {/* Center: Footnote */}
          <div className="text-slate-500 text-xs font-semibold text-center md:text-left">
            Made with MERN + Google Gemini AI
          </div>

          {/* Right: Quick Links */}
          <div className="flex items-center gap-6 text-xs text-slate-400 font-medium">
            <a 
              href="https://github.com/chosen-one24/InterVirta" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white transition-colors duration-200"
            >
              GitHub Project
            </a>
            <Link to="/login" className="hover:text-white transition-colors duration-200">
              Launch Console
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
