import { Schema, model } from "mongoose";

export const AdminSchema = Schema({
    name: {
        type: String,
        required: [true, "The name is required"]
    },
    surname: {
        type: String,
        required: [true, "The surname is required"]
    },
    username: {
        type: String,
        unique: true,
        lowercase: true
    },
    email: {
        type: String,
        required: [true, "The email is required"],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "The password is required"],
        minlength: [8, "The password can only be 8 characters long"]
    },
    phone: {
        type: String,
        required: [true, "The number phone is required"],
        maxlength: [8, "The phone numbre can only have a maximum of 8 characters"],
        minlength: [8, "The numbre phone can only have a minimum of 8 characters"]
    },
    role: {
        type: String,
        enum: "ADMIN"
    },
    estado: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    versionKey: false
})

AdminSchema.methods.toJSON = function () {
    const { __v, password, _id, ...admin } = this.toObject();
    admin.uid = _id;
    return admin;
}

export default model("Admin", AdminSchema);