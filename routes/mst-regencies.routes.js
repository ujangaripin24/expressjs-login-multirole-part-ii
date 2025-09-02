import express from "express";
import multer from "multer";
import * as regenciesController from "../controller/mst-regencies.controller.js"
import {guardMiddleware} from "../middleware/auth.middleware.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
    "/master/data/regencies/upload",
    guardMiddleware,
    upload.single("file"),
    regenciesController.uploadRegencies
);

router.get(
    "/master/data/regencies/get-all",
    regenciesController.getAllRegencies
);

router.get(
    "/master/regencies/:provinceId",
    regenciesController.getRegenciesByProvince
)

export default router;