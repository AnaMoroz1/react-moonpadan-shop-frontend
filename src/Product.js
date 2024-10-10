import React, { useState } from 'react';
import Attribute from './Attribute';
import './Moon.css'; // Importuojame Moon.css

function Product({ product, addToCart }) {
  // Stebime produkto kiekį
  const [quantity, setQuantity] = useState(0);

  // Funkcija, keičianti kiekį
  const handleQuantityChange = (event) => {
    setQuantity(Number(event.target.value)); // Paverčiame reikšmę į skaičių
  };

  return (
    <li className="product-item"> {/* Priskiriame className "product-item" */}
      <h2>{product.name}</h2> {/* H2 ir P elementams dabar taikys mažesnį margin */}
      <p>Category: {product.category}</p>
      <p>Description: {product.description}</p>
      <p>Price: ${product.price}</p>

      <h3>Lashes:</h3>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>a</th>
              <th>b</th>
            </tr>
          </thead>
          <tbody>
            {product.attributes.map(attr => (
              <Attribute key={attr.id} attribute={attr} />
            ))}
          </tbody>
        </table>
      </div> 

      {/* Pasirinkimo meniu kiekiui */}
      <label htmlFor="quantity-select">Quantity: </label>
      <select
        id="quantity-select"
        value={quantity}
        onChange={handleQuantityChange}
      >
        {/* Sukuriame reikšmes nuo 0 iki 9 */}
        {[...Array(10).keys()].map(num => (
          <option key={num} value={num +1}>
            {num +1}
          </option>
        ))}
      </select>

      {/* Mygtukas pridėti prekę į krepšelį */}
      <button className="add-to-cart" onClick={() =>  addToCart(product, quantity)
      }>
        Add to cart 
      </button>
    </li>
  );
}

export default Product;
