const GlassCard = ({ children, className = "", padded = true }) => {
  return (
    <div
      className={`relative overflow-hidden rounded-[2rem] border border-white/5 bg-[#0f0f10]/60 backdrop-blur-xl shadow-2xl shadow-black/20 ${padded ? "p-8" : ""} ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent" />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default GlassCard;
