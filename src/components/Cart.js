import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../services/CartContext';
import '../styles/Moon.css';


function Cart() {
const { cart =[], removeFromCart, decreaseQuantity} = useContext(CartContext);
  
  // Function that calculates the total
  const calculateTotal = () => {
    return cart.reduce((total, { product, quantity }) => total + product.price * quantity, 0);
  };

  return (
    <div className="cart-page">
      <header>
        <h1>Your Shopping Cart</h1>
      </header>
      
      <main>
      
        {cart.length > 0 ? (
          <>
            {cart.map((item) => (
              <div className="cart-item" key={item.product.id}>
                <h3>{item.product.name}</h3>
                <p>Price : €{item.product.price}</p>
                <p>Quantity: {item.quantity}</p>

                <button
                onClick={() => decreaseQuantity (item.product.id)}
                disabled={item.quantity <= 1} // If the quantity is less than 1 button will not work
                >Decrease Quantity
                </button>

                <button onClick={() => removeFromCart(item.product.id)}>Remove</button>
              </div>
            ))}
            {/* Show total */}
            <div className="cart-total">
              <h3>Total: €{calculateTotal().toFixed(2)}</h3> {/* Amount with 2 decimal places */}
            </div>
          </>
        ) : (
          <p>Your cart is empty</p>
        )}
        <Link to="/Products">
          <button className="page-button"><strong>Back to Products</strong></button>
        </Link>
        
      </main>
      
    </div>
  );
}

export default Cart;
