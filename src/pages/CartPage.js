import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AppContext } from '../context/AppContext';

const CartPage = () => {
  const { cart, updateCartQuantity, removeFromCart, clearCart, showMessage } =
    useContext(AppContext);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <section className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

      {cart.length === 0 ? (
        <div className="space-y-4">
          <p>Your cart is empty.</p>
          <Link to="/products" className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-4 border-b pb-2 gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="h-16 w-16 rounded-lg object-cover bg-gray-100"
                />
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p>Rs. {item.price}</p>
                  <p className="text-sm text-gray-500">
                    Available: {Number(item.numberOfItem || 0)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button onClick={() => updateCartQuantity(item.id, -1)} className="px-2 py-1 border rounded">
                  -
                </button>
                {item.quantity}
                <button
                  onClick={() => updateCartQuantity(item.id, 1)}
                  className="px-2 py-1 border rounded"
                  disabled={item.quantity >= Number(item.numberOfItem || 0)}
                >
                  +
                </button>
              </div>

              <button onClick={() => removeFromCart(item.id)} className="text-red-500">
                Remove
              </button>
            </div>
          ))}

          <h3 className="text-xl font-bold mt-4">Total: Rs. {total.toFixed(2)}</h3>
          <div className="mt-6 flex gap-3">
            <button
              onClick={() => {
                clearCart();
                showMessage('Order placed successfully.');
              }}
              className="bg-green-600 text-white px-5 py-3 rounded-lg"
            >
              Checkout
            </button>
            <Link to="/products" className="border border-green-600 text-green-700 px-5 py-3 rounded-lg">
              Add More Items
            </Link>
          </div>
        </>
      )}
    </section>
  );
};

export default CartPage;
