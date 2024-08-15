import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import CreatePosts from "../Components/CreatePosts";
import PostListings from "../Components/PostListings";
import styles from "./Home.module.css"
import Login from "./Login";

function Home() {
    const username = localStorage.getItem("username")
    const [user, setUser] = useState(username);
    const navigate = useNavigate();
 
    
    

    return (

        <>
        {user? (
        <div className = {styles.homeSection}>
        
        
            <h1>Welcome {username}!</h1>
            <PostListings/> 
            </div>) : (navigate("/react-social-media-ver2/login"))}
        </>);
}

export default Home;
