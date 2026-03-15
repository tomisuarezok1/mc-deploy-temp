"use client";

import { useState } from "react";
import { useAppContext, filterAgents } from "@/lib/context";
import { AGENTS, getAgent } from "@/lib/agents";
import OrgChart from "@/components/team/OrgChart";
import AgentDetail from "@/components/team/AgentDetail";

export default function TeamPage() {
  const { context } = useAppContext();
  const [selectedId, setSelectedId] = useState<string | null>("chief");
  const agents = filterAgents(AGENTS, context);
  const selectedAgent = selectedId ? getAgent(selectedId) : null;

  return (
    <div className="space-y-6 max-w-[1200px]">
      {/* Mission statement */}
      <div className="rounded-card border border-border bg-surface-2 p-5">
        <p className="text-[11px] text-zinc-500 uppercase tracking-wider mb-1">Mission Statement</p>
        <p className="text-[14px] text-zinc-300 leading-relaxed">
          Construir una organizaci\u00f3n de agentes AI que opera los negocios de CNBX Holding con autonom\u00eda
          creciente, generando valor real y medible para cada proyecto del portafolio.
        </p>
      </div>

      {/* Org chart + Detail */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-6">
        <OrgChart
          agents={agents}
          context={context}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
        {selectedAgent && <AgentDetail agent={selectedAgent} />}
      </div>
    </div>
  );
}
