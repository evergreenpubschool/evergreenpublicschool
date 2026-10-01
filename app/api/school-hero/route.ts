import { NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConnect";
import SchoolHero from "@/models/SchoolHero";
import cloudinary from "@/lib/cloudinary";
import { auth } from "@/lib/auth";

export async function GET() {
  try {

    await connectDB();

    const hero = await SchoolHero.findOne();

    return NextResponse.json({
      success: true,
      hero,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch school hero",
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
    await connectDB();
    const body = await request.json();

    if (!body.imageUrl || !body.publicId) {
      return NextResponse.json(
        {
          success: false,
          message: "Image URL and public ID are required",
        },
        { status: 400 }
      );
    }
    const existingHero = await SchoolHero.findOne();
    const hero = await SchoolHero.findOneAndUpdate(
      {},
      {
        imageUrl: body.imageUrl,
        publicId: body.publicId,
      },
      {
        new: true,
        upsert: true,
      }
    );

    if (
      existingHero?.publicId &&
      existingHero.publicId !== body.publicId
    ) {
      const deleteResult = await cloudinary.uploader.destroy(
        existingHero.publicId,
        {
          resource_type: "image",
        }
      );

      console.log("Old Cloudinary publicId:", existingHero.publicId);
      console.log("New Cloudinary publicId:", body.publicId);
      console.log("Cloudinary delete result:", deleteResult);
    }

    return NextResponse.json({
      success: true,
      hero,
    });
  } catch (error) {
    console.error("School hero error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update hero image",
      },
      { status: 500 }
    );
  }
}