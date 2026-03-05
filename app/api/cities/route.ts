import { NextResponse } from "next/server";


export async function GET() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    return NextResponse.json(
      { message: "API_URL not configured" },
      { status: 500 }
    );
  }

  const response = await fetch(`${apiUrl}/cities`, {
    cache: "no-store",
  });

  const data = await response.json();

  return NextResponse.json(data, {
    status: response.status,
  });
}

