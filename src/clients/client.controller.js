import Client from "./client.model.js";
import { request, response } from "express";

export const saveClient = async (req, res) => {
    try {

        const data = req.body;

        if (req.admin.role !== "ADMIN") {
            res.status(400).json({
                success: false,
                message: "You do not have permissions to save clients"
            });
        }
        
        const client = await Client.create({
            name: data.name,
            surname: data.surname,
            email: data.email,
            phone: data.phone,
            address: data.address
        });

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

export const getClients = async (req = request, res = response) => {
    try {

        const { limite = 10, desde = 0 } = req.body;
        const query = { estado: true };

        if (req.admin.role !== "ADMIN") {
            return res.status(400).json({
                success: false,
                message: "You do not have permissions to get clients"
            });
        }

        const [total, clients] = await Promise.all([
            Client.countDocuments(query),
            Client.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
        ]);

        res.status(200).json({
            success: true,
            total,
            clients
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error getting clients"
        });
    }
}

export const getClientById = async (req, res) => {
    try {

        const { id } = req.params;

        if (req.admin.role !== "ADMIN") {
            return res.status(400).json({
                success: false,
                message: "You do not have permissions to search clients"
            });
        }

        const client = await Client.findById(id);

        if (client.estado === false) {
            return res.status(400).json({
                success: false,
                message: "Client is disabled"
            });
        }
        
        if (!client) {
            return res.status(400).json({
                success: false,
                message: "Client not found"
            });
        }

        res.status(200).json({
            success: true,
            client
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error getting client by ID"
        });
    }
}

export const updateClient = async (req, res = response) => {
    try {

        const { id } = req.params;
        const { _id, email, ...data } = req.body;

        const client = await Client.findById(id);
        
        if (client.estado === false) {
            return res.status(400).json({
                success: false,
                message: "Client is disabled"
            });
        }
        
        if (!client) {
            return res.status(400).json({
                success: false,
                message: "Client not found"
            });
        }

        if (req.admin.role !== "ADMIN") {
            return res.status(400).json({
                success: false,
                message: "You do not have permissions to update clients"
            });
        }

        const updatedClient = await Client.findByIdAndUpdate(id, data, { new: true });

        res.status(200).json({
            success: true,
            message: "Client updated successfully",
            updatedClient
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating client"
        });
    }
}

export const deleteClient = async (req, res = response) => {
    try {

        const { id } = req.params;
        
        const client = await Client.findById(id);

        if (client.estado === false) {
            return res.status(400).json({
                success: false,
                message: "The client is already disabled"
            });
        }

        if (!client) {
            return res.status(400).json({
                success: false,
                message: "Client not found"
            });
        }
        
        if (req.admin.role !== "ADMIN") {
            return res.status(400).json({
                success: false,
                message: "You do not have permissions to delete clients"
            });
        }

        const deleteClient = await Client.findByIdAndUpdate(id, { estado: false }, { new: true });

        res.status(200).json({
            success: true,
            message: "Client deleted successfully",
            deleteClient
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error deleting client"
        });
    }
}