//Import the Express module using require keyword
import express from 'express'
import dotenv from 'dotenv'
import products from './data/products.js'
import dbConnect from './config/db.js'
dotenv.config()

dbConnect()

const app = express()
const PORT = process.env.PORT || 5000
const environment = process.env.NODE_ENV

//Fetch all the products present in the product file
app.get('/products', (req, res) => {
    res.json(products)
})

//Fetch individual products
app.get('/products/:id', (req, res) => {
    const product = products.find(p => p._id === req.params.id)
    res.json(product)
})

app.listen(PORT, console.log(`Server is running in ${environment} mode in the port ${PORT}`.yellow.bold)) 