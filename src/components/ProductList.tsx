"use client";
import React from 'react';

import ProductCard from './ProductCard';

interface ProductListProps {
  products: any[];
  generateProductImage?: (description: string, id: string | number) => void;
}

const ProductList = ({ products, generateProductImage }: ProductListProps) => {
  if (!products || products.length === 0) {
    return <p className="text-center text-[#78716c] py-12 font-medium">No products available at the moment.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-7">
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
