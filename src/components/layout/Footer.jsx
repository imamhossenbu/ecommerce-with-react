import React from 'react';
import { Instagram, Facebook, Globe } from 'lucide-react';
import img from "../../assets/logo.png"

export default function Footer() {
  return (
    <footer className="bg-white pt-16 pb-8 border-t border-border">
      <div className="site-container">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: About & Socials */}
          <div className="lg:col-span-2">
            <a href="/" className="block mb-6">
              <img src={img} alt="Seoul Mirage" className="w-[110px] object-contain" />
            </a>
            <p className="text-secondary text-body max-w-sm mb-8">
              Seoul Mirage is your gateway to authentic Korean skincare. 
              We bring the best of Seoul's beauty secrets to your doorstep.
            </p>
            <div className="flex gap-5">
              <a href="#" className="text-accent hover:-translate-y-1 transition-transform duration-300">
                <Globe size={20} />
              </a>
              <a href="#" className="text-accent hover:-translate-y-1 transition-transform duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-accent hover:-translate-y-1 transition-transform duration-300">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Column 2: Shop Links */}
          <div>
            <h3 className="text-h3 text-primary mb-6 font-medium">Shop</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-secondary hover:text-accent hover:pl-2 transition-all duration-300 text-body">
                  All Products
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary hover:text-accent hover:pl-2 transition-all duration-300 text-body">
                  Bestsellers
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary hover:text-accent hover:pl-2 transition-all duration-300 text-body">
                  New Arrivals
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: About Links */}
          <div>
            <h3 className="text-h3 text-primary mb-6 font-medium">About</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-secondary hover:text-accent hover:pl-2 transition-all duration-300 text-body">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary hover:text-accent hover:pl-2 transition-all duration-300 text-body">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary hover:text-accent hover:pl-2 transition-all duration-300 text-body">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary hover:text-accent hover:pl-2 transition-all duration-300 text-body">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-border">
          <p className="text-secondary text-[13px]">
            © {new Date().getFullYear()} Seoul Mirage. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}