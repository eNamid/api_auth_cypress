const mongoose = require('mongoose');

const Users = new mongoose.Schema({
    __id: {
        type: Number,
        required: false
    },
    name: {
        type: String,
        required: true,
    },
    email: { 
        type: String, 
        required: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model("User", Users);

module.exports = User;