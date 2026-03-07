import React, { createContext, useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';


// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext();


export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);


const addToCart = (product, quantity) => {
  setCartItems(prevItems => {
    const isExist = prevItems.find(item => item._id === product._id);
    if (isExist) {
      return prevItems.map(item => 
        item._id === product._id ? { ...item, quantity: item.quantity + quantity } : item
      );
    }
    return [...prevItems, { ...product, quantity }];
  });
};
console.log(cartItems)
  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item._id !== id));
    toast.error("Removed from cart");
  };

  const clearCart = useCallback(() => {
    setCartItems([]);
    localStorage.removeItem('cart');
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};