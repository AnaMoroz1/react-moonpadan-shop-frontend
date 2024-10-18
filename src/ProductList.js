import React, { useContext, useEffect, useState } from 'react';
import Product from './Product';
import './Moon.css'; // Importuojame Moon.css
import { CartContext } from './CartContext';

function ProductList() {
  const [products, setProducts] = useState([]); 
  const { addToCart, cart } = useContext(CartContext);

  useEffect(() => {  /* Fetch the products from the API */
    fetch('http://localhost:8080/api/products/')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Convert the response to JSON format
    })
    .then(data => {
      setProducts(data); // Set the fetched data to state
      console.log("Products state:", data); // Log the fetched products
    })
    .catch(error => {
      console.error("Error fetching products:", error); // Log any errors
    });
}, []);
  const getQuantityInCart = (productId) => {
    const cartItem = cart.find(item => item.product.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  return (
    <div className="product-list-container">
      <h1>Product List</h1>
      <div className="product-grid">
        {Array.isArray(products) && products.length > 0 ?(
        products.map(product => (   /*Pereiname per visus produktus, esančius products būsenoje. */
          <div key={product.id} className="product-item">
            <Product 
             product={product}
             addToCart={addToCart} 
             quantityInCart={getQuantityInCart(product.id)}/>     {/*Kiekvienam produktui perduodame atskirą „Product“ komponentą su jo duomenimis (product) ir funkcija prekei pridėti į krepšelį (addToCart). */}
          </div>
        ))
      ):(
        <p> No products available</p>
      )}
      </div>
 </div>
  );
}

export default ProductList;
