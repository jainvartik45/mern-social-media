const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    name : String,
    tags: [String],
    selectedFile: String,
    likeCount: {
        type: [String],
        default: [],
    },
    comments : {
        type : [String] ,
        default : [],
    } , 
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var postMessage = mongoose.model('postMessage', postSchema);

module.exports = postMessage;