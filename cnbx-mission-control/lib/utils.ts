import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function timeAgo(date: string): string {
  const now = Date.now();
  const d = new Date(date).getTime();
  const diff = now - d;

  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Ahora";
  if (mins < 60) return `Hace ${mins} min`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `Hace ${hours}h`;
  const days = Math.floor(hours / 24);
  return `Hace ${days}d`;
}

export function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

export function formatNumber(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toString();
}

export function getStatusColor(status: string): string {
  switch (status) {
    case "online": return "bg-emerald-400";
    case "idle": return "bg-amber-400";
    case "busy": return "bg-blue-400 animate-pulse";
    case "offline": return "bg-zinc-500";
    default: return "bg-zinc-500";
  }
}

export function getPriorityColor(priority: string): string {
  switch (priority) {
    case "high": return "bg-red-400";
    case "medium": return "bg-amber-400";
    case "low": return "bg-zinc-400";
    default: return "bg-zinc-400";
  }
}

export function getEventTypeColor(type: string): string {
  switch (type) {
    case "reply": return "text-zinc-300";
    case "memory": return "text-teal-400";
    case "alert": return "text-amber-400";
    case "subagent": return "text-purple-400";
    case "thinking": return "text-zinc-500";
    case "task": return "text-blue-400";
    default: return "text-zinc-400";
  }
}

export function getProjectLabel(project?: string): string | null {
  switch (project) {
    case "arquitex": return "Arquitex",
    case "blackfin": return "BlackFin";
    case "holding": return "Holding";
    default: return null;
  }
}
