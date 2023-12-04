import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import toast from "react-hot-toast"
import logo from "../../../assets/logo.png"
import SearchInput from "../../SearchForm/SearchInput";
import { Badge } from "antd"

import "./header.scss"
import { useAuth } from "../../../context/auth";
import useCategory from "../../../hooks/useCategory";
import { useCart } from "../../../context/cart";

const Header = () => {
    const [auth, setAuth] = useAuth()
    const [cart] = useCart()
    const categories = useCategory()
    const [cartTotal, setCartTotal] = useState(0)

    useEffect(() => {
        if(cart){
            setCartTotal(cart.reduce((total, item) => total + item.quantity, 0))
        } 
    }, [cart])
   
    
    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: ""
        })
        localStorage.removeItem("auth")
        toast.success("Logout Success")
    }

    return (
        <>
        <div className="header">
            <div className="header-left">
                <Link to="/">
                    <img src={logo} alt="" />
                </Link>
            </div>
            <div className="header-center">
                <SearchInput />
            </div>
            <div className="header-right">
                <ul className="navbar">
                  
                    <li className="navbar-item">
                        <NavLink className="link" to="/">
                            Home
                        </NavLink>
                    </li>
                    

                    {!auth.user ? (
                        <>
                        <li className="navbar-item">
                        <NavLink className="link" to="/register">
                                Register
                            </NavLink>
                        </li>
                        <li className="navbar-item">
                            <NavLink className="link" to="/login">
                                Login
                            </NavLink>
                        </li>
                        </>
                    ) : (
                        <>
                        <li className="navbar-item">
                            <NavLink className="link" to="/products">
                                Products
                            </NavLink>
                        </li>

                        <ul className="dropdown">
                            <Link className={"link"} to="/categories">
                                Categories
                            </Link>
                            <li className="dropdown-content">
                                <Link className={"d-link"} to="/categories">
                                    All Categories
                                </Link>
                                {categories?.map((category) => (
                                    <Link className={"d-link"} to={`/category/${category.slug}`} key={category._id}>
                                        {category.name}
                                    </Link>
                                ))}
                            </li>
                        </ul>
                        <ul className="dropdown">
                            <NavLink className={"link"} to="#">
                                {auth?.user?.name}
                            </NavLink>
                            <li className="dropdown-content">
                                <NavLink className={"d-link"} to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}>
                                    Dashboard
                                </NavLink>
                                <NavLink className={"d-link"} to={"/login"} onClick={handleLogout}>
                                    Logout
                                </NavLink>
                            </li>
                        </ul>
                        <li className="navbar-item">
                            <Badge count={cartTotal} showZero>
                                <NavLink className="link" to="/cart">
                                    Cart
                                </NavLink>
                            </Badge>
                        </li>
                        </>
                    )}
                    
                    
                </ul>
            </div>
        </div>
        </>
    )
}

export default Header