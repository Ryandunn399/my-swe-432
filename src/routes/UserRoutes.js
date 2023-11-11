const express = require('express')
const router = express.Router()
const dbc = require('../database/dbc')

require('dotenv').config()

const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS
const dbIp = process.env.DB_IP

// middleware to test if authenticated
const isAuthenticated = (req, res, next) => {
    if (req.session.userid){
        next()
    } else {
        res.redirect('/pages/login')
    }
}

router.get('/login', (req, res) => {
    res.send('GET not allowed here.')
})

router.post('/login', (req, res) => {
    
    const username = req.body.username
    const password = req.body.password

    // dbc.retrieveUser('user1', 'pass').then(res => console.log(res._id.toString()))
    dbc.retrieveUser(username, password).then(resp => {

        if (resp == null) {
            let resObject = {
                response: 'FAILED',
                userObj: undefined
            }

            res.send(JSON.stringify(resObject))
            return
        }

        let resObject= {
            response: 'OK'
        }

        req.session.userid = resp._id.toString()
        req.session.username = resp.username

        res.send(JSON.stringify(resObject))
    })
})

router.post('/logout', isAuthenticated, (req, res) => {
    req.session.destroy((err) => {
        console.log('Session destroyed')
    })

    res.redirect('/pages/login')
})

router.get('/followers', isAuthenticated, (req, res) => {
    const user = req.session.username
    
    dbc.retrieveUserNoPass(user).then(resp => {

        const followers = resp.following
        res.send(JSON.stringify(followers))
    })
})

router.post('/update-followers', isAuthenticated, (req, res) => {
    const user = req.session.username
    console.log("hello!")

    const following = req.body.following
    console.log(following)
    const found = dbc.updateFollowers(user, following)
})

// Debug method for creating user, not much going on here functionality wise here. 
router.get('/register', (req, res) => {
    dbc.verifyUserExist('user1').then(resp => {
        if (!resp) {
            dbc.createUser('user1', 'pass')
        }
    })

    res.send('Hello!')
})

module.exports = router
