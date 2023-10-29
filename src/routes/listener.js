const express = require('express')
const router = express.Router()

const navOptions  = {
    route: 'Listener',
    routes: [
        'Listener',
        'DJ',
        'Producer'
    ]
}

router.get('/listener', (req, res) => {
    res.render('pages/listener/home', { currPage: 'home', navOptions: navOptions, pp: 'pp'})
})

router.get('/listener/search', (req, res) => {
    res.render('pages/listener/search', { currPage: 'search', navOptions: navOptions})
})

router.get('/listener/preferences', (req, res) => {
    res.render('pages/listener/preferences', { currPage: 'preferences', navOptions: navOptions})
})

router.get('/listener/followers', (req, res) => {
    res.render('pages/listener/followers', { currPage: 'followers', navOptions: navOptions})
})

module.exports = router