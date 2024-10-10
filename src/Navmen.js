import React from 'react';
import { Link } from 'react-router-dom';



function Navmen({ cart }) {
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
          <Link to="/cart">Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navmen;