"use client";

import React, { useContext, useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { AppContext } from '@/context/AppContext';

const ProductDetail = () => {
  const { productId }: any = useParams();
  const { addToCart, getProductById }: any = useContext(AppContext);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      const foundProduct = await getProductById(productId);
      setProduct(foundProduct);
      setLoading(false);
    };

    loadProduct();
  }, [getProductById, productId]);

  if (loading) {
    return <div className="text-center py-12 text-lg font-medium">Loading product...</div>;
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-600 mb-4">
          Product not found. It may have been removed.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center rounded-lg bg-green-600 px-5 py-3 font-semibold text-white"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <section className="max-w-6xl mx-auto py-12 px-6">
      <div className="bg-slate-800/40 border border-slate-700 rounded-[3rem] overflow-hidden shadow-2xl backdrop-blur-sm">
        <div className="flex flex-col lg:flex-row items-stretch">
          <div className="lg:w-1/2 bg-slate-900 flex items-center justify-center p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-slate-700">
            <div className="relative group w-full">
              <img
                src={product.imageUrl || product.image_url}
                alt={product.name}
                className="w-full h-auto max-h-[500px] object-contain rounded-2xl transition-transform duration-500 group-hover:scale-105"
                onError={(e: any) => {
                  e.target.onerror = null;
                  e.target.src = `https://placehold.co/600x600/1e293b/10b981?text=${product.name.replace(/\s/g, '+')}`;
                }}
              />
            </div>
          </div>
          
          <div className="lg:w-1/2 p-8 md:p-16 flex flex-col">
            <div className="mb-8">
              <span className="inline-flex items-center rounded-xl bg-green-500/10 px-4 py-2 text-xs font-black text-green-400 uppercase tracking-widest border border-green-500/20">
                {product.category || 'Sustainable'}
              </span>
              <h1 className="text-4xl md:text-5xl font-black text-white mt-6 mb-4 leading-tight">{product.name}</h1>
              <div className="flex items-end gap-3 mb-8">
                <p className="text-4xl font-black text-green-400">
                  Rs. {Number(product.price)}
                </p>
                <p className="text-sm text-slate-500 mb-2">Incl. all taxes</p>
              </div>
            </div>

            <div className="space-y-8 flex-grow">
              <div className="p-4 bg-slate-900/50 rounded-2xl border border-slate-700">
                <p className="text-sm text-slate-400 mb-1 font-medium">Availability</p>
                <div className="text-lg font-bold text-white flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${Number(product.numberOfItem || 0) > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  {Number(product.numberOfItem || 0) > 0 ? `${product.numberOfItem} units in stock` : 'Out of stock'}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Description</h3>
                <p className="text-lg text-slate-300 leading-relaxed font-medium">
                  {product.description || 'No detailed description provided for this item.'}
                </p>
              </div>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => addToCart(product)}
                className="flex-[2] bg-gradient-to-r from-green-600 to-emerald-600 text-white font-black py-5 px-8 rounded-2xl hover:from-green-700 hover:to-emerald-700 transition transform hover:scale-[1.02] active:scale-95 shadow-xl shadow-green-900/20 flex items-center justify-center gap-3 text-lg"
                disabled={Number(product.numberOfItem || 0) <= 0}
              >
                <ShoppingCart className="w-6 h-6" />
                {Number(product.numberOfItem || 0) <= 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
              
              <Link
                href="/cart"
                className="flex-1 bg-slate-700/50 border border-slate-600 text-white font-bold py-5 px-8 rounded-2xl text-center hover:bg-slate-700 transition transform active:scale-95 flex items-center justify-center"
              >
                Go to Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
