import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoute.js'
import noteRouter from './routes/notesRoute.js'

const app = express()
const port = process.env.PORT || 3000
connectDB()

app.use(express.json())
app.use(cors({credentials: true, origin: '*'}))

//api end points
app.use('/api/user', userRouter)
app.use('/api/notes', noteRouter)

app.get('/', (req, res) => {
    res.send('API WORKING fine')
})

app.listen(port, () => console.log("server started", port))
