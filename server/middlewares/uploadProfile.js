import multer from 'multer'

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, `./public/profile`)
    },
    filename: (req,file,cb) => {
        cb(null, file.fieldname + "-" + Date.now() + ".jpg")
    }
})

const uploadProfile = multer({ storage: storage })

export default uploadProfile