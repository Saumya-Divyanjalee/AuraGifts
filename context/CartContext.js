// context/CartContext.js
import React, { createContext, useContext, useState, useMemo } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]); // { productId, name, price, image, quantity }

  const addToCart = (product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === product.id);
      if (existing) {
        return prev.map((i) =>
          i.productId === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        {
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
        },
      ];
    });
  };

  const removeFromCart = (productId) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.productId === productId ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => setItems([]);

  const totalAmount = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [items]
  );

  const totalItems = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalAmount, totalItems }}
    >
      {children}
    </CartContext.Provider>
  );
};
