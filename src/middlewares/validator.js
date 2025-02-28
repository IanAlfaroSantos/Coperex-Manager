import { body } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import { existenteEmail, existenteNameCompany } from "../helpers/db-validator.js";

export const validatorLoginAdmin = [
    body('email').optional().isEmail().withMessage('Enter a valid email address'),
    body('username').optional().isString().withMessage('Enter a valid username'),
    body('password', 'Password must be at least 8 characters').isLength({ min: 8 })
]

export const validatorEmailClient = [
    body('name', 'The name is required').not().isEmpty(),
    body('surname', 'The surname is required').not().isEmpty(),
    body('email', 'You must enter a valid email').isEmail(),
    body('email').custom(existenteEmail),
    validarCampos
]

export const validatorCompany = [
    body('name', 'The name is required').not().isEmpty(),
    body('name').custom(existenteNameCompany),
    body('impactLevel', 'The impact level is required').not().isEmpty(),
    body('yearExperience', 'The year of experience is required').not().isEmpty(),
    body('category', 'The category is required').not().isEmpty(),
    validarCampos
]