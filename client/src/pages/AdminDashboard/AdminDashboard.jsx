import React from 'react'
import Layout from '../../components/Layout/Layout'
import { Link, useNavigate } from 'react-router-dom'
import AdminMenu from '../../components/Layout/AdminMenu/AdminMenu'
import "./adminDashboard.scss"
import { useAuth } from '../../context/auth'


const AdminDashboard = () => {
    const [auth,setAuth] = useAuth()
    return (
        <Layout title={"Admin Dashboard - Dominic Ecommerce"}>
            <div className="admin-dashboard">
                <div className="admin-container">
                    <div className="row">
                        <div className="row-left">
                            <AdminMenu />
                        </div>
                        <div className="row-right">
                            <h1>Personal Info</h1>
                            <div className="card">
                                <h3>Admin Name: {auth?.user?.name}</h3>
                                <h3>Admin Email: {auth?.user?.email}</h3>
                                <h3>Admin Contact: {auth?.user?.phone}</h3>
                                <Link to='/dashboard/user/profile' className='profile-btn'>
                                    Update Profile
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        </Layout>
    )
}

export default AdminDashboard
