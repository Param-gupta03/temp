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
    <div className="lg:col-span-2 space-y-6">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Package className="text-emerald-500 w-6 h-6" /> Your Products
        </h2>
        <span className="text-sm text-slate-500 font-medium">
          {products.length} Items listed
        </span>
      </div>

      <div className="space-y-4">
        {products.length === 0 ? (
          <div className="bg-slate-800/20 border border-slate-700/50 rounded-3xl p-12 text-center">
            <Package className="w-12 h-12 text-slate-700 mx-auto mb-4" />
            <p className="text-slate-500 font-medium">Your inventory is empty. Start adding products!</p>
          </div>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className="group bg-slate-800/30 border border-slate-700 p-4 rounded-[2rem] hover:border-slate-500 transition-all flex items-center gap-6"
            >
              <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-900 shrink-0">
                <img
                  src={product.imageUrl || product.image_url || 'https://placehold.co/400x400/1e293b/10b981?text=No+Image'}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  alt={product.name}
                />
              </div>

              <div className="flex-grow">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-lg text-white flex items-center gap-2">
                    {product.name}
                    {product.is_verified ? (
                      <span className="text-[10px] bg-green-500/10 text-green-400 px-2 py-0.5 rounded-full border border-green-500/20 font-black uppercase tracking-wider">Verified</span>
                    ) : (
                      <span className="text-[10px] bg-yellow-500/10 text-yellow-400 px-2 py-0.5 rounded-full border border-yellow-500/20 font-black uppercase tracking-wider">Pending Verification</span>
                    )}
                  </h3>
                  <span className="text-sm font-black text-green-400">Rs. {product.price}</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-500 font-bold uppercase tracking-widest">
                  <span>{product.category || 'Uncategorized'}</span>
                  <span>•</span>
                  <span>{product.numberOfItem ?? product.number_of_item} in stock</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Link
                  href={`/products/${product.id}`}
                  className="p-3 bg-slate-700/50 hover:bg-slate-700 text-slate-300 rounded-xl transition"
                >
                  <ExternalLink className="w-5 h-5" />
                </Link>
                <button
                  onClick={() => onDelete(product.id)}
                  className="p-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition"
                >
                  <Trash2 className="w-5 h-5" />
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
