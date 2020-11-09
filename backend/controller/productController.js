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

// @DESC Create/Add a new product to DB by admin
// @route POST /api/products/create
// @access ADMIN PROTECTED
const insertProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Sample name',
        image: '/images/Iphone12mini.png',
        user: req.user._id,
        description: 'Sample description',
        price: 0,
        countInStock: 0,
        brand: 'Brand name',
        category: 'Electronics',
        numReviews: 0,
    })
    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

// @DESC Update a exiting product  by admin
// @route PUT /api/products/:id/edit
// @access ADMIN PROTECTED
const updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        product.name = req.body.name || product.name
        product.image = req.body.image || product.image
        product.description = req.body.description || product.description
        product.price = req.body.price || product.price
        product.countInStock = req.body.countInStock || product.countInStock
        product.brand = req.body.brand || product.brand
        product.category = req.body.category || product.category

        const updateProduct = await product.save()
        res.json(updateProduct)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

export { getProducts, getProductById, deleteProductById, insertProduct, updateProduct }