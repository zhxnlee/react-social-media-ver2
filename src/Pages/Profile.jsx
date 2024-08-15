import React, { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import CreatePosts from "../Components/CreatePosts";
import PostListings from "../Components/PostListings";

import Login from "./Login";
import styles from "./Home.module.css"

function Profile(){
    const { username } = useParams();
    const loggedInUser = localStorage.getItem("username");
    const navigate = useNavigate();
    const [user,setUser] = useState(username ||loggedInUser);
    

    return (

        <>
        {user? (
        <div className = {styles.homeSection}>
        
        
            <h1>{username}'s Profile</h1>
            <PostListings/> 
            </div>) : (navigate("/login"))}
        </>);

}

export default Profile