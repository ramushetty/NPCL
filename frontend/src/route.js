import React from "react";

import {BrowserRouter, Routes,Route} from 'react-router-dom';


import { LoginForm } from "./components/loginform/LoginForm";
import { User_Registration } from "./components/User_Registration";
import { UserProvider } from "./UserContext";
import {Home}  from "./components/home/Home.js";
const AppRouter = () => {
    return (
        <BrowserRouter>

            <UserProvider>
                <Routes>
                    <Route path="/api/login" element={<LoginForm/>} />
                    <Route path="/api/registration" element={<User_Registration/>}/>
                    <Route path="/api/home" element={<Home/>}/>
                </Routes>

            </UserProvider>
            

        </BrowserRouter>
    )
}

export default AppRouter;