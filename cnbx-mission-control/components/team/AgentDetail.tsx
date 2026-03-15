"use client";

import type { Agent } from "@/lib/types";
import { timeAgo, formatCurrency, formatNumber, getProjectLabel } from "@/lib/utils";
import StatusDot from "A/components/ui/StatusDot";
import Badge from "A/components/ui/Badge";
import { MOCK_ACTIVITY } from "A/lib/mock-data";

export default function AgentDetail({ agent }: { agent: Agent }) {
  const projectLabel = getProjectLabel(agent.project);
  const modelShort = agent.model.split("/")[1] || agent.model;
  const recentEvents = MOCK_ACTIVITY.filter((e) => e.agentId === agent.id).slice(0, 5);

  return (
    <div className="rounded-card border border-border bg-surface-2 p-5">
      <div className="flex items-start gap-4 mb-5">
        <div
          className="flex items-center justify-center w-14 h-14 rounded-xl text-2xl"
          style={{ backgroundColor: agent.color + "20" }}
        >
          {agent.emoji}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-lg font-semibold text-zinc-100">{agent.name}</h2>
            <StatusDot status={agent.status} size="md" />
            {projectLabel && <Badge color={agent.color}>{projectLabel}</Badge>}
          </div>
          <p className="text-[13px] text-zinc-400">{agent.role}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-5">
        <DetailRow label="Modelo" value={modelShort} />
        <DetailRow label="Canal" value={agent.channel} />
        <DetailRow label="Bot" value={agent.botHandle} />
        <DetailRow label="Workspace" value={agent.workspace} />
        <DetailRow label="\u00daltima actividad" value={timeAgo(agent.lastActive)} />
        <DetailRow label="Estado" value={agent.status} />
      </div>

      <div className="grid grid-cols-3 gap-3 mb-5 p-3 rounded-lg bg-surface-3">
        <MetricBox label="Sesiones hoy" value={agent.sessionsToday.toString()} />
        <MetricBox label="Tokens hoy" value={formatNumber(agent.tokensToday)} />
        <MetricBox label="Costo hoy" value={formatCurrency(agent.todayCost)} />
      </div>

      <div>
        <h4 className="text-[12px] font-semibold text-zinc-400 uppercase tracking-wider mb-3">
          \u00daltimas actividades
        </h4>
        {recentEvents.length === 0 ? (
          <p className="text-[12px] text-zinc-600">Sin actividad reciente</p>
        ) : (
          <div className="space-y-2">
            {recentEvents.map((event) => (
              <div key={event.id} className="flex items-start gap-2 py-1.5">
                <span className="text-[10px] text-zinc-600 shrink-0 mt-0.5 font-mono">
                  {timeAgo(event.timestamp)}
                </span>
                <p className="text-[12px] text-zinc-400">{event.action}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] text-zinc-500">{label}</p>
      <p className="text-[13px] text-zinc-300 font-medium">{value}</p>
    </div>
  );
}

function MetricBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <p className="text-base font-semibold text-zinc-100">{value}</p>
      <p className="text-[10px] text-zinc-500">{label}</p>
    </div>
  );
}
