import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/auth'
import { useCart } from '../../context/cart'
import Layout from '../../components/Layout/Layout'
// import DropIn from "braintree-web-drop-in-react"
import "./cartPage.scss"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify'

const CartPage = () => {
    const [auth, setAuth] = useAuth()
    const [cart, setCart] = useCart()
    const [clientToken, setClientToken] = useState("")
    const [instance, setInstance] = useState("");
    const [loading, setLoading] = useState(false)
    
    // const [cartPrice, setCartPrice] = useState(0)
    // // const cartPrice = cart.reduce((total, item) => total + item.price, 0)
    // console.log(cartPrice)

    const navigate = useNavigate()

    console.log(cart)

    const totalPrice = () => {
        try{
            let total = 0
            cart?.map((item) =>{
                total = total + (item.price*item.quantity)
            })
            return total
        } catch (error) {
            console.log(error);
        }
    }

    const removeCartItem = (pid) => {
        try{
            let myCart = [...cart]
            let index = myCart.findIndex((item) => item._id === pid)
            myCart.splice(index, 1)
            setCart(myCart)
            localStorage.setItem("cart", JSON.stringify(myCart))
        } catch(error){
            console.log(error)
        }
    }

    const getBraintreeToken = async() => {
        try{
            const { data } = await axios.get("http://localhost:4000/api/product/braintree/token")
            // setClientToken(data?.clientToken)
        } catch(error){
            console.log(error);
        }
    }

    const handlePayment = async() => {
        try{
            // setLoading(true)
            if(totalPrice() === 0){
                toast.error("Payment cannot be proceed with an empty cart")
                return
            } else{
                await axios.post("http://localhost:4000/api/product/braintree/payment", {
                    products: cart,
                    total: totalPrice(),
                    quantity: cart.length
                })
                navigate('/')
                localStorage.removeItem("cart")
                setCart([])
                toast.success("Payment success")
            } 
        } catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        getBraintreeToken()
    },[auth?.token])

    console.log(clientToken)

    return (
        <Layout title={"Cart - Dominic Ecommerce"}>
            <div className="cart-container">
                <div className="cart-detail">
                    <div className="cart-user">
                        <h1>{`Hello ${auth?.token && auth?.user?.name}`}</h1>
                        <h4>
                            {cart?.length ?
                            `You have ${cart?.length === 1 ? " 1 item" : `${cart.length} items`}  in you cart ${auth?.token ? "" :
                            "Please login to checkout"}` : "Your cart is empty"}
                        </h4>
                    </div>
                    <div className="cart-items">
                        {cart && cart?.map((p) => {
                            const itemPrice = p.quantity*p.price
                            // console.log(itemPrice)
                            return (
                                <div className="item" key={p._id}>
                                    <div className="item-product">
                                        <img src={`http://localhost:4000/api/product/photo/${p._id}`}
                                        alt={p.name} width={"250px"} height={"260px"} />
                                        <div className="item-detail">
                                            <h4>{p.name} x {p.quantity}</h4> 
                                            <p>{p.description}</p>
                                            <h4>Price: ${itemPrice}</h4>
                                            
                                            <div className="qtyBtns">
                                                <button className='increaseQtyBtn' onClick={(e) => {
                                                    e.preventDefault()
                                                    cart.map((c) => {
                                                        if(c._id === p._id){
                                                            p.quantity++
                                                        }
                                                    })
                                                    setCart([...cart ])
                                                    localStorage.setItem(
                                                        "cart",
                                                        JSON.stringify([...cart ])
                                                    ) 
                                                }}>
                                                    +
                                                </button>
                                                <button className='decreaseQtyBtn' onClick={(e) => {
                                                    e.preventDefault()
                                                    cart.map((c) => {
                                                         if(c._id === p._id){
                                                             p.quantity--
                                                         }
                                                    })
                                                     setCart([...cart ])
                                                     localStorage.setItem(
                                                         "cart",
                                                         JSON.stringify([...cart ])
                                                    ) 
                                                }}>
                                                    -
                                                </button>
                                            </div>
                                            <button onClick={() => removeCartItem(p._id)}>Remove</button>
                                            {/* <h4>Quantity: 1</h4> */}
                                        </div>
                                    </div>

                                    
                                </div>
                            )
                        })}
                    </div>
                </div>
                
     
                   
                <div className="checkout">
                        <h2>Cart Summary</h2>
                        <p>Total | Checkout | Payment</p>
                        <hr />
                        <h4>Total Price: {totalPrice()}</h4>
                        {auth?.user?.address ? (
                            <>
                            <div>
                                <h4>Current Address: {auth?.user?.address}</h4>
                                <button onClick={() => navigate("/dashboard/user/profile")}>
                                    Update Address
                                </button>
                                <button onClick={handlePayment}>
                                    Make Payment
                                </button>
                            </div>
                            </>
                        ):(
                            <>
                            <div>
                                {auth?.token ? (
                                    <>
                                    <button onClick={() => navigate("/dashboard/user/profile")}>
                                        Update Address
                                    </button>
                                    <button onClick={handlePayment}>
                                        Make Payment
                                    </button>
                                    </>
                                   
                                ) : (
                                    <button onClick={() => navigate("/login", { state: "/cart" })}>
                                        Please login to checkout
                                    </button>
                                )}
                            </div>
                            </>
                        )}
                   
                    </div>
                   
                </div>
        
        </Layout>
    )
}

export default CartPage
