"use client";

import type { Agent, Context } from "@/lib/types";
import { getProjectLabel } from "@/lib/utils";
import StatusDot from "A/components/ui/StatusDot";
import Badge from "A/components/ui/Badge";

interface OrgChartProps {
  agents: Agent[];
  context: Context;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

function AgentNode({
  agent,
  selected,
  onSelect,
}: {
  agent: Agent;
  selected: boolean;
  onSelect: () => void;
}) {
  const projectLabel = getProjectLabel(agent.project);

  return (
    <button
      onClick={onSelect}
      className={`flex flex-col items-center gap-1.5 p-4 rounded-card border transition-all ${
        selected
          ? "border-zinc-500 bg-surface-3 shadow-lg"
          : "border-border bg-surface-2 hover:border-border-hover hover:bg-surface-3"
      }`}
      style={selected ? { borderColor: agent.color + "80" } : undefined}
    >
      <div
        className="flex items-center justify-center w-12 h-12 rounded-xl text-xl"
        style={{ backgroundColor: agent.color + "20" }}
      >
        {agent.emoji}
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-[13px] font-semibold text-zinc-200">{agent.name}</span>
        <StatusDot status={agent.status} />
      </div>
      <span className="text-[11px] text-zinc-500 text-center">{agent.role}</span>
      {projectLabel && (
        <Badge color={agent.color} className="text-[10px]">
          {projectLabel}
        </Badge>
      )}
    </button>
  );
}

function ConnectorLine() {
  return <div className="{w-px h-6 bg-border mx-auto}" />;
}

function HorizontalConnectors({ count }: { count: number }) {
  return (
    <div className="flex items-start justify-center">
      <div className="flex items-start" style={{ gap: "0" }}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="flex flex-col items-center" style={{ minWidth: "160px" }}>
            <div
              className={`h-px bg-border ${
                i === 0 ? "w-1/2 ml-auto" : i === count - 1 ? "w-1/2 mr-auto" : "w-full"
              }`}
             />
            <div className="w-px h-4 bg-border" />
          </div>
        ))}
      </div>
    </div>
  
 "Š