import connectdb from "@/lib/db";
import Pdf from "@/models/pdf";
import { NextResponse } from "next/server";


export async function GET(req: Request){
    try {
        await connectdb();
        const { searchParams } = new URL(req.url);
    const lang = searchParams.get("language") || "en";
        let pdfs = await Pdf.find({ language: lang }).sort({ createdAt: -1 });
        if (!pdfs || pdfs.length === 0) {
            return NextResponse.json({ error: "No PDFs found for this language" }, { status: 404 });
          }
        return NextResponse.json({pdfs: pdfs, status: 'successfully fetched your pdfs'});
        
    } catch (error) {
        return NextResponse.json({error: 'Server Error'});  
    }
}
