import React, { useContext, useEffect, useState } from 'react';
import Product from '../components/Product';
import '../styles/Moon.css'; 
import { CartContext } from './CartContext';

function ProductList() {
  const [products, setProducts] = useState([]); 
  const { addToCart, cart } = useContext(CartContext);
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState(null);  // Added state for errors


  useEffect(() => {  /* Fetch the products from the API */
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/products');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
        console.log("Products state:", data); // Logging of loaded products
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error.message); // Setting the error
      } finally {
        setLoading(false); // Change loading state to false
      }
    };

    fetchProducts();
  }, []);

  const getQuantityInCart = (productId) => {
    const cartItem = cart.find(item => item.product.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  if (loading) {
    return <p>Loading products...</p>; // Loading indicator
  }

  if (error) {
    return <p>Error: {error}</p>; // Error message
  }

  return (
    <div className="product-list-container">
      <h1>Product List</h1>
      <div className="product-grid">
        {Array.isArray(products) && products.length > 0 ?(
        products.map(product => (   /*We go through all the products in the products state. */
          <div key={product.id} className="product-item">
            <Product 
             product={product}
             addToCart={addToCart} 
             quantityInCart={getQuantityInCart(product.id)}/>    {/*For each product, we pass a separate "Product" component with its data (product) and a function to add the product to the cart (addToCart). */}          </div>
        ))
      ):(
        <p> No products available</p>
      )}
      </div>
 </div>
  );
}

export default ProductList;
