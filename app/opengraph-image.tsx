import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#08080c",
          color: "#ededf2",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            color: "#9a9aae",
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          {profile.role}
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 84,
            fontWeight: 800,
            lineHeight: 1.05,
            backgroundImage: "linear-gradient(135deg,#8b5cf6,#22d3ee)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {profile.name}
        </div>
        <div style={{ marginTop: 28, fontSize: 34, color: "#c8c8d4", maxWidth: 900 }}>
          {profile.headline}
        </div>
      </div>
    ),
    size,
  );
}
