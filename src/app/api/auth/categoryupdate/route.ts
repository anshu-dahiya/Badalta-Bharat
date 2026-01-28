import { NextResponse } from "next/server";
import Category from "@/models/category";
import connectdb from "@/lib/db";


export async function PUT(req: Request){
    try {
       await connectdb();
       let {_id, name}  = await req.json();
       let category = await Category.findOne({_id, name})
       if(!category){
            return NextResponse.json({error: 'Category Not Found'});
       }
       let newupdate = await Category.findByIdAndUpdate(
        _id,
        {name},
        {new: true}
       )
       await newupdate.save();
       return NextResponse.json({newupdate: newupdate, status: 'your category has been successfully updated'});
    } catch (error) {
        console.error(error);
        return NextResponse.json({error: 'Server Error'});
    }
}
