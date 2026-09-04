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
    <div className="bg-white p-7 rounded-3xl border border-[#ede4d5] shadow-sm sticky top-8 text-[#1c1917]">
      <div className="space-y-1 mb-5">
        <span className="text-xs uppercase tracking-wider text-[#8d6b4f] font-semibold">New Listing</span>
        <h2 className="text-xl font-serif font-bold flex items-center gap-2 text-[#1c1917]">
          <Upload className="text-[#2f4739] w-5 h-5" /> Add Product
        </h2>
      </div>

      <div className="space-y-3.5">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-[#1c1917]">Product Name</label>
          <input
            placeholder="e.g. Bamboo Toothbrush"
            className="w-full bg-[#faf7f2] border border-[#ede4d5] px-3.5 py-2.5 rounded-xl focus:border-[#2f4739] focus:outline-none transition text-xs text-[#1c1917] placeholder:text-[#a8a29e]"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#1c1917]">Price (Rs.)</label>
            <input
              placeholder="299"
              type="number"
              className="w-full bg-[#faf7f2] border border-[#ede4d5] px-3.5 py-2.5 rounded-xl focus:border-[#2f4739] focus:outline-none transition text-xs text-[#1c1917] placeholder:text-[#a8a29e]"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#1c1917]">Quantity</label>
            <input
              placeholder="50"
              type="number"
              className="w-full bg-[#faf7f2] border border-[#ede4d5] px-3.5 py-2.5 rounded-xl focus:border-[#2f4739] focus:outline-none transition text-xs text-[#1c1917] placeholder:text-[#a8a29e]"
              value={form.number_of_item}
              onChange={(e) => setForm({ ...form, number_of_item: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#1c1917]">Material Used</label>
            <input
              placeholder="e.g. Bamboo, Cotton"
              className="w-full bg-[#faf7f2] border border-[#ede4d5] px-3.5 py-2.5 rounded-xl focus:border-[#2f4739] focus:outline-none transition text-xs text-[#1c1917] placeholder:text-[#a8a29e]"
              value={form.material_used}
              onChange={(e) => setForm({ ...form, material_used: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#1c1917]">Weight (kg/g)</label>
            <input
              placeholder="e.g. 500g"
              className="w-full bg-[#faf7f2] border border-[#ede4d5] px-3.5 py-2.5 rounded-xl focus:border-[#2f4739] focus:outline-none transition text-xs text-[#1c1917] placeholder:text-[#a8a29e]"
              value={form.weight}
              onChange={(e) => setForm({ ...form, weight: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-[#1c1917]">Category</label>
          <input
            placeholder="e.g. Personal Care"
            className="w-full bg-[#faf7f2] border border-[#ede4d5] px-3.5 py-2.5 rounded-xl focus:border-[#2f4739] focus:outline-none transition text-xs text-[#1c1917] placeholder:text-[#a8a29e]"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-[#1c1917]">Description</label>
          <textarea
            placeholder="What makes this product special?"
            className="w-full bg-[#faf7f2] border border-[#ede4d5] px-3.5 py-2.5 rounded-xl focus:border-[#2f4739] focus:outline-none transition h-20 text-xs text-[#1c1917] placeholder:text-[#a8a29e] resize-none"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-[#1c1917]">Product Image</label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          {form.image_url ? (
            <div className="relative group rounded-xl overflow-hidden border border-[#ede4d5]">
              <img src={form.image_url} alt="Preview" className="w-full h-28 object-cover" />
              <button
                type="button"
                onClick={() => setForm({ ...form, image_url: '' })}
                className="absolute top-2 right-2 bg-[#a74338] text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition shadow-sm"
              >
                <Trash2 className="w-3.5 h-3.5" />
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
                  className="flex-1 border border-[#ede4d5] bg-[#faf7f2] p-2 rounded-xl text-[#66615b] hover:text-[#1c1917] hover:bg-[#f7f4ee] transition text-xs font-medium flex items-center justify-center gap-1.5 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {uploading ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <UploadCloud className="w-3.5 h-3.5 text-[#2f4739]" />
                  )}
                  {uploading ? 'Uploading' : 'Upload'}
                </button>
                <button
                  type="button"
                  onClick={generatePlaceholderUrl}
                  className="flex-1 border border-[#ede4d5] bg-[#faf7f2] p-2 rounded-xl text-[#66615b] hover:text-[#1c1917] hover:bg-[#f7f4ee] transition text-xs font-medium flex items-center justify-center gap-1"
                >
                  <ImagePlus className="w-3.5 h-3.5 text-[#8d6b4f]" />
                  Placeholder
                </button>
                <button
                  type="button"
                  onClick={() => setShowUrlInput(!showUrlInput)}
                  className="flex-1 border border-[#ede4d5] bg-[#faf7f2] p-2 rounded-xl text-[#66615b] hover:text-[#1c1917] hover:bg-[#f7f4ee] transition text-xs font-medium flex items-center justify-center gap-1"
                >
                  <Link2 className="w-3.5 h-3.5 text-[#8d6b4f]" /> URL
                </button>
              </div>

              {showUrlInput && (
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    className="flex-1 bg-[#faf7f2] border border-[#ede4d5] px-3 py-1.5 rounded-xl focus:border-[#2f4739] focus:outline-none transition text-xs text-[#1c1917]"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleUrlSubmit()}
                  />
                  <button
                    type="button"
                    onClick={handleUrlSubmit}
                    className="bg-[#2f4739] text-[#faf7f2] px-3.5 py-1.5 rounded-xl hover:bg-[#23372c] transition font-semibold text-xs"
                  >
                    Add
                  </button>
                </div>
              )}

              {uploadError && (
                <p className="text-xs text-[#a74338]">{uploadError}</p>
              )}
            </div>
          )}
        </div>

        <button
          onClick={handleAddProduct}
          className="w-full mt-4 bg-[#2f4739] hover:bg-[#23372c] text-[#faf7f2] py-3 rounded-full font-semibold shadow-sm transition text-xs"
        >
          Launch Product
        </button>
      </div>
    </div>
  );
};

export default AddProductForm;
