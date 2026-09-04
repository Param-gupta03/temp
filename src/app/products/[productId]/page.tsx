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
    return <div className="text-center py-16 text-sm font-medium text-[#78716c]">Loading product...</div>;
  }

  if (!product) {
    return (
      <div className="text-center py-16">
        <p className="text-base text-[#78716c] mb-4">
          Product not found. It may have been removed.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center rounded-full bg-[#2f4739] px-6 py-2.5 text-sm font-semibold text-[#faf7f2] hover:bg-[#23372c] transition"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <section className="max-w-6xl mx-auto py-10 px-4 md:px-6">
      <div className="bg-white border border-[#e7e0d5] rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(47,71,57,0.06)]">
        <div className="flex flex-col lg:flex-row items-stretch">
          <div className="lg:w-1/2 bg-[#f3ede2] flex items-center justify-center p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-[#e7e0d5]">
            <div className="relative group w-full">
              <img
                src={product.imageUrl || product.image_url}
                alt={product.name}
                className="w-full h-auto max-h-[460px] object-contain rounded-2xl transition-transform duration-500 group-hover:scale-105"
                onError={(e: any) => {
                  e.target.onerror = null;
                  e.target.src = `https://placehold.co/600x600/f3ede2/2f4739?text=${product.name.replace(/\s/g, '+')}`;
                }}
              />
            </div>
          </div>
          
          <div className="lg:w-1/2 p-8 md:p-12 flex flex-col">
            <div className="mb-6">
              <span className="inline-flex items-center rounded-full bg-[#e8ede9] px-3.5 py-1 text-xs font-semibold text-[#2f4739] border border-[#d2dfd5]">
                {product.category || 'Sustainable'}
              </span>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#1c1917] mt-4 mb-3 leading-tight">{product.name}</h1>
              <div className="flex items-end gap-3 mb-6">
                <p className="text-3xl font-bold text-[#2f4739]">
                  Rs. {Number(product.price)}
                </p>
                <p className="text-xs text-[#8a847c] mb-1.5">Incl. all taxes</p>
              </div>
            </div>

            <div className="space-y-6 flex-grow">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div className="p-3.5 bg-[#f7f4ee] rounded-2xl border border-[#ede4d5]">
                  <p className="text-xs text-[#8a847c] mb-1 font-medium">Availability</p>
                  <div className="text-sm font-bold text-[#1c1917] flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${Number(product.numberOfItem || 0) > 0 ? 'bg-[#2f4739]' : 'bg-[#a74338]'}`}></div>
                    {Number(product.numberOfItem || 0) > 0 ? `${product.numberOfItem} units` : 'Out of stock'}
                  </div>
                </div>
                
                <div className="p-3.5 bg-[#f7f4ee] rounded-2xl border border-[#ede4d5]">
                  <p className="text-xs text-[#8a847c] mb-1 font-medium">Material</p>
                  <div className="text-sm font-bold text-[#1c1917] line-clamp-1">
                    {product.material_used || 'Sustainable'}
                  </div>
                </div>

                <div className="p-3.5 bg-[#f7f4ee] rounded-2xl border border-[#ede4d5]">
                  <p className="text-xs text-[#8a847c] mb-1 font-medium">Weight</p>
                  <div className="text-sm font-bold text-[#1c1917] line-clamp-1">
                    {product.weight || 'N/A'}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-[#8d6b4f] uppercase tracking-wider mb-2">Description</h3>
                <p className="text-sm text-[#57534e] leading-relaxed font-normal">
                  {product.description || 'No detailed description provided for this item.'}
                </p>
              </div>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-3.5">
              <button
                onClick={() => addToCart(product)}
                className="flex-[2] bg-[#2f4739] hover:bg-[#23372c] text-[#faf7f2] font-semibold py-3.5 px-7 rounded-full shadow-sm transition active:scale-95 flex items-center justify-center gap-2 text-sm disabled:opacity-40"
                disabled={Number(product.numberOfItem || 0) <= 0}
              >
                <ShoppingCart className="w-4 h-4" />
                {Number(product.numberOfItem || 0) <= 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
              
              <Link
                href="/cart"
                className="flex-1 bg-white border border-[#cfc4b2] text-[#1c1917] font-semibold py-3.5 px-7 rounded-full text-center hover:border-[#2f4739] hover:bg-[#fcfaf7] transition active:scale-95 flex items-center justify-center text-sm shadow-sm"
              >
                Go to Cart
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Carbon LCA Assessment Panel */}
      <div className="mt-10 bg-white border border-[#e7e0d5] rounded-3xl p-7 md:p-10 shadow-[0_8px_30px_rgba(47,71,57,0.05)] relative overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-5 border-b border-[#e7e0d5]">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e8ede9] px-3 py-1 text-xs font-semibold text-[#2f4739] border border-[#d2dfd5] mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2f4739]"></span>
              AI-Powered LCA
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1c1917]">
              Lifecycle <span className="text-[#2f4739] italic font-serif">Carbon Footprint</span>
            </h2>
          </div>
          <div className="text-[#78716c] text-xs font-normal">
            Analyzed from raw manufacturing to final disposal.
          </div>
        </div>

        {lcaLoading ? (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <div className="w-10 h-10 border-3 border-[#e8ede9] border-t-[#2f4739] rounded-full animate-spin"></div>
            <p className="text-[#78716c] font-medium text-xs">Running Environmental Life Cycle Assessment...</p>
          </div>
        ) : lca ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
            
            {/* Left Column: Big metrics and comparison bar */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-5">
              <div className="bg-[#f7f4ee] p-6 rounded-2xl border border-[#ede4d5] text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 bg-[#2f4739] text-[#faf7f2] text-[10px] font-bold px-3 py-1 rounded-br-xl">
                  CO2e SAVED
                </div>
                <p className="font-serif text-4xl md:text-5xl font-bold text-[#2f4739] mt-3 mb-1">
                  -{lca.reductionPercentage}%
                </p>
                <p className="text-[#66615b] font-medium text-xs">
                  {lca.reductionAmount} kg CO2e saved per unit
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-end text-xs font-bold uppercase text-[#66615b] tracking-wider mb-1.5">
                    <span className="flex flex-col">
                      <span className="text-[#2f4739]">{lca.ecoProductName || product.name || 'This Eco Product'}</span>
                      <span className="text-[10px] text-[#8a847c] normal-case">Material: {product.material_used || 'Sustainable'}</span>
                    </span>
                    <span className="text-[#2f4739] font-bold">{lca.ecoProductFootprint} kg</span>
                  </div>
                  <div className="w-full bg-[#ede4d5] rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-[#2f4739] h-full rounded-full transition-all duration-1000"
                      style={{ width: `${Math.max(10, Math.min(100, (lca.ecoProductFootprint / lca.normalProductFootprint) * 100))}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-end text-xs font-bold uppercase text-[#66615b] tracking-wider mb-1.5">
                    <span className="flex flex-col">
                      <span className="text-[#a74338]">{lca.normalProductName || 'Conventional Alternative'}</span>
                      <span className="text-[10px] text-[#8a847c] normal-case">Material: {lca.normalProductMaterial || 'Standard Market Material'}</span>
                    </span>
                    <span className="text-[#a74338] font-bold">{lca.normalProductFootprint} kg</span>
                  </div>
                  <div className="w-full bg-[#ede4d5] rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-[#a74338] h-full rounded-full transition-all duration-1000"
                      style={{ width: '100%' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Stage-by-stage break down and explanation */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
              <div className="bg-[#faf7f2] p-5 rounded-2xl border border-[#e7e0d5] leading-relaxed text-[#57534e] font-normal text-xs">
                <p>{lca.explanation}</p>
              </div>

              <div className="space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#8d6b4f]">Lifecycle Stage Emissions (kg CO2e)</h4>
                
                {Object.entries(lca.stages).map(([stage, values]: any) => {
                  const ecoVal = Number(values.eco);
                  const normVal = Number(values.normal);
                  const stagePct = normVal > 0 ? Math.round(((normVal - ecoVal) / normVal) * 100) : 0;
                  
                  return (
                    <div key={stage} className="flex items-center justify-between p-3 bg-[#f7f4ee] rounded-xl border border-[#ede4d5] hover:bg-[#efe7db] transition">
                      <span className="text-xs font-semibold text-[#1c1917] capitalize">{stage}</span>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-[11px] text-[#66615b]">Eco: <span className="text-[#2f4739] font-bold">{ecoVal}</span></p>
                          <p className="text-[11px] text-[#66615b]">Normal: <span className="text-[#a74338] font-bold">{normVal}</span></p>
                        </div>
                        {stagePct > 0 && (
                          <span className="bg-[#e8ede9] text-[#2f4739] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#d2dfd5]">
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
          <div className="text-center text-[#78716c] py-6 text-sm">Could not fetch carbon footprint report.</div>
        )}
      </div>
    </section>
  );
};

export default ProductDetail;