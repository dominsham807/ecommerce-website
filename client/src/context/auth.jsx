import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const data = localStorage.getItem("auth")
    const [auth, setAuth] = useState(data ? JSON.parse(data) :{
        user: null,
        token: ""
    })

    axios.defaults.headers.common["Authorization"] = auth?.token

    useEffect(() => { 
        if(data){
            const parseData = JSON.parse(data)
            setAuth({
                ...auth,
                user: parseData.user,
                token: parseData.token
            })
        }
    }, [data])

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext)

export { useAuth, AuthProvider }