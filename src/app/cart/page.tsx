"use client";

import React, { useContext } from 'react';
import Link from 'next/link';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Coins } from 'lucide-react';

import { AppContext } from '@/context/AppContext';

const CartPage = () => {
  const {
    user,
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    showMessage,
    awardEcoCoins,
    spendEcoCoins,
    creditSellerWallet,
    updateProductStock,
  }: any = useContext(AppContext) || {};

  const [useCoins, setUseCoins] = React.useState(false);

  const total = cart?.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0) || 0;
  const userCoins = user?.user_metadata?.eco_coins || 0;
  const coinsToUse = useCoins ? Math.min(userCoins, Math.floor(total)) : 0;
  const discount = coinsToUse; // 1 coin = Rs. 1
  const finalTotal = Math.max(0, total - discount);
  const coinsToEarn = Math.floor(finalTotal / 100); // 1 coin per 100 Rs of net cash paid

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 text-[#111827] dark:text-[#f4f0ea] space-y-8">
      <div className="flex items-center gap-4">
        <div className="bg-[#e8ede9] dark:bg-[#223028] p-3 rounded-2xl text-[#2f4739] dark:text-[#489a69]">
          <ShoppingBag className="w-7 h-7" />
        </div>
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold">
            Your Shopping <span className="text-[#2f4739] dark:text-[#489a69] italic font-serif">Cart</span>
          </h1>
          <p className="text-sm text-[#4b5563] dark:text-[#9ca3af]">
            {cart?.length || 0} {cart?.length === 1 ? 'verified item' : 'verified items'} selected
          </p>
        </div>
      </div>

      {!cart || cart.length === 0 ? (
        <div className="bg-white dark:bg-[#1a241f] border border-[#e7e0d5] dark:border-[#2a3d33] rounded-[2.5rem] p-12 md:p-16 text-center shadow-card space-y-6">
          <div className="w-20 h-20 bg-[#f7f4ee] dark:bg-[#223028] rounded-3xl flex items-center justify-center mx-auto text-[#8d6b4f] dark:text-[#d4a373]">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold">
            Your cart is feeling a bit lonely
          </h2>
          <p className="text-[#4b5563] dark:text-[#9ca3af] text-base md:text-lg max-w-md mx-auto font-normal">
            Discover handpicked essentials that care for the planet while elevating your daily lifestyle.
          </p>
          <div className="pt-2">
            <Link 
              href="/products" 
              className="inline-flex items-center gap-2 bg-[#2f4739] hover:bg-[#23372c] dark:bg-[#346244] dark:hover:bg-[#3e7552] text-[#faf7f2] px-8 py-4 rounded-full font-semibold transition shadow-soft text-base active:scale-95"
            >
              Explore Verified Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Cart Item list */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item: any) => (
              <div
                key={item.id}
                className="bg-white dark:bg-[#1a241f] border border-[#e7e0d5] dark:border-[#2a3d33] p-5 rounded-3xl flex items-center gap-5 shadow-card hover:border-[#2f4739] dark:hover:border-[#489a69] transition"
              >
                <div className="h-24 w-24 rounded-2xl overflow-hidden bg-[#f3ede2] dark:bg-[#121815] border border-[#e7e0d5] dark:border-[#2a3d33] shrink-0">
                  <img
                    src={item.imageUrl || item.image_url}
                    alt={item.name}
                    className="h-full w-full object-cover transition duration-300 hover:scale-105"
                  />
                </div>
                
                <div className="flex-grow space-y-1">
                  <h3 className="font-serif text-lg font-bold text-[#111827] dark:text-[#f4f0ea]">
                    {item.name}
                  </h3>
                  <p className="text-[#2f4739] dark:text-[#489a69] font-bold text-base">
                    Rs. {item.price}
                  </p>
                  <p className="text-xs text-[#6b7280] dark:text-[#9ca3af] font-medium">
                    Available stock: {Number(item.numberOfItem || 0)}
                  </p>
                </div>

                <div className="flex flex-col items-end justify-between self-stretch py-1">
                  <button 
                    onClick={() => removeFromCart(item.id)} 
                    className="p-2 text-[#9ca3af] hover:text-[#a74338] transition"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-3 bg-[#f7f4ee] dark:bg-[#121815] border border-[#ede4d5] dark:border-[#2a3d33] p-1.5 rounded-full">
                    <button 
                      onClick={() => updateCartQuantity(item.id, -1)} 
                      className="p-1 text-[#4b5563] dark:text-[#9ca3af] hover:text-[#111827] dark:hover:text-[#f4f0ea] transition disabled:opacity-30"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-bold text-sm w-5 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateCartQuantity(item.id, 1)} 
                      className="p-1 text-[#4b5563] dark:text-[#9ca3af] hover:text-[#111827] dark:hover:text-[#f4f0ea] transition disabled:opacity-30"
                      disabled={item.quantity >= Number(item.numberOfItem || 0)}
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-[#1a241f] border border-[#e7e0d5] dark:border-[#2a3d33] p-7 rounded-[2rem] sticky top-28 shadow-card space-y-6">
              <h3 className="font-serif text-2xl font-bold">Order Summary</h3>
              
              <div className="space-y-4 text-base">
                <div className="flex justify-between text-[#4b5563] dark:text-[#9ca3af]">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#111827] dark:text-[#f4f0ea]">Rs. {total.toFixed(2)}</span>
                </div>

                {userCoins > 0 && (
                  <div className="flex items-center justify-between bg-[#f7f4ee] dark:bg-[#161f1a] p-3.5 rounded-2xl border border-[#ede4d5] dark:border-[#2a3d33]">
                    <label className="flex items-center gap-2.5 cursor-pointer text-xs font-bold select-none">
                      <input 
                        type="checkbox" 
                        checked={useCoins} 
                        onChange={(e) => setUseCoins(e.target.checked)} 
                        className="rounded border-[#cfc4b2] text-[#2f4739] w-4 h-4 accent-[#2f4739]"
                      />
                      Use Eco-Coins ({userCoins} available)
                    </label>
                    {useCoins && <span className="text-[#2f4739] dark:text-[#489a69] font-bold text-xs">- Rs. {coinsToUse}</span>}
                  </div>
                )}

                {discount > 0 && (
                  <div className="flex justify-between text-[#2f4739] dark:text-[#489a69] font-semibold text-sm">
                    <span>Discount (Eco-Coins)</span>
                    <span>- Rs. {discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#4b5563] dark:text-[#9ca3af]">
                  <span>Shipping</span>
                  <span className="text-[#2f4739] dark:text-[#489a69] font-bold text-xs uppercase bg-[#e8ede9] dark:bg-[#203026] px-2.5 py-0.5 rounded-full">
                    Free
                  </span>
                </div>

                <div className="h-px bg-[#e7e0d5] dark:bg-[#2a3d33]"></div>

                <div className="flex justify-between items-end">
                  <span className="font-bold text-lg">Total Amount</span>
                  <span className="font-serif text-3xl font-bold text-[#2f4739] dark:text-[#489a69]">
                    Rs. {finalTotal.toFixed(2)}
                  </span>
                </div>

                {user && (
                  <div className="bg-[#e8ede9] dark:bg-[#16251d] p-3.5 rounded-2xl border border-[#d2dfd5] dark:border-[#2f4739]/30 text-center">
                    <p className="text-xs font-bold text-[#2f4739] dark:text-[#489a69] flex items-center justify-center gap-1.5">
                      <Coins className="w-4 h-4" /> You will earn {coinsToEarn} Eco-Coins on this order!
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-3 pt-2">
                <button
                  onClick={async () => {
                    if (user && coinsToUse > 0) {
                      await spendEcoCoins(user.id, coinsToUse);
                    }
                    if (user && coinsToEarn > 0) {
                      await awardEcoCoins(user.id, coinsToEarn);
                    }
                    for (const item of cart) {
                      const sellerId = item.seller_id || 'local-seller';
                      const itemTotal = item.price * item.quantity;
                      await creditSellerWallet(sellerId, itemTotal);
                      await updateProductStock(item.id, item.quantity);
                    }

                    clearCart();
                    showMessage?.('Order placed successfully. Thank you for choosing sustainable!');
                  }}
                  className="w-full bg-[#2f4739] hover:bg-[#23372c] dark:bg-[#346244] dark:hover:bg-[#3e7552] text-[#faf7f2] py-4 rounded-full font-semibold shadow-soft transition active:scale-95 flex items-center justify-center gap-2 text-base"
                >
                  Confirm Checkout <ArrowRight className="w-4 h-4" />
                </button>

                <Link 
                  href="/products" 
                  className="w-full block text-center border border-[#cfc4b2] dark:border-[#354a3e] text-[#111827] dark:text-[#f4f0ea] py-3.5 rounded-full font-semibold hover:border-[#2f4739] dark:hover:border-[#489a69] transition text-sm shadow-xs"
                >
                  Add More Items
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
