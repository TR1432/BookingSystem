require('dotenv').config()
import { createUser, getUser, isUser } from '../dist/userService'
const express = require('express')
const app = express()
const jwt = require("jsonwebtoken")


app.use(express.json())

app.post('/auth/register', (req, res) => {
    let { name, email, password } = req.body
    
})

const PORT = 4000
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });