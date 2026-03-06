import { ImageResponse } from "next/og";
import { getMinistryBySlug } from "@/lib/api/public/ministries.api";

export const runtime = "edge";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const ministry = await getMinistryBySlug(params.slug);

  const title = ministry?.title || "Ministry";
  const description =
    ministry?.shortDesc ||
    "Saudi ministries and authorities shaping policy and regulation.";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0f0f0f",
          color: "white",
        }}
      >
        <div style={{ fontSize: 60, fontWeight: 700 }}>
          {title}
        </div>

        <div
          style={{
            fontSize: 28,
            marginTop: 30,
            opacity: 0.8,
          }}
        >
          {description}
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 40,
            right: 60,
            fontSize: 24,
            opacity: 0.6,
          }}
        >
          Nishad Gateway
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}