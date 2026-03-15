"use client";

import type { Task, TaskStatus } from "@/lib/types";
import TaskCard from "./TaskCard";

const COLUMN_LABELS: Record<TaskStatus, string> = {
  backlog: "Backlog",
  todo: "To Do",
  in_progress: "En Progreso",
  review: "Review",
  done: "Done",
};

interface KanbanColumnProps {
  status: TaskStatus;
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  onDrop: (taskId: string, targetStatus: TaskStatus) => void;
}

export default function KanbanColumn({ status, tasks, onTaskClick, onDrop }: KanbanColumnProps) {
  return (
    <div
      className="flex flex-col min-w-[260px] max-w-[300px] flex-1 rounded-card transition-colors"
      onDragOver={(e) => {
        e.preventDefault();
        e.currentTarget.classList.add("bg-surface-3/50");
      }}
      onDragLeave={(e) => {
        e.currentTarget.classList.remove("bg-surface-3/50");
      }}
      onDrop={(e) => {
        e.preventDefault();
        e.currentTarget.classList.remove("bg-surface-3/50");
        const taskId = e.dataTransfer.getData("text/plain");
        if (taskId) onDrop(taskId, status);
      }}
    >
      <div className="flex items-center justify-between px-1 py-2">
        <div className="flex items-center gap-2">
          <h3 className="text-[12px] font-semibold text-zinc-400 uppercase tracking-wider">
            {COLUMN_LABELS[status]}
          </h3>
          <span className="text-[11px] text-zinc-600 bg-surface-3 px-1.5 py-0.5 rounded">
            {tasks.length}
          </span>
        </div>
      </div>

      <div className="space-y-2 flex-1 min-h-[120px] p-1">
        {tasks.map((task) => (
          <div
            key={task.id}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData("text/plain", task.id);
              e.dataTransfer.effectAllowed = "move";
              (e.currentTarget as HTMLElement).style.opacity = "0.5";
            }}
            onDragEnd={(e) => {
              (e.currentTarget as HTMLElement).style.opacity = "1";
            }}
          >
            <TaskCard task={task} onClick={() => onTaskClick(task)} />
          </div>
        ))}
      </div>
    </div>
  );
}
