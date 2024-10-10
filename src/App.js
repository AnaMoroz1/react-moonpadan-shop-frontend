import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Home';
import ProductList from './ProductList';
import Cart from './Cart';
import './Moon.css'; // Importuojame Moon.css

function App() {
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

  return (
    <Router>
      <div className="wrapper"> {/* Naudojame wrapper klasę */}
        {/* Sukuriame navigacijos meniu */}
        <nav className="navbar"> {/* Pridedame .navbar klasę, jei norime stiliaus */}
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/cart">Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})</Link> {/* Rodome bendrą prekių kiekį */}
            </li>
          </ul>
        </nav>

        {/* Pagrindinis turinys */}
        <main className="content"> {/* Naudojame .content klasę */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/products" 
              element={<ProductList addToCart={addToCart} />} 
            />
            <Route 
              path="/cart" 
              element={<Cart cart={cart} removeFromCart={removeFromCart} />} 
            />
          </Routes>
        </main>

        {/* Puslapio apatinė dalis (footer), fiksuota apačioje */}
        <footer className="footer">
          <p>Address: 1234 Beauty St, Moon City, 56789</p>
          <p>Contact: info@moonpadan.com | +123-456-7890</p>
          <p>&copy; 2024 Moonpadan. All Rights Reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
