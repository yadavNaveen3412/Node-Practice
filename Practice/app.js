const express = require('express')
let server = express()


server.get('/', (req,res) => {
    res.status(200).json({2 : 'Hello I am Naveen Yadav', 1: 'Hello'})
})

server.listen(8000, () => {
    console.log('Server started at http://127.0.0.1:8000');
})