import Product from '../model/productModel.js'
import asyncHandler from 'express-async-handler'


// @DESC Fetch all the products available in DB
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})

    res.json(products)
})

// @DESC Fetchs the specific product from DB
// @route GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// @DESC Delete the specific product from DB by admin
// @route DELETE /api/products/:id
// @access ADMIN PROTECTED
const deleteProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        await product.remove()
        res.json({ "message": "Product deleted successfully" })
    } else {
        res.json(404)
        throw new Error('Product not found')
    }
})

export { getProducts, getProductById, deleteProductById }