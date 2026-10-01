import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/dbConnect";
import Management from "@/models/Management";
import { managementSchema } from "@/lib/validations/management";
import cloudinary from "@/lib/cloudinary";
import { auth } from "@/lib/auth";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function DELETE(
  request: Request,
  context: RouteContext
) {
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
    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid management ID",
        },
        { status: 400 }
      );
    }

    await connectDB();

    const management = await Management.findById(id);

    if (!management) {
      return NextResponse.json(
        {
          success: false,
          message: "Management member not found",
        },
        { status: 404 }
      );
    }

    if (management.publicId) {
      await cloudinary.uploader.destroy(
        management.publicId,
        {
          resource_type: "image",
        }
      );
    }

    await Management.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Management member deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete management member",
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  context: RouteContext
) {
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
    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid management ID",
        },
        { status: 400 }
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

    const existingManagement =
      await Management.findById(id);

    if (!existingManagement) {
      return NextResponse.json(
        {
          success: false,
          message: "Management member not found",
        },
        { status: 404 }
      );
    }

    const management =
      await Management.findByIdAndUpdate(
        id,
        result.data,
        {
          new: true,
          runValidators: true,
        }
      );

    if (
      existingManagement.publicId &&
      existingManagement.publicId !==
      result.data.publicId
    ) {
      await cloudinary.uploader.destroy(
        existingManagement.publicId,
        {
          resource_type: "image",
        }
      );
    }

    return NextResponse.json({
      success: true,
      management,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update management member",
      },
      { status: 500 }
    );
  }
}