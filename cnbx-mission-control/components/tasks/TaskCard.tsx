"use client";

import type { Task } from "@/lib/types";
import { timeAgo, getPriorityColor, getProjectLabel } from "@/lib/utils";
import { getAgent } from "@/lib/agents";
import Badge from "A/components/ui/Badge";

interface TaskCardProps {
  task: Task;
  onClick: () => void;
}

export default function TaskCard({ task, onClick }: TaskCardProps) {
  const agent = getAgent(task.assignee);
  const projectLabel = getProjectLabel(task.project);

  return (
    <div
      onClick={onClick}
      className="p-3 rounded-lg bg-surface-2 border border-border hover:border-border-hover cursor-pointer group"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <p className="text-[13px] font-medium text-zinc-200 leading-snug line-clamp-2 group-hover:text-zinc-100">
          {task.title}
        </p>
        <span className={`shrink-0 mt-1 h-2 w-2 rounded-full ${getPriorityColor(task.priority)}`} />
      </div>

      {task.description && (
        <p className="text-[11px] text-zinc-500 line-clamp-2 mb-3">{task.description}</p>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {agent && <span className="text-sm">{agent.emoji}</span>}
          <span className="text-[11px] text-zinc-500">{agent?.name || task.assignee}</span>
        </div>
        <div className="flex items-center gap-2">
          {projectLabel && (
            <Badge color={agent?.color} className="text-[10px] py-0">
              {projectLabel}
            </Badge>
          )}
          <span className="text-[10px] text-zinc-600">{timeAgo(task.updated)}</span>
        </div>
      </div>
    </div>
  );
}
