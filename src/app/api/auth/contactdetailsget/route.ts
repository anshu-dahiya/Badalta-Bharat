import connectdb from "@/lib/db";
import Contactdetails from "@/models/contact";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectdb();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const total = await Contactdetails.countDocuments();
    const contactdetails = await Contactdetails.find().skip(skip).limit(limit);

    return NextResponse.json({
      data: contactdetails,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    });

  } catch (error) {
    console.error("An error occurred while fetching contact details:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
