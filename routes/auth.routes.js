import express from "express";
import { validationResult } from "express-validator";
import { loginValidator } from "../validator/auth.validator.js";
import * as authController from "../controller/auth.controller.js";
import { guardMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/web/auth/login", loginValidator, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}, authController.loginUser);

router.get("/web/auth/profile", guardMiddleware, authController.getProfile);
router.delete("/web/auth/logout", guardMiddleware, authController.Logout);

router.post("/mobile/auth/login", authController.loginUserJwt);
router.get("/mobile/auth/profile", guardMiddleware, authController.getProfileJwt)

export default router;
