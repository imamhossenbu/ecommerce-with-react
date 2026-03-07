import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Loader2, Search, MoreVertical, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import axiosInstance from '../../../../api/axiosInstance';
import ProductModal from '../components/ProductModal';
import DeleteModal from '../components/DeleteModal';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // ক্যাটাগরি লিস্টের জন্য
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // API Pagination & Filter States
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); // ক্যাটাগরি ফিল্টার স্টেট
  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  // প্রোডাক্ট ফেচ করার ফাংশন
  const fetchProducts = async () => {
    try {
      setLoading(true);
      // ব্যাকএন্ডের কুয়েরি অনুযায়ী: search এবং category প্যারামিটার পাঠানো হচ্ছে
      const response = await axiosInstance.get(
        `/products?page=${page}&limit=${limit}&search=${search}&category=${selectedCategory}`
      );
      
      setProducts(response.data.data);
      setTotalPages(response.data.totalPages);
      setTotalProducts(response.data.totalProducts);
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ক্যাটাগরি লিস্ট ফেচ করার জন্য (ফিল্টার ড্রপডাউনের জন্য)
  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get('/categories'); // তোমার ক্যাটাগরি এন্ডপয়েন্ট অনুযায়ী চেঞ্জ করে নিও
      setCategories(response.data.data || response.data);
    } catch (error) {
      console.error("Category Fetch Error:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchProducts();
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [page, search, selectedCategory]); // ক্যাটাগরি চেঞ্জ হলেও কল হবে

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setIsDeleteOpen(true);
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">Manage Products</h2>
        <button 
          onClick={() => { setSelectedProduct(null); setIsModalOpen(true); }}
          className="bg-black text-white px-6 py-3 rounded-xl flex items-center gap-2 text-sm font-black hover:scale-105 transition-all shadow-lg shadow-black/10"
        >
          <Plus size={18} strokeWidth={3} /> Add Product
        </button>
      </div>

      {/* --- Filter Bar: Left Search, Right Category --- */}
      <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Left Side: Search */}
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
          <input 
            type="text" 
            placeholder="Search Products....." 
            className="w-full pl-12 pr-4 py-3 bg-gray-50/50 border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-100 focus:border-pink-200 transition-all"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
        </div>

        {/* Right Side: Category Filter */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <select 
              className="w-full pl-10 pr-4 py-3 bg-gray-50/50 border border-gray-100 rounded-2xl text-sm font-bold text-gray-600 outline-none appearance-none cursor-pointer focus:ring-2 focus:ring-pink-100 transition-all"
              value={selectedCategory}
              onChange={(e) => { setSelectedCategory(e.target.value); setPage(1); }}
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <ChevronRight size={14} className="rotate-90 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="h-96 flex items-center justify-center">
            <Loader2 className="animate-spin text-pink-500" size={40} />
          </div>
        ) : (
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full border-collapse min-w-[1000px]">
              <thead>
                <tr className="text-left text-[11px] font-black uppercase tracking-widest text-gray-400 border-b border-gray-50">
                  <th className="px-8 py-6 text-center">ID</th>
                  <th className="px-4 py-6">Thumbnails</th>
                  <th className="px-4 py-6">Name</th>
                  <th className="px-4 py-6">Category</th>
                  <th className="px-4 py-6">Price</th>
                  <th className="px-4 py-6">Stock</th>
                  <th className="px-4 py-6">Status</th>
                  <th className="px-8 py-6 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {products.length > 0 ? products.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-8 py-5 text-[10px] font-bold text-gray-400 text-center">
                      #{product._id.slice(-5).toUpperCase()}
                    </td>
                    <td className="px-4 py-5">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 border border-gray-50 shadow-sm">
                        <img src={product.thumbnail} alt="" className="w-full h-full object-cover" />
                      </div>
                    </td>
                    <td className="px-4 py-5 text-sm font-bold text-gray-800">{product.name}</td>
                    <td className="px-4 py-5 text-sm font-medium text-gray-500">{product.categoryID?.name || "N/A"}</td>
                    <td className="px-4 py-5 text-sm font-black text-gray-900">${product.salePrice}</td>
                    <td className="px-4 py-5 text-sm font-bold text-gray-700">{product.stock}</td>         
                    <td className="px-4 py-5">
                      <StatusBadge stock={product.stock} />
                    </td>
                    <td className="px-8 py-5 text-center">
                      <div className="relative group/action inline-block">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <MoreVertical size={18} className="text-gray-400" />
                        </button>
                        <div className="absolute right-0 top-full mt-1 bg-white border border-gray-100 shadow-xl rounded-xl py-2 w-32 z-10 opacity-0 invisible group-hover/action:opacity-100 group-hover/action:visible transition-all">
                            <button onClick={() => handleEdit(product)} className="w-full px-4 py-2 text-left text-xs font-bold hover:bg-pink-50 text-gray-600 flex items-center gap-2">
                                <Edit size={14} /> Edit
                            </button>
                            <button onClick={() => handleDeleteClick(product)} className="w-full px-4 py-2 text-left text-xs font-bold hover:bg-red-50 text-red-500 flex items-center gap-2">
                                <Trash2 size={14} /> Delete
                            </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="10" className="text-center py-10 font-bold text-gray-400">No products found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        <div className="px-8 py-6 border-t border-gray-50 flex items-center justify-between">
            <p className="text-xs font-bold text-gray-400">
              Showing <span className="text-gray-900">{totalProducts > 0 ? (page - 1) * limit + 1 : 0}</span> to <span className="text-gray-900">{Math.min(page * limit, totalProducts)}</span> of {totalProducts} results
            </p>
            <div className="flex gap-2">
                <button 
                  disabled={page === 1}
                  onClick={() => setPage(prev => prev - 1)}
                  className="p-2 border border-gray-100 rounded-lg hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                
                {[...Array(totalPages)].map((_, index) => (
                  <button 
                    key={index + 1}
                    onClick={() => setPage(index + 1)}
                    className={`px-3 py-1 font-bold rounded-lg text-sm transition-all ${page === index + 1 ? 'bg-pink-100 text-pink-600' : 'hover:bg-gray-50 text-gray-400'}`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button 
                  disabled={page === totalPages || totalPages === 0}
                  onClick={() => setPage(prev => prev + 1)}
                  className="p-2 border border-gray-100 rounded-lg hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
            </div>
        </div>
      </div>

      <ProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} product={selectedProduct} refresh={fetchProducts} />
      <DeleteModal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} product={selectedProduct} refresh={fetchProducts} />
    </div>
  );
};

const StatusBadge = ({ stock }) => {
    if (stock === 0) return <span className="px-3 py-1 bg-red-50 text-red-500 text-[10px] font-black uppercase rounded-lg">Out of Stock</span>;
    if (stock <= 10) return <span className="px-3 py-1 bg-orange-50 text-orange-500 text-[10px] font-black uppercase rounded-lg">Low Stock</span>;
    return <span className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-black uppercase rounded-lg">Active</span>;
};

export default AdminProducts;