import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const CartPage = () => {
  const { cart, updateCartQuantity, removeFromCart } = useContext(AppContext);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <section className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map((item, index) => (
            <div key={item.id} className="flex justify-between items-center mb-4 border-b pb-2">
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p>₹{item.price}</p>
              </div>

              <div className="flex items-center gap-2">
                <button onClick={() => updateCartQuantity(item.id, -1)}>-</button>
                {item.quantity}
                <button onClick={() => updateCartQuantity(item.id, 1)}>+</button>
              </div>

              <button
                onClick={() => removeFromCart(index)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}

          <h3 className="text-xl font-bold mt-4">Total: ₹{total.toFixed(2)}</h3>
        </>
      )}
    </section>
  );
};

export default CartPage;