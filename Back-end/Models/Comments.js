const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts"
    },
    description: {
        type: String,
    },
    likes: {
        type: Number,
    },
    createdAt: {
        type: Date,
        default: Date().now,
    }
});


module.exports = mongoose.model("comments", CommentSchema)