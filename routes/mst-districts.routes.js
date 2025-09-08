import express from "express";
import multer from "multer";
import * as districtsController from "../controller/mst-districts.controller.js"
import {guardMiddleware} from "../middleware/auth.middleware.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
    "/master/data/districts/upload",
    guardMiddleware,
    upload.single("file"),
    districtsController.uploadDistricts
);

router.get(
    "/master/data/districts/get-all",
    districtsController.getAllDistricts
);

router.get(
    "/master/data/districts/:regenciesId/detail",
    districtsController.getDistrictsByProvince
)

export default router;