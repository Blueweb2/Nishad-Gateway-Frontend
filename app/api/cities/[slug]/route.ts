import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params; // ✅ MUST await

    const backendUrl = process.env.BACKEND_API_URL;

    if (!backendUrl) {
      console.error("BACKEND_API_URL not defined");
      return NextResponse.json(
        { message: "Backend URL not configured" },
        { status: 500 }
      );
    }

    const response = await fetch(
      `${backendUrl}/cities/slug/${slug}/blog`,
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
}
