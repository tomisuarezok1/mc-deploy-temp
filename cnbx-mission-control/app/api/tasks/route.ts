import { NextRequest, NextResponse } from "next/server";
import { MOCK_TASKS } from "@/lib/mock-data";

// In production: read/write from /data/.openclaw/workspace-cnbx/tasks.json
let tasks = [...MOCK_TASKS];

export async function GET() {
  return NextResponse.json(tasks);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const task = {
    ...body,
    id: body.id || crypto.randomUUID(),
    created: body.created || new Date().toISOString(),
    updated: new Date().toISOString(),
  };
  tasks.push(task);
  return NextResponse.json(task, { status: 201 });
}
