import { NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConnect";
import Management from "@/models/Management";
import { managementSchema } from "@/lib/validations/management";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    await connectDB();

    const management = await Management.find().sort({
      order: 1,
    });

    return NextResponse.json({
      success: true,
      management,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch management",
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

    const result = managementSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid management data",
          errors: result.error.flatten(),
        },
        { status: 400 }
      );
    }

    await connectDB();

    const management = await Management.create(
      result.data
    );

    return NextResponse.json(
      {
        success: true,
        management,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create management member",
      },
      { status: 500 }
    );
  }
}