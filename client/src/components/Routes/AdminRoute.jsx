import { useEffect, useState } from "react"
import { useAuth } from "../../context/auth"
import axios from "axios"
import { Outlet } from "react-router-dom"
import Spinner from "../Spinner/Spinner"


export const AdminRoute = () => {
    const [ok, setOk] = useState(false)
    const [auth, setAuth] = useAuth()
    console.log(auth.token)


    useEffect(() => {
        const authCheck = async() => {
            const res = await axios.get("http://localhost:4000/api/auth/admin-auth")
            console.log(res)
            if(res.data.ok){
                setOk(true)
            } else{
                setOk(false)
            }
        }
        if(auth.token) authCheck()
    }, [auth.token])

    return ok ? <Outlet /> : <Spinner />
}