import express from 'express'
const router = express.Router()
import { getProducts, getProductById, deleteProductById, updateProduct, insertProduct } from '../controller/productController.js'
import { adminProtect, protect } from '../middleware/authMiddleware.js'


router.route('/').get(getProducts)
router.route('/create').post(protect, adminProtect, insertProduct)
router.route('/:id/edit').put(protect, adminProtect, updateProduct)
router.route('/:id').get(getProductById).delete(protect, adminProtect, deleteProductById)

export default router