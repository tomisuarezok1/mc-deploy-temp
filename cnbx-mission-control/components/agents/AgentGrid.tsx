"use client";

import type { Agent, Context } from "@/lib/types";
import AgentCard from "./AgentCard";

interface AgentGridProps {
  agents: Agent[];
  context: Context;
}

function WorkspaceSection({
  title,
  borderColor,
  agents,
  stats,
}: {
  title: string;
  borderColor: string;
  agents: Agent[];
  stats: { sessions: number; cost: number };
}) {
  return (
    <div
      className="rounded-card border p-4"
      style={{ borderColor: borderColor + "40" }}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[13px] font-semibold text-zinc-300">{title}</h3>
        <div className="flex items-center gap-4 text-[11px] text-zinc-500">
          <span>{stats.sessions} sesiones</span>
          <span>${stats.cost.toFixed(2)} hoy</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {agents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>
    </div>
  );
}

export default function AgentGrid({ agents, context }: AgentGridProps) {
  if (context === "todo") {
    const personal = agents.filter((a) => a.workspace === "personal");
    const cnbx = agents.filter((a) => a.workspace === "cnbx");

    const personalStats = {
      sessions: personal.reduce((s, a) => s + a.sessionsToday, 0),
      cost: personal.reduce((s, a) => s + a.todayCost, 0),
    };
    const cnbxStats = {
      sessions: cnbx.reduce((s, a) => s + a.sessionsToday, 0),
      cost: cnbx.reduce((s, a) => s + a.todayCost, 0),
    };

    return (
      <div className="space-y-4">
        {personal.length > 0 && (
          <WorkspaceSection
            title="Equipo Personal"
            borderColor="#0F6E56"
            agents={personal}
            stats={personalStats}
          />
        )}
        {cnbx.length > 0 && (
          <WorkspaceSection
            title="Equipo CNBX"
            borderColor="#534AB7"
            agents={cnbx}
            stats={cnbxStats}
          />
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
      {agents.map((agent) => (
        <AgentCard key={agent.id} agent={agent} />
      ))}
    </div>
  );
}
