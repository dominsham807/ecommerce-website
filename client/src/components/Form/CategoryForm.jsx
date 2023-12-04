import React, { useState } from 'react'

import "./categoryForm.scss"

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  


    return (
        <>
        <form onSubmit={handleSubmit}>
            <input type='text' placeholder='Enter New Category' value={name} onChange={(e) => setName(e.target.value)} />
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
        </form>
        </>
    )
}

export default CategoryForm