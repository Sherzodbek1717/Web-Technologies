const express = require('express')
const app = express()
const PORT = 8000


app.set('view engine', 'pug')

// https://localhost:8000
app.get('/', (req, res) => {
    res.render('home')
})




app.listen(PORT, (err) => {
    if (err) throw errow
    console.log('This app is running on port' + PORT );
})