import { createUser } from ''
const express = require('express')
const router = express.Router()


router.use(express.json())

router.post('/register', (req, res) => {
    let { name, email, password } = req.body
    
})