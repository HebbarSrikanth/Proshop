//Import the Express module using require keyword
import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import morgan from 'morgan'
dotenv.config()

//Importing the Route files
import productRoute from './routes/productRouter.js'
import authRoute from './routes/userRouter.js'
import orderRoute from './routes/orderRouter.js'
import adminRoute from './routes/adminRouter.js'
import uploadRoute from './routes/uploadRouter.js'

//Importing the DB connect files and initiating the connection
import dbConnect from './config/db.js'
dbConnect()

const app = express()
if (process.env.NODE_ENV === 'develpoment') {
    app.use(morgan('dev'))
}
const PORT = process.env.PORT || 5000
const environment = process.env.NODE_ENV
app.listen(PORT, console.log(`Server is running in ${environment} mode in the port ${PORT}`.yellow.bold))

//To parse the body to json
app.use(express.json())

//Middleware Route for products
//Note : In this next is not use as response will end the cycle that will be sent in Product router
app.use('/api/products', productRoute)
app.use('/user', authRoute)
app.use('/orders', orderRoute)
app.use('/admin', adminRoute)
app.use('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))
app.use('/api/upload', uploadRoute)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))
    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    )
}



//Not Found Error
app.use(notFound)
//Error handling 
app.use(errorHandler)
