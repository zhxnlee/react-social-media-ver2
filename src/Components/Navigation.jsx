import React from "react";
import styles from "./Navigation.module.css"
import { useNavigate,NavLink,useLocation } from "react-router-dom";


function Navigation(){

    const loggedInUser = localStorage.getItem("username")
    const location = useLocation();
    function handleLogout() {
        localStorage.removeItem("username");
        // Set state and redirect to login
        navigate("/login");
    }
    const navigate = useNavigate();

    return (
        <>
        <div className ={styles.navigationSection} >

            <div className = {styles.logo}>
                <h1 onClick = {() =>navigate("/home")}>ZX</h1>
            </div>
            <div className = {styles.navigationList}>
                <ul>
                    <li><NavLink to  = "/home" className ={({isActive}) =>(isActive ? styles.active: undefined )}>Home</NavLink></li>
                    <li ><NavLink to  = {`/profile/${loggedInUser}`} className ={({isActive}) =>(isActive ? styles.active: undefined )}>Profile</NavLink></li>
                    <li onClick ={handleLogout} className = {styles.logoutButton}><NavLink >Logout</NavLink></li>
                </ul>
            </div>
        </div>
       
        </>
    )

}

export default Navigation;