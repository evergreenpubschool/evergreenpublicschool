import { NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConnect";
import Topper from "@/models/Topper";
import { topperSchema } from "@/lib/validations/topper";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    await connectDB();

    const toppers = await Topper.find().sort({ order: 1 });

    return NextResponse.json({
      success: true,
      toppers,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch toppers",
      },
      { status: 500 }
    );
  }
}


export async function POST(request: Request) {

  try {

    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    if (session.user.role !== "admin") {
      return NextResponse.json(
        {
          success: false,
          message: "Forbidden",
        },
        { status: 403 }
      );
    }

    const body = await request.json();

    const result = topperSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid topper data",
          errors: result.error.flatten(),
        },
        { status: 400 }
      );
    }

    await connectDB();

    const topper = await Topper.create(result.data);

    return NextResponse.json(
      {
        success: true,
        topper,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create topper",
      },
      { status: 500 }
    );
  }
}