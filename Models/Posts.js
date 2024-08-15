const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema({
    username: String,
    content: String,
    image: String,
    likes: [String],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'comments' }]
})


module.exports = mongoose.model("posts", postsSchema);