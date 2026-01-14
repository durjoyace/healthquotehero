import { NextRequest, NextResponse } from "next/server";

// ZIP code to location mapping (subset for demo, expand as needed)
const ZIP_DATABASE: Record<string, { city: string; state: string; state_long: string }> = {
  "02421": { city: "Lexington", state: "MA", state_long: "Massachusetts" },
  "10001": { city: "New York", state: "NY", state_long: "New York" },
  "90210": { city: "Beverly Hills", state: "CA", state_long: "California" },
  "33101": { city: "Miami", state: "FL", state_long: "Florida" },
  "60601": { city: "Chicago", state: "IL", state_long: "Illinois" },
  "77001": { city: "Houston", state: "TX", state_long: "Texas" },
  "85001": { city: "Phoenix", state: "AZ", state_long: "Arizona" },
  "19101": { city: "Philadelphia", state: "PA", state_long: "Pennsylvania" },
  "78201": { city: "San Antonio", state: "TX", state_long: "Texas" },
  "92101": { city: "San Diego", state: "CA", state_long: "California" },
  "75201": { city: "Dallas", state: "TX", state_long: "Texas" },
  "95101": { city: "San Jose", state: "CA", state_long: "California" },
  "78701": { city: "Austin", state: "TX", state_long: "Texas" },
  "32099": { city: "Jacksonville", state: "FL", state_long: "Florida" },
  "76101": { city: "Fort Worth", state: "TX", state_long: "Texas" },
  "43085": { city: "Columbus", state: "OH", state_long: "Ohio" },
  "28201": { city: "Charlotte", state: "NC", state_long: "North Carolina" },
  "46201": { city: "Indianapolis", state: "IN", state_long: "Indiana" },
  "98101": { city: "Seattle", state: "WA", state_long: "Washington" },
  "80201": { city: "Denver", state: "CO", state_long: "Colorado" },
  "20001": { city: "Washington", state: "DC", state_long: "District of Columbia" },
  "02101": { city: "Boston", state: "MA", state_long: "Massachusetts" },
  "37201": { city: "Nashville", state: "TN", state_long: "Tennessee" },
  "21201": { city: "Baltimore", state: "MD", state_long: "Maryland" },
  "73101": { city: "Oklahoma City", state: "OK", state_long: "Oklahoma" },
  "40201": { city: "Louisville", state: "KY", state_long: "Kentucky" },
  "97201": { city: "Portland", state: "OR", state_long: "Oregon" },
  "89101": { city: "Las Vegas", state: "NV", state_long: "Nevada" },
  "53201": { city: "Milwaukee", state: "WI", state_long: "Wisconsin" },
  "87101": { city: "Albuquerque", state: "NM", state_long: "New Mexico" },
  "85701": { city: "Tucson", state: "AZ", state_long: "Arizona" },
  "93701": { city: "Fresno", state: "CA", state_long: "California" },
  "95801": { city: "Sacramento", state: "CA", state_long: "California" },
  "64101": { city: "Kansas City", state: "MO", state_long: "Missouri" },
  "90801": { city: "Long Beach", state: "CA", state_long: "California" },
  "85201": { city: "Mesa", state: "AZ", state_long: "Arizona" },
  "30301": { city: "Atlanta", state: "GA", state_long: "Georgia" },
  "80901": { city: "Colorado Springs", state: "CO", state_long: "Colorado" },
  "27601": { city: "Raleigh", state: "NC", state_long: "North Carolina" },
  "68101": { city: "Omaha", state: "NE", state_long: "Nebraska" },
};

// State code lookup by first digit of ZIP
const ZIP_STATE_MAP: Record<string, { state: string; state_long: string }> = {
  "0": { state: "MA", state_long: "Massachusetts" },
  "1": { state: "NY", state_long: "New York" },
  "2": { state: "VA", state_long: "Virginia" },
  "3": { state: "FL", state_long: "Florida" },
  "4": { state: "MI", state_long: "Michigan" },
  "5": { state: "MN", state_long: "Minnesota" },
  "6": { state: "IL", state_long: "Illinois" },
  "7": { state: "TX", state_long: "Texas" },
  "8": { state: "CO", state_long: "Colorado" },
  "9": { state: "CA", state_long: "California" },
};

/**
 * GET /api/geocode?zip=12345
 * Returns city and state for a ZIP code
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const zip = searchParams.get("zip");

  if (!zip || zip.length !== 5 || !/^\d{5}$/.test(zip)) {
    return NextResponse.json(
      { success: false, error: "Invalid ZIP code" },
      { status: 400 }
    );
  }

  // Try exact match first
  const exact = ZIP_DATABASE[zip];
  if (exact) {
    return NextResponse.json({
      success: true,
      city: exact.city,
      state: exact.state,
      state_long: exact.state_long,
    });
  }

  // Try first 3 digits for area match
  const prefix = zip.substring(0, 3);
  const areaMatch = Object.entries(ZIP_DATABASE).find(([key]) => key.startsWith(prefix));
  if (areaMatch) {
    return NextResponse.json({
      success: true,
      city: areaMatch[1].city,
      state: areaMatch[1].state,
      state_long: areaMatch[1].state_long,
    });
  }

  // Fall back to state-level guess based on first digit
  const firstDigit = zip[0];
  const stateGuess = ZIP_STATE_MAP[firstDigit];
  if (stateGuess) {
    return NextResponse.json({
      success: true,
      city: "Your City",
      state: stateGuess.state,
      state_long: stateGuess.state_long,
    });
  }

  // Last resort
  return NextResponse.json({
    success: true,
    city: "Your City",
    state: "US",
    state_long: "United States",
  });
}

/**
 * POST /api/geocode
 * Same as GET but accepts body
 */
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { zip } = body;

  // Create a new URL with the zip parameter and redirect to GET
  const url = new URL(request.url);
  url.searchParams.set("zip", zip);

  // Reuse GET logic by creating a new request
  return GET(new NextRequest(url, { method: "GET" }));
}
