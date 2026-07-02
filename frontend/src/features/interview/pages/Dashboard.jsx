import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../auth/hooks/useauth.js";
import GlassCard from "../components/GlassCard.jsx";
import GradientButton from "../components/GradientButton.jsx";
import RecentReportCard from "../components/RecentReportCard.jsx";
import SectionTitle from "../components/SectionTitle.jsx";
import StatCard from "../components/StatCard.jsx";
import { useInterview } from "../hooks/useInterview.js";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { reports, getReports } = useInterview();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadReports = async () => {
      await getReports();
      setIsLoading(false);
    };

    loadReports();
  }, []);

  const sortedReports = useMemo(() => {
    return [...reports]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);
  }, [reports]);

  const averageMatch = useMemo(() => {
    if (!reports.length) return 0;
    const total = reports.reduce((sum, report) => sum + Number(report.matchScore || 0), 0);
    return Math.round(total / reports.length);
  }, [reports]);

  const thisMonthCount = useMemo(() => {
    const now = new Date();
    return reports.filter((report) => {
      const createdAt = new Date(report.createdAt);
      return createdAt.getMonth() === now.getMonth() && createdAt.getFullYear() === now.getFullYear();
    }).length;
  }, [reports]);

  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center rounded-[2rem] border border-white/10 bg-slate-900/60 p-10">
        <p className="text-lg text-slate-300">Loading your interview dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <GlassCard className="p-10 sm:p-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-500">InterVirta</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Welcome back, {user?.username || "there"} 👋
            </h1>
            <p className="mt-4 text-lg text-slate-400">
              Ready to prepare for your next interview with a sharper profile match and a tailored roadmap?
            </p>
          </div>
          <div className="rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3 text-sm text-slate-400">
            {reports.length} reports ready for review
          </div>
        </div>
      </GlassCard>

      <section className="grid gap-4 md:grid-cols-3">
        <StatCard title="Reports Generated" value={reports.length} accent="text-white" />
        <StatCard title="Average Match Score" value={`${averageMatch}%`} accent="text-emerald-300" />
        <StatCard title="This Month" value={thisMonthCount} accent="text-cyan-300" />
      </section>

      <GlassCard>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold text-white">Prepare for your next interview</h2>
            <p className="mt-2 text-slate-400">
              Generate personalized interview questions, a matching score, and a preparation roadmap in minutes.
            </p>
          </div>
          <GradientButton onClick={() => navigate("/interview/new")}>Prepare Now</GradientButton>
        </div>
      </GlassCard>

      <GlassCard>
        <SectionTitle
          eyebrow="Recent"
          title="Recent Reports"
          description="The latest interview strategy summaries."
          action={
            <button onClick={() => navigate("/reports")} className="text-sm font-semibold text-rose-400 transition hover:text-rose-300">
              View All
            </button>
          }
        />

        {sortedReports.length ? (
          <div className="mt-6 grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {sortedReports.map((report) => (
              <RecentReportCard key={report._id} report={report} />
            ))}
          </div>
        ) : (
          <div className="mt-6">
            <div className="rounded-2xl border border-dashed border-white/5 bg-white/[0.02] p-8 text-center text-slate-400">
              No reports generated yet. Start your first interview prep session.
            </div>
          </div>
        )}
      </GlassCard>
    </div>
  );
};

export default Dashboard;
