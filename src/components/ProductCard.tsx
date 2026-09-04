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
    <div className="bg-white rounded-2xl border border-[#e7e0d5] overflow-hidden hover:shadow-[0_12px_30px_-4px_rgba(47,71,57,0.1)] hover:border-[#cfc4b2] transition-all duration-300 group flex flex-col h-full shadow-[0_4px_20px_-2px_rgba(47,71,57,0.05)]">
      <div className="relative aspect-square bg-[#f3ede2] flex items-center justify-center overflow-hidden">
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
          className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm text-[#2f4739] hover:bg-white hover:scale-105 transition active:scale-95 z-10 border border-[#e7e0d5]"
          title="Generate Image with AI"
          disabled={!generateProductImage || isGeneratingImage}
        >
          {isGeneratingImage ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <ImageIcon className="w-4 h-4" />
          )}
        </button>
      </div>

      <div className="p-5 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-serif text-lg font-semibold text-[#1c1917] group-hover:text-[#2f4739] transition-colors line-clamp-1">
            {product.name || 'Unnamed Product'}
          </h3>
        </div>

        <p className="text-xs text-[#78716c] mb-5 line-clamp-2 leading-relaxed font-normal">
          {product.description || 'No description available for this eco-friendly item.'}
        </p>

        <div className="mt-auto space-y-4">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[10px] text-[#8a847c] font-medium uppercase tracking-wider mb-0.5">Price</p>
              <span className="text-xl font-bold text-[#1c1917]">
                Rs. {Number(product.price || 0)}
              </span>
            </div>
            {product.category && (
              <span className="text-[11px] font-medium text-[#2f4739] bg-[#e8ede9] px-2.5 py-1 rounded-full border border-[#d2dfd5]/60">
                {product.category}
              </span>
            )}
          </div>

          <div className="flex gap-2.5 pt-1">
            <button
              onClick={() => router.push(`/products/${product.id}`)}
              className="flex-1 bg-[#f4efe6] hover:bg-[#eae2d5] text-[#1c1917] font-medium py-2.5 rounded-full transition active:scale-95 border border-[#e2d9cc] text-xs"
            >
              Details
            </button>

            <button
              onClick={() => addToCart && addToCart(product)}
              className="flex-1 bg-[#2f4739] hover:bg-[#23372c] text-[#faf7f2] font-semibold py-2.5 rounded-full transition active:scale-95 shadow-sm flex items-center justify-center gap-1.5 text-xs disabled:opacity-40"
              disabled={!addToCart || Number(product.numberOfItem || 0) <= 0}
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              {Number(product.numberOfItem || 0) <= 0 ? 'Sold Out' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
