const StatCard = ({ title, value, accent }) => {
  return (
    <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur">
      <p className="text-sm font-medium text-slate-400">{title}</p>
      <p className={`mt-3 text-3xl font-semibold ${accent}`}>{value}</p>
    </div>
  );
};

export default StatCard;
