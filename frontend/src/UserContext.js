import React, {createContext,useState,useEffect} from "react";
import api from './Api';

export const UserContext = createContext()

export const UserProvider = ({children}) => {
    const [user,setUser] = useState({
        username:"",
        email:"",
        e_rupee:""
    });

    const updateUser = (userData) => {
        setUser(userData)
    }
    const logOut = () => {
        setUser({
            username:"",
            email:"",
            e_rupee:""
        })
    }
    useEffect(() => {
        const fetchuser = async () => {
            try {
                const response = await api.get('/user');
                const userData = response.data;
                setUser(userData)
            } catch(e) {
                console.error(e)
            }
        };
        fetchuser();
    }, []);

    return (
        <UserContext.Provider value={{user,updateUser,logOut}}>
            {children}
        </UserContext.Provider>
    )




}