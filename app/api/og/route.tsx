import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  // Get dynamic parameters
  const title = searchParams.get("title") || "Affordable Health Insurance & Medicare Plans";
  const subtitle = searchParams.get("subtitle") || "Compare 75+ carriers. Save up to $350/month.";
  const type = searchParams.get("type") || "default"; // health, medicare, default

  // Choose colors based on type
  const accentColor = type === "medicare" ? "#ff9b00" : "#ff9b00";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#092472",
          padding: "60px",
          position: "relative",
        }}
      >
        {/* Decorative elements */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-50px",
            left: "20%",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            backgroundColor: accentColor,
            opacity: 0.3,
          }}
        />

        {/* Logo / Brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "40px",
          }}
        >
          {/* Shield icon */}
          <div
            style={{
              width: "60px",
              height: "60px",
              backgroundColor: accentColor,
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "20px",
            }}
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <span
            style={{
              fontSize: "36px",
              fontWeight: 700,
              color: "white",
            }}
          >
            Health Quote Hero
          </span>
        </div>

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <h1
            style={{
              fontSize: "64px",
              fontWeight: 800,
              color: "white",
              lineHeight: 1.1,
              margin: 0,
              marginBottom: "24px",
              maxWidth: "900px",
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: "32px",
              color: "rgba(255, 255, 255, 0.85)",
              margin: 0,
              maxWidth: "800px",
            }}
          >
            {subtitle}
          </p>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255, 255, 255, 0.2)",
            paddingTop: "30px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "40px",
              color: "rgba(255, 255, 255, 0.7)",
              fontSize: "24px",
            }}
          >
            <span style={{ display: "flex", alignItems: "center" }}>
              <span style={{ color: accentColor, marginRight: "8px" }}>✓</span>
              75+ Carriers
            </span>
            <span style={{ display: "flex", alignItems: "center" }}>
              <span style={{ color: accentColor, marginRight: "8px" }}>✓</span>
              Licensed Agents
            </span>
            <span style={{ display: "flex", alignItems: "center" }}>
              <span style={{ color: accentColor, marginRight: "8px" }}>✓</span>
              Free Quotes
            </span>
          </div>
          <span
            style={{
              color: "rgba(255, 255, 255, 0.5)",
              fontSize: "20px",
            }}
          >
            healthquotehero.com
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
