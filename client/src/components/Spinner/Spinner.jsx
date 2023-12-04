import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import "./spinner.scss"

const Spinner = () => {
    const [count, setCount] = useState(3)
    const navigate = useNavigate()

    return (
        <>
        <div className="body">
            <div className="loader">Loading...</div>
            {/* <h1 className="text-center">Redirecting you in {count} seconds</h1> */}
        </div>
        </>
    )
}

export default Spinner