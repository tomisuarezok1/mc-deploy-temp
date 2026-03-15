"use client";

import type { Agent } from "A/lib/types";
import { timeAgo, getProjectLabel } from "@/lib/utils";
import StatusDot from "A/components/ui/StatusDot";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";

export default function AgentCard({ agent }: { agent: Agent }) {
  const projectLabel = getProjectLabel(agent.project);
  const modelShort = agent.model.split("/")[1]?.replace("claude-", "") || agent.model;

  return (
    <Card borderColor={agent.color}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <span className="text-xl">{agent.emoji}</span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-zinc-100">{agent.name}</span>
              <StatusDot status={agent.status} />
            </div>
            <p className="text-[12px] text-zinc-500">{agent.role}</p>
          </div>
        </div>
        {projectLabel && <Badge color={agent.color}>{projectLabel}</Badge>}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-[12px]">
          <span className="text-zinc-500">Modelo</span>
          <span className="text-zinc-400 font-mono text-[11px]">{modelShort}</span>
        </div>
        <div className="flex items-center justify-between text-[12px]">
          <span className="text-zinc-500">\u00daltima actividad</span>
          <span className="text-zinc-400">{timeAgo(agent.lastActive)}</span>
        </div>
        <div className="flex items-center justify-between text-[12px]">
          <span className="text-zinc-500">Sesiones hoy</span>
          <span className="text-zinc-400">{agent.sessionsToday}</span>
        </div>
        <div className="flex items-center justify-between text-[12px]">
          <span className="text-zinc-500">Costo hoy</span>
          <span className="text-zinc-400">${agent.todayCost.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-border flex items-center gap-2">
        <span className="text-[11px] text-zinc-600">{agent.botHandle}</span>
      </div>
    </Card>
  );
}
