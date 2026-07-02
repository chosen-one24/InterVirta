import { useAuth } from "../../auth/hooks/useauth.js";

const ProfileCard = ({ onLogout }) => {
  const { user } = useAuth();

  return (
    <div className="w-full">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 via-violet-500 to-cyan-400 text-xl font-semibold text-white">
          {user?.username?.[0]?.toUpperCase() || "U"}
        </div>
        <div>
          <p className="text-2xl font-semibold text-white">{user?.username || "User"}</p>
          <p className="text-sm text-slate-400">{user?.email || "No email listed"}</p>
        </div>
      </div>

      <div className="mt-8 space-y-4 rounded-2xl border border-white/5 bg-white/[0.02] p-5 text-sm text-slate-300">
        <div className="flex items-center justify-between">
          <span className="text-slate-400">Joined</span>
          <span>{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Recently joined"}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-400">Status</span>
          <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-300">
            Active
          </span>
        </div>
      </div>

      <button
        onClick={onLogout}
        className="mt-8 w-full rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 text-sm font-semibold text-slate-200 transition-all duration-300 hover:scale-[1.02] hover:border-white/10 hover:bg-white/[0.04]"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfileCard;
