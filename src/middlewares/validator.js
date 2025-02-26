import { body } from "express-validator";

export const validatorLoginAdmin = [
    body('email').optional().isEmail().withMessage('Enter a valid email address'),
    body('username').optional().isString().withMessage('Enter a valid username'),
    body('password', 'Password must be at least 8 characters').isLength({ min: 8 })
]