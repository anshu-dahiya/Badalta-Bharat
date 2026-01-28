import { NextResponse } from "next/server";
import connectdb from "@/lib/db";
import Pdf from "@/models/pdf";


export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }){
    try {
        await connectdb();
        let {id} = await Promise.resolve(params);
        let pdf = await Pdf.findByIdAndDelete(id);
        if(!pdf){
            return NextResponse.json({message: 'pdf not found'});
        }
        return NextResponse.json({message: 'pdf deleted successfully'});
        
    } catch (error) {
    return  NextResponse.json({error: 'Server Error'});
    }
}