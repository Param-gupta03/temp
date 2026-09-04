"use client";
import React from 'react';
import { Package, Trash2, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface InventoryListProps {
  products: any[];
  onDelete: (id: string | number) => void;
}

const InventoryList = ({ products, onDelete }: InventoryListProps) => {
  return (
    <div className="lg:col-span-2 space-y-5">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-xl font-serif font-bold flex items-center gap-2 text-[#1c1917]">
          <Package className="text-[#2f4739] w-5 h-5" /> Your Products
        </h2>
        <span className="text-xs text-[#66615b] font-medium">
          {products.length} Items listed
        </span>
      </div>

      <div className="space-y-3.5">
        {products.length === 0 ? (
          <div className="bg-white border border-[#ede4d5] rounded-3xl p-12 text-center">
            <Package className="w-10 h-10 text-[#cfc4b2] mx-auto mb-3" />
            <p className="text-xs text-[#66615b] font-medium">Your inventory is empty. Start adding products!</p>
          </div>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className="group bg-white border border-[#ede4d5] p-4 rounded-2xl hover:border-[#cfc4b2] transition-all flex items-center gap-5 shadow-sm"
            >
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#faf7f2] shrink-0 border border-[#ede4d5]">
                <img
                  src={product.imageUrl || product.image_url || 'https://placehold.co/400x400/1e293b/10b981?text=No+Image'}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  alt={product.name}
                />
              </div>

              <div className="flex-grow">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-serif font-bold text-base text-[#1c1917] flex items-center gap-2">
                    {product.name}
                    {product.is_verified ? (
                      <span className="text-[10px] bg-[#2f4739]/10 text-[#2f4739] px-2 py-0.5 rounded-full border border-[#2f4739]/20 font-semibold uppercase tracking-wider">Verified</span>
                    ) : (
                      <span className="text-[10px] bg-[#f7f4ee] text-[#8d6b4f] px-2 py-0.5 rounded-full border border-[#ede4d5] font-semibold uppercase tracking-wider">Pending</span>
                    )}
                  </h3>
                  <span className="text-sm font-bold text-[#2f4739]">Rs. {product.price}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-[#66615b] font-medium">
                  <span>{product.category || 'Uncategorized'}</span>
                  <span>•</span>
                  <span>{product.numberOfItem ?? product.number_of_item} in stock</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Link
                  href={`/products/${product.id}`}
                  className="p-2.5 bg-[#f7f4ee] hover:bg-[#ede4d5]/60 text-[#1c1917] rounded-xl transition border border-[#ede4d5]"
                  title="View product"
                >
                  <ExternalLink className="w-4 h-4 text-[#66615b]" />
                </Link>
                <button
                  onClick={() => onDelete(product.id)}
                  className="p-2.5 bg-[#a74338]/10 hover:bg-[#a74338]/20 text-[#a74338] rounded-xl transition"
                  title="Delete product"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default InventoryList;
