import React, { useContext, useEffect, useState } from 'react';
import ProductList from '../components/ProductList';
import CategoryCard from '../components/CategoryCard';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const {
    supabase,
    showMessage,
    setSelectedProduct
  } = useContext(AppContext);

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH FEATURED PRODUCTS
  useEffect(() => {
    const fetchProducts = async () => {
      console.log("🔥 Fetching homepage products...");

      const { data, error } = await supabase
        .from('products')
        .select('*')
        .limit(4); // 👈 sirf featured ke liye 4 items

      console.log("HOME DATA:", data);
      console.log("HOME ERROR:", error);

      if (error) {
        console.error(error);
      } else {
        setProducts(data || []);
      }

      setLoading(false);
    };

    fetchProducts();
  }, [supabase]);

  const handleCategoryClick = () => {
    showMessage('Products in this category will be added soon!');
  };

  const goToPage = (page) => {
    navigate(`/${page}`);
  };

  return (
    <section className="py-4">

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-teal-700 text-white py-16 md:py-24 flex items-center justify-center min-h-[50vh] rounded-2xl shadow-xl mb-12">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
            Your Eco-Friendly Marketplace
          </h1>

          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto opacity-90">
            Discover sustainable products that make a difference.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => goToPage('products')}
              className="bg-white text-green-700 py-4 px-10 rounded-full"
            >
              Shop Now
            </button>

            <button
              onClick={() => goToPage('about')}
              className="border-2 border-white py-4 px-10 rounded-full hover:bg-white hover:text-green-700"
            >
              Our Mission
            </button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="text-center mb-20">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          Shop by Category
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 px-2 mt-6">
          <CategoryCard name="Apparel" icon="👕" onClick={handleCategoryClick} />
          <CategoryCard name="Home & Living" icon="🏡" onClick={handleCategoryClick} />
          <CategoryCard name="Beauty & Wellness" icon="🧴" onClick={handleCategoryClick} />
          <CategoryCard name="Electronics" icon="🔋" onClick={handleCategoryClick} />
        </div>
      </div>

      {/* Featured Products */}
      <div className="text-center bg-gray-100 -mx-4 px-4 py-16 rounded-3xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          Featured Eco Products
        </h2>

        <p className="text-gray-600 mb-10">
          Handpicked essentials for a sustainable lifestyle
        </p>

        {loading ? (
          <p>Loading products...</p>
        ) : products.length === 0 ? (
          <p>No products available yet 👀</p>
        ) : (
          <ProductList
            products={products}
            setSelectedProduct={setSelectedProduct}
            targetPage="products"
          />
        )}

        <button
          onClick={() => goToPage('products')}
          className="mt-12 bg-green-600 text-white py-4 px-10 rounded-full"
        >
          View All Products
        </button>
      </div>

    </section>
  );
};

export default HomePage;