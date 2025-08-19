import express from "express";
import { validationResult } from "express-validator";
import { loginValidator } from "../validator/auth.validator.js";
import * as authController from "../controller/auth.controller.js";

const router = express.Router();

router.post("/auth/login", loginValidator, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}, authController.loginUser);

router.get("/auth/profile", authController.getProfile);
router.delete("/auth/logout", authController.Logout);

export default router;
