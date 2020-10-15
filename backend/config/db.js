import mongoose from 'mongoose'
import colors from 'colors'

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        console.log(`Connected to MongoDB:${conn.connection.host}`.cyan.underline)
    } catch (error) {
        console.log(`Error while connecting to MongoDB ${error.message}`.red.bold)
        process.exit(1)
    }
}

export default connectDB