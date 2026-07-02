import React, { useContext, useRef, useState, useEffect } from 'react';
import { useInterview } from '../hooks/useInterview.js';
import { useNavigate } from 'react-router';

// // ── MOCK DATA ──────────────────────────────────────────────────────────
// const MOCK_REPORTS = [
//     { _id: '1', title: 'Senior Product Designer', company: 'Apple', createdAt: new Date(), matchScore: 94 },
//     { _id: '2', title: 'Full Stack Engineer', company: 'Vercel', createdAt: new Date(), matchScore: 78 },
//     { _id: '3', title: 'Backend Architect', company: 'AWS', createdAt: new Date(), matchScore: 52 },
//     { _id: '4', title: 'QA Automation Engineer', company: 'Netflix', createdAt: new Date(), matchScore: 35 },
// ];


const Home = () => {
    const [jobDescription, setJobDescription] = useState("");
    const [selfDescription, setSelfDescription] = useState("");
    const [fileName, setFileName] = useState("");
    const resumeInputRef = useRef();

    const navigate = useNavigate();

    const { loading, generateReport, reports, getReports } = useInterview();
    const MOCK_REPORTS = reports;

    useEffect(() => {
        getReports();
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name);
        } else {
            setFileName("");
        }
    };



    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current?.files?.[0];

        if (!jobDescription.trim() || !selfDescription.trim() || !resumeFile) {
            alert("Please fill in all fields and upload a resume");
            return;
        }

        const data = await generateReport({ jobDescription, selfDescription, resumeFile });
        if (data && data._id) {
            navigate(`/interview/${data._id}`);
        }

    }

    if (loading) {
        return (
            <h1 className='text-white text-2xl font-bold'>Loading.....</h1>
        )
    }


    return (
        <div className="min-h-screen w-full bg-[#050505] text-slate-200 font-sans selection:bg-rose-500/30 overflow-x-hidden">

            {/* ── Background Decoration (The "SaaS" Glow) ── */}
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
                <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-rose-500/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full" />
            </div>

            <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col items-center gap-16">

                {/* ── Hero Section ── */}
                <header className="text-center space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold tracking-widest uppercase animate-fade-in">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                        </span>
                        AI Engine Ready
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white">
                        Design your <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500">perfect interview</span>
                    </h1>
                    <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
                        The elite AI career coach that analyzes your profile against top-tier job descriptions to build a bulletproof preparation plan.
                    </p>
                </header>

                {/* ── Main Interface Card ── */}
                <div className="w-full bg-[#0f0f10]/60 backdrop-blur-xl border border-white/5 rounded-[2rem] shadow-2xl overflow-hidden relative group">
                    {/* Inner Border Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

                    <div className="flex flex-col md:flex-row min-h-[550px] relative z-10">

                        {/* Left Panel: Input */}
                        <div className="flex-1 p-10 flex flex-col gap-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-rose-500/10 text-rose-500">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                    </div>
                                    <h2 className="text-xl font-bold text-white tracking-tight">Job Requirements</h2>
                                </div>
                                <span className="text-[10px] font-black text-rose-500 border border-rose-500/30 px-2 py-0.5 rounded-md uppercase">Vital</span>
                            </div>

                            <textarea
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                                className="flex-1 w-full bg-white/[0.03] border border-white/5 rounded-2xl p-6 text-slate-300 text-base resize-none focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500/40 transition-all placeholder:text-slate-600 leading-relaxed"
                                placeholder="Paste the job description here. Be as detailed as possible..."
                            />
                        </div>

                        {/* Middle Divider */}
                        <div className="hidden md:flex flex-col items-center justify-center py-10">
                            <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                        </div>

                        {/* Right Panel: Profile */}
                        <div className="flex-1 p-10 flex flex-col gap-8 bg-white/[0.01]">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                </div>
                                <h2 className="text-xl font-bold text-white tracking-tight">Candidate Profile</h2>
                            </div>

                            {/* Dropzone */}
                            <div className="group relative">
                                {fileName ? (
                                    <label className="flex flex-col items-center justify-center gap-4 p-8 bg-emerald-500/[0.02] border-2 border-dashed border-emerald-500/30 rounded-2xl cursor-pointer hover:border-emerald-500/50 hover:bg-emerald-500/[0.04] transition-all duration-300 animate-[fadeIn_0.3s_ease-out]">
                                        <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-all duration-300">
                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>
                                        </div>
                                        <div className="text-center space-y-1">
                                            <p className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center justify-center gap-1">
                                                ✔ Resume Uploaded Successfully
                                            </p>
                                            <p className="text-sm font-semibold text-white break-all max-w-[280px] mx-auto">
                                                {fileName}
                                            </p>
                                            <p className="text-xs text-slate-500 pt-1 group-hover:text-slate-400 transition-colors">
                                                Click to replace file
                                            </p>
                                        </div>
                                        <input
                                            ref={resumeInputRef}
                                            type="file"
                                            className="hidden"
                                            onChange={handleFileChange}
                                        />
                                    </label>
                                ) : (
                                    <label className="flex flex-col items-center justify-center gap-4 p-8 bg-white/[0.02] border-2 border-dashed border-white/10 rounded-2xl cursor-pointer hover:border-rose-500/50 hover:bg-rose-500/[0.02] transition-all duration-300">
                                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-rose-500 group-hover:text-white transition-all duration-300">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-sm font-semibold text-white">Upload Professional Resume</p>
                                            <p className="text-xs text-slate-500 mt-1">Intelligence engine supports PDF, DOCX</p>
                                        </div>
                                        <input
                                            ref={resumeInputRef}
                                            type="file"
                                            className="hidden"
                                            onChange={handleFileChange}
                                        />
                                    </label>
                                )}
                            </div>

                            <div className="relative flex items-center justify-center">
                                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
                                <span className="relative bg-[#0f0f10] px-4 text-[10px] font-black text-slate-600 tracking-[0.3em] uppercase">or</span>
                            </div>

                            <textarea
                                value={selfDescription}
                                onChange={(e) => setSelfDescription(e.target.value)}
                                className="w-full h-32 bg-white/[0.03] border border-white/5 rounded-2xl p-5 text-slate-300 text-sm resize-none focus:outline-none focus:border-rose-500/40 transition-all placeholder:text-slate-600"
                                placeholder="Describe your expertise in a few sentences..."
                            />
                        </div>
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="px-10 py-6 bg-white/[0.02] border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="flex -space-x-2">
                                {[1, 2, 3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0a0a0a] bg-slate-800" />)}
                            </div>
                            <p className="text-xs text-slate-500 font-medium tracking-tight">Joined by <span className="text-slate-200">2,400+</span> engineers this week</p>
                        </div>

                        <button
                            onClick={handleGenerateReport}
                            className="relative group overflow-hidden px-8 py-4 bg-white text-black font-black text-sm rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all">
                            <span className="relative z-10 flex items-center gap-2">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" /></svg>
                                GENERATE STRATEGY
                            </span>
                            {/* Shimmer Effect */}
                            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                        </button>
                    </div>
                </div>

                {/* ── Recent Reports Grid ── */}
                <section className="w-full space-y-8">
                    <div className="flex items-center justify-between px-2">
                        <h2 className="text-2xl font-bold text-white tracking-tight">Library of Strategies</h2>
                        <button className="text-sm font-bold text-rose-500 hover:text-rose-400 transition-colors">View All</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {MOCK_REPORTS.map(report => (

                            <div
                                onClick={() => {
                                    navigate(`/interview/${report._id}`);
                                }}
                                key={report._id} className="group p-6 bg-white/[0.02] border border-white/5 rounded-3xl hover:bg-white/[0.04] hover:border-white/10 transition-all cursor-pointer">
                                <div className="flex justify-between items-start mb-4">

                                    <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${report.matchScore > 75 ? 'bg-emerald-500/10 text-emerald-500' :
                                            report.matchScore > 45 ? 'bg-amber-500/10 text-amber-500' :
                                                'bg-rose-500/10 text-rose-500'
                                        }`}>
                                        {report.matchScore}% Match
                                    </div>
                                    <span className="text-slate-600 group-hover:text-rose-500 transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-rose-400 transition-colors">{report.title}</h3>
                                <p className="text-sm text-slate-500 font-medium">{report.company} &bull; {report.createdAt ? new Date(report.createdAt).toLocaleDateString() : 'Recent'}</p>
                            </div>
                        ))}
                    </div>
                </section>

            </div>

            {/* Custom Animation Styles */}
            <style>{`
                @keyframes shimmer {
                    100% { transform: translateX(100%); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: scale(0.98); }
                    to { opacity: 1; transform: scale(1); }
                }
            `}</style>
        </div>
    );
};

export default Home;