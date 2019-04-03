const mongoose = require('../libs/mongoose');

let schema = mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    imagePath: {
        type: String,
        require: true,
        unique: true
    },
    description: String,
    likes: {
        users: {
            type: [String],
            default: []
        },
        count: {
            type: Number,
            default: 0
        }
    },
    comments: [
        {
            username: String,
            text: String,
            date: Date
        }
    ],
    loaded: {
        type: Date,
        default: new Date()
    }
});

exports.Photo = mongoose.model("Photo", schema);