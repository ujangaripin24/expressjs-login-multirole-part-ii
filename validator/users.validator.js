import { body, param, validationResult } from "express-validator";
import db from "../models/index.js";
const { TblUser } = db;

export const createUserValidator = [
    body('name').notEmpty().withMessage("name is required"),
    body('email')
        .isEmail()
        .withMessage("email is required Dune!!")
        .custom(async (value) => {
            const existingUser = await TblUser.findOne({ where: { email: value } });
            if (existingUser) {
                throw new Error("Email already exists");
            }
            return true;
        }),
    body('password')
        .notEmpty().withMessage("password is required")
        .isLength({ min: 6 }).withMessage("Password minimal 6 karakter"),
    body('confPassword')
        .notEmpty().withMessage("Confirm password is required")
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Password dan confirm password tidak sama");
            }
            return true;
        })
]

export const updateUserValidator = [
    param('uuid')
        .notEmpty().withMessage("uuid is required")
        .custom(async (value) => {
            const user = await TblUser.findOne({ where: { uuid: value } });
            if (!user) {
                throw new Error("tidak ada id tersebut");
            }
            return true;
        }),
    body('name')
        .notEmpty().withMessage('Username wajib diisi')
        .custom(async (value, { req }) => {
            const user = await TblUser.findOne({
                where: {
                    name: value
                }
            });
            if (user && user.uuid !== req.params.uuid) {
                throw new Error('Username sudah digunakan oleh user lain');
            }

            return true;
        }),
    body('email')
        .isEmail()
        .withMessage('Invalid email')
        .custom(async (value, { req }) => {
            const user = await TblUser.findOne({ where: { email: value } })
            if (user && user.uuid !== req.params.uuid) {
                throw new Error('Email already exists')
            }
            return true
        }),
    body('password')
        .optional()
        .isLength({ min: 6 }).withMessage('Password minimal 6 karakter'),
    body('confPassword')
        .optional()
        .custom((value, { req }) => {
            if (req.body.password && value !== req.body.password) {
                throw new Error("Password dan confirm password tidak sama");
            }
            return true;
        })
]