"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { showMessageModal, message, setShowMessageModal } = useContext(AppContext) || {};
  
  const isProjectorPage = pathname === "/" || pathname === "/landing";
  const isSubscriptionPage = pathname === "/subscribe";

  const showHeader = !isProjectorPage; // Projector page provides its own seamless floating navbar
  const showFooter = !isProjectorPage;
  const useFullWidth = isProjectorPage;

  return (
    <div className="min-h-screen flex flex-col bg-[#faf7f2] dark:bg-[#121815] text-[#111827] dark:text-[#f4f0ea] selection:bg-[#2f4739]/20 selection:text-[#2f4739] dark:selection:bg-[#489a69]/30 dark:selection:text-[#489a69] transition-colors duration-200">
      {showHeader && <Header isSubscriptionPage={isSubscriptionPage} />}
      <main className={`flex-grow ${useFullWidth ? "" : "container mx-auto px-4 py-8"}`}>
        {children}
      </main>
      {showFooter && <Footer />}

      {showMessageModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#1c1917]/50 backdrop-blur-sm z-50 animate-in fade-in duration-300">
          <div className="bg-white dark:bg-[#1a241f] border border-[#e7e0d5] dark:border-[#2a3d33] px-8 py-7 rounded-3xl shadow-card max-w-sm w-full text-center">
            <p className="text-base font-semibold text-[#111827] dark:text-[#f4f0ea]">{message}</p>
            <button
              onClick={() => setShowMessageModal && setShowMessageModal(false)}
              className="mt-6 w-full bg-[#2f4739] hover:bg-[#24372c] dark:bg-[#346244] dark:hover:bg-[#3e7552] text-[#faf7f2] font-semibold py-3 rounded-full transition shadow-soft active:scale-[0.98]"
            >
              Okay
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
