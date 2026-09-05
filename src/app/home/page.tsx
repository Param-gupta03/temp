"use client";

import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Sparkles,
  ShieldCheck,
  Leaf,
  Coins,
  ArrowRight,
  TrendingUp,
  ShoppingBag,
  Store
} from 'lucide-react';

import CategoryCard from '@/components/CategoryCard';
import ProductList from '@/components/ProductList';
import StayUpdatedSection from '@/components/StayUpdatedSection';
import { AppContext } from '@/context/AppContext';
import { mockProducts } from '@/data/mockProducts';

const BuyerHomePage = () => {
  const { fetchProducts, showMessage } = useContext(AppContext) || {};
  const router = useRouter();

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      if (fetchProducts) {
        const { data } = await fetchProducts({ limit: 6 });
        setProducts(data && data.length > 0 ? data : mockProducts);
      } else {
        setProducts(mockProducts);
      }
      setLoading(false);
    };

    loadProducts();
  }, [fetchProducts]);

  const handleCategoryClick = (cat: string) => {
    if (showMessage) {
      showMessage(`Filtering ${cat} products...`);
    }
    router.push('/products');
  };

  const goToPage = (page: string) => {
    router.push(`/${page}`);
  };

  return (
    <div className="py-6 space-y-16 text-[#1c1917] dark:text-[#f4f0ea]">
      {/* HERO SECTION FOR BUYERS */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#f4efe6] via-[#faf7f2] to-[#ede4d5] dark:from-[#1b2620] dark:via-[#161f1a] dark:to-[#121815] py-16 md:py-24 rounded-[2.5rem] border border-[#e7e0d5] dark:border-[#2a3d33] shadow-card">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-[#2f4739]/10 dark:bg-[#489a69]/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-[#8d6b4f]/10 dark:bg-[#d4a373]/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-6 text-center relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-[#2f4739]/10 dark:bg-[#489a69]/20 border border-[#2f4739]/20 dark:border-[#489a69]/40 px-4 py-2 rounded-full text-[#2f4739] dark:text-[#489a69] font-bold text-xs uppercase tracking-widest mb-6">
            <Sparkles className="w-4 h-4" />
            Conscious Shopping · Verified Impact
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold mb-6 leading-[1.12] text-[#111827] dark:text-[#f4f0ea] tracking-tight">
            Your Curated <span className="italic font-serif text-[#2f4739] dark:text-[#489a69]">Eco-Friendly</span><br className="hidden sm:inline" /> Marketplace
          </h1>

          <p className="text-base sm:text-lg md:text-xl mb-10 max-w-2xl mx-auto text-[#374151] dark:text-[#d1d5db] font-normal leading-relaxed">
            Discover hand-vetted sustainable products from ethical brands. Compare real credentials, eliminate greenwashing, and earn rewards for every conscious choice.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => goToPage('products')}
              className="bg-[#2f4739] hover:bg-[#23372c] dark:bg-[#346244] dark:hover:bg-[#3e7552] text-[#faf7f2] py-4 px-9 rounded-full font-semibold shadow-soft transition active:scale-95 text-base flex items-center justify-center gap-2"
            >
              Shop Verified Products <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => goToPage('about')}
              className="bg-white dark:bg-[#1a241f] border border-[#cfc4b2] dark:border-[#354a3e] text-[#111827] dark:text-[#f4f0ea] py-4 px-9 rounded-full font-semibold hover:border-[#2f4739] dark:hover:border-[#489a69] transition active:scale-95 text-base shadow-soft"
            >
              Our Mission
            </button>
          </div>
        </div>
      </div>

      {/* THREE BUYER TRUST PILLARS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-[#1a241f] border border-[#e7e0d5] dark:border-[#2a3d33] p-7 rounded-3xl shadow-card space-y-3">
          <div className="p-3.5 bg-[#e8ede9] dark:bg-[#223028] text-[#2f4739] dark:text-[#489a69] rounded-2xl w-fit">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-xl font-bold text-[#111827] dark:text-[#f4f0ea]">
            100% Vetted Credentials
          </h3>
          <p className="text-sm md:text-base text-[#4b5563] dark:text-[#9ca3af] leading-relaxed">
            Every item undergoes materials and lifecycle checks. No ambiguous "green" labels without proof.
          </p>
        </div>

        <div className="bg-white dark:bg-[#1a241f] border border-[#e7e0d5] dark:border-[#2a3d33] p-7 rounded-3xl shadow-card space-y-3">
          <div className="p-3.5 bg-[#e8ede9] dark:bg-[#223028] text-[#2f4739] dark:text-[#489a69] rounded-2xl w-fit">
            <Coins className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-xl font-bold text-[#111827] dark:text-[#f4f0ea]">
            Earn Eco-Coins On Every Buy
          </h3>
          <p className="text-sm md:text-base text-[#4b5563] dark:text-[#9ca3af] leading-relaxed">
            Collect reward coins with each sustainable order to redeem against future eco purchases or tree-planting.
          </p>
        </div>

        <div className="bg-white dark:bg-[#1a241f] border border-[#e7e0d5] dark:border-[#2a3d33] p-7 rounded-3xl shadow-card space-y-3">
          <div className="p-3.5 bg-[#e8ede9] dark:bg-[#223028] text-[#2f4739] dark:text-[#489a69] rounded-2xl w-fit">
            <TrendingUp className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-xl font-bold text-[#111827] dark:text-[#f4f0ea]">
            Track Real Carbon Savings
          </h3>
          <p className="text-sm md:text-base text-[#4b5563] dark:text-[#9ca3af] leading-relaxed">
            See estimated CO₂ and plastic waste reductions compared to conventional alternatives.
          </p>
        </div>
      </div>

      {/* SHOP BY CATEGORY */}
      <div className="text-center space-y-8">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] font-bold text-[#8d6b4f] dark:text-[#d4a373] mb-2">
            Curated Departments
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#111827] dark:text-[#f4f0ea]">
            Shop by <span className="italic font-serif text-[#2f4739] dark:text-[#489a69]">Category</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 px-2">
          <CategoryCard name="Apparel & Wear" icon="👕" onClick={() => handleCategoryClick('Apparel')} />
          <CategoryCard name="Home & Living" icon="🏡" onClick={() => handleCategoryClick('Home & Living')} />
          <CategoryCard name="Beauty & Care" icon="🧴" onClick={() => handleCategoryClick('Beauty')} />
          <CategoryCard name="Clean Tech & Energy" icon="🔋" onClick={() => handleCategoryClick('Electronics')} />
        </div>
      </div>

      {/* FEATURED ECO PRODUCTS */}
      <div className="bg-white dark:bg-[#161f1a] border border-[#e7e0d5] dark:border-[#2a3d33] py-16 md:py-20 rounded-[2.5rem] px-6 md:px-12 shadow-card space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <p className="text-xs uppercase tracking-[0.22em] font-bold text-[#8d6b4f] dark:text-[#d4a373]">
            Editor's Selection
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#111827] dark:text-[#f4f0ea]">
            Featured <span className="italic font-serif text-[#2f4739] dark:text-[#489a69]">Eco Products</span>
          </h2>
          <p className="text-base md:text-lg text-[#4b5563] dark:text-[#9ca3af] font-normal">
            Handpicked essentials for a truly sustainable lifestyle, independently vetted for ethical production.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-12 h-12 border-4 border-[#e8ede9] border-t-[#2f4739] dark:border-t-[#489a69] rounded-full animate-spin" />
          </div>
        ) : products.length === 0 ? (
          <p className="text-[#6b7280] text-center py-16 font-medium text-lg">
            No products available yet.
          </p>
        ) : (
          <div className="max-w-6xl mx-auto">
            <ProductList products={products} />
          </div>
        )}

        <div className="text-center pt-4">
          <button
            onClick={() => goToPage('products')}
            className="group inline-flex items-center gap-2.5 bg-[#2f4739] hover:bg-[#23372c] dark:bg-[#346244] dark:hover:bg-[#3e7552] text-[#faf7f2] py-4 px-10 rounded-full font-semibold transition active:scale-95 shadow-soft text-base"
          >
            Explore All Products
            <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
          </button>
        </div>
      </div>

      {/* STAY UPDATED SECTION (LARGE & PROMINENT) */}
      <StayUpdatedSection
        title="Stay Updated on New Sustainable Drops"
        subtitle="Be the first to discover emerging green makers, receive exclusive buyer discounts, and get verified eco-living tips."
      />
    </div>
  );
};

export default BuyerHomePage;
