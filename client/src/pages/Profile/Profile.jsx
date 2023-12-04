import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/auth'
import Layout from '../../components/Layout/Layout'
import "./profile.scss"
import UserMenu from '../../components/Layout/UserMenu/UserMenu'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
    const [auth, setAuth] = useAuth()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [photo, setPhoto] = useState("")
    const [photoPreview, setPhotoPreview] = useState('')
    const [photoName, setPhotoName] = useState("")
    const navigate = useNavigate()

    console.log(photo.path)

    useEffect(() => {
        const { name, email, phone, address, photo } = auth?.user
        setName(name);
        setPhone(phone);
        setEmail(email);
        setAddress(address);
        setPhoto(photo)

        if(photo){
            setPhotoName(photo.filename)
            setPhotoPreview(`http://localhost:4000/profile/${photo.filename}`)
        }
    }, [auth?.user])

    const handlePhotoChange = (e) => {
        const file = e.target.files[0]
        console.log(file)
        setPhoto(file)
        setPhotoName(file.name)
        setPhotoPreview(URL.createObjectURL(file))
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        const data = new FormData()
        data.append("name", name)
        data.append("email", email)
        data.append("password", password)
        data.append("phone", phone)
        data.append("address", address)
        if(photo){
            data.append("photo", photo)
        }
  
        try{
            const res = await axios.put("http://localhost:4000/api/auth/profile", data)
            if(res.data.success) {
                toast(res.data.message,{type: "success", draggable:false})
                navigate("/")
            } else {
                toast(res.data.message,{type: "error", draggable:false})
            }
        } catch(error){
            console.log(error);
            toast("Something Went Wrong",{type: "error", draggable:false})
        }
    }

    return (
        <Layout title={"Profile - Dominic Ecommerce"}>
            <div className="profile-container">
            <div className="row-left">
                        <UserMenu />
                    </div>
                    <div className="row-right">
                        <div className="update">
                            <form onSubmit={handleSubmit}>
                                <h1>User Profile</h1>
                                <div className="input-container">
                                    <div className='input-photo'>
                                        {photoPreview && (
                                            <div>
                                                <img src={photoPreview} alt='Profile photo' />
                                                {/* <img src={URL.createObjectURL(photo)} alt='Profile photo' /> */}
                                            </div>
                                        )}
                                        <div className="">
                                            <label>
                                                {photoName && photoName}
                                                <input type='file' name='photo' accept='image/*'
                                                onChange={handlePhotoChange} hidden />
                                            </label>
                                        </div>
                                    </div>
                                    
                                   
                                    <div className='input-fields'>
                                        <span>Name: </span> <input type='text' placeholder='Enter your name' value={name}
                                        onChange={(e) => setName(e.target.value)} />
                                    </div> 
                                    <div className='input-fields'>
                                        <span>Email: </span> <input type='email' placeholder='Enter your email address' value={email}
                                        onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    <div className='input-fields'>
                                        <span>Phone: </span> <input type='text' placeholder='Enter your phone no.' value={phone}
                                        onChange={(e) => setPhone(e.target.value)} />
                                    </div>
                                    <div className='input-fields'>
                                        <span>Address: </span> <input type='text' placeholder='Enter your address' value={address}
                                        onChange={(e) => setAddress(e.target.value)} />
                                    </div>
                                    <div className='input-fields'>
                                        <span>Password: </span>  <input type='password' placeholder='Enter your password' value={password}
                                        onChange={(e) => setPassword(e.target.value)} />
                                    </div> 
                                    <button type="submit">Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                <div className="row">
                    
                </div>
            </div>
        </Layout>
    )
}

export default Profile