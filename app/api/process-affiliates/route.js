import connectDB from "@/app/utils/lib/dbConnect";
import { AffiliateModel } from "@/app/utils/models/Affiliate";
import { NextResponse } from "next/server";

import { CurrentAffiliateIndexModel } from "@/app/utils/models/CurrentAffiliateIndex";

export const POST = async (req, res) => {
    // if (!authMiddleware(req)) {
    //   console.log("POST - Error de autenticación");
    //     return NextResponse.json({ error: "Unauthorized or Invalid Token" }, { status: 401 });
    // }

    await connectDB();
    const body = await req.json();
    try {
        const newAffiliate = new AffiliateModel(body);
        
        // Asignar un índice
        const totalAffiliates = await AffiliateModel.countDocuments();
        newAffiliate.index = totalAffiliates + 1;

        await newAffiliate.save();
        return NextResponse.json({ data: newAffiliate }, { status: 201 });
    } catch (error) {
        console.error("POST - Error al crear afiliado:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};

export const GET = async (req, res) => {
    // if (!authMiddleware(req)) {
    //   console.log("GET - Error de autenticación");
    //     return NextResponse.json({ error: "Unauthorized or Invalid Token" }, { status: 401 });
    // }

    await connectDB();
   
    try {
        const result = await AffiliateModel.find();
        const currentIndexData = await CurrentAffiliateIndexModel.findOne();
        const currentIndex = currentIndexData ? currentIndexData.currentIndex : 0;
        return NextResponse.json({ affiliates: result, currentIndex: currentIndex }, { status: 200 });
    } catch (error) {
      console.error("GET - Error al obtener afiliados:", error.message);
        return NextResponse.json({ data: null, error: error.message }, { status: 500 });
    }
};
