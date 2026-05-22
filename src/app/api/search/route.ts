import { NextRequest, NextResponse } from "next/server";
import { enhanceQuery, filterSafeVideos } from "@/lib/filterEngine";

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q");

    if (!q) {
      return NextResponse.json(
        { success: false, message: "Missing query" },
        { status: 400 }
      );
    }

    const params = new URLSearchParams({
      part: "snippet",
      q: enhanceQuery(q),
      type: "video",
      maxResults: "24",
      key: YOUTUBE_API_KEY || "",
      safeSearch: "strict",
      videoEmbeddable: "true",
    });

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?${params.toString()}`
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: data },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      results: filterSafeVideos(data.items || []),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}