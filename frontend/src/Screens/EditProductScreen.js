import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import FormContainer from '../Components/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import { individualProduct, updateProduct } from '../actions/productActions'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import { types } from '../constants/type'
import Axios from 'axios'

const EditProductScreen = ({ history, match }) => {

    //Redux-Related
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const productDetails = useSelector(state => state.productDetails)
    const { error, loading, product } = productDetails
    const updateProductState = useSelector(state => state.updateProduct)
    const {
        error: updateError, loading: updateLoading, success
    } = updateProductState

    const productId = match.params.id

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [price, setPrice] = useState('')
    const [countInStock, setInStock] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')

    useEffect(() => {
        if (userInfo.isAdmin) {

            if (success) {
                dispatch({ type: types.PRODUCT_UPDATE_RESET })
                history.push('/admin/productlist')
            }

            if (!product || product._id !== productId) {
                dispatch(individualProduct(productId))
            } else {
                setName(product.name)
                setDescription(product.description)
                setImage(product.image)
                setPrice(product.price)
                setInStock(product.countInStock)
                setBrand(product.brand)
                setCategory(product.category)
            }
        } else {
            history.push('/')
        }
        //eslint-disable-next-line
    }, [product, userInfo, success])


    const updateHandler = (e) => {
        e.preventDefault()
        console.log({ name, description, image, price, countInStock, brand, category })
        dispatch(updateProduct({
            name, description, image, price, countInStock, brand, category
        }, productId))
    }

    const uploadHandler = async (e) => {
        console.log('Upload Image')
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await Axios.post('/api/upload', formData, config)
            console.log(data)
            setImage(data)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <h3>Edit Product</h3>
            {
                (loading || updateLoading) ? <Loader /> : (error || updateError) ? <Message variant='danger'>
                    {error ? error : updateError}
                </Message> :
                    <FormContainer>
                        <Form onSubmit={updateHandler}>
                            <Form.Group controlId='name'>
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control type="text" value={name}
                                    onChange={(e) => setName(e.target.value)} placeholder="Product Name" />
                            </Form.Group>
                            <Form.Group controlId='desc'>
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text" value={description}
                                    onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
                            </Form.Group>
                            <Form.Group controlId='image'>
                                <Form.Label>Image</Form.Label>
                                <Form.Control type="text" value={image}
                                    onChange={(e) => setImage(e.target.value)} placeholder="Image" />
                            </Form.Group>
                            <Form.Group>
                                <Form.File
                                    id='imageUpload'
                                    label='Choose Image'
                                    custom onChange={uploadHandler}
                                />
                            </Form.Group>
                            <Form.Group controlId='price'>
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="text" value={price}
                                    onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
                            </Form.Group>
                            <Form.Group controlId='inStock'>
                                <Form.Label>Count in Stock</Form.Label>
                                <Form.Control type="text" value={countInStock}
                                    onChange={(e) => setInStock(e.target.value)} placeholder="Countin Stock" />
                            </Form.Group>
                            <Form.Group controlId='brand'>
                                <Form.Label>Brand Name</Form.Label>
                                <Form.Control type="text" value={brand}
                                    onChange={(e) => setBrand(e.target.value)} placeholder="Brand Name" />
                            </Form.Group>
                            <Form.Group controlId='category'>
                                <Form.Label>Category</Form.Label>
                                <Form.Control type="text" value={category}
                                    onChange={(e) => setCategory(e.target.value)} placeholder="Category" />
                            </Form.Group>
                            <Button type='submit' variant='danger'>Update</Button>
                        </Form>
                    </FormContainer>
            }
        </>
    )
}

export default EditProductScreen
