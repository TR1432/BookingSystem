const express = require('express');
const app = express()


const auditoriumRouter = require('./routes/auditoriums')
const bookingRouter = require('./routes/booking')
const userRouter = require('./routes/user')

app.use('/auditoriums', auditoriumRouter)
app.use('/bookings', bookingRouter)
app.use('/user', userRouter)

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });