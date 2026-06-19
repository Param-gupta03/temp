"use client";
import React, { useContext } from 'react';
import { ShoppingCart, Loader2, Image as ImageIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { AppContext } from '../context/AppContext';

interface ProductCardProps {
  product: any;
  generateProductImage?: (description: string, id: string | number) => void;
}

const ProductCard = ({ product, generateProductImage }: ProductCardProps) => {
  const { addToCart, isGeneratingImage = false } = useContext(AppContext) || {};
  const router = useRouter();

  const handleGenerateImage = () => {
    if (generateProductImage) {
      generateProductImage(product.description || '', product.id);
    }
  };

  return (
    <div className="bg-slate-800/40 rounded-3xl border border-slate-700 overflow-hidden hover:border-green-500/50 transition-all duration-300 group flex flex-col h-full shadow-lg hover:shadow-green-500/10">
      <div className="relative aspect-square bg-slate-900 flex items-center justify-center overflow-hidden">
        <img
          src={
            product.imageUrl ||
            product.image_url ||
            `https://placehold.co/400x400/1e293b/10b981?text=${(product.name || 'Product').replace(/\s/g, '+')}`
          }
          alt={product.name || 'Product'}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <button
          onClick={handleGenerateImage}
          className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md p-2.5 rounded-2xl shadow-xl text-slate-300 hover:text-green-400 hover:scale-110 transition active:scale-90 z-10 border border-slate-700"
          title="Generate Image with AI"
          disabled={!generateProductImage || isGeneratingImage}
        >
          {isGeneratingImage ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <ImageIcon className="w-5 h-5" />
          )}
        </button>
      </div>

      <div className="p-6 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors line-clamp-1">
            {product.name || 'Unnamed Product'}
          </h3>
        </div>

        <p className="text-sm text-slate-400 mb-6 line-clamp-2 leading-relaxed">
          {product.description || 'No description available for this eco-friendly item.'}
        </p>

        <div className="mt-auto space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">Price</p>
              <span className="text-2xl font-black text-white">
                Rs. {Number(product.price || 0)}
              </span>
            </div>
            {product.category && (
              <span className="text-[10px] font-bold text-green-400 bg-green-500/10 px-3 py-1.5 rounded-lg uppercase tracking-widest border border-green-500/20">
                {product.category}
              </span>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => router.push(`/products/${product.id}`)}
              className="flex-1 bg-slate-700/50 text-slate-200 font-bold py-3 rounded-xl hover:bg-slate-700 transition active:scale-95 border border-slate-600"
            >
              Details
            </button>

            <button
              onClick={() => addToCart && addToCart(product)}
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-3 rounded-xl hover:from-green-700 hover:to-emerald-700 transition active:scale-95 shadow-lg shadow-green-900/20 flex items-center justify-center gap-2"
              disabled={!addToCart || Number(product.numberOfItem || 0) <= 0}
            >
              <ShoppingCart className="w-4 h-4" />
              {Number(product.numberOfItem || 0) <= 0 ? 'Sold Out' : 'Add'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
