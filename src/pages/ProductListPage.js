import React, { useContext, useEffect, useState } from 'react';
import { Mail, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import ProductList from '../components/ProductList';
import { AppContext } from '../context/AppContext';

const ProductListPage = () => {
  const navigate = useNavigate();
  const { fetchProducts } = useContext(AppContext);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      const { data } = await fetchProducts();
      setProducts(data || []);
      setLoading(false);
    };

    loadProducts();
  }, [fetchProducts]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <p className="text-lg font-semibold animate-pulse">Loading products...</p>
      </div>
    );
  }
   

  return (
    <section className="py-12 px-4 md:px-8 bg-gray-50 min-h-screen">
      {/* {products.length === 0 ? ( jb launch hoga to bss isko camment se httna h baki sub same rhaga  */
        1 ? ( //ya wla line jb tk product use nhi krna h tb tk hi use hoga 
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
            Products Coming Soon!
          </h2>

          <p className="text-gray-600 text-lg mb-10 leading-relaxed">
            We are building a curated collection of eco-friendly products just for you.
            Stay tuned because something great is on the way.
          </p>

          <div className="bg-gradient-to-br from-green-100 to-green-50 p-8 rounded-xl border border-green-200 shadow-md">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Become a Partner
            </h3>

            <p className="text-gray-600 mb-6">
              Join Green Turtle and showcase your sustainable products to conscious buyers.
            </p>

            <button
              onClick={() => navigate('/partner')}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition transform hover:scale-105 mb-6"
            >
              Partner With Us
            </button>

            <div className="space-y-3 text-gray-700 text-sm">
              <p className="flex items-center justify-center gap-2">
                <Mail className="w-4 h-4 text-green-600" />
                greenturtle.marketplace@gmail.com
              </p>

              <p className="flex items-center justify-center gap-2">
                <Phone className="w-4 h-4 text-green-600" />
                +91 9254579730
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Our Products</h2>
          <ProductList products={products} />
        </div>
      )}
    </section>
  );
};

export default ProductListPage;
