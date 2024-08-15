const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema({
    username: String,
    content: String,
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Posts', required: true }
})


module.exports = mongoose.model("comments", commentsSchema);