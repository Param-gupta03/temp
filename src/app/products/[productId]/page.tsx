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
  
  // Carbon LCA states
  const [lca, setLca] = useState<any>(null);
  const [lcaLoading, setLcaLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      const foundProduct = await getProductById(productId);
      setProduct(foundProduct);
      setLoading(false);
    };

    loadProduct();
  }, [getProductById, productId]);

  useEffect(() => {
    if (!product) return;
    
    const getCarbonFootprint = async () => {
      setLcaLoading(true);
      try {
        const response = await fetch('/api/carbon-footprint', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            productId: product.id,
            name: product.name,
            category: product.category,
            description: product.description,
            materialUsed: product.material_used || 'Sustainable materials',
            weight: product.weight || '500g',
          }),
        });
        
        if (response.ok) {
          const data = await response.json();
          setLca(data);
        }
      } catch (err) {
        console.error("Failed to load LCA carbon data", err);
      } finally {
        setLcaLoading(false);
      }
    };

    getCarbonFootprint();
  }, [product]);

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
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-900/50 rounded-2xl border border-slate-700">
                  <p className="text-sm text-slate-400 mb-1 font-medium">Availability</p>
                  <div className="text-lg font-bold text-white flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${Number(product.numberOfItem || 0) > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    {Number(product.numberOfItem || 0) > 0 ? `${product.numberOfItem} units` : 'Out of stock'}
                  </div>
                </div>
                
                <div className="p-4 bg-slate-900/50 rounded-2xl border border-slate-700">
                  <p className="text-sm text-slate-400 mb-1 font-medium">Material</p>
                  <div className="text-lg font-bold text-white line-clamp-1">
                    {product.material_used || 'Sustainable'}
                  </div>
                </div>

                <div className="p-4 bg-slate-900/50 rounded-2xl border border-slate-700">
                  <p className="text-sm text-slate-400 mb-1 font-medium">Weight</p>
                  <div className="text-lg font-bold text-white line-clamp-1">
                    {product.weight || 'N/A'}
                  </div>
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

      {/* Carbon LCA Assessment Panel */}
      <div className="mt-12 bg-slate-800/40 border border-slate-700 rounded-[3rem] p-8 md:p-12 shadow-2xl backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px]"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-6 border-b border-slate-700/50">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/20 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              AI-Powered LCA
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-white">
              Lifecycle <span className="text-emerald-400">Carbon Footprint</span>
            </h2>
          </div>
          <div className="text-slate-400 text-sm font-medium">
            Analyzed from raw manufacturing to final disposal.
          </div>
        </div>

        {lcaLoading ? (
          <div className="flex flex-col items-center justify-center py-12 gap-4">
            <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
            <p className="text-slate-400 font-bold text-sm animate-pulse">Running Environmental Life Cycle Assessment...</p>
          </div>
        ) : lca ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
            
            {/* Left Column: Big metrics and comparison bar */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
              <div className="bg-slate-900/60 p-6 rounded-[2rem] border border-slate-700 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 bg-emerald-500 text-slate-900 text-xs font-black px-4 py-1.5 rounded-br-2xl">
                  CO2e SAVED
                </div>
                <p className="text-5xl font-black text-emerald-400 mt-4 mb-1">
                  -{lca.reductionPercentage}%
                </p>
                <p className="text-slate-400 font-bold text-sm">
                  {lca.reductionAmount} kg CO2e saved per unit
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-end text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">
                    <span className="flex flex-col">
                      <span className="text-emerald-400">{lca.ecoProductName || product.name || 'This Eco Product'}</span>
                      <span className="text-[10px] text-slate-500 normal-case mt-0.5">Material: {product.material_used || 'Sustainable'}</span>
                    </span>
                    <span className="text-emerald-400">{lca.ecoProductFootprint} kg</span>
                  </div>
                  <div className="w-full bg-slate-950 rounded-full h-4 overflow-hidden border border-slate-800">
                    <div 
                      className="bg-gradient-to-r from-emerald-500 to-green-400 h-full rounded-full transition-all duration-1000"
                      style={{ width: `${Math.max(10, Math.min(100, (lca.ecoProductFootprint / lca.normalProductFootprint) * 100))}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-end text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">
                    <span className="flex flex-col">
                      <span className="text-red-400">{lca.normalProductName || 'Conventional Alternative'}</span>
                      <span className="text-[10px] text-slate-500 normal-case mt-0.5">Material: {lca.normalProductMaterial || 'Standard Market Material'}</span>
                    </span>
                    <span className="text-red-400">{lca.normalProductFootprint} kg</span>
                  </div>
                  <div className="w-full bg-slate-950 rounded-full h-4 overflow-hidden border border-slate-800">
                    <div 
                      className="bg-gradient-to-r from-red-500 to-pink-500 h-full rounded-full transition-all duration-1000"
                      style={{ width: '100%' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Stage-by-stage break down and explanation */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div className="bg-slate-900/40 p-6 rounded-3xl border border-slate-700/60 leading-relaxed text-slate-300 font-medium text-sm">
                <p>{lca.explanation}</p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Lifecycle Stage Emissions (kg CO2e)</h4>
                
                {Object.entries(lca.stages).map(([stage, values]: any) => {
                  const ecoVal = Number(values.eco);
                  const normVal = Number(values.normal);
                  const stagePct = normVal > 0 ? Math.round(((normVal - ecoVal) / normVal) * 100) : 0;
                  
                  return (
                    <div key={stage} className="flex items-center justify-between p-3 bg-slate-900/30 rounded-2xl border border-slate-700/40 hover:bg-slate-900/50 transition">
                      <span className="text-sm font-bold text-slate-300 capitalize">{stage}</span>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-xs text-slate-400 font-bold">Eco: <span className="text-emerald-400 font-black">{ecoVal}</span></p>
                          <p className="text-xs text-slate-400 font-bold">Normal: <span className="text-red-400 font-black">{normVal}</span></p>
                        </div>
                        {stagePct > 0 && (
                          <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-black px-2 py-1 rounded-md border border-emerald-500/20">
                            -{stagePct}%
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        ) : (
          <div className="text-center text-slate-400 py-6">Could not fetch carbon footprint report.</div>
        )}
      </div>
    </section>
  );
};

export default ProductDetail;