import React, { useContext, useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import PartnerPage from './PartnerPage'

import { AppContext } from '../context/AppContext';

const ProductDetail = () => {
  const { productId } = useParams();
  const { addToCart, getProductById } = useContext(AppContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      const foundProduct = await getProductById(productId);
      setProduct(foundProduct);
      setLoading(false);
    };

    loadProduct();
  }, [getProductById, productId]);

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
          to="/products"
          className="inline-flex items-center rounded-lg bg-green-600 px-5 py-3 font-semibold text-white"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <section className="py-8 bg-white rounded-lg shadow-lg p-6 md:p-10">
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
        <div className="md:w-1/2 flex justify-center items-center bg-gray-100 rounded-lg overflow-hidden shadow-md">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-auto max-h-96 object-contain rounded-lg"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://placehold.co/600x400/e0f2fe/1e40af?text=${product.name.replace(/\s/g, '+')}`;
            }}
          />
        </div>
        <div className="md:w-1/2">
          <p className="inline-flex rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
            {product.category}
          </p>
          <h1 className="text-4xl font-bold text-gray-900 mt-4 mb-4">{product.name}</h1>
          <p className="text-green-700 text-3xl font-semibold mb-6">
            Rs. {Number(product.price).toFixed(2)}
          </p>
          <p className="text-base font-medium text-blue-700 mb-4">
            Available items: {Number(product.numberOfItem || 0)}
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">{product.description}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => addToCart(product)}
              className="w-full md:w-auto bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 transition duration-300 shadow-md flex items-center justify-center gap-2"
              disabled={Number(product.numberOfItem || 0) <= 0}
            >
              <ShoppingCart className="w-5 h-5" />
              {Number(product.numberOfItem || 0) <= 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
            <Link
              to="/cart"
              className="w-full md:w-auto border border-green-600 text-green-700 font-bold py-3 px-8 rounded-lg text-center"
            >
              Go to Cart
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
