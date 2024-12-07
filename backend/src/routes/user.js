import { updateUser, deleteUser } from '../../dist/userService'
import { authUserwebtoken } from '../utils/authenticate'
const express = require('express')
const router = express.Router()


router.get('/', authUserwebtoken, (req, res) => {
    return req.user
})

router.put('/', authUserwebtoken, (req,res) => {
    let  { name, email, password } = req.body
    let user = updateUser( req.user.id, name, email, password )
    if(user.error){
        res.status(400)
        console.log(user)
    }else{
        res.json(user)
    }

})

router.delete('/', authUserwebtoken, (req, res) => {
    let  user_msg = deleteUser(req.user.id)
    if(user_msg.error){
        res.sendStatus(400)
        console.log(user)
    }else{
        res.json(user_msg)
    }
})