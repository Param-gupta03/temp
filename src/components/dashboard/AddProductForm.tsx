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
    <div className="bg-white dark:bg-[#1a241f] p-8 rounded-[2.5rem] border border-[#ede4d5] dark:border-[#2a3d33] shadow-card sticky top-8 text-[#111827] dark:text-[#f4f0ea]">
      <div className="space-y-1 mb-6">
        <span className="text-xs uppercase tracking-widest text-[#8d6b4f] dark:text-[#d4a373] font-bold">New Listing</span>
        <h2 className="text-2xl font-serif font-bold flex items-center gap-2">
          <Upload className="text-[#2f4739] dark:text-[#489a69] w-6 h-6" /> Add Product
        </h2>
      </div>

      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-[#111827] dark:text-[#f4f0ea]">Product Name *</label>
          <input
            placeholder="e.g. Bamboo Toothbrush"
            className="w-full bg-[#faf7f2] dark:bg-[#121815] border border-[#ede4d5] dark:border-[#2a3d33] px-4 py-3 rounded-xl focus:border-[#2f4739] focus:outline-none transition text-sm text-[#111827] dark:text-[#f4f0ea] placeholder:text-[#9ca3af]"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-[#111827] dark:text-[#f4f0ea]">Price (Rs.) *</label>
            <input
              placeholder="299"
              type="number"
              className="w-full bg-[#faf7f2] dark:bg-[#121815] border border-[#ede4d5] dark:border-[#2a3d33] px-4 py-3 rounded-xl focus:border-[#2f4739] focus:outline-none transition text-sm text-[#111827] dark:text-[#f4f0ea] placeholder:text-[#9ca3af]"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-[#111827] dark:text-[#f4f0ea]">Quantity *</label>
            <input
              placeholder="50"
              type="number"
              className="w-full bg-[#faf7f2] dark:bg-[#121815] border border-[#ede4d5] dark:border-[#2a3d33] px-4 py-3 rounded-xl focus:border-[#2f4739] focus:outline-none transition text-sm text-[#111827] dark:text-[#f4f0ea] placeholder:text-[#9ca3af]"
              value={form.number_of_item}
              onChange={(e) => setForm({ ...form, number_of_item: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-[#111827] dark:text-[#f4f0ea]">Material Used</label>
            <input
              placeholder="e.g. Bamboo, Cotton"
              className="w-full bg-[#faf7f2] dark:bg-[#121815] border border-[#ede4d5] dark:border-[#2a3d33] px-4 py-3 rounded-xl focus:border-[#2f4739] focus:outline-none transition text-sm text-[#111827] dark:text-[#f4f0ea] placeholder:text-[#9ca3af]"
              value={form.material_used}
              onChange={(e) => setForm({ ...form, material_used: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-[#111827] dark:text-[#f4f0ea]">Weight (kg/g)</label>
            <input
              placeholder="e.g. 500g"
              className="w-full bg-[#faf7f2] dark:bg-[#121815] border border-[#ede4d5] dark:border-[#2a3d33] px-4 py-3 rounded-xl focus:border-[#2f4739] focus:outline-none transition text-sm text-[#111827] dark:text-[#f4f0ea] placeholder:text-[#9ca3af]"
              value={form.weight}
              onChange={(e) => setForm({ ...form, weight: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-[#111827] dark:text-[#f4f0ea]">Category</label>
          <input
            placeholder="e.g. Personal Care"
            className="w-full bg-[#faf7f2] dark:bg-[#121815] border border-[#ede4d5] dark:border-[#2a3d33] px-4 py-3 rounded-xl focus:border-[#2f4739] focus:outline-none transition text-sm text-[#111827] dark:text-[#f4f0ea] placeholder:text-[#9ca3af]"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-[#111827] dark:text-[#f4f0ea]">Description</label>
          <textarea
            placeholder="What makes this product special and sustainable?"
            className="w-full bg-[#faf7f2] dark:bg-[#121815] border border-[#ede4d5] dark:border-[#2a3d33] px-4 py-3 rounded-xl focus:border-[#2f4739] focus:outline-none transition h-24 text-sm text-[#111827] dark:text-[#f4f0ea] placeholder:text-[#9ca3af] resize-none"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-[#111827] dark:text-[#f4f0ea]">Product Image</label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          {form.image_url ? (
            <div className="relative group rounded-2xl overflow-hidden border border-[#ede4d5] dark:border-[#2a3d33]">
              <img src={form.image_url} alt="Preview" className="w-full h-32 object-cover" />
              <button
                type="button"
                onClick={() => setForm({ ...form, image_url: '' })}
                className="absolute top-2 right-2 bg-[#a74338] text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition shadow-sm"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-2.5">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    handleUpload();
                    fileInputRef.current?.click();
                  }}
                  disabled={uploading}
                  className="flex-1 border border-[#ede4d5] dark:border-[#2a3d33] bg-[#faf7f2] dark:bg-[#121815] p-2.5 rounded-xl text-[#4b5563] dark:text-[#9ca3af] hover:text-[#111827] hover:bg-[#f7f4ee] transition text-xs font-semibold flex items-center justify-center gap-1.5 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {uploading ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <UploadCloud className="w-3.5 h-3.5 text-[#2f4739] dark:text-[#489a69]" />
                  )}
                  {uploading ? 'Uploading...' : 'Upload'}
                </button>
                <button
                  type="button"
                  onClick={generatePlaceholderUrl}
                  className="flex-1 border border-[#ede4d5] dark:border-[#2a3d33] bg-[#faf7f2] dark:bg-[#121815] p-2.5 rounded-xl text-[#4b5563] dark:text-[#9ca3af] hover:text-[#111827] hover:bg-[#f7f4ee] transition text-xs font-semibold flex items-center justify-center gap-1"
                >
                  <ImagePlus className="w-3.5 h-3.5 text-[#8d6b4f] dark:text-[#d4a373]" />
                  Placeholder
                </button>
                <button
                  type="button"
                  onClick={() => setShowUrlInput(!showUrlInput)}
                  className="flex-1 border border-[#ede4d5] dark:border-[#2a3d33] bg-[#faf7f2] dark:bg-[#121815] p-2.5 rounded-xl text-[#4b5563] dark:text-[#9ca3af] hover:text-[#111827] hover:bg-[#f7f4ee] transition text-xs font-semibold flex items-center justify-center gap-1"
                >
                  <Link2 className="w-3.5 h-3.5 text-[#8d6b4f] dark:text-[#d4a373]" /> URL
                </button>
              </div>

              {showUrlInput && (
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    className="flex-1 bg-[#faf7f2] dark:bg-[#121815] border border-[#ede4d5] dark:border-[#2a3d33] px-3 py-2 rounded-xl focus:border-[#2f4739] focus:outline-none transition text-xs text-[#111827] dark:text-[#f4f0ea]"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleUrlSubmit()}
                  />
                  <button
                    type="button"
                    onClick={handleUrlSubmit}
                    className="bg-[#2f4739] text-[#faf7f2] px-4 py-2 rounded-xl hover:bg-[#23372c] transition font-semibold text-xs"
                  >
                    Add
                  </button>
                </div>
              )}

              {uploadError && (
                <p className="text-xs text-[#a74338] font-medium">{uploadError}</p>
              )}
            </div>
          )}
        </div>

        <button
          onClick={handleAddProduct}
          className="w-full mt-4 bg-[#2f4739] hover:bg-[#23372c] dark:bg-[#346244] dark:hover:bg-[#3e7552] text-[#faf7f2] py-4 rounded-full font-semibold shadow-soft transition text-sm active:scale-95"
        >
          Launch Product
        </button>
      </div>
    </div>
  );
};

export default AddProductForm;
