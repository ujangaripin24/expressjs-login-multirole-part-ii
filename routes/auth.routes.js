import express from "express";
import { validationResult } from "express-validator";
import { loginValidator } from "../validator/auth.validator.js";
import * as authController from "../controller/auth.controller.js";
import { guardMiddleware } from "../middleware/auth.middleware.js";
import passport from "../config/passport.js";
import jwt from "jsonwebtoken";
import { sendLoginAlert } from "../service/sender-main.service.js";

const router = express.Router();

// --- existing routes (session & jwt manual) ---
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
router.get("/mobile/auth/profile", guardMiddleware, authController.getProfileJwt);
router.get("/mobile/auth/refresh", guardMiddleware, authController.getProfileJwt);

router.post("/mobile/auth/google", authController.loginWithGoogle)

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"], session: false })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/api/v1/auth/google/fail", session: false }),
  async (req, res)  => {
    const user = req.user;
    
    const token = jwt.sign(
      { uuid: user.uuid, role: user.role },
      process.env.SECRET_TOKEN,
      { expiresIn: "3d" }
    );

    await sendLoginAlert(user.email, user.name)
    return res.json({
      token_type: "Bearer",
      expires_in: 3 * 24 * 60 * 60,
      token: token,
    });
  }
);

router.get("/auth/google/fail", (req, res) => {
  res.status(401).json({ msg: "Google login failed" });
});

export default router;
