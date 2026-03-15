import { NextResponse } from "next/server";
import { AGENTS } from "@/lib/agents";

export async function GET() {
  // In production: query OpenClaw usage endpoint
  const costs = AGENTS.map((a) => ({
    agentId: a.id,
    name: a.name,
    model: a.model,
    todayCost: a.todayCost,
    tokensToday: a.tokensToday,
    sessionsToday: a.sessionsToday,
  }));

  const totalCost = costs.reduce((s, c) => s + c.todayCost, 0);
  const totalTokens = costs.reduce((s, c) => s + c.tokensToday, 0);

  return NextResponse.json({
    agents: costs,
    totals: {
      costToday: totalCost,
      tokensToday: totalTokens,
      projectedMonthly: totalCost * 30,
    },
  });
}
