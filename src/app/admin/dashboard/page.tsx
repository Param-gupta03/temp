"use client";

import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '@/context/AppContext';
import { ShieldCheck, CheckCircle, XCircle, Edit3, Save, X, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const AdminDashboardPage = () => {
  const { role, fetchProducts, verifyProduct, updateProduct, deleteSellerProduct, showMessage } = useContext(AppContext);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [adminPrices, setAdminPrices] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  // Edit modal state
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [editForm, setEditForm] = useState({
    name: '',
    category: '',
    description: '',
    material_used: '',
    weight: '',
    imageUrl: '',
    price: '',
    admin_price: '',
    numberOfItem: '',
  });

  const loadProducts = async () => {
    setLoading(true);
    const { data } = await fetchProducts({ all: true });
    setProducts(data || []);
    setLoading(false);
  };

  useEffect(() => {
    if (role === 'admin') {
      loadProducts();
    } else if (role !== null) {
      router.push('/admin'); // Redirect back to login if not admin
    }
  }, [role, router]);

  const handleVerify = async (product: any) => {
    const priceStr = adminPrices[product.id] || product.price;
    const adminPrice = Number(priceStr);
    
    if (adminPrice <= 0) {
      showMessage("Please set a valid admin price");
      return;
    }

    const { error } = await verifyProduct(product.id, adminPrice);
    
    if (error) {
      showMessage(error.message);
    } else {
      showMessage("Product verified and live for sale!");
      loadProducts();
    }
  };

  const handlePriceChange = (id: string, value: string) => {
    setAdminPrices(prev => ({ ...prev, [id]: value }));
  };

  const handleOpenEdit = (product: any) => {
    setEditingProduct(product);
    setEditForm({
      name: product.name || '',
      category: product.category || '',
      description: product.description || '',
      material_used: product.material_used || '',
      weight: product.weight || '',
      imageUrl: product.imageUrl || product.image_url || '',
      price: String(product.price || ''),
      admin_price: String(product.admin_price || product.price || ''),
      numberOfItem: String(product.numberOfItem || product.number_of_item || ''),
    });
  };

  const handleSaveChanges = async (verify = false) => {
    if (!editingProduct) return;

    const updatedPrice = Number(editForm.price);
    const updatedAdminPrice = Number(editForm.admin_price || editForm.price);
    
    if (updatedPrice <= 0 || updatedAdminPrice <= 0) {
      showMessage("Please set valid prices");
      return;
    }

    const updatePayload: any = {
      name: editForm.name,
      category: editForm.category,
      description: editForm.description,
      material_used: editForm.material_used,
      weight: editForm.weight,
      imageUrl: editForm.imageUrl,
      price: updatedPrice,
      admin_price: updatedAdminPrice,
      numberOfItem: Number(editForm.numberOfItem),
    };

    if (verify) {
      updatePayload.is_verified = true;
      updatePayload.price = updatedAdminPrice; // Set display price to admin set price
    }

    const { error } = await updateProduct(editingProduct.id, updatePayload);
    
    if (error) {
      showMessage(error.message);
    } else {
      showMessage(verify ? "Product approved & published!" : "Product edited successfully!");
      setEditingProduct(null);
      loadProducts();
    }
  };

  const handleDelete = async (id: string | number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const { error } = await deleteSellerProduct(id);
      if (error) {
        showMessage(error.message);
      } else {
        showMessage("Product deleted!");
        loadProducts();
      }
    }
  };

  if (role !== 'admin') {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-red-400 font-bold text-2xl animate-pulse">
        Checking access...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 text-slate-100 relative">
      <div className="mb-12">
        <h1 className="text-4xl font-black mb-2 flex items-center gap-3">
          <ShieldCheck className="text-purple-500 w-10 h-10" />
          Admin <span className="bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">Panel</span>
        </h1>
        <p className="text-slate-400 font-medium">Review, edit, and verify seller products, or adjust prices before going live.</p>
      </div>

      {loading ? (
        <div className="text-center text-slate-400 py-12">Loading products...</div>
      ) : products.length === 0 ? (
        <div className="text-center text-slate-400 py-12 bg-slate-800/20 border border-slate-700 rounded-3xl">No products found.</div>
      ) : (
        <div className="overflow-x-auto bg-slate-800/40 border border-slate-700 rounded-3xl p-6 shadow-xl backdrop-blur-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-700 text-slate-400">
                <th className="py-4 px-4 font-bold uppercase tracking-wider text-xs">Product</th>
                <th className="py-4 px-4 font-bold uppercase tracking-wider text-xs">Seller Price</th>
                <th className="py-4 px-4 font-bold uppercase tracking-wider text-xs">Material & Weight</th>
                <th className="py-4 px-4 font-bold uppercase tracking-wider text-xs">Status</th>
                <th className="py-4 px-4 font-bold uppercase tracking-wider text-xs">Admin Price</th>
                <th className="py-4 px-4 font-bold uppercase tracking-wider text-xs text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id} className="border-b border-slate-700/50 hover:bg-slate-800/50 transition">
                  <td className="py-4 px-4 flex items-center gap-4">
                    <img 
                      src={product.imageUrl || product.image_url || 'https://via.placeholder.com/50'} 
                      alt={product.name} 
                      className="w-12 h-12 rounded object-cover border border-slate-700" 
                      onError={(e: any) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/50';
                      }}
                    />
                    <div>
                      <p className="font-bold">{product.name}</p>
                      <p className="text-xs text-slate-400 font-medium">{product.category}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-bold">Rs. {product.price}</td>
                  <td className="py-4 px-4 text-xs font-semibold text-slate-300">
                    <p>Mat: <span className="text-slate-400">{product.material_used || 'N/A'}</span></p>
                    <p>Wt: <span className="text-slate-400">{product.weight || 'N/A'}</span></p>
                  </td>
                  <td className="py-4 px-4">
                    {product.is_verified ? (
                      <span className="inline-flex items-center gap-1 bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs font-black border border-green-500/20"><CheckCircle className="w-3.5 h-3.5"/> Verified</span>
                    ) : (
                      <span className="inline-flex items-center gap-1 bg-yellow-500/10 text-yellow-400 px-3 py-1 rounded-full text-xs font-black border border-yellow-500/20"><XCircle className="w-3.5 h-3.5"/> Pending</span>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    {product.is_verified ? (
                      <span className="font-bold text-green-400">Rs. {product.admin_price || product.price}</span>
                    ) : (
                      <input 
                        type="number"
                        className="w-24 bg-slate-900 border border-slate-700 p-2 rounded focus:ring-2 focus:ring-purple-500 outline-none text-sm"
                        placeholder={String(product.price)}
                        value={adminPrices[product.id] ?? ''}
                        onChange={(e) => handlePriceChange(product.id, e.target.value)}
                      />
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => handleOpenEdit(product)}
                        className="bg-slate-700 hover:bg-slate-600 text-slate-200 p-2 rounded-xl text-sm font-bold transition flex items-center gap-1.5 border border-slate-600"
                        title="Edit details"
                      >
                        <Edit3 className="w-4 h-4" />
                        Edit
                      </button>

                      {!product.is_verified ? (
                        <button 
                          onClick={() => handleVerify(product)}
                          className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-xl text-sm font-bold transition shadow-lg flex items-center gap-1"
                        >
                          Verify
                        </button>
                      ) : (
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="bg-red-500/10 hover:bg-red-500/20 text-red-400 p-2 rounded-xl transition"
                          title="Remove product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit/Verification Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-[2.5rem] max-w-2xl w-full p-8 shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setEditingProduct(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-2xl font-black mb-2 flex items-center gap-2">
              <Edit3 className="text-purple-500 w-6 h-6" /> 
              Review & Edit Product
            </h3>
            <p className="text-sm text-slate-400 mb-8 font-medium">Modify this product's listing before approving it to go live for buyers.</p>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Product Name</label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 p-3 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-sm text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Category</label>
                  <input
                    type="text"
                    value={editForm.category}
                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 p-3 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-sm text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Material Used</label>
                  <input
                    type="text"
                    value={editForm.material_used}
                    onChange={(e) => setEditForm({ ...editForm, material_used: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 p-3 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-sm text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Weight</label>
                  <input
                    type="text"
                    value={editForm.weight}
                    onChange={(e) => setEditForm({ ...editForm, weight: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 p-3 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-sm text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Seller Price (Rs.)</label>
                  <input
                    type="number"
                    value={editForm.price}
                    onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 p-3 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-sm text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-purple-400 uppercase tracking-wide">Admin Price (Rs.)</label>
                  <input
                    type="number"
                    value={editForm.admin_price}
                    onChange={(e) => setEditForm({ ...editForm, admin_price: e.target.value })}
                    className="w-full bg-slate-950 border border-purple-500/50 p-3 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-sm text-white font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Stock Count</label>
                  <input
                    type="number"
                    value={editForm.numberOfItem}
                    onChange={(e) => setEditForm({ ...editForm, numberOfItem: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 p-3 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-sm text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Image URL</label>
                <input
                  type="url"
                  value={editForm.imageUrl}
                  onChange={(e) => setEditForm({ ...editForm, imageUrl: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 p-3 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-sm text-white"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Description</label>
                <textarea
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 p-3 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none text-sm text-white h-24 resize-none"
                />
              </div>

              <div className="pt-4 flex gap-4">
                <button
                  onClick={() => handleSaveChanges(false)}
                  className="flex-1 bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-200 py-4 rounded-2xl font-bold transition flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Save Changes
                </button>
                <button
                  onClick={() => handleSaveChanges(true)}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-4 rounded-2xl font-black shadow-lg transition flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  Approve & Launch
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardPage;
