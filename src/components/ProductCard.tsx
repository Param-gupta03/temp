"use client";
import React, { useContext } from 'react';
import { ShoppingCart, Loader2, Image as ImageIcon, Sparkles } from 'lucide-react';
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
    <div className="bg-white dark:bg-[#1a241f] rounded-3xl border border-[#e7e0d5] dark:border-[#2a3d33] overflow-hidden hover:shadow-[0_16px_36px_rgba(47,71,57,0.12)] hover:border-[#2f4739] dark:hover:border-[#489a69] transition-all duration-300 group flex flex-col h-full shadow-card">
      <div className="relative aspect-square bg-[#f3ede2] dark:bg-[#121815] flex items-center justify-center overflow-hidden">
        <img
          src={
            product.imageUrl ||
            product.image_url ||
            `https://placehold.co/400x400/f3ede2/2f4739?text=${(product.name || 'Product').replace(/\s/g, '+')}`
          }
          alt={product.name || 'Product'}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-[#1c1917]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <button
          onClick={handleGenerateImage}
          className="absolute top-3 right-3 bg-white/95 dark:bg-[#1c2620]/95 backdrop-blur-sm p-2.5 rounded-full shadow-sm text-[#2f4739] dark:text-[#489a69] hover:scale-105 transition active:scale-95 z-10 border border-[#e7e0d5] dark:border-[#2a3d33]"
          title="Generate Image with AI"
          disabled={!generateProductImage || isGeneratingImage}
        >
          {isGeneratingImage ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <ImageIcon className="w-4 h-4" />
          )}
        </button>

        {/* Eco Verified Tag */}
        <div className="absolute bottom-3 left-3 bg-white/95 dark:bg-[#16251d]/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#2f4739] dark:text-[#489a69] border border-[#2f4739]/20 flex items-center gap-1 shadow-xs">
          <Sparkles className="w-3 h-3 text-[#2f4739] dark:text-[#489a69]" />
          Verified Eco
        </div>
      </div>

      <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-serif text-xl font-bold text-[#111827] dark:text-[#f4f0ea] group-hover:text-[#2f4739] dark:group-hover:text-[#489a69] transition-colors line-clamp-1">
              {product.name || 'Unnamed Product'}
            </h3>
          </div>

          <p className="text-sm text-[#4b5563] dark:text-[#9ca3af] line-clamp-2 leading-relaxed font-normal">
            {product.description || 'No description available for this eco-friendly item.'}
          </p>
        </div>

        <div className="pt-2 space-y-4 border-t border-[#f0eae0] dark:border-[#26352c]">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-[#6b7280] dark:text-[#9ca3af] font-semibold uppercase tracking-wider">Price</p>
              <span className="text-2xl font-bold text-[#111827] dark:text-[#f4f0ea]">
                Rs. {Number(product.price || 0)}
              </span>
            </div>
            {product.category && (
              <span className="text-xs font-semibold text-[#2f4739] dark:text-[#489a69] bg-[#e8ede9] dark:bg-[#203026] px-3 py-1.5 rounded-full border border-[#d2dfd5] dark:border-[#2f4739]/40">
                {product.category}
              </span>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => router.push(`/products/${product.id}`)}
              className="flex-1 bg-[#f4efe6] dark:bg-[#223028] hover:bg-[#eae2d5] dark:hover:bg-[#2b3c33] text-[#111827] dark:text-[#f4f0ea] font-semibold py-3 rounded-full transition active:scale-95 border border-[#e2d9cc] dark:border-[#354a3e] text-sm"
            >
              Details
            </button>

            <button
              onClick={() => addToCart && addToCart(product)}
              className="flex-1 bg-[#2f4739] hover:bg-[#23372c] dark:bg-[#346244] dark:hover:bg-[#3e7552] text-[#faf7f2] font-semibold py-3 rounded-full transition active:scale-95 shadow-soft flex items-center justify-center gap-2 text-sm disabled:opacity-40"
              disabled={!addToCart || Number(product.numberOfItem || 0) <= 0}
            >
              <ShoppingCart className="w-4 h-4" />
              {Number(product.numberOfItem || 0) <= 0 ? 'Sold Out' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
