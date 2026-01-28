import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/user";
import UserToken from '@/models/usertoken'
import bcrypt from "bcryptjs";
import connectdb from "@/lib/db";
import { cookies } from "next/headers";


let SECRET_KEY = "UEBDJDJDJKLSLS";

export async function POST(req: Request) {
    try {
        await connectdb();
        let {useremail, userpassword, } = await req.json();
        let user = await User.findOne({useremail});
   
        if(!user) return NextResponse.json({error: 'user not found'});
        let isPasswordValid = await bcrypt.compare(userpassword, user.userpassword);
           if (!isPasswordValid) {
               return NextResponse.json({ error: 'Invalid password' });
           }
       let token = jwt.sign({userId: user._id}, SECRET_KEY, {expiresIn: '1h'});   
       let expiretime = new Date(Date.now() +( 60 * 60 * 1000));
           let newUserToken = new UserToken({
               userId: user._id,
               token,
               expiretime
           });
           await newUserToken.save();
           console.log('newUserToken', newUserToken, user._id);
           console.log('this is token: ', token, );
           (await cookies()).set('token', token, {
            httpOnly: true,
            secure: true,
            path: '/',
            maxAge: 60 * 60 // 1 hour
        });
          return NextResponse.json({status: 'you have successfully logged in', token: token, userId:user._id});   
    } catch (error) {
        console.error(error);
        return NextResponse.json({error: 'Server Error'});
        
    }
}