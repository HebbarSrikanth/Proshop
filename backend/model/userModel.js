import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

//The methods that can be written in model can can be used by the instance of the model for EX
//See userController
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

//For password encrypting or anything to do before saving we can use pre of the mongoose
userSchema.pre('save', async function (next) {

    //This step is impt b/c we have to encrypt only when password id changed , we don't want to run when
    //other data is changed , So we check if there are change in password
    if (!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User