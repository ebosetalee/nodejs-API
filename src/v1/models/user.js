import mongoose from "mongoose";

/// Basic details of an admin, you can add more
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please input you preferred username"],
            unique: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        phone: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
            select: false
        },
        role: {
            type: String,
            enum: ["super_admin", "admin", "regular"],
            default: "regular"
        },
        password_reset_token: { type: String, select: false },
        password_reset_expires: { type: Date, select: false }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);

export default User;
