"use client";

import React, { useContext, useEffect, useState } from 'react';
import { Mail, Phone, Package } from 'lucide-react';
import { useRouter } from 'next/navigation';

import ProductList from '@/components/ProductList';
import { AppContext } from '@/context/AppContext';

const ProductListPage = () => {
  const router = useRouter();
  const { fetchProducts }: any = useContext(AppContext);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      const { data } = await fetchProducts();
      setProducts(data || []);
      setLoading(false);
    };

    loadProducts();
  }, [fetchProducts]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <p className="text-sm font-medium text-[#78716c] animate-pulse">Loading products...</p>
      </div>
    );
  }
  return (
    <section className="py-8 px-4 md:px-8 bg-[#faf7f2] min-h-screen">
      {products.length === 0 ? (
        <div className="max-w-3xl mx-auto bg-white border border-[#e7e0d5] rounded-3xl shadow-[0_8px_30px_rgba(47,71,57,0.05)] p-8 md:p-14 text-center">
          <div className="w-16 h-16 bg-[#e8ede9] rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#2f4739]">
            <Package className="w-8 h-8" />
          </div>
          
          <p className="text-xs uppercase tracking-[0.22em] font-semibold text-[#8d6b4f] mb-2">New Season</p>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#1c1917] mb-4">
            Eco Collections <span className="text-[#2f4739] italic font-serif">Coming Soon</span>
          </h2>

          <p className="text-[#66615b] text-base mb-10 leading-relaxed max-w-xl mx-auto font-normal">
            We are curating a premium collection of sustainable products just for you. 
            The future of shopping is mindful, and it's almost here.
          </p>

          <div className="bg-[#f7f4ee] p-8 md:p-10 rounded-2xl border border-[#ede4d5]">
            <h3 className="font-serif text-xl md:text-2xl font-bold text-[#1c1917] mb-3">
              Are you a Green Creator?
            </h3>

            <p className="text-[#66615b] text-sm mb-6 max-w-md mx-auto font-normal">
              Join The Green Turtles' exclusive partner network and showcase your sustainable products to the world.
            </p>

            <button
              onClick={() => router.push('/partner')}
              className="bg-[#2f4739] hover:bg-[#23372c] text-[#faf7f2] font-semibold py-3.5 px-8 rounded-full shadow-sm transition active:scale-95 mb-8 text-sm"
            >
              Partner With Us
            </button>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-xs text-[#66615b]">
              <a href="mailto:dishasikka@thegreenturtles.in" className="flex items-center gap-2 hover:text-[#2f4739] transition cursor-pointer font-medium">
                <Mail className="w-4 h-4 text-[#2f4739]" />
                dishasikka@thegreenturtles.in
              </a>

              <div className="hidden md:block w-1.5 h-1.5 bg-[#d7cbba] rounded-full"></div>

              <a href="tel:+919254579730" className="flex items-center gap-2 hover:text-[#2f4739] transition cursor-pointer font-medium">
                <Phone className="w-4 h-4 text-[#2f4739]" />
                +91 9254579730
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.22em] font-semibold text-[#8d6b4f] mb-1.5">Conscious Catalogue</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1c1917] mb-2">Our <span className="text-[#2f4739] italic font-serif">Products</span></h2>
            <p className="text-[#78716c] text-sm">Discover handpicked sustainable essentials for mindful living.</p>
          </div>
          <ProductList products={products} />
        </div>
      )}
    </section>
  );
};

export default ProductListPage;
