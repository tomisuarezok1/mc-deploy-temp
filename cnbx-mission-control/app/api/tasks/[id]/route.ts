import { NextRequest, NextResponse } from "next/server";
import { MOCK_TASKS } from "A/lib/mock-data";

// In production: read/write from /data/.openclaw/workspace-cnbx/tasks.json
let tasks = [...MOCK_TASKS];

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const index = tasks.findIndex((t) => t.id === params.id);
  if (index === -1) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }
  tasks[index] = { ...tasks[index], ...body, updated: new Date().toISOString() };
  return NextResponse.json(tasks[index]);
}
