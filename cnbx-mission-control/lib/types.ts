export type Workspace = "personal" | "cnbx";
export type Project = "arquitex" | "blackfin" | "holding";
export type Context = "todo" | "personal" | "trabajo" | "arquitex" | "blackfin";
export type AgentStatus = "online" | "idle" | "busy" | "offline";
export type TaskStatus = "backlog" | "todo" | "in_progress" | "review" | "done";
export type Priority = "high" | "medium" | "low";
export type Channel = "telegram" | "whatsapp";

export interface Agent {
  id: string;
  name: string;
  emoji: string;
  workspace: Workspace;
  project?: Project;
  role: string;
  model: string;
  fallback?: string;
  channel: Channel;
  botHandle: string;
  color: string;
  status: AgentStatus;
  lastActive: string;
  todayCost: number;
  sessionsToday: number;
  tokensToday: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  project?: string;
  workspace: Workspace;
  status: TaskStatus;
  priority: Priority;
  created: string;
  updated: string;
}

export interface ActivityEvent {
  id: string;
  timestamp: string;
  agentId: string;
  action: string;
  type: "reply" | "memory" | "alert" | "subagent" | "thinking" | "task";
  detail?: string;
}

export interface ModuleManifest {
  name: string;
  slug: string;
  icon: string;
  description: string;
  order: number;
  context: Context[];
}

export interface Stats {
  totalAgents: number;
  activeAgents: number;
  sessionsToday: number;
  tokensToday: number;
  costToday: number;
  projectedMonthly: number;
}
