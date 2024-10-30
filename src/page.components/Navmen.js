import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../services/CartContext';
import '../styles/Moon.css';



function Navmen({ currentUser, logOut, showModeratorBoard, showAdminBoard}) {
  const {cart} = useContext(CartContext);
  
  const getTotalItemsInCart = ()=> {
    return (cart || []).reduce((total,item) => total + item.quantity, 0);
  };
  const handleLogout = async (event) => {
    event.preventDefault(); // Prevent the page from refreshing
    await logOut(); // Call the logout function
    
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
            Cart ({getTotalItemsInCart()})
          </Link>
        </li>

        {showModeratorBoard && (
          <li>
            <Link to="/mod">Moderator Board</Link>
          </li>
        )}

        {showAdminBoard && (
          <li>
            <Link to="/admin">Admin Board</Link>
          </li>
        )}
      </ul>
      <div className="navbar-auth">
        {currentUser && currentUser.username ? (
          <>
            <li>
              <Link to="/profile">{currentUser.username}</Link>
            </li>
            <li>
              {/* Use a button for logout to avoid default link behavior */}
              <Link to="/" onClick={handleLogout} className="auth-button">Log Out</Link>
            </li>
          </>
        ) : (
          <>
            <Link to="/login" className="auth-button">Login</Link>
            <Link to="/register" className="auth-button">Sign Up</Link>
          </>
        )}
        </div>
    </nav>
  );
}


export default Navmen;