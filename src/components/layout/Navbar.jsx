import React, { useState, useEffect, useContext, useRef } from 'react';
import { Search, User, ShoppingBag, ChevronDown, Menu, X, UserCircle, Package, LogOut, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import img from "../../assets/logo.png"
import AuthContext from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/cartContext';
import {  getProducts } from '../../api/services'; 

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState(null);
  
  // Search States
  const [searchQuery, setSearchQuery] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        if (res.success) setAllProducts(res.data);
      } catch (err) {
        console.error("Search fetch error", err);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const timeoutId = setTimeout(() => {
        const filtered = allProducts.filter(product => 
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        ).slice(0, 5);
        setFilteredResults(filtered);
        setIsSearching(false);
      }, 400);
      return () => clearTimeout(timeoutId);
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFilteredResults([]);
      setIsSearching(false);
    }
  }, [searchQuery, allProducts]);

  const closeAll = () => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  const handleProductClick = (productId) => {
    closeAll();
    navigate(`/product/${productId}`);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Skincare', hasDropdown: true, items: ['Cleansers', 'Toners', 'Essences'], href: '/shop' },
    { name: 'Collections', hasDropdown: true, items: ['Hydration', 'Brightening'], href: '/collections' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 bg-white ${isScrolled ? 'nav-shadow py-3' : 'py-5'}`}>
      <div className="site-container relative flex justify-between items-center" ref={searchRef}>
        
        {/* LOGO & MOBILE MENU */}
        <div className="flex items-center gap-4">
          <button className="lg:hidden p-1 text-primary cursor-pointer" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu size={24} />
          </button>
          <Link to="/" className="block w-[80px] md:w-[110px]">
            <img src={img} alt="Seoul Mirage" className="w-full h-auto object-contain" />
          </Link>
        </div>

        {/* DESKTOP NAV LINKS */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.name} className="relative group py-2">
              <Link to={link.href || "#"} className="text-nav text-primary hover:text-accent flex items-center gap-1 transition-colors font-bold uppercase text-[13px]">
                {link.name}
                {link.hasDropdown && <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />}
              </Link>

              {link.hasDropdown && (
                <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="bg-white border border-border shadow-xl p-5 min-w-[200px] flex flex-col gap-3 rounded-xl">
                    {link.items.map(item => (
                      <Link key={item} to={`/shop?category=${item.toLowerCase()}`} className="text-sm text-secondary hover:text-accent transition-colors font-medium">
                        {item}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* RIGHT ICONS */}
        <div className="flex items-center gap-4 md:gap-6 text-primary">
          {/* Search Section */}
          <div className="relative flex items-center">
            <AnimatePresence>
              {isSearchOpen && (
                <motion.div initial={{ width: 0, opacity: 0 }} animate={{ width: 220, opacity: 1 }} exit={{ width: 0, opacity: 0 }} className="relative hidden lg:block mr-2">
                  <input 
                    type="text" 
                    placeholder="Search products..." 
                    className="w-full bg-gray-50 border border-border rounded-full px-5 py-2 text-sm outline-none focus:ring-2 focus:ring-accent/10 transition-all"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      if(e.target.value.trim().length > 0) setIsSearching(true);
                    }}
                    autoFocus
                  />
                  {isSearching && <Loader2 className="absolute right-4 top-2.5 animate-spin text-accent" size={14} />}
                </motion.div>
              )}
            </AnimatePresence>
            
            <button onClick={() => { setIsSearchOpen(!isSearchOpen); setSearchQuery(""); }} className="hover:text-accent cursor-pointer transition-colors pt-1">
              {isSearchOpen ? <X size={20} /> : <Search size={20} strokeWidth={1.5} />}
            </button>

            {/* Search Results Dropdown (Desktop) */}
            <AnimatePresence>
              {searchQuery.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 15 }} className="absolute top-full right-0 mt-4 w-72 bg-white shadow-2xl rounded-2xl border border-border overflow-hidden z-[100] hidden lg:block">
                  {filteredResults.length > 0 ? (
                    <div className="py-2">
                      {filteredResults.map(p => (
                        <div key={p._id} onClick={() => handleProductClick(p._id)} className="p-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3 transition-colors">
                          <img src={p.images?.[0]} className="w-10 h-10 rounded-lg object-cover bg-gray-100" />
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-gray-800 truncate w-40">{p.name}</span>
                            <span className="text-[10px] text-accent font-black">${p.salePrice}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : !isSearching && (
                    <div className="p-6 text-center text-xs text-gray-400 font-bold italic">No results found</div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile & Cart */}
          <div className="relative py-2" onMouseEnter={() => window.innerWidth > 1024 && setIsUserMenuOpen(true)} onMouseLeave={() => window.innerWidth > 1024 && setIsUserMenuOpen(false)}>
            <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className="hover:text-accent pt-1 outline-none">
              {user?.profileImage ? (
                <img src={user.profileImage} className="w-7 h-7 rounded-full border border-pink-100 object-cover" />
              ) : <User size={20} strokeWidth={1.5} />}
            </button>
            <AnimatePresence>
              {isUserMenuOpen && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute right-0 mt-2 bg-white shadow-2xl border border-border min-w-[180px] py-2 z-[100] rounded-xl overflow-hidden">
                  {user ? (
                    <>
                      <div className="px-5 py-3 border-b border-border bg-gray-50/50"><p className="text-[10px] font-black text-gray-400 uppercase truncate">{user.name}</p></div>
                      <Link to={user.role === 'admin' ? '/admin/dashboard' : '/profile'} onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-3 px-5 py-3 text-[11px] font-black hover:bg-gray-50 uppercase tracking-tighter text-primary">
                        <UserCircle size={16} /> {user.role === 'admin' ? 'Admin Panel' : 'My Account'}
                      </Link>
                      <button onClick={logout} className="w-full flex items-center gap-3 px-5 py-3 text-[11px] font-black text-red-500 hover:bg-red-50 border-t border-border mt-1 uppercase"><LogOut size={16} /> Logout</button>
                    </>
                  ) : (
                    <div className="flex flex-col">
                      <Link to="/signin" onClick={() => setIsUserMenuOpen(false)} className="px-5 py-3 text-[11px] font-black hover:bg-gray-50 uppercase">Sign In</Link>
                      <Link to="/signup" onClick={() => setIsUserMenuOpen(false)} className="px-5 py-3 text-[11px] font-black hover:bg-gray-50 uppercase">Sign Up</Link>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link to="/cart" className="hover:text-accent relative pt-1 group">
            <ShoppingBag size={20} strokeWidth={1.5} />
            {totalCartItems > 0 && (
              <span className="absolute -top-1 -right-2 bg-accent text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalCartItems}
              </span>
            )}
          </Link>
        </div>

        {/* MOBILE SEARCH & RESULTS */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-border shadow-lg overflow-hidden">
              <div className="site-container py-4">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search products..." 
                    className="w-full bg-gray-50 border border-border rounded-xl px-5 py-3 text-sm outline-none" 
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      if(e.target.value.trim().length > 0) setIsSearching(true);
                    }}
                    autoFocus 
                  />
                  {isSearching && <Loader2 className="absolute right-4 top-3.5 animate-spin text-accent" size={16} />}
                </div>
                {searchQuery && (
                  <div className="mt-3 max-h-64 overflow-y-auto space-y-1">
                    {filteredResults.map(p => (
                      <div key={p._id} onClick={() => handleProductClick(p._id)} className="flex items-center gap-4 p-3 border-b border-gray-50 active:bg-gray-100">
                        <img src={p.images?.[0]} className="w-12 h-12 rounded-lg object-cover" />
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-gray-800">{p.name}</span>
                          <span className="text-[10px] text-accent font-black">${p.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* MOBILE MENU DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMobileMenuOpen(false)} className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm lg:hidden" />
            <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} className="fixed top-0 left-0 w-[280px] h-full bg-white z-[70] p-6 shadow-2xl lg:hidden">
              <div className="flex justify-between items-center mb-10 border-b border-gray-50 pb-6">
                <img src={img} alt="Logo" className="w-[100px]" />
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-gray-50 rounded-full"><X size={20} /></button>
              </div>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.name} className="border-b border-gray-50 pb-2">
                    <div className="flex justify-between items-center py-3" onClick={() => link.hasDropdown && setOpenMobileDropdown(openMobileDropdown === link.name ? null : link.name)}>
                      <Link to={link.href || "#"} onClick={!link.hasDropdown ? closeAll : undefined} className="text-[13px] font-black uppercase tracking-tight text-primary">
                        {link.name}
                      </Link>
                      {link.hasDropdown && <ChevronDown size={18} className={openMobileDropdown === link.name ? 'rotate-180' : ''} />}
                    </div>
                    {link.hasDropdown && openMobileDropdown === link.name && (
                      <ul className="pl-4 mt-1 bg-pink-50/30 rounded-xl overflow-hidden">
                        {link.items.map(item => (
                          <li key={item}>
                            <Link to={`/shop?category=${item.toLowerCase()}`} onClick={closeAll} className="py-4 px-4 text-[11px] font-bold text-secondary block uppercase hover:text-accent border-b border-white last:border-0">
                              {item}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}