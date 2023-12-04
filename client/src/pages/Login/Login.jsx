import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import './login.scss'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import { useAuth } from '../../context/auth'
import { useLocation, useNavigate } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [auth, setAuth] = useAuth()

    const navigate = useNavigate()
    const location = useLocation()
    // console.log(location)

    useEffect(() => {
        if(auth){
            navigate('/')
        }
    }, [auth])

    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            const res = await axios.post("http://localhost:4000/api/auth/login",{
                email, password
            })
            if(res.data.success){
                toast.success(res.data && res.data.message)
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token 
                })
                localStorage.setItem("auth", JSON.stringify(res.data))
                navigate("/")
            }
        } catch(error){
            console.log(error);
            toast.error("Something Went Wrong");
        }
    }
    
    return (
        <Layout title={"Login - Dominic Ecommerce"}>
            <div className="login">
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <div className="login-container">
                        <input type='email' placeholder='Enter your email address' value={email} 
                        onChange={(e) => setEmail(e.target.value)} required />
                        <input type='password' placeholder='Enter your password' value={password} 
                        onChange={(e) => setPassword(e.target.value)} required />
                        <button className='login-btn' type='submit'>Login</button>
                        <a className='forgot-password-btn' type='button'>Forgot Password?</a>
         
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default Login