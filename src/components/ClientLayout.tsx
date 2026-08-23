"use client";
import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { showMessageModal, message, setShowMessageModal } = useContext(AppContext) || {};
  const isComingSoonPage = pathname === "/";
  const isLandingPage = pathname === "/landing";
  const isSubscriptionPage = pathname === "/subscribe";

  const showHeaderFooter = !isComingSoonPage;
  const useFullWidth = isComingSoonPage || isLandingPage;

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100 selection:bg-green-500/30">
      {showHeaderFooter && <Header isSubscriptionPage={isSubscriptionPage} />}
      <main className={`flex-grow ${useFullWidth ? "" : "container mx-auto px-4 py-8"}`}>
        {children}
      </main>
      {showHeaderFooter && <Footer />}

      {showMessageModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 animate-in fade-in duration-300">
          <div className="bg-slate-800 border border-slate-700 px-8 py-6 rounded-2xl shadow-2xl max-w-sm w-full text-center">
            <p className="text-lg font-medium text-slate-100">{message}</p>
            <button
              onClick={() => setShowMessageModal(false)}
              className="mt-6 w-full bg-green-600 text-white font-bold py-2 rounded-xl hover:bg-green-700 transition"
            >
              Okay
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
