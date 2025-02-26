import { Router } from "express";
import { deleteFileOnError } from "../middlewares/delete-file-on-error.js";
import { validatorLoginAdmin } from "../middlewares/validator.js";
import { login } from "./admin.controller.js";

const router = Router();

router.post(
    '/login',
    validatorLoginAdmin,
    deleteFileOnError,
    login
);

export default router;