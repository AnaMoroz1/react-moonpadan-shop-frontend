import React, { useEffect, useState } from 'react';
import Product from './Product';
import './Moon.css'; // Importuojame Moon.css

function ProductList({ addToCart }) {
  const [products, setProducts] = useState([]); /*Čia naudojame React „state“ valdymą. products
                                                 – tai būsena, kurioje saugome produktų sąrašą. 
                                                 Iš pradžių tai yra tuščias masyvas. setProducts 
                                                 – funkcija, skirta atnaujinti produktų sąrašą.*/

  useEffect(() => {  /*Šis hookas paleidžiamas, kai komponentas pirmą kartą užkraunamas */
    fetch('http://localhost:8080/api/products')
      .then(response => response.json()) /*Konvertuojame atsakymą iš API į JSON formatą.*/ 
      .then(data => setProducts(data));  /*Kai gauname duomenis iš serverio, šiuos duomenis priskiriame būsenai (products)*/
  }, 
  []);

  return (
    <div className="product-list-container">
      <h1>Product List</h1>
      <div className="product-grid">
        {products.map(product => (   /*Pereiname per visus produktus, esančius products būsenoje. */
          <div key={product.id} className="product-item">
            <Product product={product} addToCart={addToCart} />     {/*Kiekvienam produktui perduodame atskirą „Product“ komponentą su jo duomenimis (product) ir funkcija prekei pridėti į krepšelį (addToCart). */}
          </div>
        ))}
      </div>
  
    </div>
  );
}

export default ProductList;
