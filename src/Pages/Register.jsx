
import React, {useState} from "react";
import styles from "./Register.module.css"
import axios from 'axios';
import { useNavigate } from "react-router-dom";


function Register(){
    const navigate = useNavigate();
    const [userTaken, setUserTaken] = useState("");
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
        })

    const [users,setUsers] = useState([]);

    function addUser(user){
        axios.post('http://localhost:3100/register', user)
        .then(response =>{
            if(response.data.success){
                setUsers(prevUsers =>[
                    ...prevUsers, response.data
                ])
                console.log(response.data)
                setUserTaken("Successfully Registered!")
                navigate("/login");

            }else if (!response.data.success){
                setUserTaken("Username already taken!")
               
            }
        })}
        
    
    function userOnChange(event){
        const {name, value} = event.target
        setUser(prevCredentials =>({
            ...prevCredentials,
            [name]: value
        }
        ));
    }

    function submitUser(event){
        event.preventDefault();
        addUser(user);
        setUser({username: "", email: "", password: ""})
    }

    return (
        <div className = {styles.registerSection}>

            <div className = {styles.title}>
                <h1>Register</h1>
            </div>
            <div className = {styles.registerState}>
                <p>{userTaken}</p>
            </div>
            <div className = {styles.inputSection}>
                <form>
                    <input
                    name = "username"
                    placeholder = "Username"
                    value = {user.username}
                    onChange = {userOnChange}
                    ></input>

            <input
                    name = "email"
                    placeholder = "Email"
                    value = {user.email}
                    onChange = {userOnChange}
                    ></input>

                    <input
                    name = "password"
                    placeholder = "Password"
                    value = {user.password}
                    onChange = {userOnChange}
                    type = "password"></input>
                </form>
            </div>
            <div className={styles.buttons}>
                <button onClick ={submitUser}>
                    Register
                </button>
                <a href = "/login"><p>Already have an account? Login here</p></a>

            </div>
        </div>
    )
}

export default Register;