require('dotenv').config()
import { createUser  } from '../dist/userService'
const express = require('express')
const app = express()
const jwt = require("jsonwebtoken")


app.use(express.json())

app.post('/auth', (req, res) => {
    let { name, email, password } = req.body
    
})