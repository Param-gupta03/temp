"use client";

import React, { useContext } from 'react';
import Link from 'next/link';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';

import { AppContext } from '@/context/AppContext';

const CartPage = () => {
  const { user, cart, updateCartQuantity, removeFromCart, clearCart, showMessage, awardEcoCoins, spendEcoCoins, creditSellerWallet, updateProductStock }: any =
    useContext(AppContext);

  const [useCoins, setUseCoins] = React.useState(false);

  const total = cart.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);
  const userCoins = user?.user_metadata?.eco_coins || 0;
  const coinsToUse = useCoins ? Math.min(userCoins, Math.floor(total)) : 0;
  const discount = coinsToUse; // 1 coin = Rs. 1
  const finalTotal = Math.max(0, total - discount);
  const coinsToEarn = Math.floor(finalTotal / 100); // 1 coin per 100 Rs of net cash paid

  return (
    <section className="max-w-4xl mx-auto py-12 px-4">
      <div className="flex items-center gap-4 mb-10">
        <div className="bg-green-500/20 p-3 rounded-2xl">
          <ShoppingBag className="text-green-500 w-8 h-8" />
        </div>
        <h2 className="text-4xl font-black text-white">Your <span className="text-green-500">Cart</span></h2>
      </div>

      {cart.length === 0 ? (
        <div className="bg-slate-800/40 border border-slate-700 rounded-[2.5rem] p-12 text-center backdrop-blur-sm">
          <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="text-slate-600 w-10 h-10" />
          </div>
          <p className="text-slate-400 text-xl mb-8 font-medium">Your cart is feeling a bit lonely...</p>
          <Link 
            href="/products" 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-2xl font-black hover:from-green-700 hover:to-emerald-700 transition shadow-xl shadow-green-900/20"
          >
            Explore Eco Products <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item: any) => (
              <div key={item.id} className="bg-slate-800/40 border border-slate-700 p-6 rounded-3xl flex items-center gap-6 group hover:border-slate-600 transition">
                <div className="h-24 w-24 rounded-2xl overflow-hidden bg-slate-900 border border-slate-700 shrink-0">
                  <img
                    src={item.imageUrl || item.image_url}
                    alt={item.name}
                    className="h-full w-full object-cover group-hover:scale-110 transition duration-500"
                  />
                </div>
                
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-white mb-1">{item.name}</h3>
                  <p className="text-green-400 font-black">Rs. {item.price}</p>
                  <p className="text-xs text-slate-500 mt-2 font-medium">
                    Stock: {Number(item.numberOfItem || 0)}
                  </p>
                </div>

                <div className="flex flex-col items-end justify-between self-stretch py-1">
                  <button 
                    onClick={() => removeFromCart(item.id)} 
                    className="p-2 text-slate-500 hover:text-red-400 transition"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>

                  <div className="flex items-center gap-4 bg-slate-900 border border-slate-700 p-1 rounded-xl">
                    <button 
                      onClick={() => updateCartQuantity(item.id, -1)} 
                      className="p-1.5 text-slate-400 hover:text-white transition disabled:opacity-20"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-white font-bold w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateCartQuantity(item.id, 1)}
                      className="p-1.5 text-slate-400 hover:text-white transition disabled:opacity-20"
                      disabled={item.quantity >= Number(item.numberOfItem || 0)}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-slate-800 border border-slate-700 p-8 rounded-[2.5rem] sticky top-28 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-8">Summary</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-slate-400 font-medium">
                  <span>Subtotal</span>
                  <span>Rs. {total.toFixed(2)}</span>
                </div>
                {userCoins > 0 && (
                  <div className="flex items-center justify-between bg-slate-900/50 p-3 rounded-xl border border-slate-700">
                    <label className="flex items-center gap-3 cursor-pointer text-sm text-slate-300 font-bold select-none">
                      <input 
                        type="checkbox" 
                        checked={useCoins} 
                        onChange={(e) => setUseCoins(e.target.checked)} 
                        className="rounded border-slate-700 bg-slate-800 text-green-500 focus:ring-green-500 w-4 h-4"
                      />
                      Use Eco Coins ({userCoins} available)
                    </label>
                    {useCoins && <span className="text-green-400 font-black">- Rs. {coinsToUse}</span>}
                  </div>
                )}
                {discount > 0 && (
                  <div className="flex justify-between text-green-400 font-medium">
                    <span>Discount (Eco Coins)</span>
                    <span>- Rs. {discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-400 font-medium">
                  <span>Shipping</span>
                  <span className="text-green-500 font-bold uppercase text-xs">Free</span>
                </div>
                <div className="h-px bg-slate-700 my-4"></div>
                <div className="flex justify-between items-end">
                  <span className="text-white font-bold">Total Amount</span>
                  <span className="text-3xl font-black text-green-400">Rs. {finalTotal.toFixed(2)}</span>
                </div>
                {user && (
                  <div className="bg-green-500/10 p-3 rounded-xl border border-green-500/20 text-center">
                    <p className="text-sm font-bold text-green-400">
                      You will earn {coinsToEarn} Eco Coins!
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <button
                  onClick={async () => {
                    // 1. Spend eco coins if checked
                    if (user && coinsToUse > 0) {
                      await spendEcoCoins(user.id, coinsToUse);
                    }
                    // 2. Award eco coins for new purchase
                    if (user && coinsToEarn > 0) {
                      await awardEcoCoins(user.id, coinsToEarn);
                    }
                    // 3. Credit seller wallets & deduct stocks
                    for (const item of cart) {
                      const sellerId = item.seller_id || 'local-seller';
                      const itemTotal = item.price * item.quantity;
                      await creditSellerWallet(sellerId, itemTotal);
                      await updateProductStock(item.id, item.quantity);
                    }

                    clearCart();
                    showMessage('Order placed successfully. Thank you for shopping green!');
                  }}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-5 rounded-2xl font-black shadow-xl shadow-green-900/20 hover:from-green-700 hover:to-emerald-700 transition transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
                >
                  Confirm Checkout <ArrowRight className="w-5 h-5" />
                </button>
                <Link 
                  href="/products" 
                  className="w-full block text-center border border-slate-700 text-slate-300 py-4 rounded-2xl font-bold hover:bg-slate-700 transition"
                >
                  Add More Items
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CartPage;
