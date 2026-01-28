import { NextResponse } from "next/server";
import connectdb from "@/lib/db";
import About from "@/models/about";


export async function PUT(req: Request) {
    try {
        await connectdb();
        let { text } = await req.json();
        if (!text) {
            return NextResponse.json({ error: "All fields are required!" });
        }
        let companydetails = await About.findOneAndUpdate({}, { text }, { upsert: true, new: true });
        // let companydetails = await About.create({ text });  
        return NextResponse.json({
            companydetails: companydetails,
            status: 'you have successfully created your company details'
        })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Server Error' });
    }
}