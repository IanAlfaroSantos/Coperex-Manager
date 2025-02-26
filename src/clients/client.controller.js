import Client from "./client.model.js";
import { hash, verify } from "argon2";
import { request, response } from "express";

export const saveClient = async (req, res) => {
    try {

        const data = req.body;

        const client = await Client.create({
            name: data.name,
            surname: data.surname,
            email: data.email,
            phone: data.phone,
            address: data.address
        });

        if (req.admin.role !== "ADMIN") {
            res.status(400).json({
                success: false,
                message: "You do not have permissions to save clients"
            });
        }

        res.status(200).json({
            success: true,
            message: "Client saved successfully",
            client: client
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error saving client"
        });
    }
}