import { NextRequest, NextResponse } from "next/server";
import { API_CONFIG } from "@/lib/api-config";

/**
 * POST /api/lead/arrival
 * Creates an arrival record for tracking user sessions
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { formType, campaign, term, referrer, landingUrl } = body;

    // Get client IP
    const ip = getClientIp(request);

    // Get user agent
    const userAgent = request.headers.get("user-agent") || "";

    // Determine vertical ID based on form type
    const verticalId = formType === "medicare" ? "102" : "101";

    // Build arrival request payload
    const arrivalPayload = {
      webID: "",
      IPAddress: ip,
      referer: referrer || "",
      userAgent: userAgent,
      siteID: API_CONFIG.siteId,
      landingURL: landingUrl || "",
      sourceID: campaign || API_CONFIG.defaultSourceId,
      campaign: campaign || "",
      keyword: term || "",
      verticalID: verticalId,
    };

    // In production, this would call the actual lead service API
    // For now, generate a mock arrival ID
    const arrivalId = generateArrivalId();

    // Log for debugging (remove in production)
    console.log("Arrival created:", { arrivalId, ...arrivalPayload });

    // Uncomment this block when you have the actual API endpoint:
    /*
    const response = await fetch(`${API_CONFIG.leadServiceUrl}/slt_leads/lead_service/arrival_request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(arrivalPayload),
    });

    const data = await response.json();

    if (data.status === "success") {
      return NextResponse.json({
        success: true,
        arrivalId: data.arrivalID
      });
    } else {
      throw new Error(data.message || "Failed to create arrival");
    }
    */

    return NextResponse.json({
      success: true,
      arrivalId: arrivalId,
    });
  } catch (error) {
    console.error("Arrival API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create arrival" },
      { status: 500 }
    );
  }
}

// Helper to get client IP
function getClientIp(request: NextRequest): string {
  // Try various headers for the real IP
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp;
  }

  const cfConnectingIp = request.headers.get("cf-connecting-ip");
  if (cfConnectingIp) {
    return cfConnectingIp;
  }

  return "127.0.0.1";
}

// Generate a unique arrival ID
function generateArrivalId(): string {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 10);
  return `arr_${timestamp}_${randomPart}`;
}
