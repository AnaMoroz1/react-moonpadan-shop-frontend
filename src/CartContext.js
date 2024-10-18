import React, {createContext, useState} from "react";
 

export const CartContext = createContext();

export const CartProvider = ({ children}) => {
    const [cart, setCart] = useState([]);
    
    const addToCart = (product, quantity =1) => {
        const existingCartItem = cart.find(item => item.product.id === product.id);
        if (existingCartItem) {
            setCart(cart.map(item =>
                item.product.id ===  product.id
                ? { ...item, quantity: item.quantity + quantity }
                :item
            ));
        } else{
            setCart([...cart, {product, quantity }]);
        }
    };

    const removeFromCart = (productId) =>  {
        setCart(cart.filter(item => item.product.id !== productId));
    };

    const decreaseQuantity = (productId) => {
       setCart(cart.map(item => {
        if (item.product.id === productId && item.quantity> 1) {
            return {...item, quantity: item.quantity -1 };
        }
        return item;
       }));
    };

    return(
        <CartContext.Provider value= {{ cart, addToCart, removeFromCart, decreaseQuantity}}>
            {children}
        </CartContext.Provider>
    );
        
};