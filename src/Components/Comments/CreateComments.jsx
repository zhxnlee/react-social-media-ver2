import React, {useState} from "react";
import styles from "./CreateComments.module.css"
import axios from "axios";


function CreateComments(props){
    const username = localStorage.getItem("username");
    const [comment, setComment] = useState({
        username: username || "",
        content: ""
    });
    
    function handleChange(event){
        const {name,value} = event.target;

        setComment(prevComment =>({

            ...prevComment, 
            [name]: value
        }))
    
    }

    function submitComment(event){
      
        event.preventDefault();
       
        props.onAdd(comment);

        setComment({
            username: username ||"",
            content: ""
        })
    }

    

    return (
        <div className = {styles.createComments}>
            <form onSubmit= {submitComment}>
                <div className = {styles.ccContent}>
                    <div className = {styles.ccTextArea}>
                        <textarea
                        name = "content"
                        value = {comment.content}
                        onChange = {handleChange}
                        placeholder="Comment..."/>
                    </div>
                    <div className = {styles.ccButton}>
                        <button type = "submit">Comment</button>
                    </div>
                </div>
            </form>
        </div>


    )
}

export default CreateComments;