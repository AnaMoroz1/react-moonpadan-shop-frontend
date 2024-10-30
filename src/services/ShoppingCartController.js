import React, { useState } from 'react';
import ProductList from './ProductList';
import Cart from '../components/Cart';
import '../styles/Moon.css';

function ShoppingCartController ({ show}) {
  const [cart, setCart] = useState([]);

  // Function to add item to cart
  const addToCart = (product, quantity = 1) => {
    const existingCartItem = cart.find(item => item.product.id === product.id);
    if (existingCartItem) {
      // If the product is already in the cart, we increase its quantity
      setCart(cart.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + quantity } // Increase the quantity
          : item
      ));
    } else {
      // If the product does not exist, we add it with the initial quantity
      setCart([...cart, { product, quantity}]);
    }
  };

  // Function to remove item from cart
  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.product.id !== productId));
  };

  // Function to reduce the amount of products in the cart
  const decreaseQuantity = (productId) => {
    setCart(cart.map(item => {
      if (item.product.id === productId && item.quantity > 1 ) {
        return { ...item, quantity: item.quantity -1 };
      }
      return item;
    }));
};

  return (
   
    <div>
      {/* component shows cart contents*/}
     {show === 'products' && <ProductList addToCart={addToCart} cart={cart}/>}
     {show === 'cart' && (
      <Cart
      cart={cart}
      removeFromCart={removeFromCart}
      decreaseQuantity={decreaseQuantity}
      />
      
     )}
    </div>
      
  );
}

export default ShoppingCartController;
