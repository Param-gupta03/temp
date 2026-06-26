"use client";

import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AppContext } from '@/context/AppContext';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import AddProductForm from '@/components/dashboard/AddProductForm';
import InventoryList from '@/components/dashboard/InventoryList';
import { apiUrl } from '@/config/api';

const SellerDashboard = () => {
  const {
    addSellerProduct,
    deleteSellerProduct,
    fetchProducts,
    user,
    role,
    showMessage,
  }: any = useContext(AppContext);
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
    material_used: '',
    weight: '',
  });

  const walletBalance = user?.user_metadata?.wallet || 0;

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

  const handleUpload = () => {
    // Placeholder for future Cloudinary integration
    // For now, users can paste URLs or use the placeholder option
  };

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
      material_used: form.material_used,
      weight: form.weight,
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
      material_used: '',
      weight: '',
    });
    loadProducts();
  };

  const handleDelete = async (id: string | number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const { error } = await deleteSellerProduct(id);
      if (error) {
        showMessage(error.message);
        return;
      }
      showMessage('Product deleted');
      loadProducts();
    }
  };

  if (!canAccessDashboard) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-red-400 font-bold text-2xl animate-pulse">
        Access Denied - Authorized Sellers Only
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 text-slate-100">
      <DashboardHeader productCount={products.length} walletBalance={walletBalance} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <AddProductForm 
          form={form} 
          setForm={setForm} 
          handleUpload={handleUpload} 
          handleAddProduct={handleAddProduct} 
        />

        <InventoryList 
          products={products} 
          onDelete={handleDelete} 
        />
      </div>
    </div>
  );
};

export default SellerDashboard;
