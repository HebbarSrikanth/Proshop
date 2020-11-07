import User from '../model/userModel.js'
import asyncHandler from 'express-async-handler'

//@DESC Fetch all the user those are signed in to the applications
//@Route GET /admin/userlist
//@Access protected
export const fetchUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.json(users)
})

//@DESC Delete a user
//@Route DELETE /admin/user/:id
//@Access protected

export const deleteuser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
        await user.remove()
        res.json({ "message": "user deleted" })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

//@DESC Update user profile 
//Route PUT /admin/user/:id/edit
//@Access protected
export const updateuser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin || user.isAdmin

        const updatedUser = await user.save()
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

//@DESC Update user profile 
//Route GET /admin/user/:id/edit
//@Access ADMIN protected

export const fetchUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')
    if (user) {
        res.json(user)
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

