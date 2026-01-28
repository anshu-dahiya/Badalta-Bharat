import connectdb from "@/lib/db";
import Contactdetails from '@/models/contact';
import { NextResponse } from "next/server";


export async function POST(req: Request){
    try {
        await connectdb();
        let {name, email, subject, phonenumber, message } = await req.json();
        if(!name || !email || !subject || !phonenumber || !message){
            return NextResponse.json({error: 'All fields are required'});
        }
        let newcontactdetails = new Contactdetails({name, email, subject, phonenumber, message});
        await newcontactdetails.save();
        return NextResponse.json({newcontactdetails: newcontactdetails, status: 'you have successfully added your contact details'});
    } catch (error) {
        console.error('an error to add details', error);
        return NextResponse.json({error: 'Server Error'});
        
    }
}