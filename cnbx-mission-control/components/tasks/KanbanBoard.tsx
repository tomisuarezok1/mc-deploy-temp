"use client";

import { useState } from "react";
import type { Task, TaskStatus } from "@/lib/types";
import KanbanColumn from "./KanbanColumn";
import TaskModal from "./TaskModal";

const COLUMNS: TaskStatus[] = ["backlog", "todo", "in_progress", "review", "done"];

interface KanbanBoardProps {
  initialTasks: Task[];
}

export default function KanbanBoard({ initialTasks }: KanbanBoardProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  function handleDrop(taskId: string, targetStatus: TaskStatus) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? { ...t, status: targetStatus, updated: new Date().toISOString() }
          : t
      )
    );
  }

  function handleSaveTask(task: Task) {
    setTasks((prev) => {
      const exists = prev.find((t) => t.id === task.id);
      if (exists) {
        return prev.map((t) => (t.id === task.id ? task : t));
      }
      return [...prev, task];
    });
  }

  return (
    <>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {COLUMNS.map((status) => (
          <KanbanColumn
            key={status}
            status={status}
            tasks={tasks.filter((t) => t.status === status)}
            onTaskClick={(task) => {
              setSelectedTask(task);
              setModalOpen(true);
            }}
            onDrop={handleDrop}
          />
        ))}
      </div>

      <TaskModal
        task={selectedTask}
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedTask(null);
        }}
        onSave={handleSaveTask}
      />
    </>
  );
}
