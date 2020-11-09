import express from 'express'
const router = express.Router()
import { getProducts, getProductById, deleteProductById } from '../controller/productController.js'
import { adminProtect, protect } from '../middleware/authMiddleware'


router.route('/').get(getProducts)
router.route('/:id').get(getProductById).delete(protect, adminProtect, deleteProductById)

export default router