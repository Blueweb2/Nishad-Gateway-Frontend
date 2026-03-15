import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params; // ✅ MUST await

    const apiUrl = process.env.API_URL;

    if (!apiUrl) {
      console.error("API_URL not defined");
      return NextResponse.json(
        { message: "API URL not configured" },
        { status: 500 }
      );
    }

    const response = await fetch(
      `${apiUrl}/cities/slug/${slug}/blog`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      return NextResponse.json(
        { message: "Failed to fetch blog" },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Proxy route error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};