"use client";
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import CategoryCard from '@/components/CategoryCard';
import ProductList from '@/components/ProductList';
import { AppContext } from '@/context/AppContext';
import { mockProducts } from '@/data/mockProducts';

const HomePage = () => {
  const { fetchProducts, showMessage } = useContext(AppContext) || {};
  const router = useRouter();

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      if (fetchProducts) {
        const { data } = await fetchProducts({ limit: 4 });
        setProducts(data && data.length > 0 ? data : mockProducts);
      } else {
        setProducts(mockProducts);
      }
      setLoading(false);
    };

    loadProducts();
  }, [fetchProducts]);

  const handleCategoryClick = () => {
    if (showMessage) {
      showMessage('Products in this category will be added soon!');
    }
  };

  const goToPage = (page: string) => {
    router.push(`/${page}`);
  };

  return (
    <section className="py-6 space-y-20">
      <div className="relative overflow-hidden bg-[#f4efe6] py-16 md:py-24 rounded-3xl border border-[#e7e0d5] shadow-[0_8px_30px_rgba(47,71,57,0.04)]">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-[#2f4739]/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-[#8d6b4f]/5 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.25em] text-[#8d6b4f] mb-3">
            Conscious Living · Mindful Choices
          </p>

          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.15] text-[#1c1917] tracking-tight">
            Your <span className="italic font-serif text-[#2f4739]">Eco-Friendly</span><br className="hidden sm:inline" /> Marketplace
          </h1>

          <p className="text-base md:text-lg mb-10 max-w-2xl mx-auto text-[#66615b] font-normal leading-relaxed">
            Join the movement. Discover curated sustainable products that care for the planet while elevating your lifestyle.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => goToPage('products')}
              className="bg-[#2f4739] hover:bg-[#23372c] text-[#faf7f2] py-3.5 px-8 rounded-full font-semibold shadow-sm transition active:scale-95 text-sm"
            >
              Shop Now
            </button>

            <button
              onClick={() => goToPage('about')}
              className="bg-white border border-[#cfc4b2] text-[#1c1917] py-3.5 px-8 rounded-full font-semibold hover:border-[#2f4739] hover:bg-[#fcfaf7] transition active:scale-95 text-sm shadow-sm"
            >
              Our Mission
            </button>
          </div>
        </div>
      </div>

      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.22em] font-semibold text-[#8d6b4f] mb-2">Curated Departments</p>
        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-10 text-[#1c1917]">Shop by <span className="italic font-serif text-[#2f4739]">Category</span></h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 px-2">
          <CategoryCard name="Apparel" icon="👕" onClick={handleCategoryClick} />
          <CategoryCard name="Home & Living" icon="🏡" onClick={handleCategoryClick} />
          <CategoryCard name="Beauty & Wellness" icon="🧴" onClick={handleCategoryClick} />
          <CategoryCard name="Electronics" icon="🔋" onClick={handleCategoryClick} />
        </div>
      </div>

      <div className="bg-white border border-[#e7e0d5] py-16 md:py-20 rounded-3xl px-6 md:px-10 shadow-[0_4px_24px_rgba(47,71,57,0.04)]">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.22em] font-semibold text-[#8d6b4f] mb-2">Editor's Selection</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-3 text-[#1c1917]">Featured <span className="italic font-serif text-[#2f4739]">Eco Products</span></h2>
          <p className="text-[#78716c] text-sm md:text-base font-normal max-w-xl mx-auto">
            Handpicked essentials for a truly sustainable lifestyle
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-10 h-10 border-3 border-[#e8ede9] border-t-[#2f4739] rounded-full animate-spin"></div>
          </div>
        ) : products.length === 0 ? (
          <p className="text-[#78716c] text-center py-16 font-medium">No products available yet.</p>
        ) : (
          <div className="max-w-6xl mx-auto">
            <ProductList products={products} />
          </div>
        )}

        <div className="text-center mt-12">
          <button
            onClick={() => goToPage('products')}
            className="group inline-flex items-center gap-2 bg-[#2f4739] hover:bg-[#23372c] text-[#faf7f2] py-3.5 px-8 rounded-full font-semibold transition active:scale-95 shadow-sm text-sm"
          >
            View All Products
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
