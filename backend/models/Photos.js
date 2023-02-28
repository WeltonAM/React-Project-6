const mongoose = require("mongoose")
const { Schema } = mongoose

const photoSchema = new Schema({
    image: String,
    title: String,
    likes: Array,
    comments: Array,
    userId: mongoose.ObjectId,
    userName: String,
}, {
    timestamps: true
})

const User = mongoose.model("Photo", photoSchema)

module.exports = User