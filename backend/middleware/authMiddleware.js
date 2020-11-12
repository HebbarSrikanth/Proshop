import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../model/userModel.js'

const protect = asyncHandler(async (req, res, next) => {
    console.log('Here for private route validation')
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

        try {
            token = req.headers.authorization.split(' ')[1]
            const { id } = await jwt.verify(token, process.env.JSON_SECRET)

            req.user = await User.findById(id).select('-password')

            next()

        } catch (err) {
            res.status(401)
            throw new Error(`Not Authorized,token failed!!`)
        }
    } else {
        res.status(401)
        throw new Error('Not Authorized!!')
    }
})

const adminProtect = asyncHandler(async (req, res, next) => {
    console.log('Here for admin authorization')
    const user = await User.findById(req.user._id)
    if (user && user.isAdmin) {
        next()
    } else {
        res.status(401)
        throw new Error('Not an Admin to Authorize')
    }
})

export { protect, adminProtect }