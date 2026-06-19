"use client";
import React, { useRef, useState } from 'react';
import { ImagePlus, Link2, Loader2, Trash2, Upload, UploadCloud } from 'lucide-react';

interface AddProductFormProps {
  form: any;
  setForm: (form: any) => void;
  handleUpload: () => void;
  handleAddProduct: () => void;
}

const AddProductForm = ({ form, setForm, handleUpload, handleAddProduct }: AddProductFormProps) => {
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUrlSubmit = () => {
    if (imageUrl.trim()) {
      setForm({ ...form, image_url: imageUrl });
      setImageUrl('');
      setShowUrlInput(false);
      setUploadError('');
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Please choose an image file.');
      event.target.value = '';
      return;
    }

    setUploading(true);
    setUploadError('');

    const uploadData = new FormData();
    uploadData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadData,
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Image upload failed');
      }

      setForm({ ...form, image_url: data.secure_url });
      setShowUrlInput(false);
    } catch (error: any) {
      setUploadError(error.message || 'Image upload failed');
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  };

  const generatePlaceholderUrl = () => {
    const productName = form.name || 'Product';
    const placeholderUrl = `https://placehold.co/400x400/1e293b/10b981?text=${productName.replace(/\s/g, '+')}`;
    setForm({ ...form, image_url: placeholderUrl });
  };

  return (
    <div className="bg-slate-800/40 p-8 rounded-3xl border border-slate-700 shadow-xl backdrop-blur-sm sticky top-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Upload className="text-green-500 w-6 h-6" /> Add Product
      </h2>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-400">Product Name</label>
          <input
            placeholder="e.g. Bamboo Toothbrush"
            className="w-full bg-slate-900/50 border border-slate-700 p-3 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400">Price (Rs.)</label>
            <input
              placeholder="299"
              type="number"
              className="w-full bg-slate-900/50 border border-slate-700 p-3 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400">Quantity</label>
            <input
              placeholder="50"
              type="number"
              className="w-full bg-slate-900/50 border border-slate-700 p-3 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition"
              value={form.number_of_item}
              onChange={(e) => setForm({ ...form, number_of_item: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-400">Category</label>
          <input
            placeholder="e.g. Personal Care"
            className="w-full bg-slate-900/50 border border-slate-700 p-3 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-400">Description</label>
          <textarea
            placeholder="What makes this product special?"
            className="w-full bg-slate-900/50 border border-slate-700 p-3 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition h-24"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-400">Product Image</label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          {form.image_url ? (
            <div className="relative group rounded-xl overflow-hidden border border-slate-700">
              <img src={form.image_url} alt="Preview" className="w-full h-32 object-cover" />
              <button
                type="button"
                onClick={() => setForm({ ...form, image_url: '' })}
                className="absolute top-2 right-2 bg-red-500 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition shadow-lg"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    handleUpload();
                    fileInputRef.current?.click();
                  }}
                  disabled={uploading}
                  className="flex-1 border border-slate-700 p-3 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 transition text-sm font-medium flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {uploading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <UploadCloud className="w-4 h-4" />
                  )}
                  {uploading ? 'Uploading' : 'Upload'}
                </button>
                <button
                  type="button"
                  onClick={generatePlaceholderUrl}
                  className="flex-1 border border-slate-700 p-3 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 transition text-sm font-medium"
                >
                  <ImagePlus className="w-4 h-4 inline mr-2" />
                  Placeholder
                </button>
                <button
                  type="button"
                  onClick={() => setShowUrlInput(!showUrlInput)}
                  className="flex-1 border border-slate-700 p-3 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 transition text-sm font-medium flex items-center justify-center gap-2"
                >
                  <Link2 className="w-4 h-4" /> Paste URL
                </button>
              </div>

              {showUrlInput && (
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    className="flex-1 bg-slate-900/50 border border-slate-700 p-3 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition text-sm"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleUrlSubmit()}
                  />
                  <button
                    type="button"
                    onClick={handleUrlSubmit}
                    className="bg-green-600 text-white px-4 rounded-xl hover:bg-green-700 transition font-medium"
                  >
                    Add
                  </button>
                </div>
              )}

              {uploadError && (
                <p className="text-sm text-red-400">{uploadError}</p>
              )}
            </div>
          )}
        </div>

        <button
          onClick={handleAddProduct}
          className="w-full mt-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-bold hover:from-green-700 hover:to-emerald-700 transition transform hover:scale-[1.02] shadow-xl"
        >
          Launch Product
        </button>
      </div>
    </div>
  );
};

export default AddProductForm;
