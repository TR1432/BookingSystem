const express = require('express')
const router = express.Router()
import { createAuditorium, getAllAuditoriums, findAuditorium, updateAuditorium, deleteAuditorium} from '../../dist/auditoriumService'

router.get("/", (req, res) => {
    if (!req.query){
        let auditoriums = getAllAuditoriums()
        res.json(auditoriums)
    }else{
        let { name, capacity, id } = req.query
        let auditoriums = findAuditorium( id , name, capacity)
        res.json(auditoriums)
    }
})

router.get("/:id", (req, res) => {
    let id = req.params.id
    let auditoriums = findAuditorium(id)
    res.json(auditoriums[0])
})

router.post('/', (req, res) => {
    let { name, location, description, capacity } = req.body
    let auditorium = createAuditorium(name, location, description, capacity)
    if(auditorium.error){
        console.log(auditorium.error)
        res.sendStatus(401)
    }else{
        res.json(auditorium)
    }
})

router.put('/:id', (req, res) => {
    let id = req.params.id
    let { name, location, description, capacity } = req.body
    let auditorium = updateAuditorium(id, name, location, capacity, description)
    res.json(auditorium)
})

router.delete('/:id', (req, res) => {
    let id = req.params.id
    let auditorium = deleteAuditorium(id)
    res.json(auditorium)
})