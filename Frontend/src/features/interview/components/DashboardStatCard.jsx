const DashboardStatCard = ({ title, value, accent }) => {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.25)] backdrop-blur">
      <p className="text-sm font-medium text-slate-400">{title}</p>
      <p className={`mt-3 text-3xl font-semibold ${accent}`}>{value}</p>
    </div>
  );
};

export default DashboardStatCard;
