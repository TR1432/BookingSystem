import { createbooking, getAllbookings, findbooking, updatebooking, deletebooking } from '../../dist/bookingService'
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    if(!req.query){
        let bookings =  getAllbookings()
        res.json(bookings)
    }else{
        let { id, name, userId, auditoriumId, startTimeString, endTimeString } = req.query
        let bookings = findbooking(id, name, userId, auditoriumId,  startTimeString, endTimeString)
        res.json(bookings)
    }
})

router.post('/', (req, res) => {
    let { name, purpose, userId, auditoriumId, startTimeString, endTimeString } = req.body
    if( isTimeRangeAvailable(startTimeString, endTimeString, auditoriumId)){
        let booking = createbooking(name, purpose, startTimeString, endTimeString, userId, auditoriumId)
        if(!booking.error){
            res.json(booking)
        }else{
            res.sendStatus(400)
        }
    }
})

router.put('/:id', (req, res) => {
    let id = req.params.id
    let { name, purpose, startTimeString, endTimeString } = req.body
    let booking = updatebooking(id, name, purpose, startTimeString, endTimeString)
    if(!booking.msg){
        res.json(booking)
    }
})

function isTimeRangeAvailable(startTimeString, endTimeString, auditoriumId) {
    const newStart = new Date(startTimeString);
    const newEnd = new Date(endTimeString);

    if (newStart >= newEnd) {
        return false;
    }
    let events = findbooking(null,null,null,auditoriumId)
    for (const event of events) {
        const eventStart = new Date(event.startTime);
        const eventEnd = new Date(event.endTime);

        if (
            (newStart >= eventStart && newStart < eventEnd) ||
            (newEnd > eventStart && newEnd <= eventEnd) ||    
            (newStart <= eventStart && newEnd >= eventEnd)    
        ) {
            return false;
        }
    }
    return true;
}

router.delete('/', (req, res) => {
    let id = req.params.id
    let booking = deletebooking(id)
    res.json(booking)
})