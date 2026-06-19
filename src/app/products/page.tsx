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
        <p className="text-lg font-semibold animate-pulse">Loading products...</p>
      </div>
    );
  }
   

  return (
    <section className="py-12 px-4 md:px-8 bg-slate-900 min-h-screen">
      {/* {products.length === 0 ? ( jb launch hoga to bss isko camment se httna h baki sub same rhaga  */
        1 ? ( //ya wla line jb tk product use nhi krna h tb tk hi use hoga 
        <div className="max-w-4xl mx-auto bg-slate-800/40 border border-slate-700 rounded-[2.5rem] shadow-2xl p-8 md:p-16 text-center backdrop-blur-md">
          <div className="w-20 h-20 bg-green-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8 rotate-3">
            <Package className="text-green-500 w-10 h-10" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            Eco Collections Coming Soon
          </h2>

          <p className="text-slate-400 text-lg mb-12 leading-relaxed max-w-2xl mx-auto">
            We are curating a premium collection of sustainable products just for you. 
            The future of shopping is green, and it's almost here.
          </p>

          <div className="bg-slate-900/50 p-8 md:p-12 rounded-[2rem] border border-slate-700 shadow-inner">
            <h3 className="text-2xl font-bold text-white mb-4">
              Are you a Green Creator?
            </h3>

            <p className="text-slate-400 mb-8 max-w-md mx-auto">
              Join Green Turtle's exclusive partner network and showcase your sustainable products to the world.
            </p>

            <button
              onClick={() => router.push('/partner')}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-black py-4 px-10 rounded-2xl shadow-xl shadow-green-900/20 transition transform hover:scale-105 mb-10"
            >
              Partner With Us
            </button>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-slate-300">
              <p className="flex items-center gap-2 hover:text-green-400 transition cursor-pointer">
                <Mail className="w-5 h-5 text-green-500" />
                greenturtle.marketplace@gmail.com
              </p>

              <div className="hidden md:block w-1.5 h-1.5 bg-slate-700 rounded-full"></div>

              <p className="flex items-center gap-2 hover:text-green-400 transition cursor-pointer">
                <Phone className="w-5 h-5 text-green-500" />
                +91 9254579730
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-black text-white mb-2">Our <span className="text-green-500">Products</span></h2>
            <p className="text-slate-400">Discover handpicked sustainable essentials.</p>
          </div>
          <ProductList products={products} />
        </div>
      )}
    </section>
  );
};

export default ProductListPage;
