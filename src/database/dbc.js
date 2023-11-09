const mongoose = require('mongoose')
const User = require('./userc')

// Process .env file
require('dotenv').config()

// Environment variables to safely store db credentials.
const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS
const dbIp = process.env.DB_IP
const dbName = process.env.DB_NAME

// Function to establish connection with MongoDB database.
connectDatabase = async() => {
    console.log(`${dbName}`)
    await mongoose.connect(
        `mongodb://${dbIp}/${dbName}`,
        {
            authSource: "admin",
            user: `${dbUser}`,
            pass: `${dbPass}`
        }
    )
}

// Create a username with the given credentials.
createUser = async(user, pass) => {
    try {
        const newUser = new User({username: user, password: pass})
        await newUser.save()
        return newUser
    } catch (err) {
        throw err
    }
}


module.exports = { connectDatabase, createUser }
