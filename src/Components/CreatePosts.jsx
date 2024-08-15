import React,{useState, useEffect} from "react"
import styles from "./CreatePosts.module.css"
import axios from "axios";
import { IoIosClose } from "react-icons/io";

function CreatePosts(props){

    
    const username = localStorage.getItem("username");
    const [isExpanded, setIsExpanded] = useState(false);
    const [imagePreview, setImagePreview] = useState("");
    const [post, setPost] = useState({
        username: username || "",
        content: "",
        image: ""

    })    

    const [posts, setPosts] = useState([]);

  
    function submitPost(event){
        
        if(post.content.trim() ==="" || post.image.trim() ===""){
            alert("Please add content or an image to your post!");
            return;
        }

        
        event.preventDefault();
        props.onAdd(post);
        
        setPost({
            username: username || "",
            content: "",
            image: ""
        });
        setImagePreview("");
        
    }
    function handleChange(event){
       
        const {name,value} = event.target;
        
        
        setPost(prevPost =>({
            
            ...prevPost,
            [name]:value
        }))
        

    }

    useEffect(()=>{
        setPost(prevPost =>({
            ...prevPost,
            username: username || ""
        }))
    },[username])

    function convertToBase64(e){
        const file = e.target.files[0];
        if (file){
            const reader = new FileReader();
            reader.onload = () => {
                const img = new Image();
                img.src = reader.result;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    const maxWidth = 800;
                    const maxHeight = 600;
                    let width = img.width;
                    let height = img.height;

                    if(width > maxWidth){
                        height = (height * maxWidth)/width;
                        width = maxWidth;
                    }

                    if(height > maxHeight){
                        width = (width * maxHeight) / height;
                        height = maxHeight;
                    }
                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(img, 0, 0, width, height);
                    
                    const resizedImage = canvas.toDataURL(file.type);
            
                    setPost(prevPost => ({
                        ...prevPost,
                        image: resizedImage
                    }))
                    setImagePreview(resizedImage);
                }
            };
            reader.readAsDataURL(file);
        }
    }
    
    
    
    return (
        <div className = {styles.post} >
            <form onSubmit = {submitPost}>
                <div className = {styles.createPostSection}>
                    <div className = {styles.postTextArea}>

                        <div className = {styles.imagePreview}>
                            <img src = {imagePreview}/>
                            {imagePreview &&
                            <div className = {styles.removeImage}>
                                <h3 onClick = {()=>setImagePreview("")}>X</h3>
                            </div>}

                            </div>
                                <textarea
                                name = "content"
                                value = {post.content}
                                onChange = {handleChange}
                                placeholder = "What's on your mind?"
                                onFocus = {() =>setIsExpanded(true)}
                                onBlur = {() => setIsExpanded(false)}
                                className = {isExpanded ? styles.expanded : ''}
                                />
                        
                        
                        
                        
                    </div>
                    <div className = {styles.createPostsButtons}>
                        <button type="submit">
                            Post
                        </button>

                        <button
                        type = "button"
                        onClick = {() => document.getElementById('imageInput').click()}>
                            Upload a Photo
                        </button>
                        
                    </div>
                    
                </div>

                <input
                id = "imageInput"
                name =  "image"
                accept= "image/*"
                type = "file"
                onChange = {convertToBase64}
                style = {{display:'none'}}
                
                />
            </form>

           
        </div>
    )
}

export default CreatePosts;

