import Admin from "./admin.model.js";
import { hash, verify } from "argon2";
import { generateJWT } from "../helpers/generate-jwt.js";

export const login = async (req, res) => {

    const { email, password, username } = req.body;

    try {
        const lowerEmail = email ? email.toLowerCase() : null;
        const lowerUsername = username ? username.toLowerCase() : null;

        const admin = await Admin.findOne({
            $or: [
                { email: lowerEmail },
                { username: lowerUsername }
            ]
        });

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Incorrect credencials, email or username does not exist in the database"
            });
        }

        const validPassword = await verify(admin.password, password);

        if (!validPassword) {
            return res.status(400).json({
                success: false,
                message: "Incorrect password"
            });
        }

        const token = generateJWT(admin.id);

        res.status(200).json({
            success: true,
            message: "¡¡Successful Login!!",
            userDetails: {
                username: admin.username,
                token: token
            }
        })
        
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            success: false,
            message: "Error failed to log in",
            error: e.menssage
        });
    }
}

export const createAdmin = async () => {
    try {
        const verifyAdmin = await Admin.findOne({ username: "Administrador" });

        if (!verifyAdmin) {
            const encryptedPassword = await hash("Admin100");
            const admin = new Admin({
                name: "Ian",
                surname: "Alfaro",
                username: "Administrador",
                email: "admin@gmail.com",
                phone: "45398274",
                password: encryptedPassword,
                role: "ADMIN"
            });

            await admin.save();

            console.log("Admin created successfully");
        } else {
            console.log("Admin already exists, it was not created again");
        }
        
    } catch (error) {
        console.log("Error creating Admin: ", error);
    }
}