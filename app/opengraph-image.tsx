import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.fullName} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Matches the site: white, typographic, one hairline rule. No gradients. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#ffffff",
          color: "#18181b",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 22,
              color: "#71717a",
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            {profile.role}
          </div>
          <div
            style={{
              marginTop: 32,
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: -2,
              maxWidth: 960,
            }}
          >
            {profile.headline}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ height: 1, width: "100%", background: "#e4e4e7" }} />
          <div
            style={{
              marginTop: 28,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <div style={{ fontSize: 30, fontWeight: 600 }}>{profile.fullName}</div>
            <div style={{ fontSize: 22, color: "#52525b" }}>
              Backend · Event-driven systems · Solana
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
