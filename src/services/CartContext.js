import React, {createContext, useState} from "react";
 
// Create a context for the shopping cart
export const CartContext = createContext();
// CartProvider component which will wrap the app or components that need access to the cart state
export const CartProvider = ({ children}) => {
 // State to hold the items in the cart, initially an empty array   
    const [cart, setCart] = useState([]);
 // Function to add items to the cart, with a default quantity of 1   
    const addToCart = (product, quantity =1) => {
        const existingCartItem = cart.find(item => item.product.id === product.id);
        if (existingCartItem) {
            // If the product exists in the cart, update its quantity
            setCart(cart.map(item =>
                item.product.id ===  product.id
                ? { ...item, quantity: item.quantity + quantity }
                :item
            ));
        } else{
            // If the product is not in the cart, add it with the specified quantity
            setCart([...cart, {product, quantity }]);
        }
    };
 // Function to remove an item from the cart by its product ID
    const removeFromCart = (productId) =>  {
        setCart(cart.filter(item => item.product.id !== productId));
    };
// Function to decrease the quantity of a specific product in the cart
    const decreaseQuantity = (productId) => {
       setCart(cart.map(item => {
        // Decrease the quantity if the product's quantity is greater than 1
        if (item.product.id === productId && item.quantity> 1) {
            return {...item, quantity: item.quantity -1 };
        }
        return item;
       }));
    };
// Provide the cart, and functions to modify the cart, to all child components
    return(
        <CartContext.Provider value= {{ cart: cart || [], addToCart, removeFromCart, decreaseQuantity}}>
            {children}
        </CartContext.Provider>
    );
        
};