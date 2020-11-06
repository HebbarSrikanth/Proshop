import {
    authUser, registerUser,
    fetchUserProfile, updateProfileDetails, fetchUserOrders
} from '../controller/userController.js'
import { protect } from '../middleware/authMiddleware.js'
import express from 'express'

const router = express.Router()

router.post('/login', authUser)
router.route('/register').post(registerUser)
router.route('/profile').get(protect, fetchUserProfile).put(protect, updateProfileDetails)
router.route('/myorders').get(protect, fetchUserOrders)


export default router


