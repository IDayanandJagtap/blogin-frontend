const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    imgs: {
        type: {},
    },
    createdAt: {
        type: Date,
        default: Date().now,
    }
});


module.exports = mongoose.model("posts", PostSchema)