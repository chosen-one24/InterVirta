import { useNavigate } from "react-router";

const ReportCard = ({ report, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="rounded-[2rem] border border-white/5 bg-[#0f0f10]/60 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/10 hover:bg-white/[0.04]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-lg font-semibold text-white">{report.title}</p>
          <p className="mt-2 text-sm text-slate-400">
            Match score: <span className="font-semibold text-slate-200">{report.matchScore}%</span>
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Created {new Date(report.createdAt).toLocaleDateString()}
          </p>
        </div>
        <span className="rounded-full border border-fuchsia-500/20 bg-fuchsia-500/10 px-3 py-1 text-xs font-semibold text-fuchsia-200">
          {report.matchScore}%
        </span>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          onClick={() => navigate(`/interview/${report._id}`)}
          className="rounded-xl border border-white/5 bg-white/[0.02] px-4 py-2 text-sm font-semibold text-slate-200 transition-all duration-300 hover:scale-[1.02] hover:border-white/10 hover:bg-white/[0.04]"
        >
          View Report
        </button>
        <button
          onClick={() => onDelete(report._id)}
          className="rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-2 text-sm font-semibold text-rose-200 transition-all duration-300 hover:scale-[1.02] hover:bg-rose-500/20"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ReportCard;
