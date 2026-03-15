import { NextResponse } from "next/server";

// In production: scan /app/modules/ for valid manifest.json files
export async function GET() {
  // Returns empty array until modules are created
  return NextResponse.json([]);
}
