const express = require('express')
const userApi = require('./routes/userRoute')
const taskApi = require('./routes/taskRoute')
const app = express()
const cors = require('cors')
require('dotenv').config()
require('./db/db')
app.use(cors({ withCredentials: true, origin: 'http://localhost:3000' }))

app.use(express.json())
app.use('/api/v1', userApi)
app.use('/api/v1', taskApi)
app.use('/', (req, res) => {
  res.send("Backend is connected")
})

app.listen(process.env.PORT, () => {
  console.log(`Server listening on ${process.env.PORT}`)
})