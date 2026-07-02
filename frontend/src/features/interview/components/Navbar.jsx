import { Link, useLocation, useNavigate } from "react-router";
import { useAuth } from "../../auth/hooks/useauth.js";
import logo from "../../../assets/logo.svg";

const navItems = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Prepare", to: "/interview/new" },
  { label: "My Reports", to: "/reports" },
  { label: "Profile", to: "/profile" },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, handleLogout } = useAuth();

  const onLogout = async () => {
    await handleLogout();
    navigate("/login");
  };

  return (
    <header className="border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <img src={logo} alt="InterVirta Logo" className="h-10 w-10 rounded-2xl object-contain shrink-0" />
          <div>
            <p className="text-lg font-semibold tracking-tight text-white leading-none">InterVirta</p>
            <p className="text-[9px] font-semibold tracking-[0.2em] text-slate-500 uppercase mt-1">AI INTERVIEW COACH</p>
          </div>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`rounded-full border px-3 py-2 text-sm font-medium transition-all duration-300 ${isActive ? "border-white/10 bg-white/[0.04] text-white shadow-sm shadow-black/20" : "border-transparent text-slate-400 hover:border-white/10 hover:bg-white/[0.02] hover:text-white"}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden rounded-full border border-white/5 bg-white/[0.02] px-3 py-2 text-sm text-slate-400 sm:block">
            {user?.username || user?.email || "Guest"}
          </div>
          <button
            onClick={onLogout}
            className="rounded-xl border border-white/5 bg-white/[0.02] px-4 py-2 text-sm font-semibold text-slate-200 transition-all duration-300 hover:scale-[1.02] hover:border-white/10 hover:bg-white/[0.04]"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
