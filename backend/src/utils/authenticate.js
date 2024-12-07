require('dotenv').config()
const jwt = require('jsonwebtoken')

export function authUserwebtoken(req, res, next) {
    const authheader = req.header['authorization']
    const token = authheader && authheader.split(' ')[1]
    if(!token) return res.sendStatus(401)
    jwt.verify(token, process.env.USER_SECRET_TOKEN, (err, user) => {
    if(err) return res.sendStatus(403)
    req.user = user
    next()
    })
}
