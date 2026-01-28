import { NextRequest, NextResponse } from "next/server";
import connectdb from "@/lib/db";
import Ads from "@/models/ads";

export async function GET(req: NextRequest) {
    try {
        await connectdb();

        const url = req.nextUrl.origin;
        let alldata = await Ads.find({})
        alldata.forEach((article) => {
            if (article.image && article.image.length) {
                article.image.forEach((image:any) => {
                    image.path = `${url}${image.path}`;
                });
            }
        });
        return NextResponse.json({alldata, 'status': 'successfully fetched ads'})
    } catch (error) {
        return NextResponse.json({ 
            error: "Server Error", 
            details: "An unknown error occurred" 
            }, { status: 500 });  
    }
}