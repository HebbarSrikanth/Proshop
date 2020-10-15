import mongoose from 'mongoose'
import User from './model/userModel.js'
import Product from './model/productModel.js'
import dotenv from 'dotenv'
import user from './data/user.js'
import product from './data/products.js'
import dbConnect from './config/db.js'


dotenv.config()
dbConnect()

const importData = async () => {
    try {
        await User.deleteMany()
        await Product.deleteMany()

        const createdUser = await User.insertMany(user)
        const adminUser = createdUser[0]._id
        const sampleProduct = product.map(p => { return { ...p, user: adminUser } })
        await Product.insertMany(sampleProduct)

        console.log(`Data imported successfully`.green.bold)
        process.exit()
    } catch (error) {
        console.log(`Import Failed : ${error.message}`.red.bold)
    }
}

const deleteData = async () => {
    try {
        await User.deleteMany()
        await Product.deleteMany()

        console.log(`Data deleted`.red.bold)
        process.exit()
    } catch (error) {
        console.log(`Deletion unsuccessful:${error.message}`.red.bold)
    }
}

if (process.argv[2] === '-d') {
    deleteData()
}
else {
    importData()
}

