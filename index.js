const express = require('express')
const bodyParser = require('body-parser')
const signUpRouter = require('./routes/signUp')
const path = require('path')
require('dotenv').config()


const app = express()
app.use(express.static(path.join(__dirname, 'public'), {   extensions: ['html']}));

app.use(bodyParser.urlencoded({ extended: true }))

app.use('/signup', signUpRouter )






app.listen('3000', () => {
    console.log('Listening on Port 3000')
})