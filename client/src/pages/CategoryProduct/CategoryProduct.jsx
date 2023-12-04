import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Layout from '../../components/Layout/Layout'

import "./categoryProduct.scss"

const CategoryProduct = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState([])

    const getProductsByCategory = async() => {
        try{
            const { data } = await axios.get(`http://localhost:4000/api/product/category/${params.slug}`)
            setProducts(data?.products)
            setCategory(data?.category)
        } catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        if(params?.slug) getProductsByCategory()
    }, [params?.slug])

    console.log(products)
    console.log(category)

    return (
        <div>
            <Layout title={"Category Products - Dominic Ecommerce"}>
                <div className="container">
                    <div className="category-info">
                        <h3>Category: {category?.name}</h3>
                        <h6>Total Records: {products.length}</h6>
                    </div>
                    <div className="product-container">
                        {products?.map((p) => (
                            <div className="product-card" key={p._id}>
                                <img src={`http://localhost:4000/api/product/photo/${p._id}`} alt={p.name} />
                                <div className="product-info">
                                    <h5 className="card-name">{p.name}</h5>
                                    <h5 className='card-price'>${p.price}</h5>
                                </div>
                                <div className="btn">
                                    <button>
                                        More Details 
                                    </button>
                                    <button>
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default CategoryProduct