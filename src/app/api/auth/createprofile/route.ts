import { NextResponse } from 'next/server';
import connectdb from '@/lib/db';
import User from '@/models/user';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
    try {
        await connectdb();
        
        const { username, useremail, userpassword } = await req.json(); 
        if (!username || !useremail || !userpassword) {
            return NextResponse.json({ error: "All fields are required!" });
        }
        let existingUser = await User.findOne({ useremail });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists! Please log in." }, { status: 409 });
        }
        let hashpassword = await bcrypt.hash(userpassword, 10);
        let newUser = new User({ username, useremail, userpassword: hashpassword });

        await newUser.save();
        return NextResponse.json({ 
            status: "User registered successfully!", 
            userId: newUser._id 
        }, { status: 201 });

    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
