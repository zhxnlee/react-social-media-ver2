
import React, {useState, useEffect} from "react"
import Posts from "./Posts";
import axios from "axios"
import CreatePosts from "./CreatePosts";
import styles from "./PostListings.module.css"
import { useLocation ,useParams, useNavigate} from "react-router-dom";


function PostListings(){
    const {username} = useParams();
    const [posts, setPosts] = useState([]);
    const loggedInUser = localStorage.getItem("username");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!loggedInUser) {
            navigate("/login");
        }
    }, [loggedInUser, navigate]);

    useEffect(() =>{
        axios.get('http://localhost:3100/posts')
        .then(response =>{
            setPosts(response.data);

        })
        .catch(error =>{
            console.error("There was an error fetching the posts", error)
        })
    },[])

    function addPost(post) {
        axios.post('http://localhost:3100/posts', post)
            .then(response => {
                setPosts(prevPosts => [...prevPosts, response.data]); 
            })
            .catch(error => {
                console.error("There was an error adding the post", error);
            });
    }

    const filteredPosts = username ? posts.filter(post => post.username === username) : posts;

    function deletePost(id){
     
        axios.delete(`http://localhost:3100/posts/${id}`)
        .then(response =>{
            setPosts(prevPosts => prevPosts.filter(post => post._id !== id));
        }).catch(error =>{
            console.error("There was an error deleting the post:", error.message);
            console.error("Error details:", error.response);
        });
    }
    
    const isProfile = location.pathname.includes("/profile");
    const isProfileUser = username === loggedInUser;
    const isHome = location.pathname.includes("/home");

    return (
    <div className = {styles.postListingSection}>
        {(isProfileUser || isHome)  &&
        <div className = {styles.createPostSection}>
            <CreatePosts onAdd = {addPost} />
        </div>
        }
        <div className = {styles.allPosts}>
        {filteredPosts.map((postItem)=>(
            <Posts
            key = {postItem._id}
            id = {postItem._id}
            image = {postItem.image}
            username = {postItem.username}
            content = {postItem.content}
            onDelete = {deletePost}
            
            />
        ))} 
        </div>
    </div>
    )
}

export default PostListings;
