import { Router } from "express";
import { check } from "express-validator";
import { existenteClienById } from "../helpers/db-validator.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { saveClient } from "./client.controller.js";
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