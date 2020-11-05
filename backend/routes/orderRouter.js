import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import { addOrder, fetchOrderDetails, updatePaymentToPaid } from '../controller/orderController.js'

const router = express.Router()

router.route('/').post(protect, addOrder)
router.route('/:id').get(protect, fetchOrderDetails)
router.route('/:id/pay').put(protect, updatePaymentToPaid)

export default router