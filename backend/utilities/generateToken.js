import jwt from 'jsonwebtoken'

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JSON_SECRET, {
        expiresIn: '30d'
    })
}

export default generateToken 