import React, {useState, useEffect} from "react";
import CreateComments from "./CreateComments";
import axios from "axios";
import Comments from "./Comments";
import styles from "./CommentListings.module.css"

function CommentListings({postId}){

    const [comments, setComments] = useState([]);
    const loggedInUser = localStorage.getItem("username");

    useEffect(() => {
        
        axios.get(`http://localhost:3100/posts/${postId}/comments`)
            .then(response => {
              
                setComments(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching comments", error);
            });
    }, [postId]);

    function deleteComment(commentId) {
        axios.delete(`http://localhost:3100/comments/${commentId}`)
            .then(() => {
                setComments(prevComments => prevComments.filter(comment => comment._id !== commentId));
            })
            .catch(error => {
                console.error("There was an error deleting the comment:", error.response ? error.response.data : error.message);
            });
    }
   
    function addComment(comment){
        console.log(comments)
        
        axios.post('http://localhost:3100/comments', {...comment, postId})
        
        .then(response =>{
      
            setComments(prevComments =>[...prevComments, response.data]);
        })
        .catch(error =>{
            console.error("There was an error adding the comment:", error.response ? error.response.data : error.message);
        });
    }
    return(


        <div>
            
            <div>
                
                <div className = {styles.title}>
                    <h3>Comments</h3>
                </div >
                <div className = {styles.allComments}>
                {comments.map((commentItem) => (
                    <Comments 
                    key = {commentItem._id}
                    id = {commentItem._id}
                    username = {commentItem.username}
                    content = {commentItem.content}
                    onDelete={() => deleteComment(commentItem._id)}
                    loggedInUser={loggedInUser}/>
                    
                ))}
                </div>
                <CreateComments onAdd={addComment} />
            </div>
            
        </div>
    )
}

export default CommentListings;