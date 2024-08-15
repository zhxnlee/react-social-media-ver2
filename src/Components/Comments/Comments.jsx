import React from "react"
import styles from "./Comments.module.css"
import { FaTrash } from "react-icons/fa";

function Comments(props){

    const { loggedInUser } = props;
    return(
    <div className = {styles.comments}>
        <div className = {styles.username}>
           <p>{props.username}:</p>
           
        </div>
        <div className = {styles.commentContent}>
            <p>{props.content}</p>
        </div>
        <div className = {styles.deleteButton}>
            <div className = {styles.button}>
                {loggedInUser === props.username && (
                    <FaTrash onClick={() => props.onDelete(props.id)} />
                )}
            </div>
            
            
        </div>
    </div>
    )
}
export default Comments;