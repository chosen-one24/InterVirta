import { useLocation } from "react-router";
import Navbar from "./Navbar.jsx";

const ProtectedLayout = ({ children }) => {
  const location = useLocation();
  const isReportPage = location.pathname.startsWith("/interview/") && !location.pathname.endsWith("/new");

  return (
    <div className="min-h-screen bg-[#050505] text-slate-100 flex flex-col">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-[-10%] h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-rose-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-500/5 blur-[120px]" />
      </div>
      <Navbar />
      <main className={`flex-grow mx-auto w-full transition-all duration-300 ${
        isReportPage 
          ? "max-w-[1700px] px-8 xl:px-12 2xl:px-16 py-4" 
          : "max-w-6xl px-6 py-10"
      }`}>{children}</main>
      <footer className="border-t border-white/5 bg-[#050505]/40 backdrop-blur-md">
        <div className={`mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4 py-6 text-xs text-slate-400 ${
          isReportPage ? "max-w-[1700px] px-8 xl:px-12 2xl:px-16" : "max-w-6xl px-6"
        }`}>
          <div>
            © 2026 InterVirta
          </div>
          <div className="text-slate-500 font-medium">
            Built with MERN + Google Gemini AI
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors duration-200">Privacy</a>
            <a href="#" className="hover:text-white transition-colors duration-200">Terms</a>
            <a href="#" className="hover:text-white transition-colors duration-200">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProtectedLayout;
