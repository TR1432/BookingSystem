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

router.post('/bookings', (req, res) => {
    let { name, purpose, userId, auditoriumId, startTimeString, endTimeString } = req.body
    
})

function isTimeRangeAvailable(startTimeString, endTimeString, auditoriumId) {
    const newStart = new Date(startTime);
    const newEnd = new Date(endTime);

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