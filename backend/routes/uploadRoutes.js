import path from "path"
import express from "express";
import multer from "multer";

const router = express.Router()

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads/")
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(
            null,
            `${file.filename}-${uniqueSuffix}${path.extname(file.originalname)}`
        )
    },
})


function checkFileType(file, cb) {
    const fileTypes = /jpg|jpeg|png|webp/;
    const extname = fileTypes.test(
        path.extname(file.originalname).toLocaleLowerCase()
    )
    const mimeType = fileTypes.test(file.mimeType)

    if(extname && mimeType) {
        cb(null, true)
    } else {
        cb("Images Only")
    }
}

const upload = multer({
    storage,
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb)
    }
})

router.post("/", upload.single("image"), (req, res) => {
    res.send(`/${req.file.path}`);
})

export default router