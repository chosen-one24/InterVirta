const EmptyState = ({ title, description }) => {
  return (
    <div className="rounded-3xl border border-dashed border-white/5 bg-white/[0.02] p-10 text-center backdrop-blur">
      <p className="text-lg font-semibold text-white">{title}</p>
      <p className="mt-2 text-sm text-slate-400">{description}</p>
    </div>
  );
};

export default EmptyState;
