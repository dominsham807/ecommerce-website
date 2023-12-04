import React from 'react'
import "./search-input.scss"
import { useSearch } from '../../context/search'
import { useNavigate } from 'react-router-dom'

const SearchInput = () => {
  const [values, setValues] = useSearch()
  const navigate = useNavigate()
  
  return (
    <div>
        <form className='search-form'>
            <input type='text' placeholder='Search' />
            <button type='submit'>Search</button>
        </form>
    </div>
  )
}

export default SearchInput