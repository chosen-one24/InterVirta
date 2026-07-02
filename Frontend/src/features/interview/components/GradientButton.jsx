const GradientButton = ({ children, onClick, className = "", type = "button", disabled, ...props }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`group relative overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.2em] text-slate-200 transition-all duration-300 hover:scale-[1.02] hover:border-white/10 hover:bg-white/[0.04] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2 text-slate-100">
        {children}
      </span>
    </button>
  );
};

export default GradientButton;
