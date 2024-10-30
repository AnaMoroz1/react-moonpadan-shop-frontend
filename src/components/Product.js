import React, { useState } from 'react';
import Attribute from '../components/Attribute';
import '../styles/Moon.css'; 

function Product({ product, addToCart }) {

 // We monitor the quantity of the product
  const [quantity, setQuantity] = useState(1);

 // Function that changes the quantity
  const handleQuantityChange = (event) => {
    setQuantity(Number(event.target.value)); // Convert the value to a number
  };

  return (
    
    <div className="product-item"> 
   
      <h2>{product.name}</h2> {/* H2 and P elements will now have a smaller margin */}
      <p><strong>Category: </strong>{product.category}</p>
      <p><strong>Description: </strong>{product.description}</p>
      <p><strong>Price:</strong> €{product.price}</p>

      
      <div className="attribute-container">
         
            {product.attributes.map(attr => (
              <Attribute key={attr.id} attribute={attr} />
            ))}
      </div> 
      

      {/* Selection menu for quantity */}
      <label htmlFor="quantity-select">Quantity: </label>
      <select
        id="quantity-select"
        value={quantity}
        onChange={handleQuantityChange}
      >
        {/* We create values ​​from 0 to 9 */}
        {[...Array(10).keys()].map(num => (
          <option key={num} value={num +1}>
            {num +1}
          </option>
        ))}
      </select>

      {/* Add item to cart button */}
      <button className="add-to-cart" onClick={() =>  addToCart(product, quantity)
      }>
        Add to cart 
      </button>
    </div>

  );
}

export default Product;
