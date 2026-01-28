import { NextResponse } from "next/server";
import Category from "@/models/category";
import connectdb from "@/lib/db";


export async function DELETE(req: Request){
    try {
        await connectdb();
        let {_id} = await req.json();
        let category = await Category.findByIdAndDelete(_id);
        if(!category){
            return NextResponse.json({error: 'Category not found'});
        }
        return NextResponse.json({status: 'successfully deleted', category: category});
    } catch (error) {
        console.error(error);
        return NextResponse.json({error: 'Server Error'});
    }
}
