import { NextRequest, NextResponse } from "next/server";
import Article from "@/models/Article";
import connectdb from "@/lib/db";

export async function GET(req: NextRequest) {
    try {
        await connectdb();
        let { searchParams } = new URL(req.url);
        let page = parseInt(searchParams.get('page') || "1")
        let limit = parseInt(searchParams.get("limit") || "10");
        const language = searchParams.get('language') || 'en';
        let skip = (page - 1) * limit;
        let query: any = {};

        if (language !== 'all') {
            query.language = language;
        }

        let total = await Article.countDocuments(query);

        let articledata;
        if (limit === 0) {
            articledata = await Article.find(query); // no pagination
        } else {
            articledata = await Article.find(query).skip(skip).limit(limit).sort({ createdAt: -1 });
        }

        // let total = await Article.countDocuments({ language });
        // let articledata = await Article.find({ language }).skip(skip).limit(limit)

        const url = req.nextUrl.origin;
        let articles = await Article.find();
        articledata.forEach((article) => {
            if (article.image && article.image.length) {
                article.image.forEach((img: any) => {
                    if (img.path && !img.path.startsWith("http")) {
                        img.path = `${url}${img.path}`;
                    }
                });
            }
        });
        if (!articledata) {
            return NextResponse.json({ error: 'Article not found' });
        }
        return NextResponse.json({
            data: articledata,
            total,
            currentpage: page,
            totalPages: Math.ceil(total / limit)
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Server Error' });
    }
}

export const dynamic = 'force-dynamic';