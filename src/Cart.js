import React from 'react';
import { Link } from 'react-router-dom';
import './Moon.css';

function Cart({ cart, removeFromCart }) {

  
  // Funkcija, skaičiuojanti bendrą sumą
  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  };

  return (
    <div className="cart-page">
      <header>
        <h1>Your Shopping Cart</h1>
      </header>
      
      <main>
        <h2>Your Cart</h2>
        {cart.length > 0 ? (
          <>
            {cart.map((item) => (
              <div className="cart-item" key={item.product.id}>
                <h3>{item.product.name}</h3>
                <p>Quantity: {item.quantity}</p>
                <button onClick={() => removeFromCart(item.product.id)}>Remove</button>
              </div>
            ))}
            {/* Rodo bendrą sumą */}
            <div className="cart-total">
              <h3>Total: ${calculateTotal().toFixed(2)}</h3> {/* Suma su 2 dešimtainiais skaičiais */}
            </div>
          </>
        ) : (
          <p>Your cart is empty</p>
        )}
        <Link to="/Products">
          <button className="page-button">Back to Products</button>
        </Link>
      </main>
      
    </div>
  );
}

export default Cart;
