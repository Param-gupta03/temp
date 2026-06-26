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
    <section className="py-4 space-y-20">
      <div className="relative overflow-hidden bg-slate-800/50 py-20 md:py-32 rounded-[2rem] border border-slate-700 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-green-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px]"></div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
            Your <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">Eco-Friendly</span><br/>Marketplace
          </h1>

          <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto text-slate-400 font-medium">
            Join the revolution. Discover sustainable products that heal the planet while elevating your lifestyle.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button
              onClick={() => goToPage('products')}
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-5 px-12 rounded-2xl font-bold shadow-xl shadow-green-900/20 hover:scale-105 transition transform active:scale-95"
            >
              Shop Now
            </button>

            <button
              onClick={() => goToPage('about')}
              className="bg-slate-800 border border-slate-700 text-slate-100 py-5 px-12 rounded-2xl font-bold hover:bg-slate-700 transition transform hover:scale-105 active:scale-95"
            >
              Our Mission
            </button>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-black mb-12 text-white">Shop by <span className="text-green-500">Category</span></h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 px-2">
          <CategoryCard name="Apparel" icon="👕" onClick={handleCategoryClick} />
          <CategoryCard name="Home & Living" icon="🏡" onClick={handleCategoryClick} />
          <CategoryCard name="Beauty & Wellness" icon="🧴" onClick={handleCategoryClick} />
          <CategoryCard name="Electronics" icon="🔋" onClick={handleCategoryClick} />
        </div>
      </div>

      <div className="bg-slate-800/30 border border-slate-700/50 py-20 rounded-[3rem] px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black mb-4 text-white">Featured <span className="text-emerald-500">Eco Products</span></h2>
          <p className="text-slate-400 text-lg">
            Handpicked essentials for a truly sustainable lifestyle
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-20 h-12 border-4 border-green-500/20 border-t-green-500 rounded-full animate-spin"></div>
          </div>
        ) : products.length === 0 ? (
          <p className="text-slate-500 text-center py-20">No products available yet.</p>
        ) : (
          <div className="max-w-6xl mx-auto">
            <ProductList products={products} />
          </div>
        )}

        <div className="text-center mt-16">
          <button
            onClick={() => goToPage('products')}
            className="group relative inline-flex items-center gap-2 bg-slate-800 text-white py-4 px-10 rounded-2xl font-bold border border-slate-700 hover:border-green-500 transition-all"
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
