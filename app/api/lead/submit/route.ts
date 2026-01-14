import { NextRequest, NextResponse } from "next/server";
import { API_CONFIG } from "@/lib/api-config";
import type { HealthInsuranceFormData, MedicareFormData } from "@/lib/types/forms";

/**
 * POST /api/lead/submit
 * Submits a lead to the lead service API
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { formType, formData } = body as {
      formType: "health" | "medicare";
      formData: HealthInsuranceFormData | MedicareFormData;
    };

    // Validate required fields
    if (!formData.first_name || !formData.last_name || !formData.email || !formData.phone) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Format birthday
    const birthday = formatBirthday(formData.birth_month, formData.birth_day, formData.birth_year);

    // Build the lead payload
    const leadPayload: Record<string, unknown> = {
      type: formType === "medicare" ? "medicare" : "health_insurance",
      firstName: formData.first_name,
      lastName: formData.last_name,
      addressLine1: formData.address,
      zip: formData.zip,
      email: formData.email,
      phone: formatPhone(formData.phone),
      sourceID: API_CONFIG.defaultSourceId,
      arrivalID: formData.arrival_id,
      data: {
        jornayaID: formData.jornaya_id || "",
        birthday: birthday,
        gender: formData.gender,
      },
    };

    // Add form-specific fields
    if (formType === "health") {
      const healthData = formData as HealthInsuranceFormData;
      const data = leadPayload.data as Record<string, unknown>;

      data.household_size = parseInt(healthData.household_size) || 1;
      data.household_income = parseInt(healthData.household_income) || 0;
      data.is_self_employed = healthData.is_self_employed;

      // Life events
      if (healthData.has_major_event && healthData.major_life_event) {
        data.qualifying_life_event = healthData.major_life_event;
        if (healthData.event_month && healthData.event_day && healthData.event_year) {
          data.qualifying_life_event_date = formatBirthday(
            healthData.event_month,
            healthData.event_day,
            healthData.event_year
          );
        }
      } else {
        data.qualifying_life_event = "none";
      }

      // Health conditions
      if (healthData.have_conditions && healthData.health_conditions.length > 0) {
        data.has_major_condition = true;
        healthData.health_conditions.forEach((condition) => {
          data[condition] = true;
        });
      } else {
        data.has_major_condition = false;
      }
    } else {
      const medicareData = formData as MedicareFormData;
      const data = leadPayload.data as Record<string, unknown>;
      data.coverage_type = medicareData.interested_in;
    }

    // Log for debugging (remove in production)
    console.log("Lead submission:", leadPayload);

    // In production, submit to actual API:
    /*
    const response = await fetch(`${API_CONFIG.leadServiceUrl}/slt_leads/lead_service/lead_request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(leadPayload),
    });

    const data = await response.json();

    if (data.status !== "success") {
      throw new Error(data.message || "Failed to submit lead");
    }
    */

    // Generate a lead ID for demo purposes
    const leadId = generateLeadId();

    // Store lead data for thank you page (in production, use a database or cache)
    // For now, return success with lead ID
    return NextResponse.json({
      success: true,
      leadId: leadId,
      arrivalId: formData.arrival_id,
      city: formData.city || "Your City",
      state: formData.state || "Your State",
    });
  } catch (error) {
    console.error("Lead submit error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit lead" },
      { status: 500 }
    );
  }
}

// Format birthday to M/D/YYYY
function formatBirthday(month: string, day: string, year: string): string {
  return `${parseInt(month)}/${parseInt(day)}/${year}`;
}

// Format phone to 10 digits
function formatPhone(phone: string): string {
  return phone.replace(/\D/g, "").slice(0, 10);
}

// Generate a lead ID
function generateLeadId(): string {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 10);
  return `lead_${timestamp}_${randomPart}`;
}
