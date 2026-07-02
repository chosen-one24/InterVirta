import { useEffect, useState } from 'react';
import { useInterview } from '../hooks/useInterview.js';
import { useParams } from 'react-router';
import GlassCard from '../components/GlassCard.jsx';
import GradientButton from '../components/GradientButton.jsx';

// ── 1. PREMIUM MOCK DATA ─────────────────────────────────────────────────────
const MOCK_REPORT = {
    matchScore: 76,
    technicalQuestions: [
        { question: "How would you implement a custom React Hook for debouncing?", intention: "Assess deep understanding of closures and the Hook lifecycle.", answer: "Create a stateful hook that uses useEffect to set a timeout, clearing it on every value change to prevent unnecessary execution." },
        { question: "Explain the reconciliation process in React 18.", intention: "Check for modern framework knowledge.", answer: "React uses a 'Fiber' architecture to break rendering work into chunks, allowing it to pause and resume work for high-priority updates." }
    ],
    behavioralQuestions: [
        { question: "Describe a conflict you had with a stakeholder.", intention: "Assess emotional intelligence and resolution skills.", answer: "I focused on data-driven reasoning and empathy, finding a middle ground that satisfied technical constraints and business goals." }
    ],
    preparationPlan: [
        { day: 1, focus: "System Architecture", tasks: ["Load Balancing strategies", "Caching with Redis", "Database Sharding"] },
        { day: 2, focus: "Frontend Performance", tasks: ["Core Web Vitals", "Code Splitting", "Image Optimization"] }
    ],
    skillGaps: [
        { skill: "System Design", severity: "high" },
        { skill: "AWS Lambda", severity: "medium" },
        { skill: "GraphQL", severity: "low" }
    ]
};

