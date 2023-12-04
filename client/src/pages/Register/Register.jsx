import React, { useState, useEffect } from 'react'
import axios from "axios"
import Layout from '../../components/Layout/Layout'

import "./register.scss"
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [answer, setAnswer] = useState("")
    const [photo, setPhoto] = useState(null)
    const navigate = useNavigate()

    const data = new FormData()
    data.append("name", name)
    data.append("email", email)
    data.append("password", password)
    data.append("phone", phone)
    data.append("address", address)
    data.append("answer", answer)
    if(photo){
        data.append("photo", photo)
    }
    
    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            const res = await axios.post("http://localhost:4000/api/auth/register", data)
            if(res.data.success) {
                toast(res.data.message,{type: "success", draggable:false})
                navigate("/login")
            } else {
                toast(res.data.message,{type: "error", draggable:false})
            }
        } catch(error){
            console.log(error);
            toast("Something Went Wrong",{type: "error", draggable:false})
        }
    }

    useEffect(() => {
        if(auth){
            navigate('/')
        }
    }, [auth])

    return (
        <Layout title={"Register - Dominic Ecommerce"}>
            <div className="register-container">
                <form onSubmit={handleSubmit}>
                    <h1>Register new account</h1>
                    <div className="input-container">
                        <div className='input-photo'>
                            {photo && (
                                <div>
                                    <img className='input-photo-field' src={URL.createObjectURL(photo)} alt='Product photo' />
                                </div>
                            )}
                            <div className="">
                                <label>
                                    {photo ? photo.name : "Upload Photo"}
                                    <input type='file' name='photo' enctype="multipart/form-data" accept='image/*'
                                    onChange={(e) => setPhoto(e.target.files[0])} hidden />
                                </label>
                            </div>
                        </div>
                        <input type='text' placeholder='Enter your name' value={name} 
                        onChange={(e) => setName(e.target.value)} required />

                        <input type='email' placeholder='Enter your email address' value={email} 
                        onChange={(e) => setEmail(e.target.value)} required />

                        <input type='text' placeholder='Enter your phone number' value={phone} 
                        onChange={(e) => setPhone(e.target.value)} required />

                        <input type='text' placeholder='Enter your address' value={address} 
                        onChange={(e) => setAddress(e.target.value)} required />

                        <input type='password' placeholder='Enter your password' value={password} 
                        onChange={(e) => setPassword(e.target.value)} required />

                        <input type='text' placeholder='What is your favourite sports?' value={answer} 
                        onChange={(e) => setAnswer(e.target.value)} required />

                        <button type='submit'>Register</button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}

export default Register