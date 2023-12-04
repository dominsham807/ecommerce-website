import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu/AdminMenu'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import "./createCategory.scss"


const CreateCategory = () => {
  const [categories, setCategories] = useState([])
  const [name, setName] = useState("")
  const [photo, setPhoto] = useState("")
  const navigate = useNavigate()

  console.log(photo)

  const handleCreate = async(e) => {
      e.preventDefault()
      try{
        const categoryData = new FormData()
        categoryData.append("name", name)
        categoryData.append("photo", photo)

        const { data } = await axios.post("http://localhost:4000/api/category", categoryData)
        if(data.success){
          toast.success("Product created successfully")
          navigate("/categories")
        }
      } catch(error){
          console.log(error)
          toast.error("Something went wrong")
      }
  }

  return (
    <Layout title={"Create Category - Dominic Ecommerce"}>
        <div className="container">
            <div className="row">
                <div className="row-left">
                    <AdminMenu />
                </div>
                <div className="row-right">
                  <div className="card">
                      <h1>Create New Category</h1>
                      <div className="form">
                        <form>
                            <div className="category-name-input">
                            Name: <input type='text' placeholder='Enter New Category' value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className='category-photo-input'>
                                <label>
                                    {photo ? photo.name : "Upload Photo"}
                                    <input type='file' name='photo' accept='image/*'
                                    onChange={(e) => setPhoto(e.target.files[0])} hidden />
                                </label>
                            </div>
                            <div>
                                {photo && (
                                    <div>
                                        <img src={URL.createObjectURL(photo)} alt='Product photo'
                                        height={"200px"} />
                                    </div>
                                )}
                            </div>
                            <button onClick={handleCreate}>Create Category</button>
                        </form>
                      </div>
                  </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default CreateCategory
