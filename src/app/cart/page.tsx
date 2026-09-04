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
    <section className="max-w-4xl mx-auto py-10 px-4">
      <div className="flex items-center gap-3.5 mb-8">
        <div className="bg-[#e8ede9] p-2.5 rounded-2xl">
          <ShoppingBag className="text-[#2f4739] w-6 h-6" />
        </div>
        <h2 className="font-serif text-3xl font-bold text-[#1c1917]">Your <span className="text-[#2f4739] italic font-serif">Cart</span></h2>
      </div>

      {cart.length === 0 ? (
        <div className="bg-white border border-[#e7e0d5] rounded-3xl p-12 text-center shadow-[0_4px_24px_rgba(47,71,57,0.04)]">
          <div className="w-16 h-16 bg-[#f7f4ee] rounded-full flex items-center justify-center mx-auto mb-5 text-[#8a847c]">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <p className="text-[#66615b] text-base mb-6 font-normal">Your cart is feeling a bit lonely...</p>
          <Link 
            href="/products" 
            className="inline-flex items-center gap-2 bg-[#2f4739] hover:bg-[#23372c] text-[#faf7f2] px-7 py-3 rounded-full font-semibold transition shadow-sm text-sm"
          >
            Explore Eco Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item: any) => (
              <div key={item.id} className="bg-white border border-[#e7e0d5] p-5 rounded-2xl flex items-center gap-5 group hover:border-[#cfc4b2] transition shadow-[0_2px_10px_rgba(47,71,57,0.02)]">
                <div className="h-20 w-20 rounded-xl overflow-hidden bg-[#f3ede2] border border-[#e7e0d5] shrink-0">
                  <img
                    src={item.imageUrl || item.image_url}
                    alt={item.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                
                <div className="flex-grow">
                  <h3 className="font-serif text-base font-semibold text-[#1c1917] mb-1">{item.name}</h3>
                  <p className="text-[#2f4739] font-bold text-sm">Rs. {item.price}</p>
                  <p className="text-xs text-[#8a847c] mt-1 font-normal">
                    Stock: {Number(item.numberOfItem || 0)}
                  </p>
                </div>

                <div className="flex flex-col items-end justify-between self-stretch py-1">
                  <button 
                    onClick={() => removeFromCart(item.id)} 
                    className="p-1.5 text-[#8a847c] hover:text-[#a74338] transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-3 bg-[#f7f4ee] border border-[#ede4d5] p-1 rounded-full">
                    <button 
                      onClick={() => updateCartQuantity(item.id, -1)} 
                      className="p-1 text-[#66615b] hover:text-[#1c1917] transition disabled:opacity-30"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[#1c1917] font-semibold text-xs w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateCartQuantity(item.id, 1)}
                      className="p-1 text-[#66615b] hover:text-[#1c1917] transition disabled:opacity-30"
                      disabled={item.quantity >= Number(item.numberOfItem || 0)}
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white border border-[#e7e0d5] p-6 rounded-3xl sticky top-28 shadow-[0_8px_30px_rgba(47,71,57,0.05)]">
              <h3 className="font-serif text-xl font-bold text-[#1c1917] mb-6">Summary</h3>
              
              <div className="space-y-3.5 mb-6 text-sm">
                <div className="flex justify-between text-[#66615b] font-normal">
                  <span>Subtotal</span>
                  <span>Rs. {total.toFixed(2)}</span>
                </div>
                {userCoins > 0 && (
                  <div className="flex items-center justify-between bg-[#f7f4ee] p-3 rounded-xl border border-[#ede4d5]">
                    <label className="flex items-center gap-2.5 cursor-pointer text-xs text-[#1c1917] font-semibold select-none">
                      <input 
                        type="checkbox" 
                        checked={useCoins} 
                        onChange={(e) => setUseCoins(e.target.checked)} 
                        className="rounded border-[#cfc4b2] text-[#2f4739] focus:ring-[#2f4739] w-4 h-4 accent-[#2f4739]"
                      />
                      Use Eco Coins ({userCoins} available)
                    </label>
                    {useCoins && <span className="text-[#2f4739] font-bold text-xs">- Rs. {coinsToUse}</span>}
                  </div>
                )}
                {discount > 0 && (
                  <div className="flex justify-between text-[#2f4739] font-semibold">
                    <span>Discount (Eco Coins)</span>
                    <span>- Rs. {discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#66615b] font-normal">
                  <span>Shipping</span>
                  <span className="text-[#2f4739] font-semibold uppercase text-xs">Free</span>
                </div>
                <div className="h-px bg-[#e7e0d5] my-3"></div>
                <div className="flex justify-between items-end">
                  <span className="text-[#1c1917] font-semibold">Total Amount</span>
                  <span className="font-serif text-2xl font-bold text-[#2f4739]">Rs. {finalTotal.toFixed(2)}</span>
                </div>
                {user && (
                  <div className="bg-[#e8ede9] p-3 rounded-xl border border-[#d2dfd5] text-center">
                    <p className="text-xs font-semibold text-[#2f4739]">
                      You will earn {coinsToEarn} Eco Coins!
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-3">
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
                  className="w-full bg-[#2f4739] hover:bg-[#23372c] text-[#faf7f2] py-3.5 rounded-full font-semibold shadow-sm transition active:scale-95 flex items-center justify-center gap-2 text-sm"
                >
                  Confirm Checkout <ArrowRight className="w-4 h-4" />
                </button>
                <Link 
                  href="/products" 
                  className="w-full block text-center border border-[#cfc4b2] text-[#1c1917] py-3 rounded-full font-semibold hover:border-[#2f4739] hover:bg-[#fcfaf7] transition text-xs shadow-sm"
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
