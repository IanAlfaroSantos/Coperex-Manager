import { Schema, model } from "mongoose";

export const ClientSchema = Schema({
    name: {
        type: String,
        required: [true, "The name is required"]
    },
    surname: {
        type: String,
        required: [true, "The surname is required"]
    },
    email: {
        type: String,
        required: [true, "The email is required"],
        lowercase: true,
        unique: true
    },
    phone: {
        type: String,
        required: [true, "The number phone is required"],
        minlength: [8, "The phone number can only have a minimum of 8 characters"],
        maxlength: [8, "The phone numbre can only have a maximum of 8 characters"]
    },
    address: {
        type: String,
        required: [true, "The address is required"]
    },
    estado: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    versionKey: false
})

export default model("Client", ClientSchema);