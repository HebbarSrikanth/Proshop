import express from 'express'
const router = express.Router()
import {
    getProducts, getProductById, getTopProducts,
    deleteProductById, updateProduct, insertProduct, insertReview
} from '../controller/productController.js'
import { adminProtect, protect } from '../middleware/authMiddleware.js'



router.route('/').get(getProducts)
router.route('/create').post(protect, adminProtect, insertProduct)
router.route('/:id/edit').put(protect, adminProtect, updateProduct)
router.route('/:id').get(getProductById).delete(protect, adminProtect, deleteProductById)
router.get('/top/products', getTopProducts)
router.route('/:id/review').post(protect, insertReview)


export default router