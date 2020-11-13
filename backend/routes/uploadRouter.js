import express from 'express'
import multer from 'multer'
import path from 'path'

const router = express.Router()

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

function checkFile(file, cb) {
    const fileType = /jpg|jpeg|png/
    const extType = fileType.test(path.extname(file.originalname).toLowerCase())
    const mimType = fileType.test(file.mimetype)

    if (extType && mimType) {
        return cb(null, true)
    } else {
        return ('Images required!!')
    }
}

const upload = multer({

    storage,
    fileFilter: function (req, file, cb) {
        checkFile(file, cb)
    }
})

router.post('/', upload.single('image'), (req, res) => {
    res.send(`/${req.file.path}`)
})

export default router