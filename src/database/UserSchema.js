// User controller for database functions
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    
    password: {
        type: String,
        required: true
    },
    
    following: {
        type: [String],
        default: 
        [
            "654c529632a91e44e1d25c15",
            "654c529632a91e44e1d25c16", 
            "654c529632a91e44e1d25c17"
        ]
    },

    preferences: {
        type: [String],
        default: ["Aria"]
    }
})

module.exports = mongoose.model("user", userSchema)
