import connectdb from "@/lib/db";
import Contactdetails from "@/models/contact";
import { NextResponse } from "next/server";


export async function DELETE(req: Request, {params}: {params: Promise<{id: string}>}){
    try {
        await connectdb();
        let {id}  = await Promise.resolve(params);
        let contactdetails = await Contactdetails.findByIdAndDelete(id);
        if(!contactdetails){
            return NextResponse.json({error: 'Contact details not found'});
        }
        return NextResponse.json({contactdetails: contactdetails, status: 'successfully deleted your contact details'});
    } catch (error) {
        console.error('an error to add details', error);
        return NextResponse.json({error: 'Server Error'});
    }
}