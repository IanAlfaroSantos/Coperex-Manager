import rateLimit from "express-rate-limit";

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
        succes: false,
        message: "Demasiadas peticiones desde esta IP, por favor intente después de 15 minutos"
    }
})

export default limiter;