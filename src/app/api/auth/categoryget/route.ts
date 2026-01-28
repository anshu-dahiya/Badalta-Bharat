import { NextResponse } from "next/server";
import Category from "@/models/category";
import connectdb from "@/lib/db";


export async function GET(req: Request){
    try {
        await connectdb();
        let category = await Category.findOne();
        if(!category) {
            return NextResponse.json({ error: "Category not found" });
        }
        return NextResponse.json({category: category, status: "we have sucessfully get your categories" });
       
    } catch (error) {
        console.error(error);
        return NextResponse.json({error: 'Server Error'});
    }
}
