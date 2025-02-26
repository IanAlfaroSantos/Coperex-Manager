'user strict'

import express from "express";
import cors from 'cors';
import helmet from "helmet";
import morgan from "morgan";
import { dbConnection } from "./mongo.js";
import limiter from '../src/middlewares/validar-cant-peticiones.js';
import { createAdmin } from "../src/admin/admin.controller.js";
import adminRoutes from "../src/admin/admin.routes.js";
import clientRoutes from "../src/clients/client.routes.js";

const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false }))
    app.use(cors());
    app.use(express.json());
    app.use(helmet());
    app.use(morgan('dev'));
    app.use(limiter);
}

const routes = (app) => {
    app.use('/coperexManager/v1/admin', adminRoutes)
    app.use('/coperexManager/v1/clients', clientRoutes)
}

const conectarDB = async () => {
    try {
        await dbConnection();
        console.log('¡¡Conexión a la base de datos exitosa!!');
        await createAdmin();
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error.message);
        process.exit(1);
    }
}

export const initServer = async () => {
    const app = express();
    const port = process.env.PORT || 3000

    try {
        middlewares(app);
        conectarDB();
        routes(app);
        app.listen(port);
        console.log(`Server running on port ${port}`);
    } catch (error) {
        console.error(`Server init failded ${error}`);
    }
}