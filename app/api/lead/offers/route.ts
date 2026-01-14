import { NextRequest, NextResponse } from "next/server";
import type { InsuranceOffer } from "@/lib/types/forms";

/**
 * GET /api/lead/offers?arrivalId=xxx&type=health|medicare
 * Returns insurance offers for the thank you page
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const arrivalId = searchParams.get("arrivalId");
  const type = searchParams.get("type") || "health";

  if (!arrivalId) {
    return NextResponse.json(
      { success: false, error: "Missing arrival ID" },
      { status: 400 }
    );
  }

  // In production, fetch from actual API:
  /*
  const response = await fetch(
    `${API_CONFIG.leadServiceUrl}/slt_leads/lead_service/click_request_by_location/thank_you_page/${arrivalId}`,
    {
      headers: getApiHeaders(),
    }
  );
  const data = await response.json();
  return NextResponse.json({ success: true, offers: data.clickADs });
  */

  // Return demo offers for now
  const offers: InsuranceOffer[] = getDemoOffers(type as "health" | "medicare");

  return NextResponse.json({
    success: true,
    offers,
  });
}

// Demo offers for testing
function getDemoOffers(type: "health" | "medicare"): InsuranceOffer[] {
  if (type === "medicare") {
    return [
      {
        id: "1",
        company: "AARP Medicare",
        planName: "AARP Medicare Advantage",
        logoURL: "/uploads/2020/03/aarp-logo.png",
        clickURL: "#",
        headline: "Medicare Advantage Plans Starting at $0",
        descriptionLines: [
          "$0 monthly premium options",
          "Prescription drug coverage",
          "Dental, vision, and hearing",
          "Fitness programs included",
        ],
        adtype: "click",
      },
      {
        id: "2",
        company: "Humana",
        planName: "Humana Medicare Advantage",
        logoURL: "/uploads/2020/03/humana-logo.png",
        clickURL: "#",
        headline: "All-in-One Medicare Coverage",
        descriptionLines: [
          "Hospital and medical coverage",
          "Part D drug coverage",
          "24/7 nurse advice line",
          "Virtual doctor visits",
        ],
        adtype: "click",
      },
      {
        id: "3",
        company: "UnitedHealthcare",
        planName: "AARP Medicare Complete",
        logoURL: "/uploads/2020/03/uhc-logo.png",
        clickURL: "#",
        headline: "Comprehensive Medicare Plans",
        descriptionLines: [
          "Low out-of-pocket costs",
          "Large provider network",
          "Wellness programs",
          "Preventive care covered",
        ],
        adtype: "click",
      },
    ];
  }

  // Health insurance offers
  return [
    {
      id: "1",
      company: "Blue Cross Blue Shield",
      planName: "BCBS Silver Plan",
      logoURL: "/uploads/2020/03/bcbs-logo.png",
      clickURL: "#",
      headline: "Affordable Health Coverage",
      descriptionLines: [
        "$2,500 Deductible",
        "20% Coinsurance",
        "$6,500 Out of Pocket Max",
        "Preventive care covered 100%",
      ],
      monthlyCost: 285,
      deductible: 2500,
      coinsurancePercentage: 20,
      outOfPocketMax: 6500,
      adtype: "click",
    },
    {
      id: "2",
      company: "Aetna",
      planName: "Aetna CVS Health Silver",
      logoURL: "/uploads/2020/03/aetna-logo.png",
      clickURL: "#",
      headline: "Quality Care, Fair Prices",
      descriptionLines: [
        "$3,000 Deductible",
        "30% Coinsurance",
        "$7,350 Out of Pocket Max",
        "Nationwide network",
      ],
      monthlyCost: 245,
      deductible: 3000,
      coinsurancePercentage: 30,
      outOfPocketMax: 7350,
      adtype: "click",
    },
    {
      id: "3",
      company: "Cigna",
      planName: "Cigna Connect Silver",
      logoURL: "/uploads/2020/03/cigna-logo.png",
      clickURL: "#",
      headline: "Connected Care for You",
      descriptionLines: [
        "$2,000 Deductible",
        "25% Coinsurance",
        "$6,000 Out of Pocket Max",
        "Virtual care included",
      ],
      monthlyCost: 310,
      deductible: 2000,
      coinsurancePercentage: 25,
      outOfPocketMax: 6000,
      adtype: "click",
    },
    {
      id: "4",
      company: "Kaiser Permanente",
      planName: "Kaiser Silver 70",
      logoURL: "/uploads/2020/03/kaiser-logo.png",
      clickURL: "#",
      headline: "Integrated Care Excellence",
      descriptionLines: [
        "$2,750 Deductible",
        "30% Coinsurance",
        "$7,000 Out of Pocket Max",
        "Mental health coverage",
      ],
      monthlyCost: 265,
      deductible: 2750,
      coinsurancePercentage: 30,
      outOfPocketMax: 7000,
      adtype: "click",
    },
  ];
}
