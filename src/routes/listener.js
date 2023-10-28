const express = require('express')
const router = express.Router()

router.get('/listener', (req, res) => {
    res.render('pages/listener/home')
})

module.exports = router