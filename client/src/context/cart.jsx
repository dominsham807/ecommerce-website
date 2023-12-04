import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext()

const CartProvider = ({ children }) => {
    const existingCartItems = localStorage.getItem("cart");
    const [cart, setCart] = useState(existingCartItems ? JSON.parse(existingCartItems) : [])
   

    useEffect(() => {
        if(existingCartItems){
            setCart(JSON.parse(existingCartItems));
        }
    }, [existingCartItems])

    console.log(cart)

    return (
        <CartContext.Provider value={[cart, setCart]}>
            {children}
        </CartContext.Provider>
    )
}

const useCart = () => useContext(CartContext)

export { useCart, CartProvider }