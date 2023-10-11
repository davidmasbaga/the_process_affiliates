import connectDB from "@/app/utils/lib/dbConnect";
import { NextResponse } from "next/server";
import { UserModel } from "@/app/utils/models/User";
import authMiddleware from "../../../utils/lib/authMiddleware";



//get unique userbyID

export const GET = async (req, {params})=>{
    if (!authMiddleware(req)) {
        console.log("POST - Error de autenticación");
          return NextResponse.json({ error: "Unauthorized or Invalid Token" }, { status: 401 });
      }
    await connectDB();
    console.log("Getting Users...")
    const id = params.id

    try {
        const result = await UserModel.findById(id)
        
        return NextResponse.json({data:result}, {status:200})
    } catch (error) {
        return NextResponse.json({data:null}, {status:500})
    }

}


export const DELETE = async(req,{params})=>{
    if (!authMiddleware(req)) {
        console.log("POST - Error de autenticación");
          return NextResponse.json({ error: "Unauthorized or Invalid Token" }, { status: 401 });
      }
    await connectDB();
    const id = params.id

    try {
        const result = await UserModel.findByIdAndDelete(id)
        if(!result){return NextResponse.json({message:`User with ID:${id} not found`}, {status:404})}
        return NextResponse.json({message: `The user with ID:${id} has been deleted: `}, {status:200})
    } catch (error) {
        return NextResponse.json({data:null}, {status:500})
    }
}

export const PUT = async(req,{params})=>{
    if (!authMiddleware(req)) {
        console.log("POST - Error de autenticación");
          return NextResponse.json({ error: "Unauthorized or Invalid Token" }, { status: 401 });
      }
    await connectDB();
    const id = params.id
    const body = await req.json()

    try {
        const result = await UserModel.findByIdAndUpdate(id, {$set:{...body}}, {new:true})
        if(!result){return NextResponse.json({message:`User with ID:${id} not found`}, {status:404})}
        return NextResponse.json({data:result}, {status:200})
    } catch (error) {
        return NextResponse.json({data:null}, {status:500})
    }
}