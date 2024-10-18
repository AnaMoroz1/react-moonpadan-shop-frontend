import React, { useState } from 'react';
import ProductList from './ProductList';
import Cart from './Cart';
import './Moon.css'; // Importuojame Moon.css

function ShoppingCartController ({ show}) {
  const [cart, setCart] = useState([]);

  // Funkcija prekei pridėti į krepšelį
  const addToCart = (product, quantity = 1) => {
    const existingCartItem = cart.find(item => item.product.id === product.id);
    if (existingCartItem) {
      // Jei produktas jau yra krepšelyje, padidiname jo kiekį
      setCart(cart.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + quantity } // Padidiname kiekį
          : item
      ));
    } else {
      // Jei produkto nėra, pridedame jį su pradiniu kiekiu
      setCart([...cart, { product, quantity}]);
    }
  };

  // Funkcija prekei pašalinti iš krepšelio
  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.product.id !== productId));
  };

  //funkcija sumažinti prekiu kieki krepšelyje
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
      {/* komponentas rodo krepšelio turini*/}
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
