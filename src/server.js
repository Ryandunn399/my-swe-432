const express = require('express');
const path = require('node:path')
require('dotenv').config()

const pageRoutes = require('./routes/PageRoutes')
const userRoutes = require('./routes/UserRoutes')

const dbc = require('./database/dbc')

const port = process.env.PORT

const app = express();

dbc.connectDatabase()
dbc.createUser('user1', 'pass').then('noice')

// Set the view engine to EJS
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

app.set(express.json())

app.use(express.static(path.join(__dirname, 'public')))

app.use('/pages/', pageRoutes)

// Establish the user route

app.use('/users/', userRoutes)

app.listen(port, () => {
    console.log(`Server has started on port ${port}`)
})
