require('dotenv').config()
import crypto from 'crypto'
import { createUser, getUser, isUser } from '../dist/userService'
import { createTempuser, findTempuser, deleteTempuser, deleteExpiredUser } from '../dist/tempuserService'
import { sendverificationmail } from './middlewares/emailverification'
import { ispassword } from './utils/password'
const express = require('express')
const app = express()
const jwt = require("jsonwebtoken")


app.use(express.json())

app.post('/auth/register', (req, res, next) => {
    try {
        let { name, email, password } = req.body
        if (!name || !email || !password){
            res.json({error: "Incomplete Credentials"})
        }else{
            let token = crypto.randomBytes(32).toString('hex')
            let tempuser = createTempuser(name, email, password, token)
            next()
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error sending verification email' });
    }
}, sendverificationmail)

app.get('/verify-email', async (req, res) => {
    try {
        const { token, email } = req.query;
        if(!token || !email) res.sendStatus(404)
        deleteExpiredUser()
        const pendingUser = findTempuser(email, token)
        if (!pendingUser || pendingUser.error) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }
        let { name, password } = pendingUser
        let user = createUser(name, email, password)
        if(user.error){
            console.log(user.error)
            return res.status(400).json({ message: 'Error Creating user' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error verifying email' });
    }
});

app.post('/auth/login', (req, res) => {
    let { name, email, password } = req.body
    if((!name && !email) || !password) res.sendStatus(400).json({error: "Incomplete Credentials"});
    let user = getUser(null, name, email)
    if(user.error) res.sendStatus(400).json(user);
    if(!ispassword(user.password, password)) res.sendStatus(403).json({error: "Wrong Password"});
    const accessToken = jwt.sign( user, process.env.SECRET_KEY, { expiresIn: '30m'})
    res.json({accessToken: accessToken})
})

app.post('/auth/logout', (req, res))

const PORT = 4000
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });