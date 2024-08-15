const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(express.json({ limit: '10mb' })); 
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());

require('./db/Connection');

const port = 3100;
const Users = require('./Models/Users');
const Posts = require('./Models/Posts')
const Comments = require('./Models/Comments')

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})

app.post("/register", async (req,res)=>{

    const {username, email, password} = req.body;

    const existingUser = await Users.findOne({username})

    if(!existingUser){
        let user = new Users(req.body);
        let result = await user.save();
        res.send({success: true, user:result});
    }else{
        res.send({success:false});
    } 
});


app.post("/posts", async(req,res)=>{
    
    try{
        const {username, content,image} = req.body;
        let post = new Posts({username, content,image});
        let result = await post.save();
        console.log("Post saved:", result);
        res.status(201).json(result);

    }catch(error){
        res.status(500).json({message: "An error occurred"})
    }
});

app.get("/posts", async(req,res)=>{
    const posts = await Posts.find();
    res.send(posts);
})

app.post("/comments", async(req,res)=>{
    try{
        const {username, content,postId } = req.body;
        
        if(!username || !content || !postId ){
            return res.status(400).json({message: "Missing required fields"});
        }
        const newComment = new Comments({
            username, 
            content,
            postId
        });

        const savedComment = await newComment.save();
        await Posts.findByIdAndUpdate(postId, {
            $push: {comments: savedComment._id}
        });

        return res.status(201).json(savedComment);
    }catch(error){
        console.error('Error creating comment:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})

app.get('/posts/:postId/comments', async (req, res) => {
    try {
        const { postId } = req.params;
        

        const post = await Posts.findById(postId).populate('comments');
    
        if (!post) {
            console.log('Post not found');
            return res.status(404).json({ message: "Post not found" });
        }

        console.log('Post found:', post);
        res.json(post.comments);
    } catch (error) {
        console.error('Error fetching comments:', error.message); // Log the error message
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.delete('/comments/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedComment = await Comments.findByIdAndDelete(id);

        if (!deletedComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Optionally, you can also remove the comment from the associated post
        await Posts.findByIdAndUpdate(deletedComment.postId, {
            $pull: { comments: id }
        });

        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.get("/register", async(req,res) =>{
    const users = await Users.find()
    res.send(users);
})

app.post("/login", async(req,res)=>{
    const {username, password} = req.body;
    try{
        const user = await Users.findOne({username, password})
        if(user){
            res.send({success:true})
        }else{
            res.send({success:false});
        }
    }catch(error){
        console.error('Error during login', error);
    }
});

app.delete("/posts/:id", async(req,res)=>{
    try{
        const {id} = req.params;
        const result = await Posts.findByIdAndDelete(id);

        if(result){
            res.status(200).json({message: "Post deleted successfully!"})
        }else{
            res.status(404).json({message: "Post not found"});
        }
    }catch (error){
        res.status(500).json({message: "An error occurred", error: error.message});
    }
});

app.get('/posts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Posts.findById(id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
});


app.post('/posts/:id/like', async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;

        const post = await Posts.findById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (!post.likes.includes(userId)) {
            post.likes.push(userId);
            await post.save();
            return res.status(200).json({ message: 'Post liked', likes: post.likes });
        }
        res.status(400).json({ message: 'User already liked this post' });
    } catch (error) {
        console.error('Error liking the post:', error);
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
});


app.post('/posts/:id/unlike', async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;

        const post = await Posts.findById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const index = post.likes.indexOf(userId);
        if (index > -1) {
            post.likes.splice(index, 1);
            await post.save();
            return res.status(200).json({ message: 'Post unliked', likes: post.likes });
        }
        res.status(400).json({ message: 'User has not liked this post' });
    } catch (error) {
        console.error('Error unliking the post:', error);
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
});
