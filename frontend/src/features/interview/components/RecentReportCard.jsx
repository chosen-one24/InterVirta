import { useNavigate } from "react-router";

const RecentReportCard = ({ report }) => {
  const navigate = useNavigate();

  return (
    <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-white/10 hover:bg-white/[0.04]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-white">{report.title}</p>
          <p className="mt-2 text-sm text-slate-400">
            {report.matchScore}% match • {new Date(report.createdAt).toLocaleDateString()}
          </p>
        </div>
        <span className="rounded-full border border-rose-500/20 bg-rose-500/10 px-2.5 py-1 text-xs font-semibold text-rose-300">
          {report.matchScore}%
        </span>
      </div>
      <div className="mt-5 flex justify-end">
        <button
          onClick={() => navigate(`/interview/${report._id}`)}
          className="rounded-xl border border-white/5 bg-white/[0.02] px-3 py-2 text-sm font-semibold text-slate-200 transition-all duration-300 hover:scale-[1.02] hover:border-white/10 hover:bg-white/[0.04]"
        >
          View
        </button>
      </div>
    </div>
  );
};

export default RecentReportCard;
