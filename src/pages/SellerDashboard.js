import React, { useCallback, useContext, useEffect, useState } from 'react';

import { AppContext } from '../context/AppContext';

const SellerDashboard = () => {
  const {
    addSellerProduct,
    deleteSellerProduct,
    fetchProducts,
    user,
    role,
    showMessage,
  } = useContext(AppContext);
  const canAccessDashboard = role === 'seller' || role === 'admin';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    image_url: '',
    number_of_item: '',
  });

  const loadProducts = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    const { data } = await fetchProducts({ sellerId: user.id });
    setProducts(data || []);
    setLoading(false);
  }, [fetchProducts, user]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleAddProduct = async () => {
    if (!form.name || !form.price || form.number_of_item === '') {
      showMessage('Name, price, and number of items are required');
      return;
    }

    if (Number(form.number_of_item) < 0) {
      showMessage('Number of items cannot be negative');
      return;
    }

    const { error } = await addSellerProduct({
      name: form.name,
      price: form.price,
      description: form.description,
      category: form.category,
      imageUrl: form.image_url,
      numberOfItem: form.number_of_item,
    });

    if (error) {
      showMessage(error.message);
      return;
    }

    showMessage('Product added!');
    setForm({
      name: '',
      price: '',
      description: '',
      category: '',
      image_url: '',
      number_of_item: '',
    });
    loadProducts();
  };

  const handleDelete = async (id) => {
    const { error } = await deleteSellerProduct(id);
    if (error) {
      showMessage(error.message);
      return;
    }

    showMessage('Product deleted');
    loadProducts();
  };

  if (!canAccessDashboard) {
    return (
      <div className="text-center mt-20 text-xl font-semibold text-red-500">
        Access Denied
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Seller Dashboard</h1>

      <div className="bg-white p-6 rounded-2xl shadow-lg mb-10">
        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            placeholder="Product Name"
            className="border p-3 rounded-lg"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            placeholder="Price"
            type="number"
            className="border p-3 rounded-lg"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />

          <input
            placeholder="Category"
            className="border p-3 rounded-lg"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />

          <input
            placeholder="Number of Items"
            type="number"
            min="0"
            className="border p-3 rounded-lg"
            value={form.number_of_item}
            onChange={(e) => setForm({ ...form, number_of_item: e.target.value })}
          />

          <input
            placeholder="Description"
            className="border p-3 rounded-lg"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <input
            placeholder="Image URL"
            className="border p-3 rounded-lg md:col-span-2"
            value={form.image_url}
            onChange={(e) => setForm({ ...form, image_url: e.target.value })}
          />
        </div>

        <button
          onClick={handleAddProduct}
          className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
        >
          Add Product
        </button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-6">My Products</h2>

        {loading ? (
          <p>Loading...</p>
        ) : products.length === 0 ? (
          <p>No products added yet</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((p) => (
              <div key={p.id} className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
                {(p.imageUrl || p.image_url) && (
                  <img
                    src={p.imageUrl || p.image_url}
                    alt={p.name}
                    className="w-full h-40 object-cover rounded mb-3"
                  />
                )}

                <h3 className="font-bold text-lg">{p.name}</h3>
                <p className="text-green-700 font-semibold">Rs. {p.price}</p>
                <p className="text-sm text-gray-600">{p.category}</p>
                <p className="text-sm text-blue-600">
                  Items available: {Number(p.numberOfItem || 0)}
                </p>
                <p className="text-sm text-gray-500">{p.description}</p>

                <button
                  onClick={() => handleDelete(p.id)}
                  className="mt-3 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;
