import Client from '../clients/client.model.js';

export const existenteEmail = async (email = ' ') => {

    const existeEmail = await Client.findOne({ email });

    if (existeEmail) {
        throw new Error(`The email ${ email } already exists in the database`);
    }
}

export const existenteClienById = async (id = '') => {

    const existeClient = await Client.findById(id);

    if (!existeClient) {
        throw new Error(`The ID ${ id } does not exist in the database`);
    }
}