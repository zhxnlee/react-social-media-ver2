import React,{useState, useEffect} from "react"
import {Outlet,useNavigate} from "react-router-dom";
import Navigation from '../Components/Navigation'
import styles from "./Root.module.css"
import Login from "./Login"


function Root(){
    const username = localStorage.getItem("username")
    const [user, setUser] = useState(username);
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/react-social-media-ver2/login'); // Redirect to /login when the app starts
      }, [navigate]);
    return(
        
        
        <div className = {user? styles.root : styles.rootLogin}>
        
       
        {user &&
            <div className = {styles.navigation}>
                <Navigation/>
            </div>}

            <div className = {user? styles.Outlet : styles.outletLogin} >
                <Outlet/>
            </div> 
        </div> 
     
    )
}

export default Root