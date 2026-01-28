import connectdb from "@/lib/db";
import Pdf from "@/models/pdf";
import {  NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { filterProps } from "framer-motion";
import { buffer } from "stream/consumers";

export async function OPTIONS() {
    return NextResponse.json({}, {
        headers:{
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        }
    })
}
export async function POST(req: Request){
    try {
        await connectdb();
        let contenttype = req.headers.get('content-type');
        if(!contenttype || !contenttype.includes('multipart/form-data')){
            return NextResponse.json({error: 'Invalid Content-Type. Use multipart/form-data'});

        }
        let formData = await req.formData();
        let file = formData.get('file') as File;
        const language = formData.get('language') as 'en' | 'hn';

        let bytes = await file.arrayBuffer();
        let buffer = Buffer.from(bytes);
        let filepath = path.join(process.cwd(), 'public/uploads', file.name);
        await writeFile(filepath, buffer);

        console.log('uuploaded file', file.name);

        let newpdf = new Pdf({
            file: `/uploads/${file.name}`,
            language: language
        });
        await newpdf.save();
        return NextResponse.json({newpdf: newpdf, status: 'you have successfully added a pdf'});
    } catch (error) {
        return NextResponse.json({error: 'Server Error'});

    }
}