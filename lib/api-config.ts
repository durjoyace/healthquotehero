/**
 * API Configuration
 * Configure your lead service API endpoint here
 */

// Lead Service API Configuration
// Update these values with your actual API endpoint
export const API_CONFIG = {
  // Base URL for the lead service API
  // In production, this should be your actual lead service endpoint
  leadServiceUrl: process.env.LEAD_SERVICE_URL || "https://api.healthquotehero.com",

  // Site identifier for tracking
  siteId: process.env.SITE_ID || "hqh_com_1",

  // Default source ID
  defaultSourceId: 9999,

  // API timeout in milliseconds
  timeout: 30000,

  // Jornaya Campaign ID (for lead verification)
  jornayaCampaignId: process.env.JORNAYA_CAMPAIGN_ID || "",

  // Google Maps API Key (for geocoding)
  googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY || "",
};

// API Endpoints
export const API_ENDPOINTS = {
  arrival: "/api/lead/arrival",
  submit: "/api/lead/submit",
  quotes: "/api/lead/quotes",
  geocode: "/api/geocode",
  thankYou: "/api/lead/thank-you",
};

// Headers for API requests
export function getApiHeaders(): HeadersInit {
  return {
    "Content-Type": "application/json",
    "Accept": "application/json",
  };
}
