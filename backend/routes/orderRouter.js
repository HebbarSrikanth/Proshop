import express from 'express'
import { adminProtect, protect } from '../middleware/authMiddleware.js'
import { addOrder, fetchOrderDetails, updatePaymentToPaid, updateDeliver } from '../controller/orderController.js'

const router = express.Router()

router.route('/').post(protect, addOrder)
router.route('/:id').get(protect, fetchOrderDetails)
router.route('/:id/pay').put(protect, updatePaymentToPaid)
router.route('/:id/deliver').put(protect, adminProtect, updateDeliver)

export default router