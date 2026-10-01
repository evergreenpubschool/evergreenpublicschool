import { NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConnect";
import Topper from "@/models/Topper";

export async function GET() {
  try {
    await connectDB();

    const toppers = await Topper.find();

    return NextResponse.json({
      success: true,
      toppers,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Database connection failed",
      },
      { status: 500 }
    );
  }
}