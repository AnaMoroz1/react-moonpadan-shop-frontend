import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';
import './Moon.css';


function Cart() {
const { cart, removeFromCart, decreaseQuantity} = useContext(CartContext);
  
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
      
        {cart.length > 0 ? (
          <>
            {cart.map((item) => (
              <div className="cart-item" key={item.product.id}>
                <h3>{item.product.name}</h3>
                <p>Price : €{item.product.price}</p>
                <p>Quantity: {item.quantity}</p>

                <button
                onClick={() => decreaseQuantity (item.product.id)}
                disabled={item.quantity <= 1} //jeigu kiekis maziau uz 1 button neveiks
                >Decrease Quantity
                </button>

                <button onClick={() => removeFromCart(item.product.id)}>Remove</button>
              </div>
            ))}
            {/* Rodo bendrą sumą */}
            <div className="cart-total">
              <h3>Total: €{calculateTotal().toFixed(2)}</h3> {/* Suma su 2 dešimtainiais skaičiais */}
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
