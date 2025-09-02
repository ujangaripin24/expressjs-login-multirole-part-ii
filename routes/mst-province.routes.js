import express from "express";
import multer from "multer";
import * as provinceController from "../controller/mst-province.controller.js"
import { guardMiddleware } from '../middleware/auth.middleware.js'

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
    "/master/data/provinsi/upload",
    guardMiddleware,
    upload.single("file"),
    provinceController.uploadProvince
);

router.get(
    "/master/data/provinsi/get-all",
    provinceController.getAllProvince
);

export default router;