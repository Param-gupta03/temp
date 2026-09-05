"use client";

import React, { useContext, useEffect, useState } from 'react';
import { Mail, Phone, Package, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

import ProductList from '@/components/ProductList';
import StayUpdatedSection from '@/components/StayUpdatedSection';
import { AppContext } from '@/context/AppContext';

const ProductListPage = () => {
  const router = useRouter();
  const { fetchProducts }: any = useContext(AppContext) || {};

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      if (fetchProducts) {
        const { data } = await fetchProducts();
        setProducts(data || []);
      }
      setLoading(false);
    };

    loadProducts();
  }, [fetchProducts]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="flex items-center gap-3 text-base font-semibold text-[#2f4739] dark:text-[#489a69]">
          <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span>Loading verified sustainable products...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 md:px-8 space-y-16 text-[#111827] dark:text-[#f4f0ea]">
      {products.length === 0 ? (
        <div className="max-w-3xl mx-auto bg-white dark:bg-[#1a241f] border border-[#e7e0d5] dark:border-[#2a3d33] rounded-[2.5rem] shadow-card p-8 md:p-14 text-center space-y-6">
          <div className="w-16 h-16 bg-[#e8ede9] dark:bg-[#223028] rounded-2xl flex items-center justify-center mx-auto text-[#2f4739] dark:text-[#489a69]">
            <Package className="w-8 h-8" />
          </div>
          
          <p className="text-xs uppercase tracking-[0.25em] font-bold text-[#8d6b4f] dark:text-[#d4a373]">
            New Season
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold">
            Eco Collections <span className="text-[#2f4739] dark:text-[#489a69] italic font-serif">Coming Soon</span>
          </h2>

          <p className="text-[#374151] dark:text-[#d1d5db] text-base md:text-lg max-w-xl mx-auto font-normal leading-relaxed">
            We are vetting a premium collection of certified sustainable goods for you. The future of mindful shopping is almost here.
          </p>

          <div className="bg-[#f7f4ee] dark:bg-[#161f1a] p-8 md:p-10 rounded-3xl border border-[#ede4d5] dark:border-[#2a3d33] space-y-4">
            <h3 className="font-serif text-2xl font-bold">
              Are you a Sustainable Creator or Brand?
            </h3>

            <p className="text-[#4b5563] dark:text-[#9ca3af] text-base max-w-md mx-auto font-normal">
              Join The Green Turtles' exclusive collective and showcase your products to conscious shoppers.
            </p>

            <div className="pt-2">
              <button
                onClick={() => router.push('/why-partner-us')}
                className="bg-[#2f4739] hover:bg-[#23372c] dark:bg-[#346244] dark:hover:bg-[#3e7552] text-[#faf7f2] font-semibold py-3.5 px-8 rounded-full shadow-soft transition active:scale-95 text-base"
              >
                Why Partner With Us
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.25em] font-bold text-[#8d6b4f] dark:text-[#d4a373]">
              Conscious Catalogue
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold">
              Verified Sustainable <span className="text-[#2f4739] dark:text-[#489a69] italic font-serif">Products</span>
            </h1>
            <p className="text-[#4b5563] dark:text-[#9ca3af] text-base sm:text-lg">
              Handpicked essentials for mindful living, independently vetted for ethical production and circular materials.
            </p>
          </div>
          <ProductList products={products} />
        </div>
      )}

      {/* STAY UPDATED SECTION */}
      <StayUpdatedSection />
    </div>
  );
};

export default ProductListPage;
