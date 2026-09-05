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
    <div className="lg:col-span-2 space-y-5 text-[#111827] dark:text-[#f4f0ea]">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-2xl font-serif font-bold flex items-center gap-2">
          <Package className="text-[#2f4739] dark:text-[#489a69] w-6 h-6" /> Your Products
        </h2>
        <span className="text-sm text-[#4b5563] dark:text-[#9ca3af] font-semibold">
          {products.length} {products.length === 1 ? 'Item' : 'Items'} listed
        </span>
      </div>

      <div className="space-y-4">
        {products.length === 0 ? (
          <div className="bg-white dark:bg-[#1a241f] border border-[#ede4d5] dark:border-[#2a3d33] rounded-[2rem] p-12 text-center shadow-card">
            <Package className="w-12 h-12 text-[#cfc4b2] dark:text-[#3d5045] mx-auto mb-3" />
            <p className="text-base text-[#4b5563] dark:text-[#9ca3af] font-semibold">Your inventory is empty. Add your first sustainable product using the form!</p>
          </div>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className="group bg-white dark:bg-[#1a241f] border border-[#ede4d5] dark:border-[#2a3d33] p-5 rounded-2xl hover:border-[#2f4739] dark:hover:border-[#489a69] transition-all flex items-center gap-5 shadow-card"
            >
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#faf7f2] dark:bg-[#121815] shrink-0 border border-[#ede4d5] dark:border-[#2a3d33]">
                <img
                  src={product.imageUrl || product.image_url || 'https://placehold.co/400x400/1e293b/10b981?text=No+Image'}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  alt={product.name}
                />
              </div>

              <div className="flex-grow space-y-1">
                <div className="flex justify-between items-start gap-3">
                  <h3 className="font-serif font-bold text-lg text-[#111827] dark:text-[#f4f0ea] flex items-center gap-2">
                    {product.name}
                    {product.is_verified ? (
                      <span className="text-xs bg-[#2f4739]/10 text-[#2f4739] dark:text-[#489a69] px-2.5 py-0.5 rounded-full border border-[#2f4739]/20 font-bold uppercase tracking-wider">Verified</span>
                    ) : (
                      <span className="text-xs bg-[#f7f4ee] dark:bg-[#281e18] text-[#8d6b4f] dark:text-[#d4a373] px-2.5 py-0.5 rounded-full border border-[#ede4d5] dark:border-[#3a2c22] font-bold uppercase tracking-wider">Pending</span>
                    )}
                  </h3>
                  <span className="text-base font-bold text-[#2f4739] dark:text-[#489a69] shrink-0">Rs. {product.price}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#4b5563] dark:text-[#9ca3af] font-medium">
                  <span>{product.category || 'Uncategorized'}</span>
                  <span>•</span>
                  <span>{product.numberOfItem ?? product.number_of_item} in stock</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Link
                  href={`/products/${product.id}`}
                  className="p-3 bg-[#f7f4ee] dark:bg-[#223028] hover:bg-[#ede4d5] text-[#111827] dark:text-[#f4f0ea] rounded-xl transition border border-[#ede4d5] dark:border-[#2a3d33]"
                  title="View product"
                >
                  <ExternalLink className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => onDelete(product.id)}
                  className="p-3 bg-[#a74338]/10 hover:bg-[#a74338]/20 text-[#a74338] rounded-xl transition"
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
