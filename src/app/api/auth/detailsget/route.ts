import { NextResponse } from "next/server";
import connectdb from "@/lib/db";
import About from "@/models/about";



export async function GET(req: Request){
    try {
    await connectdb();
    let Companydetails = await About.findOne({});
    if(!Companydetails){
        return NextResponse.json({error: 'Company details not found'});
    }
    return NextResponse.json({Companydetails: Companydetails, status: 'successfully fetched your company details'});
    } catch (error) {
    console.error('getting an error', error);
    return NextResponse.json({error: 'Server Error'});
    }
}