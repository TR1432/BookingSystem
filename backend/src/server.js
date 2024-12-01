const express = require('express');
const app = express()




const authRouter = require('./routes/auth')
const auditoriumRouter = require('./routes/auditoriums')
const bookingRouter = require('./routes/booking')
const userRouter = require('./routes/user')


app.use('/auth', authRouter)
app.use('/auditoriums', auditoriumRouter)
app.use('/bookings', bookingRouter)
app.use('/user', userRouter)

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });