import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'

dotenv.config()

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
    console.log("Connected to MongoDB")
    })
    .catch((err) => {
        console.log(err)
    })


const app = express()

// To make input as JSON
app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }))

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`)
})

// Import Routes
import authRouter from './routes/auth.route.js'
import noteRouter from './routes/note.route.js'

app.use('/api/auth', authRouter);
app.use('/api/note', noteRouter)

// Error Handling
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal Server Error"

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})