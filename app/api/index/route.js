import connectDB from "@/app/utils/lib/dbConnect";
import { NextResponse } from "next/server";
import { CurrentAffiliateIndexModel } from "@/app/utils/models/CurrentAffiliateIndex";



// En api/index/route.js

// Obtener el índice actual
export const GET = async (req) => {
    // if (!authMiddleware(req)) {
    //     console.log("GET - Error de autenticación");
    //     return NextResponse.json({ error: "Unauthorized or Invalid Token" }, { status: 401 });
    // }

    await connectDB();

    try {
        let indexData = await CurrentAffiliateIndexModel.findOne();
        if(!indexData) {
            // Si no se encuentra el índice, crea uno nuevo
            indexData = new CurrentAffiliateIndexModel({ currentIndex: 0 });
            await indexData.save();
        }
        return NextResponse.json({ currentIndex: indexData.currentIndex }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Error al obtener el índice" }, { status: 500 });
    }
}




export const PUT = async (req) => {
    // if (!authMiddleware(req)) {
    //     console.log("PUT - Error de autenticación");
    //     return NextResponse.json({ error: "Unauthorized or Invalid Token" }, { status: 401 });
    // }

    await connectDB();
    
    const body = await req.json();
    const { currentIndex } = body;

    if (typeof currentIndex !== "number") {
        return NextResponse.json({ error: "El índice proporcionado no es válido." }, { status: 400 });
    }

    try {
        // Asumo que solo hay un documento en la colección para mantener el índice.
        // Si es la primera vez, se creará un documento nuevo.
        const indexDoc = await CurrentAffiliateIndexModel.findOne() || new CurrentAffiliateIndexModel();

        indexDoc.currentIndex = currentIndex;
        await indexDoc.save();

        return NextResponse.json({ message: "Índice actualizado con éxito." }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Error al actualizar el índice." }, { status: 500 });
    }
}