import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';



function Navmen() {
  const {cart} = useContext(CartContext);
  
  const getTotalItemsInCart = ()=> {
    return cart.reduce((total,item) => total + item.quantity, 0);
  };
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="/cart">
          <i className='fab fa-opencart' style={{ fontSize: '24px', marginRight: '5px' }}></i>
         Cart  {/* Rodome bendrą prekių kiekį */}
         ({getTotalItemsInCart()})
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navmen;