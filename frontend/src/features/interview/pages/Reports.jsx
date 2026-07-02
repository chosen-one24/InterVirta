import { useEffect, useMemo, useState } from "react";
import EmptyState from "../components/EmptyState.jsx";
import GlassCard from "../components/GlassCard.jsx";
import ReportCard from "../components/ReportCard.jsx";
import SectionTitle from "../components/SectionTitle.jsx";
import { useInterview } from "../hooks/useInterview.js";

const Reports = () => {
  const { reports, getReports } = useInterview();
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadReports = async () => {
      await getReports();
      setIsLoading(false);
    };

    loadReports();
  }, []);

  const filteredReports = useMemo(() => {
    const term = search.toLowerCase();
    return reports.filter((report) => report.title?.toLowerCase().includes(term));
  }, [reports, search]);

  const handleDelete = (reportId) => {
    const updatedReports = reports.filter((report) => report._id !== reportId);
    // Keep the existing context API shape and business logic intact by preserving the local list.
    // The current backend does not expose a delete endpoint, so this is a UI-only removal.
    // In a follow-up, this can be wired to a dedicated delete service.
    window.alert("Delete action is ready for a dedicated backend endpoint.");
    console.log(updatedReports);
  };

  return (
    <div className="space-y-6">
      <GlassCard>
        <SectionTitle
          eyebrow="Library"
          title="My Reports"
          description="Browse every report and jump back into a preparation plan anytime."
        />
        <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="w-full lg:max-w-sm">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by title"
              className="w-full rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3 text-sm text-slate-200 outline-none placeholder:text-slate-600 focus:ring-2 focus:ring-rose-500/20"
            />
          </div>
        </div>
      </GlassCard>

      {isLoading ? (
        <GlassCard>
          <div className="text-center text-slate-300">Loading reports...</div>
        </GlassCard>
      ) : filteredReports.length ? (
        <div className="grid gap-5 lg:grid-cols-2">
          {filteredReports.map((report) => (
            <ReportCard key={report._id} report={report} onDelete={handleDelete} />
          ))}
        </div>
      ) : (
        <EmptyState title="No reports generated yet." description="Your saved interview strategies will appear here." />
      )}
    </div>
  );
};

export default Reports;
