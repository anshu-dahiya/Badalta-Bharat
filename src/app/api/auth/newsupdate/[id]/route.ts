import { NextRequest, NextResponse } from "next/server";
// import path from "path";
// import fs from "fs";
// import { writeFile } from "fs/promises";
import connectdb from "@/lib/db";
import Article from "@/models/Article";
import { uploadFiles } from "@/lib/multer";
import { mapToFile } from "@/models/FileDb";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectdb();

  const { id } = await Promise.resolve(params);
  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  try {
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const shortDescription = formData.get("shortDescription") as string;
    const content = formData.get("content") as string;
    const categoryName = formData.get("category") as string;
    const status = formData.get("status") as string;
    const file = formData.get("image") as File | null;

    const updateData: any = {};

    if (title) updateData.title = title;
    if (shortDescription) updateData.shortDescription = shortDescription;
    if (content) updateData.content = content;
    if (status) updateData.status = status;
    if (categoryName) updateData.category = categoryName;
    if (file) {
      const uploaded = await uploadFiles([file], "image"); // wrap in array
      const Image = uploaded.map(mapToFile);
      updateData.image = Image;
    }
    
    const updatedArticle = await Article.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedArticle) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Article updated successfully",
      article: updatedArticle,
    });
  } catch (err: any) {
    console.error("Error updating article:", err);
    return NextResponse.json(
      {
        error: "Server error",
        details: err.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