const NAV_ITEMS = [
    { id: 'technical', label: 'Technical Questions', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6" /></svg> },
    { id: 'behavioral', label: 'Behavioral Questions', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg> },
    { id: 'roadmap', label: 'Preparation Path', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M9 20l-4-4m0 0l4-4m-4 4h18" /></svg> },
];

// ── 2. SUB-COMPONENTS ────────────────────────────────────────────────────────

const QuestionCard = ({ item, index }) => {
    const [open, setOpen] = useState(false);
    return (
        <div
            className={`group relative transition-all duration-300 rounded-2xl border ${open
                    ? 'bg-white/[0.04] border-white/10 ring-1 ring-rose-500/20 shadow-lg shadow-black/40'
                    : 'bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.03]'
                }`}
        >
            <div className="p-6 md:p-8 flex flex-col gap-4 cursor-pointer" onClick={() => setOpen(!open)}>
                <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black bg-rose-500 text-white px-2.5 py-1 rounded-md shadow-lg shadow-rose-500/25 tracking-wider uppercase">
                        Question {index + 1}
                    </span>
                </div>

                <h3 className="text-base md:text-lg font-bold text-slate-100 leading-snug group-hover:text-white transition-colors">
                    {item.question}
                </h3>

                <div className="flex items-center gap-2 text-xs font-bold text-rose-400 group-hover:text-rose-300 transition-colors mt-2">
                    <svg
                        className={`w-4 h-4 transition-transform duration-300 ${open ? 'rotate-180 text-rose-400' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        viewBox="0 0 24 24"
                    >
                        <path d="M19 9l-7 7-7-7" />
                    </svg>
                    <span>{open ? 'Hide Answer' : 'View Answer'}</span>
                </div>
            </div>

            {open && (
                <div className="px-6 md:px-8 pb-8 space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="h-px bg-white/5" />

                    {item.intention && (
                        <div className="space-y-2">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">The Intention</span>
                            <p className="text-sm text-slate-400 leading-relaxed italic">"{item.intention}"</p>
                        </div>
                    )}

                    <div className="space-y-2">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">Elite Answer</span>
                        <p className="text-sm md:text-[15px] text-slate-300 leading-relaxed bg-emerald-500/5 border border-emerald-500/10 p-5 rounded-2xl">
                            {item.answer}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

const RoadmapDay = ({ day }) => (
    <div className="relative pl-12 pb-10 group">
        <div className="absolute left-[19px] top-0 bottom-0 w-px bg-white/5 group-last:bg-transparent" />
        <div className="absolute left-3.5 top-1.5 w-3 h-3 rounded-full bg-[#0a0a0a] border-2 border-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)] z-10 transition-transform group-hover:scale-125" />

        <div className="space-y-4">
            <div className="flex items-center gap-3">
                <span className="text-[10px] font-black text-rose-500 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded-md">DAY {day.day}</span>
                <h3 className="text-lg font-bold text-white tracking-tight">{day.focus}</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {day.tasks.map((task, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-slate-400 bg-white/[0.02] border border-white/5 p-3 px-4 rounded-xl hover:bg-white/[0.04] transition-colors">
                        <div className="w-1.5 h-1.5 rounded-full bg-rose-500/40" />
                        {task}
                    </div>
                ))}
            </div>
        </div>
    </div>
);

// ── 3. MAIN COMPONENT ────────────────────────────────────────────────────────

const Interview = () => {
    const [activeNav, setActiveNav] = useState('technical');
    const [downloading, setDownloading] = useState(false);
    const { report, loading, getReportById, downloadResumePdf } = useInterview();

    const { interviewId } = useParams();
    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId);
        }
    }, [interviewId]);

    const handleDownload = async () => {
        if (!interviewId) return;
        setDownloading(true);
        try {
            await downloadResumePdf(interviewId);
        } catch (error) {
            console.error("Download failed:", error);
        } finally {
            setDownloading(false);
        }
    };

    if (loading || !report) {
        return (
            <div className="min-h-[70vh] w-full flex items-center justify-center">
                <h1 className="text-white text-2xl font-bold animate-pulse">Loading...</h1>
            </div>
        );
    }

    const score = report.matchScore;
    let compatibilityText = '';
    let compatibilityColor = '';
    let circleColorClass = '';
    let glowColorClass = '';

    if (score > 75) {
        compatibilityText = 'Highly Compatible Profile';
        compatibilityColor = 'text-emerald-400';
        circleColorClass = 'text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]';
        glowColorClass = 'bg-emerald-500/20 group-hover:bg-emerald-500/40';
    } else if (score > 45) {
        compatibilityText = 'Moderately Compatible Profile';
        compatibilityColor = 'text-amber-400';
        circleColorClass = 'text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]';
        glowColorClass = 'bg-amber-500/20 group-hover:bg-amber-500/40';
    } else {
        compatibilityText = 'Low Compatibility Profile';
        compatibilityColor = 'text-rose-400';
        circleColorClass = 'text-rose-500 drop-shadow-[0_0_8px_rgba(244,63,94,0.5)]';
        glowColorClass = 'bg-rose-500/20 group-hover:bg-rose-500/40';
    }

    return (
        <div className="w-full text-slate-300 selection:bg-rose-500/30">
            {/* Main Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] xl:grid-cols-[240px_1fr_360px] gap-6 xl:gap-8 items-start">

                {/* Left Sidebar: Navigation */}
                <aside className="lg:sticky lg:top-24 w-full">
                    <GlassCard className="p-5 flex flex-col gap-6" padded={false}>
                        <div className="space-y-4">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 px-4">Navigation</p>
                            <nav className="flex flex-col gap-2">
                                {NAV_ITEMS.map(item => (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveNav(item.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200
                                            ${activeNav === item.id
                                                ? 'bg-gradient-to-r from-rose-500 to-fuchsia-600 text-white shadow-lg shadow-rose-500/25 scale-[1.02]'
                                                : 'text-slate-500 hover:bg-white/5 hover:text-slate-200'}`}
                                    >
                                        {item.icon}
                                        <span className="truncate">{item.label}</span>
                                    </button>
                                ))}
                            </nav>
                        </div>

                        <div className="px-4 pb-2 mt-4">
                            <button
                                onClick={handleDownload}
                                disabled={downloading}
                                className="w-full py-3 bg-white text-black font-black text-sm rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    {downloading ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Downloading...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                            </svg>
                                            Download Assets
                                        </>
                                    )}
                                </span>
                                {/* Shimmer Effect */}
                                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                            </button>
                        </div>
                    </GlassCard>
                </aside>

                {/* Center Content: Main Report Details */}
                <main className="flex-1 w-full min-w-0">
                    <GlassCard className="p-6 md:p-8 flex flex-col gap-6">
                        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/5 pb-6">
                            <div className="space-y-1">
                                <h1 className="text-2xl md:text-3xl font-black text-white tracking-tighter capitalize">
                                    {activeNav.replace('-', ' ')}
                                </h1>
                                <p className="text-slate-400 text-sm font-medium">Curated AI strategy for your upcoming session.</p>
                            </div>
                            <div className="self-start sm:self-center text-[11px] font-black text-slate-300 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 tracking-wider">
                                STEP 0{NAV_ITEMS.findIndex(item => item.id === activeNav) + 1} / 03
                            </div>
                        </header>

                        {activeNav === 'technical' && (
                            <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                {report.technicalQuestions.map((q, i) => <QuestionCard key={i} item={q} index={i} />)}
                            </div>
                        )}

                        {activeNav === 'behavioral' && (
                            <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                {report.behavioralQuestions.map((q, i) => <QuestionCard key={i} item={q} index={i} />)}
                            </div>
                        )}

                        {activeNav === 'roadmap' && (
                            <div className="relative pl-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="absolute left-[27px] top-6 bottom-6 w-px bg-gradient-to-b from-rose-500 via-rose-500/20 to-transparent" />
                                {report.preparationPlan.map((day) => <RoadmapDay key={day.day} day={day} />)}
                            </div>
                        )}
                    </GlassCard>
                </main>

                {/* Right Sidebar: Analytics & Match Stats */}
                <aside className="xl:sticky xl:top-24 w-full space-y-6 col-span-1 lg:col-start-2 lg:row-start-2 xl:row-auto xl:col-start-3 xl:col-span-1">
                    <GlassCard className="p-6 md:p-8 flex flex-col gap-6">

                        {/* Score Section */}
                        <div className="flex flex-col items-center gap-4 text-center">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 w-full text-left">Compatibility</p>
                            <div className="relative inline-flex group">
                                <div className={`absolute inset-0 rounded-full blur-2xl transition-all duration-700 ${glowColorClass}`} />

                                <div className="relative w-36 h-36 rounded-full flex flex-col items-center justify-center bg-[#0d0d0e] border border-white/5">
                                    <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 160 160">
                                        <circle
                                            cx="80" cy="80" r="74"
                                            fill="none" stroke="currentColor" strokeWidth="6"
                                            className="text-white/5"
                                        />
                                        <circle
                                            cx="80" cy="80" r="74"
                                            fill="none" stroke="currentColor" strokeWidth="6"
                                            strokeDasharray={2 * Math.PI * 74}
                                            strokeDashoffset={2 * Math.PI * 74 * (1 - report.matchScore / 100)}
                                            className={circleColorClass}
                                        />
                                    </svg>
                                    <span className="text-4xl font-black text-white tracking-tighter">{report.matchScore}</span>
                                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest -mt-0.5">Percent</span>
                                </div>
                            </div>
                            <p className={`text-sm font-bold tracking-tight ${compatibilityColor}`}>{compatibilityText}</p>
                        </div>

                        <div className="h-px bg-white/5" />

                        {/* Skill Gaps Section */}
                        <div className="space-y-4 mt-4">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Skill Gaps / Growth Areas</p>
                            <div className="flex flex-wrap gap-2 ">
                                {report.skillGaps && report.skillGaps.length > 0 ? (
                                    report.skillGaps.map((gap, i) => (
                                        <div key={i} className={`px-3 py-1.5 rounded-xl border text-[10px] font-bold uppercase tracking-wider
                                            ${gap.severity === 'high' ? 'bg-rose-500/5 border-rose-500/10 text-rose-400' :
                                                gap.severity === 'medium' ? 'bg-amber-500/5 border-amber-500/10 text-amber-400' :
                                                    'bg-indigo-500/5 border-indigo-500/10 text-indigo-400'}`}>
                                            {gap.skill}
                                        </div>
                                    ))
                                ) : (
                                    <span className="text-xs text-slate-500">No skill gaps identified</span>
                                )}
                            </div>
                        </div>

                        <div className="h-px bg-white/5" />

                        {/* Quick Summary Section */}
                        <div className="space-y-3 mt-4">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Quick Summary</p>
                            <div className="rounded-xl bg-white/[0.02] border border-white/5 p-4 space-y-2">
                                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                                    Target: <span className="text-indigo-400 capitalize">{report.title || "Position"}</span>
                                </h4>
                                <p className="text-xs text-slate-400 leading-relaxed">
                                    Based on a profile compatibility of <span className="font-semibold text-slate-200">{report.matchScore}%</span>, AI has generated <span className="font-semibold text-slate-200">{report.technicalQuestions?.length || 0} technical</span> and <span className="font-semibold text-slate-200">{report.behavioralQuestions?.length || 0} behavioral</span> preparation questions along with a <span className="font-semibold text-slate-200">{report.preparationPlan?.length || 0}-day</span> roadmap.
                                </p>
                            </div>
                        </div>

                    </GlassCard>
                </aside>
            </div>

            {/* Custom Animation Styles */}
            <style>{`
                @keyframes shimmer {
                    100% { transform: translateX(100%); }
                }
            `}</style>
        </div>
    );
};

export default Interview;