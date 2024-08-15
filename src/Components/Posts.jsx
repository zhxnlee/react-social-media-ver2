import React, {useState, useEffect} from 'react'
import styles from "./Posts.module.css";
import { HiDotsHorizontal } from "react-icons/hi";
import axios from "axios";
import { useNavigate,useLocation } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import CreateComments from './Comments/CreateComments';
import CommentListings from './Comments/CommentListings';

function Posts(props){

    const location = useLocation();


    const isProfilePage = location.pathname === `/profile/${props.username}`;
    const [sureDelete, setSureDelete] = useState(false);
    const [postMenu, setPostMenu] = useState(false);
    const loggedInUser = localStorage.getItem("username");
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [showComments, setShowComments] = useState(false);
    
    useEffect(() => {
        const checkIfLiked = async () => {
            try {
                const response = await axios.get(`http://localhost:3100/posts/${props.id}`);
                const post = response.data;
               
                setLiked(post.likes.includes(loggedInUser));
                setLikeCount(post.likes.length);
            } catch (error) {
                console.error('Error fetching post details', error);
            }
        };

        checkIfLiked();
    }, [props.id, loggedInUser]);
    
    const handleLike = async () => {
        console.log("Like button clicked")
        try {
            const endpoint = liked 
                ? `http://localhost:3100/posts/${props.id}/unlike` 
                : `http://localhost:3100/posts/${props.id}/like`;

            const response = await axios.post(endpoint, { userId: loggedInUser });
            if (response.status === 200) {
                setLiked(!liked);
                setLikeCount(response.data.likes.length);
            }
        } catch (error) {
            console.error('Error liking/unliking the post', error);
        }
    };
    

    return (
  <>
    <div className = {styles.postItem}>
        {sureDelete && <div className = {styles.sureDelete}>
            <p>Are you sure you want to delete this post?</p>
            <ul>
                <li style={{color: 'red'}} onClick={() => props.onDelete(props.id)}>Delete</li>
                <li onClick = {()=> setSureDelete(false)}>Cancel</li>
            </ul>
        </div>}
        
        <div className = {styles.usernameSection}>
        <a href={isProfilePage ? `#` : `/profile/${props.username}`}><h3>{props.username}</h3></a>
            <div className = {styles.menu}>
                
                {(loggedInUser === props.username) && <HiDotsHorizontal className={styles.iconSize} onClick = {()=> setPostMenu(!postMenu)}/>}
                {postMenu && (<div className = {styles.menuBar}>
                    <ul>
                        <li onClick = {()=> {setSureDelete(true)
                            setPostMenu(false)
                        }}>Delete</li>
                    </ul>
                </div>)}
            </div>
        </div>
        <img src = {props.image}/>

        
        <div className = {styles.postDescription}>
        <p>
        <a href={isProfilePage ? `#` : `/profile/${props.username}`}>
        <span className={styles.username}>{props.username}</span>
      </a>
      &nbsp;&nbsp;&nbsp;{props.content}
    </p>
        </div> 

        <div className = {styles.functionality}>
            <div className = {styles.heart}>
            {liked ? <FaHeart className = {styles.likedHeartIcon} onClick = {handleLike} /> :
            <FaRegHeart className = {styles.heartIcon} onClick = {handleLike} />}
            {likeCount > 0 && <p className = {styles.likeCount} >{likeCount}</p>}
            </div>
            <FaRegComment className = {styles.commentIcon} onClick = {() =>setShowComments(!showComments)}/>
        </div>
        
        {showComments && <div className = {styles.comments}>
            <CommentListings postId = {props.id}/>
        </div>}
        
    </div>
    
        </>
    );

}

export default Posts;
