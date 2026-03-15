"use client";

import { useState } from "react";
import { useAppContext, filterByContext } from "A/lib/context";
import { MOCK_TASKS } from "@/lib/mock-data";
import { AGENTS } from "@/lib/agents";
import KanbanBoard from "A/components/tasks/KanbanBoard";
import TaskModal from "@/components/tasks/TaskModal";
import type { Task } from "@/lib/types";
import { Plus, Filter } from "lucide-react";

export default function TasksPage() {
  const { context } = useAppContext();
  const [createOpen, setCreateOpen] = useState(false);
  const [agentFilter, setAgentFilter] = useState<string>("");

  let tasks = filterByContext(MOCK_TASKS, context);
  if (agentFilter) {
    tasks = tasks.filter((t) => t.assignee === agentFilter);
  }

  const totalTasks = tasks.length;
  const inProgress = tasks.filter((t) => t.status === "in_progress").length;
  const done = tasks.filter((t) => t.status === "done").length;
  const completionRate = totalTasks > 0 ? Math.round((done / totalTasks) * 100) : 0;

  return (
    <div className="space-y-5 max-w-[1600px]">
      {/* Stats + Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <h1 className="text-lg font-semibold text-zinc-100">Task Board</h1>
          <div className="flex items-center gap-4 text-[12px] text-zinc-500">
            <span>{totalTasks} tareas</span>
            <span className="text-zinc-600">|</span>
            <span>{inProgress} en progreso</span>
            <span className="text-zinc-600">|</span>
            <span>{completionRate}% completadas</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <Filter size={13} className="text-zinc-500" />
            <select
              value={agentFilter}
              onChange={(e) => setAgentFilter(e.target.value)}
              className="px-2 py-1.5 rounded-lg bg-surface-2 border border-border text-[12px] text-zinc-300 focus:outline-none"
            >
              <option value="">Todos los agentes</option>
              {AGENTS.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.emoji} {a.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setCreateOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 text-zinc-900 text-[13px] font-medium hover:bg-zinc-200"
          >
            <Plus size={14} />
            Nueva tarea
          </button>
        </div>
      </div>

      {/* Kanban */}
      <KanbanBoard initialTasks={tasks} />

      {/* Create modal */}
      <TaskModal
        task={null}
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onSave={(task) => {
          // In production, this would POST to /api/tasks
          console.log("Task created:", task);
          setCreateOpen(false);
        }}
      />
    </div>
  );
}
