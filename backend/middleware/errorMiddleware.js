const notFound = (req, res, next) => {
    const error = new Error(`Product not found- ${req.originalUrl}`)
    res.status(404)
    next(error)
}

const errorHandler = (err, req, res, next) => {
    const errorCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(errorCode)
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? '' : err.stack
    })
}

export { notFound, errorHandler }