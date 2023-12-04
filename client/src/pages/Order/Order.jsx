import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { useAuth } from '../../context/auth'

import "./order.scss"
import AdminMenu from '../../components/Layout/AdminMenu/AdminMenu'
import axios from 'axios'

const Order = () => {
    const [auth, setAuth] = useAuth()
    const [orders, setOrders] = useState([])

    const getOrders = async() => {
        try{
            const { data } = await axios.get("http://localhost:4000/api/auth/orders")
            setOrders(data.orders)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if(auth?.token){
            getOrders()
        }
    },[auth?.token])

    console.log(orders)

    return (
        <Layout title={"Your Orders - Dominic Ecommerce"}>
            <div className="order-container">
                <div className="row">
                    <div className="row-left">
                        {auth.user.role === 1 ? <AdminMenu /> : ""}
                    </div>
                    <div className="row-right">
                        <div className="card">
                            <h1>Your Orders</h1>
                            {orders?.map((o, index) => {
                                return (
                                    <div>
                                        <table className='styled-table'>
                                            <thead>
                                                <tr>
                                                    <th width="10px" scope='col'>#</th>
                                                    <th scope='col'>Status</th>
                                                    <th width="220px" scope='col'>Products</th>
                                
                                                    <th scope='col'>Quantity</th>
                                                    <th scope='col'>Total Price</th> 
                                                </tr> 
                                            </thead>
                                            <tbody>  
                                                <tr>
                                                    <td width="10px">{index + 1}</td>
                                                    <td>{o.status}</td>
                                                    <td>
                                                        <ul>
                                                            {o?.products?.map((p,i) => (
                                                                <li>{p.name}</li>
                                                            ))}
                                                        </ul> 
                                                    </td>
                                      
                                                    <td>{o.quantity}</td>
                                                    <td>{o.total}</td>
                                                </tr>
                                            </tbody>
                                        </table>
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

export default Order