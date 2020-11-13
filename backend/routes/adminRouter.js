import express from 'express'
import { fetchUsers, deleteuser, updateuser, fetchUserById, fetchOrders } from '../controller/adminController.js'
import { protect, adminProtect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/userlist').get(protect, adminProtect, fetchUsers)
router.route('/user/:id').delete(protect, adminProtect, deleteuser)
router.route('/user/:id/edit').get(protect, adminProtect, fetchUserById).
    put(protect, adminProtect, updateuser)
router.route('/orders').get(protect, adminProtect, fetchOrders)


export default router