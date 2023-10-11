import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, "please complete the field"],
    },
    email: {
        type: String,
        required: [true, "please complete the field"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "please complete the field"],
        select: false, // No devolver la contraseña en las consultas normales
    },
},
{
    timestamps: true,
    versionKey: false,
});

// Hashing password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Método para verificar la contraseña
userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

export const UserModel = mongoose?.models?.User || mongoose.model("User", userSchema);
