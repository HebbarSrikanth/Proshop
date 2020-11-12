import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import FormContainer from '../Components/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import { individualProduct } from '../actions/productActions'
import Message from '../Components/Message'
import Loader from '../Components/Loader'

const EditProductScreen = ({ history, match }) => {

    //Redux-Related
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const { error, loading, product } = productDetails

    const productId = match.params.id

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [price, setPrice] = useState('')
    const [countInStock, setInStock] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')

    useEffect(() => {
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
        //eslint-disable-next-line
    }, [product])


    const updateHandler = (e) => {
        e.preventDefault()
        console.log('Clicked on update of product')
        console.log({ name, description, image, price, countInStock, brand, category })
    }
    return (
        <>
            <h3>Edit Product</h3>
            {
                loading ? <Loader /> : error ? <Message variant='danger'>
                    {error}
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
