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
    <div className="flex min-h-screen items-start justify-center bg-[#0f172a] px-4 py-8 sm:px-8">
      <section className="relative isolate flex min-h-[calc(100vh-4rem)] w-full max-w-[1504px] flex-col items-center justify-center overflow-hidden rounded-[3rem] border border-slate-600/60 bg-[#172033]/85 px-6 py-16 text-center shadow-2xl backdrop-blur-sm sm:min-h-[756px]">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_0%_100%,rgba(16,185,129,0.12),transparent_24%),radial-gradient(circle_at_100%_0%,rgba(20,184,166,0.12),transparent_24%)]" />

        <div className="animate-bounce-slow mb-12">
          <div className="flex h-[162px] w-[162px] items-center justify-center rounded-[2rem]  shadow-lg shadow-green-950/10">
            <SvgLogo width="104" height="104" className="opacity-100" />
          </div>
        </div>

        <h1 className="mb-6 animate-fade-in text-5xl font-black leading-none text-slate-100 sm:text-6xl md:text-7xl">
          Green <span className="text-[#2bd27d]">Turtle</span>
        </h1>

        <p className="mb-8 animate-fade-in delay-200 text-2xl font-bold uppercase tracking-[0.22em] text-slate-300 md:text-[2rem]">
          Launching Soon
        </p>

        <p className="mx-auto mb-12 max-w-[650px] animate-fade-in delay-400 text-lg font-semibold leading-relaxed text-slate-400 md:text-[1.35rem]">
          Get ready for a revolutionary marketplace connecting you with the best
          eco-friendly products. We&apos;re building a greener future, one
          sustainable choice at a time.
        </p>

        <div className="flex w-full max-w-[410px] flex-col gap-6 sm:w-auto sm:max-w-none sm:flex-row">
          <button
            type="button"
            onClick={handleStayUpdatedClick}
            className="h-[58px] rounded-2xl bg-[#0ea968] px-10 text-base font-black text-white shadow-xl shadow-green-950/20 transition hover:bg-[#0b965d] focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            Stay Updated
          </button>

          <button
            type="button"
            onClick={handleSneakPeekClick}
            className="flex h-[58px] items-center justify-center gap-2 rounded-2xl border border-slate-600 bg-transparent px-10 text-base font-black text-slate-100 transition hover:border-slate-500 hover:bg-slate-900/30 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            Sneak Peek <ArrowRight className="h-5 w-5" strokeWidth={2.5} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default ComingSoonPage;
