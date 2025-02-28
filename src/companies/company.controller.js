import Company from "./company.model.js";
import { request, response } from "express";
import ExcelJS from "exceljs";

export const saveCompany = async (req, res) => {
    try {

        const data = req.body;

        if (req.admin.role !== "ADMIN") {
            return res.status(400).json({
                success: false,
                message: "You do not have permissions to save companies"
            });
        }

        const verifyImpactLevel = ["bajo", "medio", "alto"];
        if (!data.impactLevel || !verifyImpactLevel.includes(data.impactLevel.toLowerCase())) {
            return res.status(400).json({
                success: false,
                message: "Invalid impact level. Accepted values are: Bajo, Medio o Alto"
            });
        }
        
        const company = await Company.create({
            name: data.name,
            phone: data.phone,
            address: data.address,
            impactLevel: data.impactLevel.toLowerCase(),
            yearExperience: data.yearExperience,
            category: data.category.toLowerCase()
        });

        res.status(200).json({
            success: true,
            message: "Company saved successfully",
            company: company
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error saving company"
        });
    }
}

export const getCompanies = async (req = request, res = response) => {
    try {

        const { limite = 10, desde = 0, yearExperience, category, order } = req.query;
        const query = { estado: true };

        if (yearExperience) {
            query.yearExperience = Number(yearExperience);
        }

        if (category) {
            query.category = category.toLowerCase();
        }

        let sort = {};
        if (order === "A-Z") {
            sort.name = 1;
        } else if (order === "Z-A") {
            sort.name = -1;
        } else {
            sort.name = 1;
        }


        if (req.admin.role !== "ADMIN") {
            return res.status(400).json({
                success: false,
                message: "You do not have permissions to get companies"
            });
        }

        const [total, companies] = await Promise.all([
            Company.countDocuments(query),
            Company.find(query)
            .sort(sort)
            .skip(Number(desde))
            .limit(Number(limite))
        ])

        res.status(200).json({
            success: true,
            total,
            companies
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error getting companies"
        });
    }
}

export const getCompanyById = async (req, res) => {
    try {

        const { id } = req.params;

        if (req.admin.role !== "ADMIN") {
            return res.status(400).json({
                success: false,
                message: "You do not have permissions to get company by id"
            });
        }

        const company = await Company.findById(id);

        if (company.estado === false) {
            return res.status(400).json({
                success: false,
                message: "Company is disabled"
            });
        }

        if (!company) {
            return res.status(400).json({
                success: false,
                message: "Company not found"
            });
        }

        res.status(200).json({
            success: true,
            company
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error getting company by id"
        });
    }
}

export const updateCompany = async (req, res = response) => {
    try {

        const { id } = req.params;
        const { _id,...data } = req.body;

        const company = await Company.findById(id);

        if (company.estado === false) {
            return res.status(400).json({
                success: false,
                message: "Company is disabled"
            });
        }

        if (!company) {
            return res.status(400).json({
                success: false,
                message: "Company not found"
            });
        }

        if (req.admin.role!== "ADMIN") {
            return res.status(400).json({
                success: false,
                message: "You do not have permissions to update company"
            });
        }

        const verifyImpactLevel = ["bajo", "medio", "alto"];
        if (!data.impactLevel || !verifyImpactLevel.includes(data.impactLevel.toLowerCase())) {
            return res.status(400).json({
                success: false,
                message: "Invalid impact level. Accepted values are: Bajo, Medio o Alto"
            });
        }

        const updateCompany = await Company.findByIdAndUpdate(id, data, { new: true });

        res.status(200).json({
            success: true,
            message: "Company updated successfully",
            updateCompany
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating company"
        });
    }
}

export const generateReport = async (req, res) => {
    try {
        if (req.admin.role !== "ADMIN") {
            return res.status(400).json({
                success: false,
                message: "You do not have permissions to generate a report"
            });
        }

        const activeCompanies = await Company.find({ estado: true });
        const inactiveCompanies = await Company.find({ estado: false });

        const companies = [...activeCompanies, ...inactiveCompanies];

        const book = new ExcelJS.Workbook();
        const sheet = book.addWorksheet('Report Companies');

        sheet.columns = [
            { header: 'ID', key: '_id', width: 50 },
            { header: 'Name', key: 'name', width: 50 },
            { header: 'Phone', key: 'phone', width: 50 },
            { header: 'Address', key: 'address', width: 50 },
            { header: 'Impact Level', key: 'impactLevel', width: 50 },
            { header: 'Year Of Experience', key: 'yearExperience', width: 50 },
            { header: 'Category', key: 'category', width: 50 },
            { header: 'Estado', key: 'estado', width: 50 },
        ];

        companies.forEach(company => {
            sheet.addRow({
                _id: company._id,
                name: company.name,
                phone: company.phone,
                address: company.address,
                impactLevel: company.impactLevel,
                yearExperience: company.yearExperience,
                category: company.category,
                estado: company.estado ? 'Active' : 'Inactive',
            });
        });

        res.setHeader('Content-Disposition', 'attachment; filename="Report_Companies.xlsx"');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.send(Buffer.from(buffer));

        const buffer = await book.xlsx.writeBuffer();
        console.log("Buffer length:", buffer.length);
    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error generating the report"
        });
    }
};
