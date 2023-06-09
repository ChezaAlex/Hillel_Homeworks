  import React, { createContext, useState } from 'react';


  const CartContext = createContext();

  const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (productId) => {
      setCartItems((prevItems) => [...prevItems, productId]);
    };

    const removeFromCart = (productId) => {
      setCartItems((prevItems) => prevItems.filter((item) => item !== productId));
    };

    return (
      <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
        {children}
      </CartContext.Provider>
    );
  };

  export { CartContext, CartProvider };
