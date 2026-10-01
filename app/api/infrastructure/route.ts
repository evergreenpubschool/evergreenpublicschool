import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/dbConnect";
import Infrastructure from "@/models/Infrastructure";
import cloudinary from "@/lib/cloudinary";
import { revalidatePath } from "next/cache";

/* =========================
   GET
   Get all infrastructure photos
========================= */

export async function GET() {
  try {
    await connectDB();

    const photos = await Infrastructure.find()
      .sort({ order: 1, createdAt: 1 })
      .lean();

    return NextResponse.json({
      success: true,
      photos,
    });
  } catch (error) {
    console.error("GET infrastructure error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch infrastructure photos",
      },
      { status: 500 }
    );
  }
}

/* =========================
   POST
   Create infrastructure photo
========================= */

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

    const { title, imageUrl, publicId, order } = body;

    if (!title || !imageUrl || !publicId) {
      return NextResponse.json(
        {
          success: false,
          message: "Title, imageUrl and publicId are required",
        },
        { status: 400 }
      );
    }

    await connectDB();

    const photo = await Infrastructure.create({
      title,
      imageUrl,
      publicId,
      order: order ?? 0,
    });

    revalidatePath("/infrastructure");

    return NextResponse.json(
      {
        success: true,
        photo,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST infrastructure error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create infrastructure photo",
      },
      { status: 500 }
    );
  }
}

/* =========================
   PUT
   Update infrastructure photo
========================= */

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

    const {
      id,
      title,
      imageUrl,
      publicId,
      order,
    } = body;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Photo ID is required",
        },
        { status: 400 }
      );
    }

    if (!title || !imageUrl || !publicId) {
      return NextResponse.json(
        {
          success: false,
          message: "Title, imageUrl and publicId are required",
        },
        { status: 400 }
      );
    }

    await connectDB();

    const existingPhoto = await Infrastructure.findById(id);

    if (!existingPhoto) {
      return NextResponse.json(
        {
          success: false,
          message: "Infrastructure photo not found",
        },
        { status: 404 }
      );
    }

    /*
      If the image was replaced,
      delete the old image from Cloudinary.
    */

    if (publicId !== existingPhoto.publicId) {
      try {
        await cloudinary.uploader.destroy(
          existingPhoto.publicId
        );
      } catch (cloudinaryError) {
        console.error(
          "Failed to delete old Cloudinary image:",
          cloudinaryError
        );
      }
    }

    existingPhoto.title = title;
    existingPhoto.imageUrl = imageUrl;
    existingPhoto.publicId = publicId;
    existingPhoto.order = order ?? existingPhoto.order;

    await existingPhoto.save();
    revalidatePath("/infrastructure");

    return NextResponse.json({
      success: true,
      photo: existingPhoto,
    });
  } catch (error) {
    console.error("PUT infrastructure error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update infrastructure photo",
      },
      { status: 500 }
    );
  }
}

/* =========================
   DELETE
   Delete infrastructure photo
========================= */

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

    const { searchParams } = new URL(request.url);

    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Photo ID is required",
        },
        { status: 400 }
      );
    }

    await connectDB();

    const photo = await Infrastructure.findById(id);

    if (!photo) {
      return NextResponse.json(
        {
          success: false,
          message: "Infrastructure photo not found",
        },
        { status: 404 }
      );
    }

    /* Delete image from Cloudinary */

    try {
      await cloudinary.uploader.destroy(photo.publicId);
    } catch (cloudinaryError) {
      console.error(
        "Failed to delete Cloudinary image:",
        cloudinaryError
      );
    }

    /* Delete record from MongoDB */

    await Infrastructure.findByIdAndDelete(id);
    revalidatePath("/infrastructure");

    return NextResponse.json({
      success: true,
      message: "Infrastructure photo deleted successfully",
    });
  } catch (error) {
    console.error("DELETE infrastructure error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete infrastructure photo",
      },
      { status: 500 }
    );
  }
}
