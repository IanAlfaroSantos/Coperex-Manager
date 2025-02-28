import Client from '../clients/client.model.js';
import Company from '../companies/company.model.js';

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

export const existenteCompanyById = async (id = '') => {

    const existeCompany = await Company.findById(id);

    if (!existeCompany) {
        throw new Error(`The ID ${ id } does not exist in the database`);
    }
}

export const existenteNameCompany = async (name = ' ') => {
    
    const existeName = await Company.findOne({ name });
    
    if (existeName) {
        throw new Error(`The name ${ name } already exists in the database`);
    }
}