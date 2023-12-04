import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { Link } from "react-router-dom";

import "./categories.scss"
import Spinner from "../../components/Spinner/Spinner";

const Categories = () => {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)

    const getCategories = async() => {
        try{
            setLoading(true)
            const {data} = await axios.get('http://localhost:4000/api/category')
            setCategories(data.categories)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error);
        }
    }

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <Layout title={"All Categories - Dominic Ecommerce"}>
            <div className="container">
                <h1>List of Categories</h1>
                
                    {loading ? <Spinner /> :(
                        <div className="categories">
                            {categories.map((category) => (
                                <Link className="cat-link" to={`/category/${category.slug}`}>
                                    <div className="cat-card" key={category._id}>
                                        <img src={`http://localhost:4000/api/category/photo/${category._id}`} className="cat-img" />
                                        <span className="cat-name">{category.name}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                    
                
            </div>
        </Layout>
    )
}

export default Categories