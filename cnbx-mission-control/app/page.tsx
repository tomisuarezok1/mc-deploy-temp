"use client";

import { useAppContext } from "@/lib/context";
import { filterAgents } from "@/lib/context";
import { AGENTS } from "@/lib/agents";
import { MOCK_ACTIVITY, MOCK_TASKS } from "@/lib/mock-data";
import { formatCurrency, formatNumber } from "@/lib/utils";
import AgentGrid from "@/components/agents/AgentGrid";
import ActivityFeed from "@/components/activity/ActivityFeed";
import Card from "@/components/ui/Card";
import { Users, MessageSquare, Coins, TrendingUp, Zap } from "lucide-react";

function StatItem({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-surface-3">
        <Icon size={15} className="text-zinc-400" />
      </div>
      <div>
        <p className="text-[11px] text-zinc-500 uppercase tracking-wider">{label}</p>
        <div className="flex items-baseline gap-1.5">
          <span className="text-base font-semibold text-zinc-100">{value}</span>
          {sub && <span className="text-[11px] text-zinc-500">{sub}</span>}
        </div>
      </div>
    </div>
  );
}

function KanbanPreview() {
  const columns = ["todo", "in_progress", "review"] as const;
  const labels: Record<string, string> = {
    todo: "To Do",
    in_progress: "En Progreso",
    review: "Review",
  };

  return (
    <div className="rounded-card border border-border bg-surface-2 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[13px] font-semibold text-zinc-300">Tareas</h3>
        <a href="/tasks" className="text-[12px] text-zinc-500 hover:text-zinc-300">
          Ver todas \u2192
        </a>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {columns.map((col) => {
          const tasks = MOCK_TASKS.filter((t) => t.status === col).slice(0, 2);
          return (
            <div key={col}>
              <p className="text-[11px] text-zinc-500 uppercase tracking-wider mb-2 px-1">
                {labels[col]}
                <span className="text-zinc-600 ml-1">
                  ({MOCK_TASKS.filter((t) => t.status === col).length})
                </span>
              </p>
              <div className="space-y-2">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-2.5 rounded-lg bg-surface-3 border border-border text-[12px]"
                  >
                    <p className="text-zinc-200 font-medium truncate">{task.title}</p>
                    <p className="text-zinc-500 mt-0.5 text-[11px]">{task.assignee}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function OverviewPage() {
  const { context } = useAppContext();
  const agents = filterAgents(AGENTS, context);

  const stats = {
    active: agents.filter((a) => a.status !== "offline").length,
    total: agents.length,
    sessions: agents.reduce((s, a) => s + a.sessionsToday, 0),
    tokens: agents.reduce((s, a) => s + a.tokensToday, 0),
    cost: agents.reduce((s, a) => s + a.todayCost, 0),
    projected: agents.reduce((s, a) => s + a.todayCost, 0) * 30,
  };

  return (
    <div className="space-y-6 max-w-[1400px]">
      {/* Stats bar */}
      <div className="rounded-card border border-border bg-surface-2 flex items-center divide-x divide-border overflow-x-auto">
        <StatItem icon={Users} label="Agentes" value={`${stats.active}/${stats.total}`} sub="activos" />
        <StatItem icon={MessageSquare} label="Sesiones hoy" value={stats.sessions.toString()} />
        <StatItem icon={Zap} label="Tokens hoy" value={formatNumber(stats.tokens)} />
        <StatItem icon={Coins} label="Costo hoy" value={formatCurrency(stats.cost)} />
        <StatItem icon={TrendingUp} label="Proyecci\u00f3n mes" value={formatCurrency(stats.projected)} />
      </div>

      {/* Agent cards + Activity feed */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6">
        <AgentGrid agents={agents} context={context} />
        <ActivityFeed events={MOCK_ACTIVITY} maxHeight="calc(100vh - 260px)" />
      </div>

      {/* Kanban preview */}
      <KanbanPreview />
    </div>
  );
}
