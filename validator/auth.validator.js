import { body } from "express-validator";

export const loginValidator = [
    body('email')
        .notEmpty().withMessage("Email wajib diisi")
        .isEmail().withMessage("Format email tidak valid"),

    body('password')
        .notEmpty().withMessage("Password wajib diisi")
        .isLength({ min: 6 }).withMessage("Password minimal 6 karakter"),
];
