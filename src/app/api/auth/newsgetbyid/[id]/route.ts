import { NextRequest, NextResponse } from "next/server";
import connectdb from "@/lib/db";
import Article from "@/models/Article";


export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectdb();
  try {
    const { id } = params;
    const language = req.nextUrl.searchParams.get("language") || "en";
    const url = req.nextUrl.origin;
    const article = await Article.findOne({ _id: id, language });
    if (!article) {
      return NextResponse.json(
        { message: "Article not found" },
        { status: 404 }
      );
    }
    if (article.image && article.image.length) {
      article.image = article.image.map((img: any) => ({
        ...img,
        path: `${url}${img.path}`,
      }));
    }
    return NextResponse.json(article);
  } catch (error) {
    console.error("Error fetching article:", error);
    return NextResponse.json(
      { message: "Error fetching article" },
      { status: 500 }
    );
  }
}



























/*import { NextRequest, NextResponse } from "next/server";
import connectdb from "@/lib/db";
import Article from "@/models/Article";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectdb();
  try {
    const url = req.nextUrl.origin;
    const { id } = await Promise.resolve(params);
    const article = await Article.findById(id);
    if (article?.image && article.image.length) {
      article.image.forEach((image:any) => {
          image.path = `${url}${image.path}`;
      });
  }
    if (!article) {
      return NextResponse.json(
        { message: "Article not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(article);
  } catch (error) {
    console.error("Error fetching article:", error);
    return NextResponse.json(
      { message: "Error fetching article" },
      { status: 500 }
    );
  }
}*/