import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import ProductList from './ProductList';
import Cart from './Cart';

function Main({ addToCart, cart, removeFromCart }) {
  return (
    <main className="content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} />} />
      </Routes>
    </main>
  );
}

export default Main;
