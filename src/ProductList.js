import React, { useContext, useEffect, useState } from 'react';
import Product from './Product';
import './Moon.css'; // Importuojame Moon.css
import { CartContext } from './CartContext';

function ProductList() {
  const [products, setProducts] = useState([]); 
  const { addToCart, cart } = useContext(CartContext);

  useEffect(() => {  /*Šis hookas paleidžiamas, kai komponentas pirmą kartą užkraunamas */
    fetch('http://localhost:8080/api/products')
      .then(response => response.json()) /*Konvertuojame atsakymą iš API į JSON formatą.*/ 
      .then(data => setProducts(data));  /*Kai gauname duomenis iš serverio, šiuos duomenis priskiriame būsenai (products)*/
  }, 
  []);
  const getQuantityInCart = (productId) => {
    const cartItem = cart.find(item => item.product.id === productId);
    return cartItem ? cartItem.quantity : 0;
  }

  return (
    <div className="product-list-container">
      <h1>Product List</h1>
      <div className="product-grid">
        {products.map(product => (   /*Pereiname per visus produktus, esančius products būsenoje. */
          <div key={product.id} className="product-item">
            <Product 
             product={product}
             addToCart={addToCart} 
             quantityInCart={getQuantityInCart(product.id)}/>     {/*Kiekvienam produktui perduodame atskirą „Product“ komponentą su jo duomenimis (product) ir funkcija prekei pridėti į krepšelį (addToCart). */}
          </div>
        ))}
      </div>
     
    </div>
  );
}

export default ProductList;
