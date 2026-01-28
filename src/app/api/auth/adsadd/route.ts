import connectdb from "@/lib/db";
import Ads from "@/models/ads";
import { Files } from "lucide-react";
import { NextResponse } from "next/server";
import { uploadFiles } from "@/lib/multer";
import { mapToFile } from "@/models/FileDb";

export async function POST(req: Request) {
    await connectdb();
    let formData = await req.formData();
    let link = formData.get('link') as string;
    let image = formData.get('image') as File;
    try {
        let userimage = formData.getAll('image') as File[];
        let fileNames;
        if(userimage?.length){
            fileNames = await uploadFiles(userimage, 'image');
        }
        let image = fileNames!.map(mapToFile);
        let newads = new Ads({
            link,
            image
        })
        await newads.save();
        return NextResponse.json({newads: newads, status: 'you have successfully added an ad'});
    } catch (error) {
        console.error(error);
        return NextResponse.json({error: 'Server Error'});
    }
}

