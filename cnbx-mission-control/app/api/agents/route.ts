import { NextResponse } from "next/server";
import { AGENTS } from "@/lib/agents";

export async function GET() {
  // In production: parse openclaw.json + query Gateway WebSocket for live status
  return NextResponse.json(AGENTS);
}
