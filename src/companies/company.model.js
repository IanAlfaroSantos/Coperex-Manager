import { Schema, model } from "mongoose";

export const CompanySchema = Schema({
    name: {
        type: String,
        required: [true, "The name is required"]
    },
    phone: {
        type: String,
        required: [true, "The phone number is required"]
    },
    address: {
        type: String,
        required: [true, "The address is required"]
    },
    impactLevel: {
        type: String,
        enum: ["Bajo".toLowerCase(), "Medio".toLowerCase(), "Alto".toLowerCase()],
        required: [true, "The impact level is required"]
    },
    yearExperience: {
        type: Number,
        required: [true, "The year of experience is required"]
    },
    category: {
        type: String,
        required: [true, "The category is required"]
    },
    estado: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    versionKey: false
})

export default model("Company", CompanySchema);