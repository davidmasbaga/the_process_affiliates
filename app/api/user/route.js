import connectDB from "../../utils/lib/dbConnect";
import { NextResponse } from "next/server";
import { UserModel } from "@/utils/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authMiddleware from "../../utils/lib/authMiddleware";

export const POST = async (req, res) => {
    await connectDB();
    const {fullname, email, password} = await req.json();
    console.log(email)

    try {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }

        const newUser = await UserModel.create({ email, password, fullname});

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        // Eliminar contraseña del objeto
        newUser.password = undefined;

        return NextResponse.json({
            data: newUser,
            token
        }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
};

export const GET = async (req, res) => {
    if (!authMiddleware(req)) {
        console.log("POST - Error de autenticación");
          return NextResponse.json({ error: "Unauthorized or Invalid Token" }, { status: 401 });
      }
    await connectDB()
    try {
        const result = await UserModel.find()
        return NextResponse.json({users:result}, {status:200})
        
    } catch (error) {
        return NextResponse.json({data:null}, {status:500} )
    }
    
    };
    
    