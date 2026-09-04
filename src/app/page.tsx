"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import SvgLogo from "@/svg";

const ComingSoonPage = () => {
  const router = useRouter();

  const handleStayUpdatedClick = () => {
    router.push("/subscribe");
  };

  const handleSneakPeekClick = () => {
    router.push("/landing");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#faf7f2] px-4 py-8 sm:px-8">
      <section className="relative isolate flex min-h-[calc(100vh-4rem)] w-full max-w-[1340px] flex-col items-center justify-center overflow-hidden rounded-[2.5rem] border border-[#e7e0d5] bg-white px-6 py-20 text-center shadow-[0_20px_60px_-15px_rgba(47,71,57,0.08)] sm:min-h-[720px]">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_85%,rgba(47,71,57,0.04),transparent_40%),radial-gradient(circle_at_85%_15%,rgba(141,107,79,0.05),transparent_40%)]" />

        <div className="animate-bounce-slow mb-10">
          <div className="flex h-36 w-36 items-center justify-center rounded-3xl bg-[#f7f4ee] border border-[#ede4d5] shadow-sm">
            <SvgLogo width="88" height="88" className="opacity-100" />
          </div>
        </div>

        <p className="mb-4 animate-fade-in delay-200 text-xs md:text-sm font-semibold uppercase tracking-[0.28em] text-[#8d6b4f]">
          Launching Soon
        </p>

        <h1 className="font-serif mb-6 animate-fade-in text-5xl font-bold leading-tight text-[#1c1917] sm:text-6xl md:text-7xl tracking-tight">
          The Green <span className="text-[#2f4739] italic font-serif">Turtles</span>
        </h1>

        <p className="mx-auto mb-12 max-w-[680px] animate-fade-in delay-400 text-base md:text-lg font-normal leading-relaxed text-[#66615b]">
          Making sustainable choices easier to discover.<br />
          A curated platform helping people discover, compare and understand sustainable products from emerging and trusted brands.
        </p>

        <div className="flex w-full max-w-[380px] flex-col gap-4 sm:w-auto sm:max-w-none sm:flex-row">
          <button
            type="button"
            onClick={handleStayUpdatedClick}
            className="h-[52px] rounded-full bg-[#2f4739] px-9 text-sm font-semibold text-[#faf7f2] shadow-sm transition hover:bg-[#23372c] focus:outline-none focus:ring-2 focus:ring-[#2f4739] focus:ring-offset-2 active:scale-95"
          >
            Stay Updated
          </button>

          <button
            type="button"
            onClick={handleSneakPeekClick}
            className="flex h-[52px] items-center justify-center gap-2 rounded-full border border-[#cfc4b2] bg-white px-9 text-sm font-semibold text-[#1c1917] transition hover:border-[#2f4739] hover:bg-[#f7f4ee] focus:outline-none focus:ring-2 focus:ring-[#2f4739] focus:ring-offset-2 active:scale-95"
          >
            Sneak Peek <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default ComingSoonPage;
