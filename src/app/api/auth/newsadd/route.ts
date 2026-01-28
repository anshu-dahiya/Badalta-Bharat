import { NextRequest, NextResponse } from "next/server";
import connectdb from "@/lib/db";
import Article from "@/models/Article";
// import path from "path";
// import fs from "fs";
// import { writeFile } from "fs/promises";
import { uploadFiles } from "@/lib/multer";
import { mapToFile } from "@/models/FileDb";

export async function POST(req: NextRequest) {
  try {
    await connectdb();
    const formData = await req.formData();
    const title = formData.get('title') as string;
    const shortDescription = formData.get('shortDescription') as string;
    const content = formData.get('content') as string;
    const category = formData.get('category') as string;
    const status = formData.get('status') as string;
    const imageFile = formData.get('image') as File;
    const language = formData.get('language') as 'en' | 'hn';
    
    console.log("Form data parsed:", { title, shortDescription, category, status });
    console.log("Image file received:", imageFile ? "Yes" : "No");
    try {
      const userImage = formData.getAll('image') as File[];
      let fileNames;
    if (userImage?.length) {
      fileNames = await uploadFiles(userImage, 'image');
    }
    const Image = fileNames!.map(mapToFile);
      
      console.log("Creating article in database...");
      // Create article in database
      const newArticle = await Article.create({
        title,
        shortDescription,
        content,
        category,
        status,
        image: Image,
        language
      });
      
      console.log("Article created successfully:", newArticle._id);
      return NextResponse.json({
        message: "Article created successfully",
        article: newArticle,
      });
    } catch (fileError) {
      console.error("File processing error:", fileError);
      return NextResponse.json({ 
        error: "File processing error", 
        // details: fileError instanceof Error ? fileError.message : "Unknown error"
      }, { status: 500 });
    }
  } catch (err) {
    console.error("Error in API route:", err);
    if (err instanceof Error) {
      return NextResponse.json({ 
      error: "Server Error", 
      details: err.message 
      }, { status: 500 });
    } else {
      return NextResponse.json({ 
      error: "Server Error", 
      details: "An unknown error occurred" 
      }, { status: 500 });
    }
  }
}
