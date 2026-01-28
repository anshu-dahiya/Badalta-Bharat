import { NextResponse } from "next/server";
import Category from "@/models/category";
import connectdb from "@/lib/db";

export async function POST(req: Request){
    try {
        await connectdb();
        let {name} = await req.json();
        if(!name){
            return NextResponse.json({error: 'Name is required'});
        }
        let newcategory = new Category({name})
        await newcategory.save();
        return NextResponse.json({newcategory: newcategory, status: 'you have successfully created a category'});
    } catch (error) {
        console.error(error);
        return NextResponse.json({error: 'Server Error'});
    }
}
