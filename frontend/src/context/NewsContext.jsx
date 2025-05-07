import { createContext, useState } from "react";


export const NewsContext = createContext()

const NewsContextProvider = (props)=>{

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false)
    const [query, setQuery] = useState('India')
    const [userData, setUserData] = useState(false)

    const value = {
        query,
        setQuery,
        token, setToken,
        userData, setUserData,
        backendUrl
    }

    

    return (
        <NewsContext.Provider value={value}>
            {props.children}
        </NewsContext.Provider>
    )

}

export default NewsContextProvider
