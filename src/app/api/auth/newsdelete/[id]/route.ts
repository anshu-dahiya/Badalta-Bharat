import { NextRequest, NextResponse } from "next/server";
import connectdb from "@/lib/db";
import Article from "@/models/Article";
export async function DELETE(
  req: NextRequest,
 { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectdb();

    // Safely extracting params (recommended by Next.js team)
    const { id } = await Promise.resolve(params);

    const article = await Article.findByIdAndDelete(id);

    if (!article) {
      return NextResponse.json({ message: "Article not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Article deleted successfully" });
  } catch (error) {
    console.error("Error deleting article:", error);
    return NextResponse.json({ message: "Error deleting article" }, { status: 500 });
  }
}
