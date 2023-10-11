import connectDB from "../../../utils/lib/dbConnect";
import { UserModel } from "@/utils/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
    await connectDB();

    const { email, password } = await req.json();
    

    try {
        const user = await UserModel.findOne({ email }).select("+password");
        console.log(user)
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return NextResponse.json({ message: "Incorrect email or password" }, {status:401});
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
       
        user.password = undefined;

        return NextResponse.json({
            data: user,
            token
        }, {status:201});
    } catch (error) {
        return NextResponse.json({ message: error.message }, {status:500});
    }
};
