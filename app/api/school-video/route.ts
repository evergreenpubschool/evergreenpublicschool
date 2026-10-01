import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/dbConnect";
import SchoolVideo from "@/models/SchoolVideo";
import { z } from "zod";

const schoolVideoSchema = z.object({
  youtubeUrl: z.string().url("Please enter a valid YouTube URL"),
});

function isYouTubeUrl(url: string) {
  try {
    const parsedUrl = new URL(url);

    return [
      "www.youtube.com",
      "youtube.com",
      "m.youtube.com",
      "youtu.be",
    ].includes(parsedUrl.hostname);
  } catch {
    return false;
  }
}

export async function GET() {
  try {
    await connectDB();

    const video = await SchoolVideo.findOne().lean();

    return NextResponse.json({
      success: true,
      video,
    });
  } catch (error) {
    console.error("Get school video error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch school video",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // 1. Check whether the user is logged in
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

    // 2. Check whether the user is an admin
    if (session.user.role !== "admin") {
      return NextResponse.json(
        {
          success: false,
          message: "Forbidden",
        },
        { status: 403 }
      );
    }

    // 3. Read request body
    const body = await request.json();

    // 4. Validate the URL
    const result = schoolVideoSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid YouTube URL",
          errors: result.error.flatten(),
        },
        { status: 400 }
      );
    }

    const { youtubeUrl } = result.data;

    // 5. Make sure it is actually a YouTube URL
    if (!isYouTubeUrl(youtubeUrl)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a valid YouTube URL",
        },
        { status: 400 }
      );
    }

    // 6. Connect to MongoDB
    await connectDB();

    // 7. Create the video if it doesn't exist,
    //    otherwise replace the existing video URL
    const video = await SchoolVideo.findOneAndUpdate(
      {},
      {
        youtubeUrl,
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      }
    );

    return NextResponse.json({
      success: true,
      message: "School video updated successfully",
      video,
    });
  } catch (error) {
    console.error("School video API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}