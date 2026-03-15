import { NextResponse } from "next/server";
import { MOCK_ACTIVITY } from "@/lib/mock-data";

export async function GET() {
  // In production: query Gateway WebSocket events
  return NextResponse.json(MOCK_ACTIVITY);
}
