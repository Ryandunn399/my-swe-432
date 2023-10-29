const express = require('express');
const path = require('node:path')

const listenerRoutes = require('./routes/listener')

const port = 8080

const app = express();

// Set the view engine to EJS
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

app.set(express.json())

app.use(express.static(path.join(__dirname, 'public')))

app.use('/', listenerRoutes)

app.listen(port, () => {
    console.log(`Server has started on port ${port}`)
})