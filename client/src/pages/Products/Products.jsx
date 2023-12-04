import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu/AdminMenu'

import "./products.scss"
import axios from 'axios'
import { toast } from 'react-toastify'
import { useAuth } from '../../context/auth'
import { Link } from 'react-router-dom'

const Products = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [auth, setAuth] = useAuth()

  console.log(auth)

  const getAllProducts = async() => {
      try{
          setLoading(true)
          const { data } = await axios.get('http://localhost:4000/api/product')
          setProducts(data.products)
      } catch(error){
          console.log(error)
          toast.error("Something went wrong")
      }
  }

  useEffect(() => {
    getAllProducts()
  }, [])

  console.log(products)

  return (
    <Layout title={"All Products - Dominic Ecommerce"}>
        <div className="products__container">
            <div className="row">
                <div className="row-left">
                    {auth.user.role === 1 ? <AdminMenu /> : ""}
                </div>
                <div className="row-right">
                    <h1>Products List</h1>
                    <div className="products-container">
                        {products.map((p) => {

                            return (
                             
                                  <div className="product-card" key={p._id}>
                                      <img src={`http://localhost:4000/api/product/photo/${p._id}`} alt=''
                                      className='product-photo' />
                                      <div className="product-body">
                                          <h5>{p.name}</h5>
                                          <p>${p.price}</p>
                                          <Link to={`/product/${p.slug}`} className='product-button'>
                                              <button>More Details</button>
                                          </Link>
                                      </div>
                                  </div>
                            
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Products