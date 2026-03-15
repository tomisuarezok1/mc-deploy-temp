"use client";

import type { ActivityEvent as ActivityEventType } from "@/lib/types";
import { timeAgo, getEventTypeColor } from "@/lib/utils";
import { getAgent } from "@/lib/agents";
import { Brain, MessageSquare, AlertTriangle, GitBranch, Loader2, CheckSquare } from "lucide-react";

const EVENT_ICONS: Record<string, React.ElementType> = {
  reply: MessageSquare,
  memory: Brain,
  alert: AlertTriangle,
  subagent: GitBranch,
  thinking: Loader2,
  task: CheckSquare,
};

export default function ActivityEventItem({ event }: { event: ActivityEventType }) {
  const agent = getAgent(event.agentId);
  const Icon = EVENT_ICONS[event.type] || MessageSquare;
  const colorClass = getEventTypeColor(event.type);

  return (
    <div className="flex items-start gap-3 py-2.5 px-3 rounded-lg hover:bg-surface-2 group">
      <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
        <span className="text-sm">{agent?.emoji || "\u2753"}</span>
        <Icon size={12} className={colorClass} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[12px] font-medium text-zinc-300">{agent?.name || event.agentId}</span>
          <span className="text-[11px] text-zinc-600">{timeAgo(event.timestamp)}</span>
        </div>
        <p className="text-[12px] text-zinc-400 truncate">{event.action}</p>
      </div>
    </div>
  );
}
