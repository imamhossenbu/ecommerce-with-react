import React, { useState, useEffect, useContext } from 'react';
import { Search, User, ShoppingBag, ChevronDown, Menu, X, UserCircle, Package, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import img from "../../assets/logo.png"
import AuthContext from '../../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState(null);
  const {user,logout} = useContext(AuthContext)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Skincare', hasDropdown: true, items: ['Cleansers', 'Toners', 'Essences'] },
    { name: 'Collections', hasDropdown: true, items: ['Hydration', 'Brightening'] },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 bg-white ${isScrolled ? 'nav-shadow py-3' : 'py-5'}`}>
      <div className="site-container relative flex justify-between items-center">
        
        {/* LOGO & MOBILE MENU */}
        <div className="flex items-center gap-4">
          <button className="lg:hidden p-1 text-primary cursor-pointer" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu size={24} />
          </button>
          <a href="/" className="block w-[80px] md:w-[110px]">
            <img src={img} alt="Seoul Mirage" className="w-full h-auto object-contain" />
          </a>
        </div>

        {/* DESKTOP NAV LINKS */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <li 
              key={link.name} 
              className="relative group py-2"
            >
              <a href={link.href || "#"} className="text-nav text-primary hover:text-accent flex items-center gap-1 transition-colors">
                {link.name}
                {link.hasDropdown && <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />}
              </a>

              {link.hasDropdown && (
                <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="bg-white border border-border shadow-xl p-5 min-w-[200px] flex flex-col gap-3">
                    {link.items.map(item => (
                      <a key={item} href="#" className="text-body text-secondary hover:text-accent transition-colors border-b border-transparent">
                        {item}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* RIGHT ICONS */}
        <div className="flex items-center gap-4 md:gap-6 text-primary">
          {/* Search */}
          <div className="relative flex items-center">
            <AnimatePresence>
              {isSearchOpen && (
                <motion.input 
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 180, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  type="text" 
                  placeholder="Search..." 
                  className="hidden lg:block bg-gray-50 border border-border rounded-full px-4 py-1.5 text-body outline-none mr-2"
                  autoFocus
                />
              )}
            </AnimatePresence>
            <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="hover:text-accent cursor-pointer transition-colors">
              <Search size={20} strokeWidth={1.5} />
            </button>
          </div>

          {/* Profile */}
          <div 
            className="relative py-2"
            onMouseEnter={() => window.innerWidth > 1024 && setIsUserMenuOpen(true)}
            onMouseLeave={() => window.innerWidth > 1024 && setIsUserMenuOpen(false)}
          >
            <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className="hover:text-accent cursor-pointer pt-1 block">
              <User size={20} strokeWidth={1.5} />
            </button>
           <AnimatePresence>
              {isUserMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 bg-white shadow-2xl border border-border min-w-55 py-2 z-[100] rounded-md overflow-hidden"
                >
                  {user ? (
                    
                    <>
                      <div className="px-5 py-3 border-b border-border mb-1">
                        <p className="text-[12px] text-gray-500 uppercase font-bold">Hello,{user.name}</p>
                      </div>
                      <Link to="/profile" className="flex items-center gap-3 px-5 py-2.5 text-nav text-primary hover:bg-gray-50 transition-all">
                        <UserCircle size={16} /> My Account
                      </Link>
                      <Link to="/orders" className="flex items-center gap-3 px-5 py-2.5 text-nav text-primary hover:bg-gray-50 transition-all">
                        <Package size={16} /> Order History
                      </Link>
                      <button 
                        onClick={logout} 
                        className="w-full flex items-center gap-3 px-5 py-2.5 text-nav text-red-500 hover:bg-red-50 transition-all border-t border-border mt-1"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/signin" className="block px-5 py-2.5 text-nav text-primary hover:bg-gray-50 transition-all">Sign-in</Link>
                      <Link to="/signup" className="block px-5 py-2.5 text-nav text-primary hover:bg-gray-50 transition-all">Sign-up</Link>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Cart */}
          <a href="/cart" className="hover:text-accent relative pt-1">
            <ShoppingBag size={20} strokeWidth={1.5} />
            <span className="absolute -top-1 -right-2 bg-accent text-white-custom text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
          </a>
        </div>

        {/* MOBILE SEARCH BAR */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div 
              initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
              className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-border shadow-lg overflow-hidden"
            >
              <div className="site-container py-4 flex items-center">
                <input type="text" placeholder="Search..." className="w-full bg-gray-50 border border-border rounded-lg px-4 py-3 text-body outline-none" autoFocus />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMobileMenuOpen(false)} className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm lg:hidden" />
            <motion.div initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} className="fixed top-0 left-0 w-[280px] h-full bg-white z-[70] p-6 shadow-2xl lg:hidden">
              <div className="flex justify-between items-center mb-10">
                <img src={img} alt="Logo" className="w-[100px]" />
                <button onClick={() => setIsMobileMenuOpen(false)}><X size={24} className="text-primary" /></button>
              </div>
              <ul className="space-y-4">
                {navLinks.map((link) => (
                  <li key={link.name} className="border-b border-border pb-2 text-primary">
                    <div className="flex justify-between items-center py-2 cursor-pointer" onClick={() => link.hasDropdown && setOpenMobileDropdown(openMobileDropdown === link.name ? null : link.name)}>
                      <span className="text-nav">{link.name}</span>
                      {link.hasDropdown && <ChevronDown size={18} className={openMobileDropdown === link.name ? 'rotate-180' : ''} />}
                    </div>
                    {link.hasDropdown && openMobileDropdown === link.name && (
                      <ul className="pl-4 mt-1 bg-primary/20 rounded-sm">
                        {link.items.map(item => <li key={item} className="py-2.5 text-body text-secondary"><a href="#">{item}</a></li>)}
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