import React,{useState, useContext} from "react";
import {useNavigate} from 'react-router-dom';
import { UserContext } from "../../UserContext";

import api from '../../Api';

import './LoginForm.css'

export const LoginForm = () => {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate()
    const {updateUser} = useContext(UserContext)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            email,
            password
        }

        try{
            const response = await api.post("/login",payload)
            console.log(response.data)
            updateUser(response.data)
            navigate('/api/home')

        } catch(e) {
            console.error("An error occured during login")
        }


    }
  return (
    <div className="container">
        <h1 className="login-heading">Login</h1>
        <form className="login-form" onSubmit={handleSubmit}>
            <input
                className="login-input"
                type="email"
                placeholder="email"
                value={email}
                onChange={ (e) => setEmail(e.target.value)}
            />
            <input
                className="login-input"
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className="login-button" type="submit" >Login</button>
        </form>
    </div>
    
  )
}
