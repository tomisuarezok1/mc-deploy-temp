"use client";

import { useState } from "react";
import type { Task, TaskStatus, Priority } from "@/lib/types";
import { getAgent } from "@/lib/agents";
import { AGENTS } from "@/lib/agents";
import Modal from "A/components/ui/Modal";

const STATUSES: { id: TaskStatus; label: string }[] = [
  { id: "backlog", label: "Backlog" },
  { id: "todo", label: "To Do" },
  { id: "in_progress", label: "En Progreso" },
  { id: "review", label: "Review" },
  { id: "done", label: "Done" },
];

const PRIORITIES: { id: Priority; label: string; color: string }[] = [
  { id: "high", label: "Alta", color: "bg-red-400" },
  { id: "medium", label: "Media", color: "bg-amber-400" },
  { id: "low", label: "Baja", color: "bg-zinc-400" },
];

interface TaskModalProps {
  task: Task | null;
  open: boolean;
  onClose: () => void;
  onSave: (task: Task) => void;
}

export default function TaskModal({ task, open, onClose, onSave }: TaskModalProps) {
  const [form, setForm] = useState<Partial<Task>>(task || {});

  const handleSave = () => {
    if (!form.title) return;
    onSave({
      id: task?.id || crypto.randomUUID(),
      title: form.title || "",
      description: form.description || "",
      assignee: form.assignee || "chief",
      project: form.project,
      workspace: form.workspace || "cnbx",
      status: form.status || "backlog",
      priority: form.priority || "medium",
      created: task?.created || new Date().toISOString(),
      updated: new Date().toISOString(),
    });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title={task ? "Editar tarea" : "Nueva tarea"}>
      <div className="space-y-4">
        <div>
          <label className="block text-[12px] text-zinc-500 mb-1">T\u00edtulo</label>
          <input
            type="text"
            value={form.title || ""}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-surface-3 border border-border text-[13px] text-zinc-100 focus:outline-none focus:border-zinc-500"
            placeholder="Descripci\u00f3n de la tarea..."
          />
        </div>

        <div>
          <label className="block text-[12px] text-zinc-500 mb-1">Descripci\u00f3n</label>
          <textarea
            value={form.description || ""}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 rounded-lg bg-surface-3 border border-border text-[13px] text-zinc-100 focus:outline-none focus:border-zinc-500 resize-none"
            placeholder="Detalles adicionales..."
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[12px] text-zinc-500 mb-1">Asignado a</label>
            <select
              value={form.assignee || ""}
              onChange={(e) => setForm({ ...form, assignee: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-surface-3 border border-border text-[13px] text-zinc-100 focus:outline-none focus:border-zinc-500"
            >
              {AGENTS.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.emoji} {a.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[12px] text-zinc-500 mb-1">Estado</label>
            <select
              value={form.status || "backlog"}
              onChange={(e) => setForm({ ...form, status: e.target.value as TaskStatus })}
              className="w-full px-3 py-2 rounded-lg bg-surface-3 border border-border text-[13px] text-zinc-100 focus:outline-none focus:bordex­zinc-500"
            >
              {STATUSES.map((s) => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[12px] text-zinc-500 mb-1">Prioridad</label>
            <div className="flex gap-2">
              {PRIORITIES.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setForm({ ...form, priority: p.id })}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[12px] ${
                    form.priority === p.id
                      ? "border-zinc-500 bg-surface-4 text-zinc-200"
                      : "border-border text-zinc-500 hover:border-border-hover"
                  }`}
                >
                  <span className={`h-2 w-2 rounded-full ${p.color}`} />
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[12px] text-zinc-500 mb-1">Proyecto</label>
            <select
              value={form.project || ""}
              onChange={(e) => setForm({ ...form, project: e.target.value || undefined })}
              className="w-full px-3 py-2 rounded-lg bg-surface-3 border border-border text-[13px] text-zinc-100 focus:outline-none focus:border-zinc-500"
            >
              <option value="">Sin proyecto</option>
              <option value="arquitex">Arquitex</option>
              <option value="blackfin">BlackFin</option>
              <option value="holding">Holding</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-[13px] text-zinc-400 hover:text-zinc-200 hover:bg-surface-3"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-lg bg-zinc-100 text-zinc-900 text-[13px] font-medium hover:bg-zinc-200"
          >
              {task ? "Guardar" : "Crear"}
            </button>
        </div>
      </div>
    </Modal>
  );
}
