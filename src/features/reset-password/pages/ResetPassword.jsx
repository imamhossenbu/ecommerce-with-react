import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Lock, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { resetPassword } from '../../../api/services';

export default function ResetPassword() {
  const { token } = useParams(); 
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await resetPassword(token, password);
      if (res.success) {
        toast.success("পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে!");
        navigate('/login');
      }
    } catch (err) {
      toast.error("লিঙ্কটি এক্সপায়ার হয়ে গেছে বা ইনভ্যালিড");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-black uppercase text-center mb-8">New Password</h1>
        <form onSubmit={handleReset} className="space-y-4">
          <div className="relative">
            <Lock className="absolute left-4 top-4 text-gray-400" size={18} />
            <input 
              type="password" placeholder="New Password" required
              className="w-full border border-gray-100 bg-gray-50 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-black transition-all"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-4 text-gray-400" size={18} />
            <input 
              type="password" placeholder="Confirm Password" required
              className="w-full border border-gray-100 bg-gray-50 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-black transition-all"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button disabled={loading} className="w-full bg-black text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest">
            {loading ? <Loader2 className="animate-spin" size={18} /> : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}