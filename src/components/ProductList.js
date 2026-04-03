import React from 'react';

import ProductCard from './ProductCard';

const ProductList = ({ products, generateProductImage }) => {
  if (!products || products.length === 0) {
    return <p className="text-center text-gray-500">No products available</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          generateProductImage={generateProductImage}
        />
      ))}
    </div>
  );
};

export default ProductList;
