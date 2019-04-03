const mongoose = require('../libs/mongoose');

let schema = mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true
    },
    hashedPassword: {
        type: String,
        require: true
    },
    created: {
        type: Date,
        default: Date.now()
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
})

exports.User = mongoose.model('User', schema);