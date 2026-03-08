import React, { useState } from 'react';
import { AlertCircle, Trash2, X } from 'lucide-react';
import axiosInstance from '../../../../api/axiosInstance';
import toast from 'react-hot-toast';

const DeleteModal = ({ isOpen, onClose, product, refresh }) => {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await axiosInstance.delete(`/products/${product._id}`);
      refresh();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete product");
    } finally {
      setDeleting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div className="bg-white w-full max-w-md p-8 rounded-[2.5rem] shadow-2xl animate-in zoom-in duration-200">
        <div className="w-20 h-20 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle size={40} strokeWidth={2.5} />
        </div>
        
        <h3 className="text-2xl font-black text-center mb-2 text-gray-900">Confirm Deletion</h3>
        <p className="text-sm text-gray-500 text-center mb-10 px-4 leading-relaxed">
          Are you sure you want to delete <span className="font-bold text-gray-900 underline underline-offset-4">"{product?.name}"</span>? 
          This will remove all associated data permanently.
        </p>

        <div className="flex gap-4">
          <button 
            onClick={onClose} 
            className="flex-1 py-4 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors"
          >
            Go Back
          </button>
          <button 
            onClick={handleDelete}
            disabled={deleting}
            className="flex-1 bg-red-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-red-700 hover:shadow-lg transition-all disabled:opacity-50"
          >
            {deleting ? 'Deleting...' : <><Trash2 size={16} /> Delete Product</>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;