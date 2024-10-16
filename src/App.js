import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import ShoppingCartController from './ShoppingCartController';
import Footer from './Footer';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Navmen from './Navmen';
import { CartProvider }  from './CartContext';

function App () {

return (
  <CartProvider>
  <Router>
  <div className="wrapper">
    <Navmen />
  {/* Pagrindinis turinys */}
  <main className="content"> {/* Naudojame .content klasę */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/products" 
              element={<ShoppingCartController show= "products"/>} /> 
            <Route 
              path="/cart" 
              element={<ShoppingCartController show="cart"/>}  />
          
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
    </CartProvider>
);
}

export default App;
