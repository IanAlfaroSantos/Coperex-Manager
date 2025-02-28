import { Router } from "express";
import { check } from "express-validator";
import { existenteCompanyById } from "../helpers/db-validator.js";
import { validatorCompany } from "../middlewares/validator.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { saveCompany, getCompanies, getCompanyById, updateCompany, generateReport } from "./company.controller.js";

const router = Router();

router.post(
    '/',
    [
        validarJWT,
        validatorCompany,
        validarCampos
    ],
    saveCompany
);

router.get(
    '/',
    validarJWT,
    getCompanies
);

router.get(
    '/:id',
    [
        validarJWT,
        check('id', 'Invalid ID').isMongoId(),
        check('id').custom(existenteCompanyById),
        validarCampos
    ],
    getCompanyById
);

router.put(
    '/:id',
    [
        validarJWT,
        check('id', 'Invalid ID').isMongoId(),
        check('id').custom(existenteCompanyById),
        validatorCompany,
        validarCampos
    ],
    updateCompany
);

router.post(
    '/generateReport',
    validarJWT,
    generateReport
);

export default router;