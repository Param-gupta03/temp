import React, { useContext } from 'react';
import { ShoppingCart, Loader2, Image as ImageIcon } from 'lucide-react';
import { AppContext } from '../context/AppContext';

const ProductCard = ({
    product,
    setCurrentPage,
    setSelectedProduct,
    generateProductImage,
    targetPage
}) => {
    const context = useContext(AppContext) || {};
const addToCart = context.addToCart;
const isGeneratingImage = context.isGeneratingImage || false;
    const handleViewDetails = () => {
        if (setSelectedProduct) setSelectedProduct(product);
        if (setCurrentPage && targetPage) setCurrentPage(targetPage);
    };

    const handleAddToCart = () => {
        if (addToCart) {
            addToCart(product);
        } else {
            console.warn("addToCart not provided in AppContext");
        }
    };

    const handleGenerateImage = () => {
        if (generateProductImage) {
            generateProductImage(product.description || "", product.id);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 flex flex-col hover:shadow-xl transition duration-300">
            {/* Image */}
            <div className="relative w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                <img
                    src={product.imageUrl || `https://placehold.co/400x300/e0f2fe/1e40af?text=${(product.name || "Product").replace(/\s/g, '+')}`}
                    alt={product.name || "Product"}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://placehold.co/400x300/e0f2fe/1e40af?text=${(product.name || "Product").replace(/\s/g, '+')}`;
                    }}
                />

                <button
                    onClick={handleGenerateImage}
                    className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md text-gray-600 hover:text-green-600 hover:bg-gray-100 transition duration-300"
                    title="Generate Image with AI"
                    disabled={!generateProductImage || isGeneratingImage}
                >
                    {isGeneratingImage ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <ImageIcon className="w-5 h-5" />
                    )}
                </button>
            </div>

            {/* Content */}
            <div className="p-5 flex-grow flex flex-col">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {product.name || "Unnamed Product"}
                </h3>

                <p className="text-sm text-gray-600 mb-3 flex-grow">
                    {(product.description || "").substring(0, 80)}...
                </p>

                <div className="flex justify-between items-center mb-4 mt-auto">
                    <span className="text-2xl font-bold text-green-700">
                        ₹{Number(product.price || 0).toFixed(2)}
                    </span>

                    {product.category && (
                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                            {product.category}
                        </span>
                    )}
                </div>

                <div className="flex space-x-3">
                    <button
                        onClick={handleViewDetails}
                        className="flex-1 bg-green-100 text-green-700 font-semibold py-2 rounded-lg hover:bg-green-200 transition duration-300 shadow-sm"
                    >
                        View Details
                    </button>

                    <button
                        onClick={handleAddToCart}
                        className="flex-1 bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition duration-300 shadow-md flex items-center justify-center gap-1"
                        disabled={!addToCart}
                    >
                        <ShoppingCart className="w-4 h-4" /> Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;