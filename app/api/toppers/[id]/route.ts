import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/dbConnect";
import Topper from "@/models/Topper";
import { topperSchema } from "@/lib/validations/topper";
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

    // Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid topper ID",
        },
        { status: 400 }
      );
    }

    await connectDB();

    // Find the topper first so we can get its Cloudinary publicId
    const topper = await Topper.findById(id);

    if (!topper) {
      return NextResponse.json(
        {
          success: false,
          message: "Topper not found",
        },
        { status: 404 }
      );
    }

    // Delete image from Cloudinary
    if (topper.publicId) {
      await cloudinary.uploader.destroy(topper.publicId, {
        resource_type: "image",
      });
    }

    // Delete topper from MongoDB
    await Topper.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Topper deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete topper",
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
          message: "Invalid topper ID",
        },
        { status: 400 }
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

    // Get the existing topper before updating
    const existingTopper = await Topper.findById(id);

    if (!existingTopper) {
      return NextResponse.json(
        {
          success: false,
          message: "Topper not found",
        },
        { status: 404 }
      );
    }

    // Update MongoDB
    const topper = await Topper.findByIdAndUpdate(
      id,
      result.data,
      {
        new: true,
        runValidators: true,
      }
    );

    // If the image changed, delete the old Cloudinary image
    if (
      existingTopper.publicId &&
      existingTopper.publicId !== result.data.publicId
    ) {
      await cloudinary.uploader.destroy(
        existingTopper.publicId,
        {
          resource_type: "image",
        }
      );
    }

    return NextResponse.json({
      success: true,
      topper,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update topper",
      },
      { status: 500 }
    );
  }
}
