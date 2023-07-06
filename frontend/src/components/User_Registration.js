import axios from 'axios';
import React, { useState } from 'react'
import "./User_Registration.css" // Import the CSS file
export const User_Registration = () => {
    const [userData,setUserData] = useState({
        name: "",
        email: "",
        password: "",
    });



    const handleInputChange = (event) => {
        const {name,value } = event.target;
        console.log(name,value)
        setUserData((prevUserData) => ({
            ...prevUserData,
            [name]:value
        }));

    } 

    const handleSubmit = async (event) =>{
        event.preventDefault();
        console.log(userData)
        try{
            const response = await axios.post("http://localhost:5000/api/users", userData);
            setUserData({
                name: "",
                email: "",
                password: "",
            })
        } catch(error) {
            console.error(error)
        }
        

    }

  return (
    <div className='container'>
        <div>User_Registration</div>

        <form className='form' onSubmit={handleSubmit}>
            <label>User Name:</label>
            <input
                type='text'
                id='name'
                name='name'
                value={userData.name}
                onChange={handleInputChange}
            />
            <label>Email:</label>
            <input
                type='email'
                id='email'
                name='email'
                value={userData.email}
                onChange={handleInputChange}
            />
            <label>Password:</label>
            <input
                type='password'
                id='password'
                name='password'
                value={userData.password}
                onChange={handleInputChange}
            />
            <button type='submit'>Submit</button>
        </form>
    </div>
    
    
  )
}
