const express = require('express')
const router = express.Router()

require('dotenv').config()

const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS
const dbIp = process.env.DB_IP

router.get('/login', (req, res) => {

})

module.exports = router
