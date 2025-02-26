import { Router } from "express";
import { check } from "express-validator";
import { existenteClienById } from "../helpers/db-validator.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { saveClient, getClients, getClientById, updateClient, deleteClient } from "./client.controller.js";
import { validatorEmailClient } from "../middlewares/validator.js";

const router = Router();

router.post(
    '/',
    [
        validarJWT,
        validatorEmailClient,
        validarCampos
    ],
    saveClient
);

router.get(
    '/',
    validarJWT,
    getClients
);

router.get(
    '/:id',
    [
        validarJWT,
        check('id', 'Invalid ID').isMongoId(),
        check('id').custom(existenteClienById),
        validarCampos
    ],
    getClientById
);

router.put(
    '/:id',
    [
        validarJWT,
        check('id', 'Invalid ID').isMongoId(),
        check('id').custom(existenteClienById),
        validarCampos
    ],
    updateClient
);

router.delete(
    '/:id',
    [
        validarJWT,
        check('id', 'Invalid ID').isMongoId(),
        check('id').custom(existenteClienById),
        validarCampos
    ],
    deleteClient
);

export default router;