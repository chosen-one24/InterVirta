


import { useNavigate } from "react-router";
import { useAuth } from "../../auth/hooks/useauth.js";

const Profile = () => {
  const navigate = useNavigate();
  const { user, handleLogout } = useAuth();

  const onLogout = async () => {
    await handleLogout();
    navigate("/login");
  };

  return (
    <main className="min-h-[calc(100vh-72px)] bg-[#050505] px-6 py-10">
      <div className="mx-auto max-w-3xl">

        {/* Heading */}
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500">
            Profile
          </p>

          <h1 className="mt-2 text-4xl font-bold text-white">
            Account Settings
          </h1>

          <p className="mt-2 text-slate-400">
            View your InterVirta account information.
          </p>
        </div>

        {/* Card */}
        <div className="overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-xl">

          {/* Header */}
          <div className="border-b border-white/5 px-8 py-8">

            <div className="flex items-center gap-5">

              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-rose-500 via-fuchsia-500 to-indigo-500 text-3xl font-bold text-white shadow-lg">
                {user?.username?.charAt(0).toUpperCase()}
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-white">
                  {user?.username}
                </h2>

                <p className="mt-1 text-slate-400">
                  AI Interview Coach User
                </p>
              </div>

            </div>

          </div>

          {/* Details */}
          <div className="space-y-6 p-8">

            <div className="grid grid-cols-2 gap-6">

              <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
                <p className="text-xs uppercase tracking-widest text-slate-500">
                  Username
                </p>

                <p className="mt-2 text-lg font-medium text-white">
                  {user?.username}
                </p>
              </div>

              <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
                <p className="text-xs uppercase tracking-widest text-slate-500">
                  Email
                </p>

                <p className="mt-2 text-lg font-medium text-white break-all">
                  {user?.email}
                </p>
              </div>

            </div>

            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
              <p className="text-xs uppercase tracking-widest text-slate-500">
                Member Since
              </p>

              <p className="mt-2 text-lg font-medium text-white">
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "Not Available"}
              </p>
            </div>

            {/* Logout */}
            <div className="pt-4">

              <button
                onClick={onLogout}
                className="w-full rounded-2xl bg-gradient-to-r from-rose-500 via-fuchsia-500 to-indigo-500 px-6 py-4 font-semibold text-white transition-all duration-300 hover:scale-[1.02]"
              >
                Logout
              </button>

            </div>

          </div>

        </div>

      </div>
    </main>
  );
};

export default Profile;
