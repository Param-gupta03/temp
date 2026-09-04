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
    <div className="min-h-screen flex flex-col bg-[#faf7f2] text-[#1c1917] selection:bg-[#2f4739]/15 selection:text-[#2f4739]">
      {showHeaderFooter && <Header isSubscriptionPage={isSubscriptionPage} />}
      <main className={`flex-grow ${useFullWidth ? "" : "container mx-auto px-4 py-8"}`}>
        {children}
      </main>
      {showHeaderFooter && <Footer />}

      {showMessageModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#1c1917]/40 backdrop-blur-sm z-50 animate-in fade-in duration-300">
          <div className="bg-[#ffffff] border border-[#e7e0d5] px-8 py-7 rounded-3xl shadow-[0_20px_50px_rgba(47,71,57,0.12)] max-w-sm w-full text-center">
            <p className="text-base font-medium text-[#1c1917]">{message}</p>
            <button
              onClick={() => setShowMessageModal(false)}
              className="mt-6 w-full bg-[#2f4739] hover:bg-[#24372c] text-[#faf7f2] font-semibold py-3 rounded-full transition shadow-sm active:scale-[0.98]"
            >
              Okay
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
