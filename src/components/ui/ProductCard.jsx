import React from 'react';
import { ShoppingBag, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product }) {
  const {_id, thumbnail, name, categoryID, salePrice, regularPrice } = product;
  const navigate = useNavigate();

  return (
    <div
    onClick={() => navigate(`/product/${_id}`)}
    className="product-card group cursor-pointer">
      {/* Image Container with Add to Cart Overlay */}
      <div className="img-box relative overflow-hidden bg-[#F6F6F6] aspect-square">
        <img 
          src={thumbnail} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Hover Overlay Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/5">
          <button className="bg-white text-dark px-6 py-2.5 rounded-sm flex items-center gap-2 text-[13px] font-semibold shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-accent hover:text-white">
            <ShoppingBag size={16} />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="mt-4 space-y-1">
        <p className="text-[12px] text-muted uppercase tracking-wider">
          {categoryID?.name || "Serums"}
        </p>
        <h3 className="text-[16px] font-medium text-primary line-clamp-1">
          {name}
        </h3>
        
        <div className="flex items-center gap-2">
          <span className="text-[18px] font-bold text-primary">${salePrice}</span>
          {regularPrice > salePrice && (
            <span className="text-[14px] text-muted line-through">${regularPrice}</span>
          )}
        </div>

        {/* Rating Mockup */}
        <div className="flex items-center gap-1 mt-1">
          <Star size={12} className="fill-accent text-accent" />
          <span className="text-[11px] font-bold text-primary">4.9</span>
          <span className="text-[11px] text-muted">(86)</span>
        </div>
      </div>
    </div>
  );
}