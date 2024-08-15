
import React, {useState,useEffect} from "react";
import styles from "./Login.module.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login(){
    const navigate = useNavigate();
    const [loginState, setLoginState] = useState("");
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    })

    function credentialsOnChange(event){
        const {name, value} = event.target
        setCredentials(prevCredentials =>({
            ...prevCredentials,
            [name]: value
        }
        ));
    }
   

    function handleLogin(event){
        
        axios.post('http://localhost:3100/login', credentials)
        .then(response =>{
            if(response.data.success){
                console.log("Login Success!")
                localStorage.setItem("username", credentials.username);
                navigate("/react-social-media-ver2/home")

                
            }else{
                console.log("Invalid username password!")
                setLoginState("Invalid username password!")
               
            }
        })

        setCredentials({username: "", password: ""})
    }

    return (
        <div className = {styles.loginSection}>

            <div className = {styles.title}>
                <h1>Login</h1>
                
            </div>
            <div className = {styles.loginState}>
                <p>{loginState}</p>
            </div>
            <div className = {styles.inputSection}>
                <form>
                    <input
                    name = "username"
                    placeholder = "Username"
                    value = {credentials.username}
                    onChange = {credentialsOnChange}
                    ></input>

                    <input
                    name = "password"
                    placeholder = "Password"
                    value = {credentials.password}
                    onChange = {credentialsOnChange}
                    type = "password"></input>
                </form>
            </div>
            <div className={styles.buttons}>
                <button onClick ={handleLogin}>
                    Login
                </button>
                <a href = "/register"><p>Don't have an account? Register here</p></a>

            </div>
        </div>
    )
}

export default Login;