"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import StayUpdatedSection from '@/components/StayUpdatedSection';

const SubscriptionPage = () => {
  const router = useRouter();

  return (
    <section className="py-12 px-4 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#374151] dark:text-[#d1d5db] hover:text-[#2f4739] dark:hover:text-[#489a69] transition bg-white dark:bg-[#1a241f] border border-[#e7e0d5] dark:border-[#2a3d33] px-4 py-2 rounded-full shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      </div>

      <StayUpdatedSection
        title="Stay Updated with The Green Turtles"
        subtitle="Be the first to discover emerging sustainable brands, exclusive early access promotions, and transparent eco-product guides."
      />
    </section>
  );
};

export default SubscriptionPage;
