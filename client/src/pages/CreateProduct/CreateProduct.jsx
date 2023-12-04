import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu/AdminMenu'

import "./createProduct.scss"
import { Select } from 'antd'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const { Option } = Select

const CreateProduct = () => {
    const [categories, setCategories] = useState([])
    const [name, setName] = useState("")
    const [photo, setPhoto] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const [quantity, setQuantity] = useState("")
    const [shipping, setShipping] = useState("")
    const navigate = useNavigate()

    const getAllCategories = async() => {
        try{
            const { data } = await axios.get("http://localhost:4000/api/category")
            if(data?.success){
                setCategories(data?.categories)
            }
        } catch(error){ 
            console.log(error)
        }
    }

    useEffect(() => {
        getAllCategories()
    }, [])

    const handleCreate = async(e) => {
        e.preventDefault()
        try{
            const productData = new FormData()
            productData.append("name", name)
            productData.append("description", description);
            productData.append("price", price);
            productData.append("quantity", quantity);
            productData.append("category", category);
            productData.append("photo", photo);
            productData.append("shipping", shipping);

            const { data } = await axios.post("http://localhost:4000/api/product", productData)
            console.log(data)
            if(data.success){
                toast.success(data?.message);
                navigate("/products")
            } else{
                console.log(data?.message)
                toast.error(data?.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }

    return (
        <Layout title={"Create Product - Dominic Ecommerce"}>
            <div className="create-container">
                <div className="row">
                    <div className="row-left">
                        <AdminMenu />
                    </div>
                    <div className="row-product">
                        <div className="card-product">
                            <h1>Create Product</h1>
                            <div className="category">
                                <Select className='select' bordered={false}
                                placeholder={"Select a category"} size='large'
                                showSearch onChange={(value) => setCategory(value)}>
                                    {categories?.map((c) => (
                                        <Option key={c._id} value={c._id}>
                                            {c.name}
                                        </Option>
                                    ))}
                                </Select>
                                <div className="photo">
                                    <label>
                                        {photo ? photo.name : "Upload Photo"}
                                        <input type='file' name='photo' accept='image/*'
                                        onChange={(e) => setPhoto(e.target.files[0])} hidden />
                                    </label>
                                </div>
                                <div>
                                    {photo && (
                                        <div>
                                            <img src={URL.createObjectURL(photo)} alt='' 
                                            height={'200px'} />
                                        </div>
                                    )}
                                </div>
                                <div className="product-input">
                                    <label>Name:</label>
                                    <input type='text' value={name} placeholder='Enter Product Name'
                                    onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="product-input">
                                    <label>Description:</label>
                                    <textarea value={description} placeholder='Enter Product Description'
                                    onChange={(e) => setDescription(e.target.value)} rows="4" cols="50" />
                                </div>
                                <div className="product-input">
                                    <label>Price:</label>
                                    <input type='number' value={price} placeholder='Enter Product Price'
                                    onChange={(e) => setPrice(e.target.value)} />
                                </div>
                                <div className="product-input">
                                    <label>Quantity:</label>
                                    <input type='number' value={quantity} placeholder='Enter Product Quantity'
                                    onChange={(e) => setQuantity(e.target.value)} />
                                </div>
                                <div className="product-input">
                                    <label>Shipping:</label>
                                    <Select className='shipping-select' bordered={false}
                                    placeholder={"Select shipping"} size='large'
                                    showSearch  onChange={(value) => setShipping(value)}>
                                        <Option value="0">No</Option>
                                        <Option value="1">Yes</Option>
                                    </Select>
                                </div>
                                <div className="product-input">
                                    <button onClick={handleCreate}>Create Product</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateProduct