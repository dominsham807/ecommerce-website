import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'

import "./productDetails.scss"
import Spinner from '../../components/Spinner/Spinner'

const ProductDetails = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if(params?.slug) getProduct()
    }, [])

    const getProduct = async() => {
        try{
            const { data } = await axios.get(`http://localhost:4000/api/product/${params.slug}`)
            setProduct(data?.product)
            setLoading(false)
        } catch(error){
            console.log(error)
        }
    }

    return (
        <Layout title={"Product Details - Dominic Ecommerce"}>
            {loading ? <Spinner /> : (
                <div className="product-container">
                    <div className="product-left">
                        <Link to='/products'>
                            <button>Back</button>
                        </Link>
        
                        <img src={`http://localhost:4000/api/product/photo/${product._id}`} />
                    </div>
            
                    <div className="product-right">
                        <h1>Product Details</h1>
                        <h5>Name: {product.name}</h5>
                        <h5>{product.description}</h5>
                        <h5>Price: ${product.price}</h5>
                        <h5>Category: {product.category?.name}</h5>
                        <button>Add to Cart</button>
                    </div>
                
                </div>
            )}
            
        </Layout>
    )
}

export default ProductDetails