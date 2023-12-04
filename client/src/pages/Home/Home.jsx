import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { Checkbox, Radio } from "antd";
import { useNavigate } from "react-router-dom";
import { Prices } from "../../utils/Prices";
import logo from "../../assets/hero.jpg"
import axios from "axios";
import "./home.scss"
import { useAuth } from "../../context/auth";
import { useCart } from "../../context/cart";
import toast from "react-hot-toast";

const Home = () => {
    const navigate = useNavigate()
    const [cart, setCart] = useCart()
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])
    const [checked, setChecked] = useState([])
    const [radio, setRadio] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)

    const [auth, setAuth] = useAuth()

    console.log(cart)

    if(!auth.user){
        navigate('/login')
    }

    for (let product of products){
        if(cart.filter(item => item._id === product._id).length > 0){   
            product.isInCart = true
        }
    }

    const getCategories = async() => {
        try{
            const { data } = await axios.get('http://localhost:4000/api/category')
            setCategories(data.categories)
        } catch (error) {
            console.log(error);
        }
    }

    const getTotal = async() => {
        try{
            const { data } = await axios.get("http://localhost:4000/api/product/count")
            setTotal(data?.total)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getCategories()
        getTotal()
    }, [])


    const handleFilter = (value,id) => {
        let all = [...checked]
        if(value){
            all.push(id)
        } else{
            all = all.filter((c) => c !== id)
        }
        setChecked(all)
    }

    const getAllProducts = async() => {
        try{
            setLoading(true)
            const { data } = await axios.get("http://localhost:4000/api/product")
            setLoading(false)
            setProducts(data?.products)
            setTotal(data?.products?.length)
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

   
    const filterProducts = async() => {
        try{
            const { data } = await axios.post("http://localhost:4000/api/product/filter",{
                checked, radio 
            })
            setProducts(data?.products)
            setTotal(data?.products?.length)
        } catch (error) {
            console.log(error);
        }
    }

   

    useEffect(() => {
        if(checked.length || radio.length){
            filterProducts()
        } else{
            getAllProducts()
        }
    }, [checked, radio])




    
    return (
        <Layout title={"Dominic Ecommerce"}>
            <div className="hero">
                <div className="hero-left">
                    <h1>Dominic E-Commerce</h1>
                    <p>
                        Crafted on the MERN Stack, our E-Commerce store embodies simplicity
                        and sophistication. Merging MongoDB, Express.js, React, and Node.js,
                        this platform seamlessly unites powerful database management, robust
                        back-end processes, dynamic front-end interfaces, and efficient
                        server-side operations. Through this convergence, we've established
                        a feature-rich and user-friendly online store that ensures seamless
                        shopping experiences across a wide array of products.
                    </p>
                </div>
                <div className="hero-right">
                    <img src={logo} alt="" />
                </div>
            </div>

            <div className="home">
                <div className="left">
                    <h4>Filter By Category</h4>
                    <div className="cat-filter">
                        {categories?.map((category, index) => (
                            <Checkbox className="checkbox-option" key={index}
                            onChange={(e) => handleFilter(e.target.checked, category._id)}>
                                {category.name}
                            </Checkbox>
                        ))}
                        {/* <Checkbox className="checkbox-option">Apple</Checkbox>
                        <Checkbox className="checkbox-option">Huawei</Checkbox>
                        <Checkbox className="checkbox-option">Xiaomi</Checkbox>
                        <Checkbox className="checkbox-option">Samsung</Checkbox>
                        <Checkbox className="checkbox-option">iPhone</Checkbox> */}
                    </div>
                    <h4>Filter By Price</h4>
                    <div className="cat-filter">
                        <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                            {Prices?.map((price, index) => (
                                <div key={index}>
                                    <Radio className="radio-option" value={price.array}>{price.name}</Radio>
                                </div>
                            ))}
                        </Radio.Group>
                    </div>
                    <div className="cat-filter">
                        <button className="reset-btn" onClick={() => window.location.reload()}>
                            Reset Filters
                        </button>
                    </div>
                </div>

                <div className="right">
                    <div className="info-container">
                        <h1>All Products</h1>
                        <h5>Total Records: {total}</h5>
                    </div>
                 
                    <div className="card-container">
                        {products?.map((product, index) => (
                            <div className="product-card" key={index}>
                                <img src={`http://localhost:4000/api/product/photo/${product._id}`} />
                                <div className="card-body">
                                    <h3 className="card-title">{product.name}</h3>
                                    <p className="card-price">${product.price}</p>
                                </div>
                                <div className="card-btn">
                                    <button onClick={() => navigate(`/product/${product.slug}`)}>
                                        More Details 
                                    </button>
                                  
                                    {/* <button onClick={() => {
                                        setCart([...cart, product])
                                        localStorage.setItem(
                                            "cart",
                                            JSON.stringify([...cart, product])
                                        )
                                        toast.success("Item added to cart")
                                    }}>
                                        Add to Cart
                                    </button> */}
                                    {product.isInCart === true ? (
                                        <button disabled>
                                            Included
                                        </button>
                                    ) : (
                                        <button onClick={() => {
                                            setCart([...cart, {...product, quantity: 1}])
                                            localStorage.setItem(
                                                "cart",
                                                JSON.stringify([...cart, {...product, quantity: 1}])
                                            )
                                            toast.success("Item added to cart")
                                        }}>
                                            Add to Cart
                                        </button>
                                    )}
                                      
                                 
                                       
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Home