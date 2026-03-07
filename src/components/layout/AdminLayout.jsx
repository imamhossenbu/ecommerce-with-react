import React, { useContext, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Sidebar from '../../features/admin/dashboard/components/Sidebar'; 
import AuthContext from '../../context/AuthContext';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const {user} = useContext(AuthContext)

  const pageTitles = {
    '/admin/dashboard': 'Overview',
    '/admin/products': 'Products',
    '/admin/orders': 'Orders',
    '/admin/customers': 'Customers',
    '/admin/settings': 'Settings',
  };

  return (
    <div className="flex min-h-screen bg-[#FDF2F8]/30">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      {/* Main Content Area */}
      <main className="flex-1 lg:ml-64 p-4 md:p-8">
        <header className="flex justify-between items-center mb-8">
           <div className="flex items-center gap-4">
              {/* Hamburger Button for Mobile */}
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 bg-white border border-gray-200 rounded-lg text-gray-600"
              >
                <Menu size={20} />
              </button>
              
              <h2 className="text-xl font-black text-gray-900 tracking-tight">
                {pageTitles[location.pathname] || 'Admin Panel'}
              </h2>
           </div>

           <div className="flex items-center gap-3 bg-white p-1.5 pr-4 rounded-full border border-gray-100 shadow-sm">
              <div className="w-8 h-8 rounded-full bg-[#B0264F] flex items-center justify-center text-[10px] font-black text-white">
                <img src={user?.profileImage} alt="profile" />
              </div>
              <span className="text-xs font-black hidden sm:block uppercase tracking-wider text-gray-700">Admin</span>
           </div>
        </header>

        <section className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          <Outlet /> 
        </section>
      </main>
    </div>
  );
};

export default AdminLayout;