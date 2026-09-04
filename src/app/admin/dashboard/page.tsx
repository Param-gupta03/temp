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
    <div className="max-w-7xl mx-auto px-4 py-12 text-[#1c1917] relative">
      <div className="mb-10 space-y-1">
        <span className="text-xs uppercase tracking-wider text-[#8d6b4f] font-semibold">Management Console</span>
        <h1 className="text-3xl md:text-4xl font-serif font-bold flex items-center gap-3 text-[#1c1917]">
          <ShieldCheck className="text-[#2f4739] w-8 h-8" />
          Admin <span className="text-[#2f4739]">Panel</span>
        </h1>
        <p className="text-xs text-[#66615b]">Review, edit, and verify seller products, or adjust prices before going live.</p>
      </div>

      {loading ? (
        <div className="text-center text-[#66615b] py-12 text-sm">Loading products...</div>
      ) : products.length === 0 ? (
        <div className="text-center text-[#66615b] py-12 bg-white border border-[#ede4d5] rounded-3xl text-sm">No products found.</div>
      ) : (
        <div className="overflow-x-auto bg-white border border-[#ede4d5] rounded-3xl p-6 shadow-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#ede4d5] text-[#66615b]">
                <th className="py-3 px-4 font-semibold uppercase tracking-wider text-xs">Product</th>
                <th className="py-3 px-4 font-semibold uppercase tracking-wider text-xs">Seller Price</th>
                <th className="py-3 px-4 font-semibold uppercase tracking-wider text-xs">Material & Weight</th>
                <th className="py-3 px-4 font-semibold uppercase tracking-wider text-xs">Status</th>
                <th className="py-3 px-4 font-semibold uppercase tracking-wider text-xs">Admin Price</th>
                <th className="py-3 px-4 font-semibold uppercase tracking-wider text-xs text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id} className="border-b border-[#ede4d5]/60 hover:bg-[#faf7f2]/60 transition">
                  <td className="py-3.5 px-4 flex items-center gap-3">
                    <img 
                      src={product.imageUrl || product.image_url || 'https://via.placeholder.com/50'} 
                      alt={product.name} 
                      className="w-12 h-12 rounded-xl object-cover border border-[#ede4d5]" 
                      onError={(e: any) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/50';
                      }}
                    />
                    <div>
                      <p className="font-serif font-bold text-sm text-[#1c1917]">{product.name}</p>
                      <p className="text-xs text-[#66615b]">{product.category}</p>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-sm text-[#1c1917]">Rs. {product.price}</td>
                  <td className="py-3.5 px-4 text-xs font-medium text-[#66615b]">
                    <p>Mat: <span className="text-[#1c1917]">{product.material_used || 'N/A'}</span></p>
                    <p>Wt: <span className="text-[#1c1917]">{product.weight || 'N/A'}</span></p>
                  </td>
                  <td className="py-3.5 px-4">
                    {product.is_verified ? (
                      <span className="inline-flex items-center gap-1 bg-[#2f4739]/10 text-[#2f4739] px-2.5 py-1 rounded-full text-xs font-semibold border border-[#2f4739]/20"><CheckCircle className="w-3.5 h-3.5"/> Verified</span>
                    ) : (
                      <span className="inline-flex items-center gap-1 bg-[#f7f4ee] text-[#8d6b4f] px-2.5 py-1 rounded-full text-xs font-semibold border border-[#ede4d5]"><XCircle className="w-3.5 h-3.5"/> Pending</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    {product.is_verified ? (
                      <span className="font-semibold text-sm text-[#2f4739]">Rs. {product.admin_price || product.price}</span>
                    ) : (
                      <input 
                        type="number"
                        className="w-24 bg-[#faf7f2] border border-[#ede4d5] p-1.5 rounded-lg focus:border-[#2f4739] focus:outline-none text-xs text-[#1c1917]"
                        placeholder={String(product.price)}
                        value={adminPrices[product.id] ?? ''}
                        onChange={(e) => handlePriceChange(product.id, e.target.value)}
                      />
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => handleOpenEdit(product)}
                        className="bg-[#f7f4ee] hover:bg-[#ede4d5]/60 text-[#1c1917] p-2 rounded-xl text-xs font-medium transition flex items-center gap-1.5 border border-[#ede4d5]"
                        title="Edit details"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-[#2f4739]" />
                        Edit
                      </button>

                      {!product.is_verified ? (
                        <button 
                          onClick={() => handleVerify(product)}
                          className="bg-[#2f4739] hover:bg-[#23372c] text-[#faf7f2] px-3.5 py-1.5 rounded-full text-xs font-semibold transition shadow-xs flex items-center gap-1"
                        >
                          Verify
                        </button>
                      ) : (
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="bg-[#a74338]/10 hover:bg-[#a74338]/20 text-[#a74338] p-2 rounded-xl transition"
                          title="Remove product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
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
        <div className="fixed inset-0 bg-[#1c1917]/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white border border-[#ede4d5] rounded-3xl max-w-2xl w-full p-8 shadow-xl relative animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setEditingProduct(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-[#f7f4ee] text-[#66615b] hover:text-[#1c1917] transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1 mb-6">
              <span className="text-xs uppercase tracking-wider text-[#8d6b4f] font-semibold">Moderation</span>
              <h3 className="text-2xl font-serif font-bold text-[#1c1917] flex items-center gap-2">
                <Edit3 className="text-[#2f4739] w-5 h-5" /> 
                Review & Edit Product
              </h3>
              <p className="text-xs text-[#66615b]">Modify this product's listing before approving it to go live for buyers.</p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#1c1917]">Product Name</label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full bg-[#faf7f2] border border-[#ede4d5] px-3 py-2 rounded-xl focus:border-[#2f4739] focus:outline-none text-xs text-[#1c1917]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#1c1917]">Category</label>
                  <input
                    type="text"
                    value={editForm.category}
                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                    className="w-full bg-[#faf7f2] border border-[#ede4d5] px-3 py-2 rounded-xl focus:border-[#2f4739] focus:outline-none text-xs text-[#1c1917]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#1c1917]">Material Used</label>
                  <input
                    type="text"
                    value={editForm.material_used}
                    onChange={(e) => setEditForm({ ...editForm, material_used: e.target.value })}
                    className="w-full bg-[#faf7f2] border border-[#ede4d5] px-3 py-2 rounded-xl focus:border-[#2f4739] focus:outline-none text-xs text-[#1c1917]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#1c1917]">Weight</label>
                  <input
                    type="text"
                    value={editForm.weight}
                    onChange={(e) => setEditForm({ ...editForm, weight: e.target.value })}
                    className="w-full bg-[#faf7f2] border border-[#ede4d5] px-3 py-2 rounded-xl focus:border-[#2f4739] focus:outline-none text-xs text-[#1c1917]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#1c1917]">Seller Price (Rs.)</label>
                  <input
                    type="number"
                    value={editForm.price}
                    onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                    className="w-full bg-[#faf7f2] border border-[#ede4d5] px-3 py-2 rounded-xl focus:border-[#2f4739] focus:outline-none text-xs text-[#1c1917]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#2f4739]">Admin Price (Rs.)</label>
                  <input
                    type="number"
                    value={editForm.admin_price}
                    onChange={(e) => setEditForm({ ...editForm, admin_price: e.target.value })}
                    className="w-full bg-[#f7f4ee] border border-[#2f4739]/40 px-3 py-2 rounded-xl focus:border-[#2f4739] focus:outline-none text-xs text-[#1c1917] font-semibold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#1c1917]">Stock Count</label>
                  <input
                    type="number"
                    value={editForm.numberOfItem}
                    onChange={(e) => setEditForm({ ...editForm, numberOfItem: e.target.value })}
                    className="w-full bg-[#faf7f2] border border-[#ede4d5] px-3 py-2 rounded-xl focus:border-[#2f4739] focus:outline-none text-xs text-[#1c1917]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#1c1917]">Image URL</label>
                <input
                  type="url"
                  value={editForm.imageUrl}
                  onChange={(e) => setEditForm({ ...editForm, imageUrl: e.target.value })}
                  className="w-full bg-[#faf7f2] border border-[#ede4d5] px-3 py-2 rounded-xl focus:border-[#2f4739] focus:outline-none text-xs text-[#1c1917]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#1c1917]">Description</label>
                <textarea
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  className="w-full bg-[#faf7f2] border border-[#ede4d5] px-3 py-2 rounded-xl focus:border-[#2f4739] focus:outline-none text-xs text-[#1c1917] h-20 resize-none"
                />
              </div>

              <div className="pt-3 flex gap-3">
                <button
                  onClick={() => handleSaveChanges(false)}
                  className="flex-1 bg-[#f7f4ee] border border-[#ede4d5] hover:bg-[#ede4d5]/60 text-[#1c1917] py-2.5 rounded-full font-semibold transition flex items-center justify-center gap-2 text-xs"
                >
                  <Save className="w-4 h-4 text-[#8d6b4f]" />
                  Save Changes
                </button>
                <button
                  onClick={() => handleSaveChanges(true)}
                  className="flex-1 bg-[#2f4739] hover:bg-[#23372c] text-[#faf7f2] py-2.5 rounded-full font-semibold shadow-sm transition flex items-center justify-center gap-2 text-xs"
                >
                  <CheckCircle className="w-4 h-4" />
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
