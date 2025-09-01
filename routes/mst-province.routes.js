import express from "express";
import multer from "multer";
import path from "path";
import * as provinceController from "../controller/mst-province.controller.js"
import { guardMiddleware } from '../middleware/auth.middleware.js'

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage })

router.post(guardMiddleware,
    "/master/data/provinsi/upload",
    upload.single("file"),
    provinceController.uploadProvince
)

router.get(guardMiddleware,
    "/master/data/provinsi/get-all",
    provinceController.getAllProvince
);

export default router;