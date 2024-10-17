import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';
import AuthService from './services/auth.service';


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
          <Link to="/">Registration/Login</Link>
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
      {currentUser ? (
        <div className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to="/profile" className="nav-link">{currentUser.username}</Link>
          </li>
          <li className="nav-item">
            <a href="/login" className="nav-link" onClick={logOut}>LogOut</a>
          </li>
        </div>
      ) : (
        <div className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to="/login" className="nav-link">Login</Link>
          </li>
          <li className="nav-item">
            <Link to="/register" className="nav-link">Sign Up</Link>
          </li>
        </div>
      )}
    </nav>
  );
}

export default Navmen;