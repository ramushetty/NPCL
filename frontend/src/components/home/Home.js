import { useContext } from "react";
import { UserContext } from "../../UserContext";
import { useNavigate } from "react-router-dom";
import api from '../../Api'
import './Home.css'
export const Home = () => {
    const {user, logOut} = useContext(UserContext);
    const navigate = useNavigate()
    const handleLogout = async () => {
        const response = await api.post('/logout/')
        logOut();
        navigate("/api/login")
    }

  return (
    <div>
        <h1>
            Welcome to the Home Page
        </h1>
        { user.name && (
            <div> 
                <p>
                    Name: {user.name}
                </p>
                <p>
                    Email: {user.email}
                </p>
                <p>
                    e_rupee: {user.e_rupee}
                </p>
            </div>

        )}
        <button className="home-button" onClick={handleLogout}>LogOut</button>

    </div>
  )
}
