import React, { useContext } from 'react';
import { ShoppingCart } from 'lucide-react';
import { AppContext } from '../context/AppContext';

const ProductDetail = ({ selectedProduct }) => {
    const { addToCart } = useContext(AppContext);

    if (!selectedProduct) {
        return (
            <div className="text-center py-10">
                <p className="text-lg text-gray-600">Product not found. Please go back to the products page.</p>
                {/* Add a button to go back to products page */}
            </div>
        );
    }

    return (
        <section className="py-8 bg-white rounded-lg shadow-lg p-6 md:p-10">
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
                <div className="md:w-1/2 flex justify-center items-center bg-gray-100 rounded-lg overflow-hidden shadow-md">
                    <img
                        src={selectedProduct.imageUrl}
                        alt={selectedProduct.name}
                        className="w-full h-auto max-h-96 object-contain rounded-lg"
                        onError={(e) => {
                            e.target.onerror = null; // Prevent infinite loop
                            e.target.src = `https://placehold.co/600x400/e0f2fe/1e40af?text=${selectedProduct.name.replace(/\s/g, '+')}`;
                        }}
                    />
                </div>
                <div className="md:w-1/2">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">{selectedProduct.name}</h1>
                    <p className="text-green-700 text-2xl font-semibold mb-6">${selectedProduct.price.toFixed(2)}</p>
                    <p className="text-lg text-gray-700 leading-relaxed mb-6">{selectedProduct.description}</p>
                    <div className="flex items-center space-x-4 mb-8">
                        <span className="text-md text-gray-600 bg-green-100 px-4 py-2 rounded-full font-medium">Category: {selectedProduct.category}</span>
                        {/* Add more product details here, e.g., ratings, stock */}
                    </div>
                    <button
                        onClick={() => addToCart(selectedProduct)}
                        className="w-full md:w-auto bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 transition duration-300 shadow-md flex items-center justify-center gap-2"
                    >
                        <ShoppingCart className="w-5 h-5" /> Add to Cart
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ProductDetail;
