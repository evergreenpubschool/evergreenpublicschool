
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/dbConnect";
import cloudinary from "@/lib/cloudinary";
import { galleryEventSchema } from "@/lib/validations/galleryEvent";
import GalleryEvent from "@/models/GalleryEvent";

const allowedHosts = [
  "photos.google.com",
  "photos.app.goo.gl",
];

function isGooglePhotosUrl(url: string) {
  try {
    const parsedUrl = new URL(url);

    return allowedHosts.includes(parsedUrl.hostname);
  } catch {
    return false;
  }
}

// GET ALL EVENTS
export async function GET() {
  try {
    await connectDB();

    const gallery = await GalleryEvent.find()
      .sort({ order: 1, createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      gallery,
    });
  } catch (error) {
    console.error("Get gallery error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch gallery",
      },
      { status: 500 }
    );
  }
}

// CREATE EVENT
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

    const result = galleryEventSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid gallery event data",
          errors: result.error.flatten(),
        },
        { status: 400 }
      );
    }

    const validatedData = result.data;

    if (!isGooglePhotosUrl(validatedData.googlePhotosUrl)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a valid Google Photos URL",
        },
        { status: 400 }
      );
    }

    await connectDB();

    const event = await GalleryEvent.create(validatedData);

    return NextResponse.json(
      {
        success: true,
        message: "Gallery event added successfully",
        event,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create gallery event error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create gallery event",
      },
      { status: 500 }
    );
  }
}

// UPDATE EVENT
export async function PUT(request: Request) {
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

    const { _id, ...eventData } = body;

    if (!_id) {
      return NextResponse.json(
        {
          success: false,
          message: "Gallery event ID is required",
        },
        { status: 400 }
      );
    }

    const result = galleryEventSchema.safeParse(eventData);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid gallery event data",
          errors: result.error.flatten(),
        },
        { status: 400 }
      );
    }

    if (!isGooglePhotosUrl(result.data.googlePhotosUrl)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a valid Google Photos URL",
        },
        { status: 400 }
      );
    }

    await connectDB();

    const existingEvent = await GalleryEvent.findById(_id);

    if (!existingEvent) {
      return NextResponse.json(
        {
          success: false,
          message: "Gallery event not found",
        },
        { status: 404 }
      );
    }

    const oldPublicId = existingEvent.publicId;

    existingEvent.title = result.data.title;
    existingEvent.imageUrl = result.data.imageUrl;
    existingEvent.publicId = result.data.publicId;
    existingEvent.googlePhotosUrl = result.data.googlePhotosUrl;
    existingEvent.order = result.data.order;

    await existingEvent.save();

    // Delete old Cloudinary image if it was replaced.
    if (
      oldPublicId &&
      oldPublicId !== result.data.publicId
    ) {
      try {
        await cloudinary.uploader.destroy(oldPublicId);
      } catch (error) {
        console.error(
          "Failed to delete old Cloudinary image:",
          error
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: "Gallery event updated successfully",
      event: existingEvent,
    });
  } catch (error) {
    console.error("Update gallery event error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update gallery event",
      },
      { status: 500 }
    );
  }
}

// DELETE EVENT
export async function DELETE(request: Request) {
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

    const { _id } = body;

    if (!_id) {
      return NextResponse.json(
        {
          success: false,
          message: "Gallery event ID is required",
        },
        { status: 400 }
      );
    }

    await connectDB();

    const event = await GalleryEvent.findById(_id);

    if (!event) {
      return NextResponse.json(
        {
          success: false,
          message: "Gallery event not found",
        },
        { status: 404 }
      );
    }

    // Delete image from Cloudinary first.
    try {
      await cloudinary.uploader.destroy(event.publicId);
    } catch (error) {
      console.error(
        "Failed to delete Cloudinary image:",
        error
      );
    }

    await GalleryEvent.findByIdAndDelete(_id);

    return NextResponse.json({
      success: true,
      message: "Gallery event deleted successfully",
    });
  } catch (error) {
    console.error("Delete gallery event error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete gallery event",
      },
      { status: 500 }
    );
  }
}
